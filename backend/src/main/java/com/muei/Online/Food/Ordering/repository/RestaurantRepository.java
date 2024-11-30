package com.muei.Online.Food.Ordering.repository;

import com.muei.Online.Food.Ordering.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant,Long> {
    @Query("SELECT r FROM Restaurant r where lower(r.name) like lower(concat('%',:query, '%')) " +
            "OR lower(r.cuisineType) like lower(concat('%', :query, '%')) ")
    List<Restaurant> findBySearchQuery(String query);
    Restaurant findByOwnerId(Long userId);
}
