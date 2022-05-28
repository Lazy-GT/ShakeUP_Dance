package com.shakeup.request.video;

import com.shakeup.model.Videos;
import com.sun.istack.NotNull;
import lombok.Getter;

@Getter
public class VideoMyCategoryRequest {
    @NotNull
    int category;
    @NotNull
    int uid;

    public Videos toEntity() {
        return Videos.builder()
                .uid(uid)
                .category(category)
                .build();
    }
}
