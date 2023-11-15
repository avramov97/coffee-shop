package org.westernacher.solutions.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.westernacher.solutions.domain.entities.Order;
import org.westernacher.solutions.domain.models.binding.OrderCreateBindingModel;
import org.westernacher.solutions.domain.models.service.OrderServiceModel;
import org.westernacher.solutions.domain.models.view.OrdersViewModel;
import org.westernacher.solutions.service.EmailService;
import org.westernacher.solutions.service.OrderService;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/orders", consumes = "application/json", produces = "application/json")
public class OrdersController {
    private final OrderService orderService;
    private final ModelMapper modelMapper;
    private final EmailService emailService;
    int countOrders = 0;

    @Autowired
    public OrdersController(OrderService orderService, ModelMapper modelMapper, EmailService emailService) {
        this.orderService = orderService;
        this.modelMapper = modelMapper;
        this.emailService = emailService;
    }

    @GetMapping(value = "/waiting")
    public List<OrdersViewModel> notDeliveredOrders() {
        List<OrdersViewModel> notDeliveredOrders =
                this.orderService.getAllOrdersByDelivered(false)
                    .stream()
                        .map(x -> this.modelMapper.map(x, OrdersViewModel.class))
                        .collect(Collectors.toList());

        return notDeliveredOrders;
    }

    @GetMapping(value = "/delivered")
    public List<OrdersViewModel> deliveredOrders() {
        List<OrdersViewModel> deliveredOrders =
                this.orderService.getAllOrdersByDelivered(true)
                        .stream()
                        .map(x -> this.modelMapper.map(x, OrdersViewModel.class))
                        .collect(Collectors.toList());

        return deliveredOrders;
    }

    @PostMapping("/add")
    public ResponseEntity addOrder(@RequestBody OrderCreateBindingModel orderCreateBindingModel) throws Exception {
        Order order = this.orderService.addOrder(this.modelMapper.map(orderCreateBindingModel, OrderServiceModel.class));

        if (order == null) {
            return ResponseEntity.badRequest().body("Извинявайте, в момента няма останали кафета.");
        }

        countOrders++;
        String toOwner = "avramovdimitar6@gmail.com";
        String subjectOwner = "Поръчка номер " + countOrders;
        String textOwner = "Здравейте,\n\n" + "Вие трябва да изпратите поръчка за " + orderCreateBindingModel.getCity() + " ползвайки следващите данни: \n\n"
                            + "Име на кафе: " + order.getCoffee().getName() + "\n"
                            + "Цена: " + order.getCoffee().getNewPrice() + " денари\n"
                            + "Паковки: " + orderCreateBindingModel.getQuantity() + "\n"
                            + "Адрес: " + orderCreateBindingModel.getAddress() + "\n"
                            + "Град: " + orderCreateBindingModel.getCity() + "\n"
                            + "Телефонски номер: " + orderCreateBindingModel.getNumber() + "\n"
                            + "Имейл: " + orderCreateBindingModel.getEmail() + "\n\n\n"
                            + "Поздрави,\n"
                            + "Online Coffee BG";

        
        String subjectClient = "Успешно извършена поръчка од Coffee MK";
        String textClient = "Здравейте,\n\nВие успешно извършивте поръчка на кафето "  + order.getCoffee().getName() +
                            ", паковки " + orderCreateBindingModel.getQuantity() + ".\n" +
                            "Вашата поръчка ще бъде доставена за 3 дни на адреса " + orderCreateBindingModel.getAddress() + ", "
                            + orderCreateBindingModel.getCity() + "." + " Допоънително очавкайте да се свържат с Вас по телефона " + orderCreateBindingModel.getNumber() +
                            ".\n\nПри грешни информации, Моля Ве, да ни пишете на този мейл или обадете се на номера 098 823 4987.\n" +
                            "Благодаря, че избрахте Coffee BG, Вашия избор е наше удоволствие.\n\n\n" +
                            "Поздрави,\n" +
                            "Тимът на Online Coffee BG" + "\n\n";

//       this.emailService.sendSimpleMessage(orderCreateBindingModel.getEmail(), subjectClient, textClient);
//       this.emailService.sendSimpleMessage(toOwner, subjectOwner, textOwner);

        return ResponseEntity.created(new URI("/orders/add")).body(true);
    }

    @PostMapping("/deliver")
    public ResponseEntity setOrderDone(@RequestParam(name = "id") int id, Authentication authentication) {
        boolean isDone = this.orderService.setDeliver(id, true);

        if (isDone) {
            System.out.println("DELIVERED");
            return ResponseEntity.ok().body(true);
        } else {
            System.out.println("NOT ERROR DELIVERED");
            return ResponseEntity.badRequest().body(false);
        }
    }

    @PostMapping("/remove-delivered-flag")
    public ResponseEntity setOrderNotDone(@RequestParam(name = "id") int id, Authentication authentication) {
        boolean isDone = this.orderService.setDeliver(id, false);

        if (isDone) {
            return ResponseEntity.ok().body(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @PostMapping("/remove")
    public ResponseEntity removeOrder(@RequestParam(name = "id") int id, Authentication authentication) {
        boolean isDone = this.orderService.removeOrder(id);

        if (isDone) {
            return ResponseEntity.ok().body("Order removed successfully!");
        } else {
            return ResponseEntity.badRequest().body("Order is not removed");
        }
    }

    @PostMapping("/remove-selected")
    public ResponseEntity removeSelectedOrders(@RequestParam(name = "selectedOrders") List<Integer> selectedOrders, Authentication authentication) {
        boolean removed = this.orderService.removeSelectedOrders(selectedOrders);

        if (removed == true) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @GetMapping("/count-waiting")
    public int getCountWaitingOrders() {
        return this.orderService.countWaitingOrders();
    }

    @GetMapping("count-delivered")
    public int getCountDeliveredOrders() {
        return this.orderService.countDeliveredOrders();
    }
}
