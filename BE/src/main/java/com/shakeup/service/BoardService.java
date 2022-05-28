package com.shakeup.service;


import com.shakeup.model.Board;
import com.shakeup.model.Users;
import com.shakeup.repository.BoardRepository;
import com.shakeup.request.board.BoardCreateRequest;
import com.shakeup.request.board.BoardReadRequest;
import com.shakeup.request.board.BoardUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BoardService {

    @Autowired
    BoardRepository boardRepository;


    public String createBoard(BoardCreateRequest boardCreateRequest) {
        Board tempboard = boardCreateRequest.toEntity();
        try {
            boardRepository.save(tempboard);
            return "success";
        } catch (Exception e) {
            return "fail";
        }
    }

    public String updateBoard(BoardUpdateRequest boardUpdateRequest) {
        Board tempboard = boardUpdateRequest.toEntity();
        Optional<Board> board = boardRepository.findBoardByBid(tempboard.getBid());

        if (board.isPresent()) {
            board.get().setCategory(tempboard.getCategory());
            board.get().setContent(tempboard.getContent());
            board.get().setTitle(tempboard.getTitle());
            board.get().setUrl(tempboard.getUrl());

            boardRepository.save(board.get());
            return "success";
        }
        return "fail";
    }

    //카테리고별로 읽어 온다.
    public Optional<Board> readBoard(BoardReadRequest boardReadRequest) {
        Board tempboard = boardReadRequest.toEntity();

        try {
            Optional<Board> brr = boardRepository.findBoardByBidAndCategory(tempboard.getBid(), tempboard.getCategory());
            System.out.println("DB에서 게시판 카테고리 정보 가져오기 성공");
            return brr;
        } catch (Exception e) {
            System.out.println("DB에서 게시판 카테고리 정보 가져오기 실패: " + e);
            return null;
        }

    }
    public String deleteBoard(long bid){
        Optional<Board> board = boardRepository.findById(bid);

        if (board.isPresent()) {
            boardRepository.deleteById(board.get().getBid());
            return "success";
        }
        return "fail";

    }
}
