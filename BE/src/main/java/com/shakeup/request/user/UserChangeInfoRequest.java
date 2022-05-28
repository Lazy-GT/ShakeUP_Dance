package com.shakeup.request.user;

import com.shakeup.model.Users;
import com.sun.istack.NotNull;
import lombok.*;


@Getter
public class UserChangeInfoRequest {
    @NotNull
    String id;
    @NotNull
    String name;

    String profile;

    public Users toEntity(){
        return Users.builder()
                .id(id)
                .name(name)
                .profile(profile)
                .build();
    }
}
