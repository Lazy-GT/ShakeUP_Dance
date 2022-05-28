package com.shakeup.controller;

import com.shakeup.model.Tag;
import com.shakeup.model.Videos;
import com.shakeup.repository.TagRepository;
import com.shakeup.repository.VideoRepository;
import com.shakeup.request.tag.TagCreateRequest;
import com.shakeup.request.tag.TagDeleteRequest;
import com.shakeup.request.tag.TagSerachRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/tag")
public class TagController {

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private VideoRepository videoRepository;

    @GetMapping(value = "/{tag}")
    public ResponseEntity<?> getTag(@PathVariable String tag) {
        //list에 해당 되는 tag 목록을 가져옴.
        List<Tag> taglist = tagRepository.findByTname(tag);
        List<TagSerachRequest> reslist = new ArrayList<>();

        taglist.forEach(tag1 -> {
            //video ReadRequest가 없어서 임시로 vo객체에 하나씩 다 담음...
            TagSerachRequest tagSerachRequest = new TagSerachRequest();
            tagSerachRequest.setUid(tag1.getVideos().getUid());
            tagSerachRequest.setCategory(tag1.getVideos().getCategory());
            tagSerachRequest.setLike(tag1.getVideos().getLikecnt());
            tagSerachRequest.setIsshow(tag1.getVideos().isIsshow());
            tagSerachRequest.setTitle(tag1.getVideos().getTitle());
            tagSerachRequest.setUrl(tag1.getVideos().getUrl());
            tagSerachRequest.setViews(tag1.getVideos().getViews());
            tagSerachRequest.setVid(tag1.getVideos().getVid());
            tagSerachRequest.setDate(tag1.getVideos().getDate());
            reslist.add(tagSerachRequest);
        });

        return new ResponseEntity<List<TagSerachRequest>>(reslist, HttpStatus.OK);
    }


    @PostMapping(value = "/create")
    //받아야하는 정보, uid -> 해당 사용자인지, vid -> 해당 영상인지, tname -> 생성할 tag 이름
    public ResponseEntity<?> createTag(@RequestBody TagCreateRequest tagCreateRequest) {
        //해당 video 정보가 다 넣어 진 뒤 실행되어야함. 즉, VideosContorller에서 비디오정보db 삽입 작업 끝났을 시 이 메서드를 호출하면 됨.
        //해당 영상을 올린 유저인지 검증.
        Optional<Videos> temp = videoRepository.findByVidAndUid(tagCreateRequest.getVid(), tagCreateRequest.getUid());
        if (!temp.isPresent()) {
            return new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
        }

        for (int i = 0; i < tagCreateRequest.getTname().size(); i++) {
            tagRepository.save(Tag.builder().tname(tagCreateRequest.getTname().get(i)).videos(videoRepository.findByVid(tagCreateRequest.getVid()).get()).build());
        }

        // 성공 실패 반환 후 끝.
        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete")
    @Transactional
    //받아야하는 정보, uid -> 해당 사용자인지, vid -> 해당 영상인지, tname -> 지울 tag 이름
    public ResponseEntity<?> daleteTag(@RequestBody TagDeleteRequest tagDeleteRequest) {
        //해당 정보를 가진 List가  오면 for문을 통해 각각 Repository를 통해서 삭제하는 부분 만들면 된다.
        //해당 영상을 올린 유저인지 검증.
        Optional<Videos> temp = videoRepository.findByVidAndUid(tagDeleteRequest.getVid(), tagDeleteRequest.getUid());
        if (!temp.isPresent()) {
            return new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
        }
        for (int i = 0; i < tagDeleteRequest.getTname().size(); i++) {
            tagRepository.deleteByTnameAndVideosVid(tagDeleteRequest.getTname().get(i), tagDeleteRequest.getVid());
        }

        //성공 실패 반환 후 끝.

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }
}
