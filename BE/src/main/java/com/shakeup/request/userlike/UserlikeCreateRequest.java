package com.shakeup.request.userlike;

import com.shakeup.model.Userlike;
import com.sun.istack.NotNull;
import lombok.Getter;

@Getter
public class UserlikeCreateRequest {
    @NotNull
    int uid;
    @NotNull
    long vid;

}
