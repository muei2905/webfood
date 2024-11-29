package com.muei.Online.Food.Ordering.service;

import com.muei.Online.Food.Ordering.model.User;

public interface UserService {
    public User findUserByJwtToken(String jwt) throws Exception;
    public User findUserByEmail(String email) throws Exception;
}
