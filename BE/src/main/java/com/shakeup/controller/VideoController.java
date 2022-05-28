package com.shakeup.controller;

import com.shakeup.model.CopyVideo;
import com.shakeup.model.Userlike;
import com.shakeup.model.Videos;
import com.shakeup.repository.CopyVideoRepository;
import com.shakeup.repository.UserlikeRepository;
import com.shakeup.request.userlike.UserlikeCreateRequest;
import com.shakeup.model.Users;
import com.shakeup.repository.UserRepository;
import com.shakeup.repository.VideoRepository;
import com.shakeup.request.video.*;
import com.shakeup.service.VideoService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RequestMapping("/video")
@RestController
public class VideoController {

    @Autowired
    private VideoService videoService;
    @Autowired
    private VideoRepository videoRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CopyVideoRepository copyVideoRepository;
    @Autowired
    private UserlikeRepository userlikeRepository;

    public static final Logger logger = LoggerFactory.getLogger(VideoController.class);

    @ApiOperation(value = "영상 생성", notes = "영상 정보를 받는다. 게시판 생성 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping(value = "/create")
    public ResponseEntity<String> createVideo(@RequestBody VideoCreateRequest videoCreateRequest) {
        String res = videoService.createVideo(videoCreateRequest);

        if (res.equals("fail")) {
            return new ResponseEntity<>("실패", HttpStatus.OK);
        }
        return new ResponseEntity<>("성공", HttpStatus.OK);

    }

    // TODO 클릭수, likecnt 컬럼 추가
    @ApiOperation(value = "영상 수정", notes = "영상 정보를 받는다. 게시판 수정 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PutMapping(value = "/update")
    public ResponseEntity<String> updateVideo(@RequestBody VideoUpdateRequest videoUpdateRequest) {
        String res = videoService.upadateVideo(videoUpdateRequest);

        if (res.equals("fail")) {
            return new ResponseEntity<>("실패", HttpStatus.OK);
        }
        return new ResponseEntity<>("성공", HttpStatus.OK);
    }

    @ApiOperation(value = "영상 삭제", notes = "영상 정보를 받는다. 게시판 삭제 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping(value = "/delete/{vid}")
    public ResponseEntity<String> deleteVideo(@PathVariable("vid") long vid) {
        String res = videoService.deleteVideos(vid);

        if (res.equals("fail")) {
            return new ResponseEntity<>("실패", HttpStatus.OK);
        }
        return new ResponseEntity<>("성공", HttpStatus.OK);
    }


    @ApiOperation(value = "영상 전체 가져오기", notes = "영상 정보를 받는다.", response = String.class)
    @PostMapping(value = "/read/all")
    public ResponseEntity<List<Videos>> readAllVideo() {
        List<Videos> res = videoService.readAllVideo();
        return new ResponseEntity<List<Videos>>(res, HttpStatus.OK);
    }

    // TODO 클릭수추가 및 uid의 name(채널명) 추가
    @ApiOperation(value = "전체 영상 카테고리 별  가져오기", notes = "영상 정보를 받는다.", response = String.class)
    @PostMapping(value = "/read/category/{category}")
    public ResponseEntity<List<Videos>> readCategoryVideo(@PathVariable("category") int category) {
        List<Videos> res = videoService.readCategoryVideo(category);

        return new ResponseEntity<List<Videos>>(res, HttpStatus.OK);
    }

    @ApiOperation(value = "나의 영상 카테고리별로 가져오기", notes = "영상 정보를 받는다.", response = String.class)
    @PostMapping(value = "/read/mycategory")
    public ResponseEntity<List<?>> readMyCategoryVideo(@RequestBody VideoMyCategoryRequest videoMyCategoryRequest) {
        List<Videos> res = videoService.readMyCategoryVideo(videoMyCategoryRequest); // 나의 영상 가져오기

        if (videoMyCategoryRequest.getCategory() == 0) {
            List<CopyVideo> res2 = copyVideoRepository.findByCopyUidAndCopy_Category(videoMyCategoryRequest.getUid(),videoMyCategoryRequest.getCategory());

            for (CopyVideo temp : res2) {
                Users user_temp = userRepository.findByUid(temp.getOriginal().getUid()).get();
                temp.setOrigin_name(user_temp.getName());
                temp.setOrigin_profile(user_temp.getProfile());
            }

            res2.sort((o1, o2) -> o2.getCopy().getDate().compareTo(o1.getCopy().getDate())); // 최신 날짜 순으로 정렬

            return new ResponseEntity<List<?>>(res2, HttpStatus.OK);
        }

        return new ResponseEntity<List<?>>(res, HttpStatus.OK);
    }

    @GetMapping(value = "/{uid}")
    public ResponseEntity<?> myBestScore(@PathVariable int uid) {
        Optional<Videos> res = videoRepository.findFirstByUidAndCategoryOrderByScoreDesc(uid, 0);
        VideoAndUidResponse videoAndUidResponse = res.get().toEntity();
        videoAndUidResponse.setName(userRepository.findByUid(uid).get().getName());

        if (res.isPresent()) {
            return new ResponseEntity<>(videoAndUidResponse, HttpStatus.OK);
        }

        return new ResponseEntity<>("실패", HttpStatus.OK);
    }

    @ApiOperation(value = "해당 유저의 uid로 영상 전체 가져오기", notes = "영상 정보를 받는다.", response = String.class)
    @GetMapping(value = "/read/all/{uid}")
    public ResponseEntity<?> readMyAllVideo(@PathVariable int uid) {
        List<Videos> temp = videoRepository.findByUid(uid);

        return new ResponseEntity<List<Videos>>(temp, HttpStatus.OK);
    }

    @ApiOperation(value = "나의 좋아요 가져오기", notes = "영상 정보를 받는다.", response = String.class)
    @PostMapping(value = "/read/mylike")
    public ResponseEntity<List<Videos>> readMylikeVideo(@RequestBody UserlikeCreateRequest userlikeCreateRequest) {
        List<Videos> res = videoService.readMylikeVideo(userlikeCreateRequest);

        return new ResponseEntity<List<Videos>>(res, HttpStatus.OK);
    }

    @ApiOperation(value = "영상 하나 가져오기", notes = "curuid -> 현재 로그인한 유저 id, vid -> 찾고자 하는 영상", response = String.class)
    @GetMapping(value = "/read/{curuid}/{vid}")
    public ResponseEntity<?> readVideo(@PathVariable("vid") int vid, @PathVariable int curuid) {

        Optional<Videos> temp = videoRepository.findByVid(vid);
        Users users = userRepository.findByUid(temp.get().getUid()).get();
        if (temp.isPresent()) {
            Videos videos = temp.get();
            VideoFindResponse videoFindResponse = new VideoFindResponse();
            videoFindResponse.setVid(videos.getVid());
            videoFindResponse.setTitle(videos.getTitle());
            videoFindResponse.setThumbnail(videos.getThumbnail());
            videoFindResponse.setUrl(videos.getUrl());
            videoFindResponse.setProfile(users.getProfile());
            if (userlikeRepository.findByUidAndVideosVid(curuid, vid).isPresent()) {
                videoFindResponse.setIslike(true);
            }
            temp.get().setViews(temp.get().getViews() + 1);
            videoRepository.save(temp.get());
            return new ResponseEntity<VideoFindResponse>(videoFindResponse, HttpStatus.OK);
        }

        return new ResponseEntity<>("fail", HttpStatus.OK);
    }

    @ApiOperation(value = "해당 vid의 click 수를 +1 해주는 api")
    @PutMapping(value = "/click/{vid}")
    public ResponseEntity<?> plusClick(@PathVariable long vid) {
        Optional<Videos> videos = videoRepository.findByVid(vid);
        if (videos.isPresent()) {
            Videos temp = videos.get();
            temp.setClickcnt(temp.getClickcnt() + 1);
            videoRepository.save(temp);
            return new ResponseEntity<>("click+1 성공", HttpStatus.OK);
        }
        return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
    }

    @ApiOperation(value = "해당 vid의 expose 수를 +1 해주는 api")
    @PutMapping(value = "/expose/{vid}")
    public ResponseEntity<?> plusExpose(@PathVariable long vid) {
        Optional<Videos> videos = videoRepository.findByVid(vid);
        if (videos.isPresent()) {
            Videos temp = videos.get();
            temp.setExposecnt(temp.getExposecnt() + 1);
            videoRepository.save(temp);
            return new ResponseEntity<>("expose+1 성공", HttpStatus.OK);
        }
        return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
    }
}
