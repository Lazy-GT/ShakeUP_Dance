package com.shakeup.controller;

import com.shakeup.model.Subscribe;
import com.shakeup.repository.SubScribeRepository;
import com.shakeup.repository.mapping.FollowMapping;
import com.shakeup.request.subscribe.SubscribeRequest;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/sub")
public class SubscribeController {

    @Autowired
    private SubScribeRepository subScribeRepository;

    @PostMapping("/follow")
    public ResponseEntity<?> createFollow(@RequestBody SubscribeRequest subscribeRequest) {

        Optional<Subscribe> isuser = subScribeRepository.findByCuruidAndTargetuid(subscribeRequest.getCuruid(), subscribeRequest.getTargetuid());

        if (!isuser.isPresent()) {
            subScribeRepository.save(Subscribe.builder().curuid(subscribeRequest.getCuruid()).targetuid(subscribeRequest.getTargetuid()).build());
            return new ResponseEntity<>("성공", HttpStatus.OK);
        }
        return new ResponseEntity<>("실패", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/isfollow")
    public ResponseEntity<?> checkFollow(@RequestBody SubscribeRequest subscribeRequest) {
        Optional<Subscribe> isuser = subScribeRepository.findByCuruidAndTargetuid(subscribeRequest.getCuruid(), subscribeRequest.getTargetuid());

        if (isuser.isPresent()) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.OK);
    }

    @DeleteMapping(value = "/unfollow/{curuid}/{targetuid}")
    @Transactional
    public ResponseEntity<?> deleteFollow(@PathVariable int curuid, @PathVariable int targetuid) {
        Optional<Subscribe> isuser = subScribeRepository.findByCuruidAndTargetuid(curuid, targetuid);

        if (isuser.isPresent()) {
            subScribeRepository.delete(isuser.get());
            return new ResponseEntity<>("성공", HttpStatus.OK);
        }
        return new ResponseEntity<>("실패", HttpStatus.BAD_REQUEST);
    }

    //팔로우한 사람들의 영상 목록 반환 api

    @GetMapping("/read/follow/{curuid}")
    @ApiOperation(value = "현재 유저가 구독 중인 사람의 영상을 날짜 기준으로 내림차순 하여 구독 중인 사람의 정보 및 비디오 정보가 반환된다.")
    public ResponseEntity<?> getListSubScribe(@PathVariable int curuid) {

        List<FollowMapping> list = subScribeRepository.findVideoAndprofileAndName(curuid);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/count/{targetuid}")
    @ApiOperation(value = "target 유저의 uid를 통해서 구독자 수를 반환한다.")
    public ResponseEntity<?> get(@PathVariable int targetuid) {

        long follow_cnt = subScribeRepository.findCountByUid(targetuid);

        return new ResponseEntity<>(follow_cnt, HttpStatus.OK);
    }
}
