package com.shakeup.request.video;

import com.shakeup.model.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoAndUidResponse {

    private long vid;

    private int uid;
    private String title;
    private int likecnt;
    private int views;
    private String url;
    private boolean isshow;
    private int category;
    private String thumbnail;
    private LocalDateTime date;
    private String content;
    private boolean iscomment;
    private int score;
    private boolean isscore;
    private String name;
}
