package com.muei.Online.Food.Ordering.respone;

import com.muei.Online.Food.Ordering.model.USER_ROLE;
import lombok.Data;

@Data
public class AuthRespone {
    private String jwt;
    private String message;
    private USER_ROLE role;
}
