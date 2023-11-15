package org.westernacher.solutions.service;

import org.springframework.http.ResponseEntity;
import org.westernacher.solutions.domain.entities.SavedOrder;
import org.westernacher.solutions.domain.models.binding.SavedOrderBindingModel;
import org.westernacher.solutions.domain.models.service.CartOrderServiceModel;
import org.westernacher.solutions.domain.models.service.CartUpdateCoffeeQuantity;

import java.util.List;

public interface CartService {
    List<SavedOrder> getUserCart(String username);
    int getUserCartSize(String username);
    boolean cartOrder(CartOrderServiceModel cartServiceModelList) throws Exception;
    ResponseEntity saveOrder(SavedOrderBindingModel savedOrderBindingModel);
    boolean removeSavedOrder(String id);
    boolean updateCoffeeQuantity(CartUpdateCoffeeQuantity cartUpdateCoffeeQuantity);
}
