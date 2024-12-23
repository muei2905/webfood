package com.muei.Online.Food.Ordering.controller;

import com.muei.Online.Food.Ordering.model.CartItem;
import com.muei.Online.Food.Ordering.model.Order;
import com.muei.Online.Food.Ordering.model.User;
import com.muei.Online.Food.Ordering.request.AddCartItemRequest;
import com.muei.Online.Food.Ordering.request.OrderRequest;
import com.muei.Online.Food.Ordering.respone.PaymentResponse;
import com.muei.Online.Food.Ordering.service.OrderService;
import com.muei.Online.Food.Ordering.service.PaymentService;
import com.muei.Online.Food.Ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {
    @Autowired
    private PaymentService paymentService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @PostMapping("/order")
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest req, @RequestHeader("Authorization") String jwt) throws Exception{
        User user = userService.findUserByJwtToken(jwt);
        Order  order = orderService.createOrder(req, user);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }
    @GetMapping("/order/user")
    public ResponseEntity<List<Order>> getOrderHistory(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        List<Order> orders = orderService.getUsersOrder(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
    @PostMapping("/order/payment")
    public ResponseEntity<PaymentResponse> createOrderPayment(@RequestBody OrderRequest req, @RequestHeader("Authorization") String jwt) throws Exception{
        User user = userService.findUserByJwtToken(jwt);
        Order  order = orderService.createOrder(req, user);
        PaymentResponse response= paymentService.createPaymentLink(order);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
