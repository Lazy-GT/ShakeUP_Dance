package com.shakeup.request.board;

import com.shakeup.model.Board;
import com.sun.istack.NotNull;
import lombok.Getter;

@Getter
public class BoardReadRequest {
    long bid;
    @NotNull
    int category;

    public Board toEntity(){
        return  Board.builder()
                .bid(bid)
                .category(category)
                .build();

    }
}
