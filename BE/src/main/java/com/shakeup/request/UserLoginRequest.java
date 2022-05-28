package com.shakeup.request;

/**
 *
 *
 * UserLoginRequest의 설명을 여기에 작성한다.
 * 유저 로그인에 필요한 Request.
 *
 * @author gwan
 * @version 1.0.0
 * 작성일 2022-01-26
 *
 *
**/

import com.shakeup.model.Users;
import com.sun.istack.NotNull;
import lombok.Getter;

@Getter
public class UserLoginRequest {

    @NotNull
    String id;
    @NotNull
    String password;

    public Users toEntity() {
        return Users.builder()
                .id(id)
                .password(password)
                .build();
    }
}
