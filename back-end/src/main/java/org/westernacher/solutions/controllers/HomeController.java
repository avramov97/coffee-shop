package org.westernacher.solutions.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.westernacher.solutions.domain.entities.Type;
import org.westernacher.solutions.domain.models.view.AllCoffeesViewModel;
import org.westernacher.solutions.service.LogServiceImpl;
import org.westernacher.solutions.service.CoffeeService;
import org.westernacher.solutions.service.UserService;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/", consumes = "application/json", produces = "application/json")
@CrossOrigin(origins = "*")
public class HomeController {
    private final CoffeeService coffeeService;
    private final UserService userService;
    private final ModelMapper modelMapper;
    private static final DateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
    private final LogServiceImpl logService;

    @Autowired
    public HomeController(CoffeeService coffeeService, UserService userService, ModelMapper modelMapper, LogServiceImpl logService) {
        this.coffeeService = coffeeService;
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.logService = logService;
    }

    @GetMapping
    public List<AllCoffeesViewModel> all() {
        List<AllCoffeesViewModel> allCoffees =
                this.coffeeService.getAll()
                        .stream()
                        .map(coffeeServiceModel -> this.modelMapper.map(coffeeServiceModel, AllCoffeesViewModel.class))
                        .collect(Collectors.toList());

        return allCoffees;
    }

    @GetMapping("/filter-type")
    public List<AllCoffeesViewModel> allByType(@RequestParam(name = "type") Type type)  {
        List<AllCoffeesViewModel> allCoffees =
                this.coffeeService.getAllByType(type)
                        .stream()
                        .map(coffeeServiceModel -> this.modelMapper.map(coffeeServiceModel, AllCoffeesViewModel.class))
                        .collect(Collectors.toList());

        return allCoffees;
    }

    @GetMapping("/filter-brand")
    public List<AllCoffeesViewModel> allByBrand(@RequestParam(name = "brand") String brand)  {
        List<AllCoffeesViewModel> allCoffees =
                this.coffeeService.getAllByBrand(brand)
                        .stream()
                        .map(coffeeServiceModel -> this.modelMapper.map(coffeeServiceModel, AllCoffeesViewModel.class))
                        .collect(Collectors.toList());

        return allCoffees;
    }

    @GetMapping("/search")
    public List<AllCoffeesViewModel> search(@RequestParam(name = "input") String input)  {
        List<AllCoffeesViewModel> allCoffees =
                this.coffeeService.search(input)
                        .stream()
                        .map(coffeeServiceModel -> this.modelMapper.map(coffeeServiceModel, AllCoffeesViewModel.class))
                        .collect(Collectors.toList());

        return allCoffees;
    }

    @GetMapping("/waiting-size")
    public int getWaitingOrdersSize() {
        return this.userService.getWaitingOrdersSize();
    }

    @GetMapping("/delivered-size")
    public int getDeliveredOrdersSize() {
        return this.userService.getDeliveredOrdersSize();
    }
}
