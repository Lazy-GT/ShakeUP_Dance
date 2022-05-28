package com.shakeup.request.user;

import com.shakeup.model.Users;
import com.sun.istack.NotNull;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class UserSignUpRequest {

    @NotNull
    String id;
    @NotNull
    String name;
    @NotNull
    String email;
    @NotNull
    String password;
    String profile;

//    String profile;

    public Users toEntity() {
        return Users.builder()
                .id(id)
                .name(name)
                .email(email)
                .password(password)
                .profile(profile)
                .build();
    }
}