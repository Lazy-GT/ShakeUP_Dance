package com.shakeup.controller;


import com.shakeup.model.Board;
import com.shakeup.request.board.BoardCreateRequest;
import com.shakeup.request.board.BoardReadRequest;
import com.shakeup.request.board.BoardUpdateRequest;
import com.shakeup.service.BoardService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("*")
@RequestMapping("/board")
@RestController
public class BoardController {

    @Autowired
    BoardService boardService;

    public static final Logger logger = LoggerFactory.getLogger(BoardController.class);

    @ApiOperation(value = "게시판 생성", notes = "게시판 정보(uid,카테고리, 제목, 내용,사진 url)를 받는다. 게시판 생성 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping(value = "/create")
    public ResponseEntity<String> createBoard(@RequestBody BoardCreateRequest boardCreateRequest){
        String res = boardService.createBoard(boardCreateRequest);

        if (res.equals("fail")) {
            return new ResponseEntity<>("게시판 실패", HttpStatus.OK);
        }
        return new ResponseEntity<>("게시판 생성", HttpStatus.OK);

    }

    @ApiOperation(value = "게시판 수정", notes = "게시판 정보(카테고리, 제목, 내용,사진 url)를 받는다. 게시판 수정 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PutMapping(value = "/updaete")
    public ResponseEntity<String> updateBoard(@RequestBody BoardUpdateRequest boardUpdateRequest){
        String res = boardService.updateBoard(boardUpdateRequest);

        if (res.equals("fail")) {
            return new ResponseEntity<>("수정 실패", HttpStatus.OK);
        }
        return new ResponseEntity<>("수정 생성", HttpStatus.OK);

    }
    @ApiOperation(value = "게시판 카테고리 리스트 가져오기", notes = "게시판 bid, category로 리스트 가져온다. 읽어온 값을 반환", response = String.class)
    @PostMapping(value = "/list")
    public ResponseEntity<Board> readBoard(@RequestBody BoardReadRequest boardReadRequest){
        Optional<Board> res = boardService.readBoard(boardReadRequest);


        return new ResponseEntity<Board>(res.get(), HttpStatus.OK);
    }


    @ApiOperation(value = "게시판 삭제", notes = "게시판 bid로 삭제,게시판 삭제 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다", response = String.class)
    @DeleteMapping(value = "/delete/{bid}")
    public ResponseEntity<String> deleteBoard(@PathVariable("bid") long bid){
        String res = boardService.deleteBoard(bid);

        if (res.equals("fail")) {
            return new ResponseEntity<>("게시글 삭제 실패", HttpStatus.OK);
        }
        return new ResponseEntity<>("게시글 삭제 생성", HttpStatus.OK);
    }
}
