package com.shakeup.request.tag;

import lombok.Data;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
public class TagSerachRequest {
    private Long vid;
    private int uid;
    private String title;
    private int like;
    private int views;
    private String url;
    private boolean isshow;
    private int category;
    private LocalDateTime date;

}
