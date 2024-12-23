package com.muei.Online.Food.Ordering.service;

import com.muei.Online.Food.Ordering.model.Order;
import com.muei.Online.Food.Ordering.respone.PaymentResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImp implements PaymentService{
    @Value("${stripe.api.key}")
    private String stripeSecretKey;
    @Override
    public PaymentResponse createPaymentLink(Order order) throws StripeException {
        Stripe.apiKey= stripeSecretKey;
        SessionCreateParams params= SessionCreateParams.builder().addPaymentMethodType(
                SessionCreateParams.PaymentMethodType.CARD).setMode(SessionCreateParams.Mode.PAYMENT).setSuccessUrl("http://localhost:5173/payment/success/"+order.getId())
                .setCancelUrl("http://localhost:5173/payment/fail").addLineItem(SessionCreateParams.LineItem.builder().setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder().setCurrency("usd").setUnitAmount((long) order.getTotalPrice())
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder().setName("Muei Food").build()).build()).build()).build();
        Session session= Session.create(params);
        PaymentResponse response=new PaymentResponse();
        response.setPayment_url(session.getUrl());
        return response;
    }
}
