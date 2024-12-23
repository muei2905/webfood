package com.muei.Online.Food.Ordering.request;

import com.muei.Online.Food.Ordering.model.Address;
import lombok.Data;

@Data
public class OrderRequest {
    private Long restaurantId;
    private Address deliveryAddress;
}
