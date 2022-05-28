package com.shakeup.request.video;

import com.shakeup.model.Videos;
import com.sun.istack.NotNull;
import lombok.Getter;

@Getter
public class VideoUpdateRequest {
    @NotNull
    int vid;
    @NotNull
    String title;
    @NotNull
    String url;
    @NotNull
    int category;
    boolean isshow;
    String thumbnail;
    int comment;
    boolean iscomment;
    boolean isscore;
    int exposecnt;
    int clickcnt;

    public Videos toEntity(){
        return  Videos.builder()
                .vid(vid)
                .title(title)
                .url(url)
                .category(category)
                .isshow(isshow)
                .thumbnail(thumbnail)
                .iscomment(iscomment)
                .isscore(isscore)
//                .comment(comment)
                .build();

    }
}
