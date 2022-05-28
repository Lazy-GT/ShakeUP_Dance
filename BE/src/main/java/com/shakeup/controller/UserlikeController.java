package com.shakeup.controller;

import com.shakeup.model.Userlike;
import com.shakeup.model.Users;
import com.shakeup.model.Videos;
import com.shakeup.repository.UserRepository;
import com.shakeup.repository.UserlikeRepository;
import com.shakeup.repository.VideoRepository;
import com.shakeup.request.userlike.UserlikeCreateRequest;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RequestMapping("/userlike")
@RestController
public class UserlikeController {
    @Autowired
    private UserlikeRepository userlikeRepository;

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private UserRepository userRepository;

    @ApiOperation(value = "나의 좋아요 리스트 불러오기")
    @PostMapping(value = "/read/{uid}")
    public List<Userlike> createUserlike(@PathVariable("uid") int uid) {
        List<Userlike> res = userlikeRepository.findByUid(uid);
        for (Userlike r : res) {
            System.out.println(r.toString());
        }
        return res;
    }

    @ApiOperation(value = "해당 게시물 좋아요 하기. 반환 값은 성공 시 true, 실패시 false")
    @PostMapping(value = "/like")
    public ResponseEntity<?> likeVideo(@RequestBody UserlikeCreateRequest userlikeCreateRequest) {

        //중복 체크 안했넹...
        Optional<Userlike> userlike = userlikeRepository.findByUidAndVideosVid(userlikeCreateRequest.getUid(), userlikeCreateRequest.getVid());

        if (userlike.isPresent()) {
            return new ResponseEntity<>("이미 좋아요 한 영상입니다.", HttpStatus.OK);
        }

        Optional<Users> users = userRepository.findByUid(userlikeCreateRequest.getUid());
        if (!users.isPresent()) {
            return new ResponseEntity<>("해당 유저의 아이디가 없습니다.", HttpStatus.BAD_REQUEST);
        }

        try {
            Optional<Videos> videos = videoRepository.findByVid(userlikeCreateRequest.getVid());
            if (videos.isPresent()) {
                videos.get().setLikecnt(videos.get().getLikecnt() + 1);
                videoRepository.save(videos.get());
                userlikeRepository.save(Userlike.builder().uid(userlikeCreateRequest.getUid()).videos(videos.get()).build());
                return new ResponseEntity<>(true, HttpStatus.OK);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(false, HttpStatus.OK);
    }

    @ApiOperation(value = "해당 게시물 좋아요 취소 하기. 반환 값은 성공 시 true, 실패시 false")
    @DeleteMapping(value = "/like")
    @Transactional
    public ResponseEntity<?> unlikeVideo(@RequestBody UserlikeCreateRequest userlikeCreateRequest) {

        Optional<Users> users = userRepository.findByUid(userlikeCreateRequest.getUid());
        if (!users.isPresent()) {
            return new ResponseEntity<>("해당 유저의 아이디가 없습니다.", HttpStatus.BAD_REQUEST);
        }

        try {
            if (!userlikeRepository.findByUidAndVideosVid(userlikeCreateRequest.getUid(), (int) userlikeCreateRequest.getVid()).isPresent()) {
                return new ResponseEntity<>("이미 취소된 좋아요입니다.", HttpStatus.OK);
            }
            Optional<Videos> videos = videoRepository.findByVid(userlikeCreateRequest.getVid());
            if (videos.isPresent()) {
                videos.get().setLikecnt(videos.get().getLikecnt() - 1);
                videoRepository.save(videos.get());
            }
            userlikeRepository.deleteByUidAndVideosVid(userlikeCreateRequest.getUid(), (int) userlikeCreateRequest.getVid());
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(false, HttpStatus.OK);
    }


}
