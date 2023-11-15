package org.westernacher.solutions.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.westernacher.solutions.domain.models.binding.CartOrderBindingModel;
import org.westernacher.solutions.domain.models.binding.SavedOrderBindingModel;
import org.westernacher.solutions.domain.models.service.CartOrderServiceModel;
import org.westernacher.solutions.domain.models.service.CartUpdateCoffeeQuantity;
import org.westernacher.solutions.domain.models.view.CartViewModel;
import org.westernacher.solutions.service.CartService;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(consumes = "application/json", produces = "application/json")
@CrossOrigin(origins = "*")
public class CartController {
    private final CartService cartService;
    private final ModelMapper modelMapper;

    @Autowired
    public CartController(CartService cartService, ModelMapper modelMapper) {
        this.cartService = cartService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/cart")
    public List<CartViewModel> cart(@RequestParam(name = "username") String username) {
        return this.cartService.getUserCart(username)
                .stream()
                .map(x -> this.modelMapper.map(x, CartViewModel.class))
                .collect(Collectors.toList());
    }

    @PostMapping("/cart-order")
    public ResponseEntity cartOrder(@RequestBody CartOrderBindingModel cartOrderBindingModel) throws URISyntaxException {
        boolean cartOrderSuccess = false;
        try {
            cartOrderSuccess = this.cartService.cartOrder(this.modelMapper.map(cartOrderBindingModel, CartOrderServiceModel.class));
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (!cartOrderSuccess) {
            return ResponseEntity.badRequest().body("Поръчката не може да бъде направена, моля опитайте по-късно");
        }

        return ResponseEntity.created(new URI("/cart-order")).body(cartOrderSuccess);
    }

    @GetMapping("/cart-size")
    public int getCartSize(@RequestParam(name = "username") String username) {
        return this.cartService.getUserCartSize(username);
    }

    @PostMapping("/cart/update-quantity")
    public ResponseEntity saveOrderToCart(@RequestBody CartUpdateCoffeeQuantity cartUpdateCoffeeQuantity) throws URISyntaxException {
        return ResponseEntity.created(new URI("/cart/update-quantity"))
                .body(this.cartService.updateCoffeeQuantity(cartUpdateCoffeeQuantity));
    }

    @PostMapping("/save-order")
    public ResponseEntity saveOrderToCart(@RequestBody SavedOrderBindingModel savedOrderBindingModel) {
        return this.cartService.saveOrder(savedOrderBindingModel);
    }

    @PostMapping("/delete-saved-order")
    public ResponseEntity deleteSavedOrder(@RequestParam(name = "id") String id) {
        boolean result = this.cartService.removeSavedOrder(id);
        if (result) {
            return ResponseEntity.ok().body(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }
}
