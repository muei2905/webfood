package com.muei.Online.Food.Ordering.service;

import com.muei.Online.Food.Ordering.model.Order;
import com.muei.Online.Food.Ordering.respone.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {
    public PaymentResponse createPaymentLink(Order order) throws StripeException;
}
