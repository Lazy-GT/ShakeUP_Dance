package com.shakeup.request.video;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shakeup.model.Tag;
import com.shakeup.model.Videos;
import com.shakeup.request.tag.TagCreateRequest;
import com.sun.istack.NotNull;
import lombok.Getter;

import javax.persistence.Column;
import java.util.List;

@Getter
public class VideoCreateRequest {
    @NotNull
    int uid;
    String name;
    @NotNull
    String title;
    @NotNull
    String url;
    @NotNull
    int category;
    boolean isshow;
    String content;
    String thumbnail;
    boolean iscomment;
    int score;
    boolean isscore;
    List<VideoTagRequest> tag;
    int original_vid;

    public Videos toEntity() {
        return Videos.builder()
                .uid(uid)
                .title(title)
                .url(url)
                .category(category)
                .isshow(isshow)
                .content(content)
                .thumbnail(thumbnail)
                .iscomment(iscomment)
                .score(score)
                .isscore(isscore)
                .build();

    }

}
