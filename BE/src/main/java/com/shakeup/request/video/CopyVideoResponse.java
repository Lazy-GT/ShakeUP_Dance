package com.shakeup.request.video;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class CopyVideoResponse {
    private long vid;

    private int uid;
    private String title;
    private int likecnt; //좋아요 수
    private int views; //조회 수
    private String url; //영상 url
    private boolean isshow; //공개 여부, DB의 tinyint는 0과 1로 반환되기 때문에 boolean이 아니라 int로 잡았다(0:false, 1:true)
    private int category;//0 : 일반 영상, 1 : 댄스 따라하기 영상, 2: 유저가 따라한 영상
    private String thumbnail; //사진 url
    private LocalDateTime date;
    private String content;
    private boolean iscomment;
    private int score;
    private boolean isscore;
    private String profile;
}
