package com.muei.Online.Food.Ordering.service;

import com.muei.Online.Food.Ordering.model.Category;

import java.util.List;

public interface CategoryService {
    public Category createCategory(String name, Long userId);
    public List<Category> findCategoryByRestaurantId(Long id) throws Exception;
    public Category findCategoryById(Long id) throws Exception;
}
