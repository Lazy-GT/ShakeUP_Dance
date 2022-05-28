package com.shakeup.request.user;

import com.shakeup.model.Users;
import lombok.Data;

@Data
public class UserLoginResponse {
    String token;
    Users user;
}
