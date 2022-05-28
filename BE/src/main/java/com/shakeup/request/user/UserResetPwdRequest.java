package com.shakeup.request.user;

import com.shakeup.model.Users;
import com.sun.istack.NotNull;
import lombok.Getter;

/**
 *
 *
 * UserResetPwdRequest의 설명을 여기에 작성한다.
 * 유저 비밀번호 재설정을 위해 Uid 및 Password 2개만 받는다.
 *
 * @author 이승관
 * @version 1.0.0
 * 작성일 2022-01-21
 *
 *
**/

@Getter
public class UserResetPwdRequest {
    @NotNull
    Long uid;
    @NotNull
    String password;

    public Users toEntity(){
        return Users.builder()
                .uid(uid)
                .password(password)
                .build();
    }
}
