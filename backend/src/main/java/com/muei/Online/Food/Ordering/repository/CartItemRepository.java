package com.muei.Online.Food.Ordering.repository;

import com.muei.Online.Food.Ordering.model.Cart;
import com.muei.Online.Food.Ordering.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

}
