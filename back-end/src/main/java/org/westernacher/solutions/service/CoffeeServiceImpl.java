package org.westernacher.solutions.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.westernacher.solutions.domain.entities.Coffee;
import org.westernacher.solutions.domain.entities.Type;
import org.westernacher.solutions.domain.models.service.CoffeeServiceModel;
import org.westernacher.solutions.exceptions.InvalidAverageNumberException;
import org.westernacher.solutions.repository.CoffeeRepository;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CoffeeServiceImpl implements CoffeeService {
    private final CoffeeRepository coffeeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public CoffeeServiceImpl(CoffeeRepository coffeeRepository, ModelMapper modelMapper) {
        this.coffeeRepository = coffeeRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<CoffeeServiceModel> getAll() {
        return this.coffeeRepository
                .findAll()
                .stream()
                .map(x -> this.modelMapper.map(x, CoffeeServiceModel.class))
                .collect(Collectors.toUnmodifiableList());
    }

    @Override
    public List<CoffeeServiceModel> getAllByType(Type type) {
        return this.coffeeRepository
                .findAllByType(type)
                .stream()
                .map(x -> this.modelMapper.map(x, CoffeeServiceModel.class))
                .collect(Collectors.toUnmodifiableList());
    }

    @Override
    public List<CoffeeServiceModel> getAllByBrand(String brand) {
        return this.coffeeRepository
                .findAllByNameContainingIgnoreCase(brand)
                .stream()
                .map(x -> this.modelMapper.map(x, CoffeeServiceModel.class))
                .collect(Collectors.toUnmodifiableList());
    }

    @Override
    public List<CoffeeServiceModel> search(String input) {
        return this.coffeeRepository
                .findAllByNameContainingIgnoreCase(input)
                .stream()
                .map(x -> this.modelMapper.map(x, CoffeeServiceModel.class))
                .collect(Collectors.toUnmodifiableList());
    }

    @Override
    public String updateAvgRating(int id, int rating) {
        Coffee coffee = this.coffeeRepository.findById(id).orElse(null);

        if (coffee != null) {
            coffee.setTimesRated(coffee.getTimesRated() + 1);
            coffee.setRatingSum(coffee.getRatingSum() + rating);
            this.coffeeRepository.save(coffee);
            DecimalFormat df = new DecimalFormat("####0.00");

            try {
                double avgRating = (double) coffee.getRatingSum() / (double) coffee.getTimesRated();

                if (avgRating > 0) {
                    return df.format(avgRating);
                } else {
                    throw new InvalidAverageNumberException();
                }
            } catch (Exception e) {
                System.out.println("Exception on division regarding the average rating");
                return null;
            } catch (InvalidAverageNumberException invalidAverageNumberException) {
                System.out.println("Invalid number for average number (average number is < 0");
                return null;
            }
        } else {
            return null;
        }
    }

    @Override
    public ResponseEntity updateAvailability(int id, int availability) {
        Optional<Coffee> coffee = this.coffeeRepository.findById(id);

        if(coffee.isPresent()) {
            coffee.get().setrAvailability(availability);
            this.coffeeRepository.save(coffee.get());
            return ResponseEntity.ok().body(true);
        }

        return ResponseEntity.badRequest().body(false);
    }

    @Override
    public boolean addCoffee(CoffeeServiceModel coffeeServiceModel) {
        Coffee coffee = this.modelMapper.map(coffeeServiceModel, Coffee.class);

        try {
            this.coffeeRepository.save(coffee);
            return true;
        } catch (DataIntegrityViolationException e) {
            System.out.println("Error while adding Coffee");
        }
        return false;
    }

    @Override
    public ResponseEntity removeCoffee(int id) {
        Optional<Coffee> coffee = this.coffeeRepository.findById(id);
        if (coffee.isPresent()) {
            try {
                this.coffeeRepository.delete(coffee.get());
                return ResponseEntity.ok().body(true);
            } catch (DataIntegrityViolationException e) {
                e.printStackTrace();
                return ResponseEntity.badRequest().body(false);
            }
        }

        return ResponseEntity.badRequest().body(false); // Means that no coffee is found
    }

    @Override
    public Coffee getCoffee(int id) {
        Coffee coffee = this.coffeeRepository.findById(id).orElse(null);

        if (coffee == null) {
            return null;
        }

        return coffee;
    }

    @Override
    public boolean decreaseAvailability(Coffee coffee, int quantity) {
        Optional<Coffee> foundCoffee;
        if (coffee != null) {
            foundCoffee = this.coffeeRepository.findById(coffee.getId());
        } else {
            return false;
        }

        if (!foundCoffee.isPresent()) {
            return false;
        }

        int availability = foundCoffee.get().getrAvailability();
        if ((availability - quantity) < 0) {
            System.out.println("There is no left " + coffee.getName() + " coffees.");
            return false;
        }

        try {
            foundCoffee.get().setrAvailability(availability - quantity);
//           this.coffeeRepository.save(foundCoffee);
        } catch (DataAccessException ex) {
            System.out.println("Problem with Database storing: " + ex);
            return false;
        }

        return true;
    }
}
