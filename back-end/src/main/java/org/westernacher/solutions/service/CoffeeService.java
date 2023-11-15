package org.westernacher.solutions.service;

import org.springframework.http.ResponseEntity;
import org.westernacher.solutions.domain.entities.Coffee;
import org.westernacher.solutions.domain.entities.Type;
import org.westernacher.solutions.domain.models.service.CoffeeServiceModel;

import java.util.List;


public interface CoffeeService {
    List<CoffeeServiceModel> getAll();
    List<CoffeeServiceModel> getAllByType(Type type);
    List<CoffeeServiceModel> getAllByBrand(String brand);
    List<CoffeeServiceModel> search(String input);
    String updateAvgRating(int id, int rating);
    ResponseEntity updateAvailability(int id, int availability);
    boolean addCoffee(CoffeeServiceModel coffeeServiceModel);
    ResponseEntity removeCoffee(int id);
    Coffee getCoffee(int id);
    boolean decreaseAvailability(Coffee coffee, int quantity) throws Exception;
}
