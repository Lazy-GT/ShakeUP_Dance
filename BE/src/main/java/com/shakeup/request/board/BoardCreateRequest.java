package com.shakeup.request.board;

import com.shakeup.model.Board;
import com.shakeup.model.Users;
import com.sun.istack.NotNull;
import lombok.Getter;

@Getter
public class BoardCreateRequest {
    @NotNull
    int uid;
    @NotNull
    int category;
    @NotNull
    String title;
    @NotNull
    String content;
    String url;

    public Board toEntity(){
       return  Board.builder()
               .uid(uid)
               .category(category)
               .title(title)
               .content(content)
               .url(url)
               .build();

    }


}
