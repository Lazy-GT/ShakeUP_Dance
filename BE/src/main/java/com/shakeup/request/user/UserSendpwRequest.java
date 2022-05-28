package com.shakeup.request.user;

import com.shakeup.model.Users;
import com.sun.istack.NotNull;
import lombok.Data;

/**
 *
 *
 * UserSendpwRequest의 설명을 여기에 작성한다.
 *
 * 임시 비밀번호 재설정을 위해 id 및 email을 받는 class
 *
 * @author 이승관
 * @version 1.0.0
 * 작성일 2022-01-21
 *
 *
**/

@Data
public class UserSendpwRequest {

    @NotNull
    String id;

    @NotNull
    String email;

    public Users toEntity(){
        return Users.builder()
                .id(id)
                .email(email)
                .build();
    }
}
