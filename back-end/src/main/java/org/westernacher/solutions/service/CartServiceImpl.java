package org.westernacher.solutions.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.westernacher.solutions.domain.entities.Order;
import org.westernacher.solutions.domain.entities.SavedOrder;
import org.westernacher.solutions.domain.entities.User;
import org.westernacher.solutions.domain.models.binding.SavedOrderBindingModel;
import org.westernacher.solutions.domain.models.service.CartOrderServiceModel;
import org.westernacher.solutions.domain.models.service.CartUpdateCoffeeQuantity;
import org.westernacher.solutions.domain.models.service.SavedOrderServiceModel;
import org.westernacher.solutions.domain.models.view.CartViewModel;
import org.westernacher.solutions.repository.OrdersRepository;
import org.westernacher.solutions.repository.SavedOrdersRepository;
import org.westernacher.solutions.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {
    private final CoffeeService coffeeService;
    private final OrdersRepository ordersRepository;
    private final UserRepository userRepository;
    private final SavedOrdersRepository savedOrdersRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public CartServiceImpl(CoffeeService coffeeService, OrdersRepository ordersRepository, UserRepository userRepository, SavedOrdersRepository savedOrdersRepository, ModelMapper modelMapper) {
        this.coffeeService = coffeeService;
        this.ordersRepository = ordersRepository;
        this.userRepository = userRepository;
        this.savedOrdersRepository = savedOrdersRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<SavedOrder> getUserCart(String username) {
        Optional<User> user = this.userRepository.findByUsername(username);

        if (user.isPresent()) {
            return user.get().getCart();
        } else {
            throw new NullPointerException("Empty cart");
        }
    }

    @Override
    public int getUserCartSize(String username) {
        Optional<User> user = this.userRepository.findByUsername(username);
        if (user.isPresent()) {
            try {
                return this.savedOrdersRepository.countAllByUser(user.get());
            } catch (Exception e) {
                return 0;
            }
        } else {
            return 0;
        }
    }

    @Override
    public boolean cartOrder(CartOrderServiceModel cartServiceModelList) throws Exception {
        for (CartViewModel cartViewModel : cartServiceModelList.getCartViewModelList()) {

            if (!this.coffeeService.decreaseAvailability(cartViewModel.getCoffee(), cartViewModel.getQuantity())) {
                // TODO: To be improved to show error to the user on which coffee it failed
                return false;
                // throw new Exception("Sorry, there is no available" + cartViewModel.getCoffee().getName() + "coffee at the moment.");
            }

            try {
                this.ordersRepository.save(new Order());
            } catch (DataAccessException exception) {
                System.out.println("Data not stored correctly.");
                return false;
            }
        }

        return true;
    }

    @Override
    public ResponseEntity saveOrder(SavedOrderBindingModel savedOrderBindingModel) {
        try {
            Optional<User> user = this.userRepository.findByUsername(savedOrderBindingModel.getUsername());
            if (user.isPresent()) {
                SavedOrderServiceModel savedOrderServiceModel = new SavedOrderServiceModel();
                modelMapper.map(savedOrderBindingModel, savedOrderServiceModel);
                savedOrderServiceModel.setUser(user.get());
                this.savedOrdersRepository.save(modelMapper.map(savedOrderServiceModel, SavedOrder.class));
                return ResponseEntity.ok().body(true);
            } else {
                System.out.println("User cannot be found.");
                return ResponseEntity.badRequest().body(false);
            }
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @Override
    public boolean removeSavedOrder(String id) {
        try {
            this.savedOrdersRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            System.out.println("Exception while trying to delete saved order");
            return false;
        }
    }

    @Override
    public boolean updateCoffeeQuantity(CartUpdateCoffeeQuantity cartUpdateCoffeeQuantity) {
        Optional<SavedOrder> savedOrder = this.savedOrdersRepository.findById(cartUpdateCoffeeQuantity.getId());

        if (savedOrder.isPresent()) {
            savedOrder.get().setQuantity(cartUpdateCoffeeQuantity.getQuantity());
            this.savedOrdersRepository.save(savedOrder.get());
            return true;
        }

        return false;
    }

}
