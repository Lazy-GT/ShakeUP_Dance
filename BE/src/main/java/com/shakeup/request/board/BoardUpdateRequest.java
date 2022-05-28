package com.shakeup.request.board;

import com.shakeup.model.Board;
import com.sun.istack.NotNull;
import lombok.Getter;

@Getter
public class BoardUpdateRequest {
    long bid;
    @NotNull
    int category;
    @NotNull
    String title;
    @NotNull
    String content;
    String url;

    public Board toEntity(){
        return  Board.builder()
                .bid(bid)
                .category(category)
                .title(title)
                .content(content)
                .url(url)
                .build();

    }
}
