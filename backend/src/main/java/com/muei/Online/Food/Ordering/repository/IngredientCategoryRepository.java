package com.muei.Online.Food.Ordering.repository;

import com.muei.Online.Food.Ordering.model.IngredientCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientCategoryRepository extends JpaRepository <IngredientCategory, Long> {

    List<IngredientCategory> findByRestaurantId(Long id);
}
