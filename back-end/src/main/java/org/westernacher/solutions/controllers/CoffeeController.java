package org.westernacher.solutions.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.westernacher.solutions.domain.entities.Coffee;
import org.westernacher.solutions.domain.models.binding.CoffeeAdd;
import org.westernacher.solutions.domain.models.binding.CoffeeUpdateAvailability;
import org.westernacher.solutions.domain.models.binding.CoffeeUpdateRating;
import org.westernacher.solutions.domain.models.service.CoffeeServiceModel;
import org.westernacher.solutions.service.CoffeeService;
import org.westernacher.solutions.service.LogServiceImpl;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
//@CrossOrigin("http://localhost:63343")
@RequestMapping(value = "/coffees", consumes = "application/json", produces = "application/json")
public class CoffeeController {
    private final CoffeeService coffeeService;
    private final ModelMapper modelMapper;
    private final LogServiceImpl logService;

    @Autowired
    public CoffeeController(CoffeeService coffeeService, ModelMapper modelMapper, LogServiceImpl logService) {
        this.coffeeService = coffeeService;
        this.modelMapper = modelMapper;
        this.logService = logService;
    }

    @PostMapping("/change-rating")
    public ResponseEntity partialUpdateCoffee(@RequestBody CoffeeUpdateRating coffeeUpdateRating) throws URISyntaxException {
        String avgRating = this.coffeeService.updateAvgRating(coffeeUpdateRating.id, coffeeUpdateRating.rating);

        return ResponseEntity.created(new URI("/coffees/change-rating")).body(avgRating);
    }

    @PostMapping("/update-availability")
    public ResponseEntity updateAvailability(@RequestBody CoffeeUpdateAvailability coffeeUpdateAvailability) {
        return this.coffeeService.updateAvailability(coffeeUpdateAvailability.id, coffeeUpdateAvailability.availability);
    }

    @PostMapping("/add")
    public ResponseEntity addCoffee(@RequestBody CoffeeAdd coffeeAdd) throws URISyntaxException {
        boolean result = this.coffeeService.addCoffee(this.modelMapper
                .map(coffeeAdd, CoffeeServiceModel.class));

        return ResponseEntity.created(new URI("/coffees/add")).body(result);
    }

    @PostMapping("/remove")
    public ResponseEntity removeCoffee(@RequestParam(name = "id") int id) {
        return this.coffeeService.removeCoffee(id);
    }

    @GetMapping("/product")
    public Coffee getSingleCoffee(@RequestParam(name = "id") int id) {
        return this.coffeeService.getCoffee(id);
    }


//    @GetMapping("/get-times-rated")
//    public int getTimesRated()
//    {
//        int timesRated = this.coffeeService
//
//        List<AllCoffeesViewModel> allCoffees =
//                this.sweatShirtService.getAll()
//                        .stream()
//                        .map(x -> this.modelMapper.map(x, AllCoffeesViewModel.class))
//                        .collect(Collectors.toList());
//
//        return allCoffees;
//    }

}