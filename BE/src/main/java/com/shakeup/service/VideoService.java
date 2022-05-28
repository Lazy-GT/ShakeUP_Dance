package com.shakeup.service;

import com.shakeup.model.CopyVideo;
import com.shakeup.model.Tag;
import com.shakeup.model.Userlike;
import com.shakeup.model.Videos;
import com.shakeup.repository.CopyVideoRepository;
import com.shakeup.repository.TagRepository;
import com.shakeup.repository.UserRepository;
import com.shakeup.repository.VideoRepository;
import com.shakeup.request.userlike.UserlikeCreateRequest;
import com.shakeup.request.video.VideoCreateRequest;
import com.shakeup.request.video.VideoMyCategoryRequest;
import com.shakeup.request.video.VideoUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private CopyVideoRepository copyVideoRepository;
    @Autowired
    private UserRepository userRepository;

    //영상 DB저장
    public String createVideo(VideoCreateRequest videoCreateRequest) {
        Videos temp = videoCreateRequest.toEntity();
        try {
            long vid = videoRepository.save(temp).getVid();


            for (int i = 0; i < videoCreateRequest.getTag().get(0).getTname().size(); i++) {
                tagRepository.save(Tag.builder()
                        .tname(videoCreateRequest.getTag().get(0).getTname().get(i))
                        .videos(videoRepository.findByVid(vid).get()).build());
            }

            if (videoCreateRequest.getCategory() == 0) {
                copyVideoRepository.save(CopyVideo.builder()
                        .original(videoRepository.findByVid(videoCreateRequest.getOriginal_vid()).get())
                        .copy(videoRepository.findByVid(vid).get())
                        .uid(videoCreateRequest.getUid())
                        .build()
                );
            }


            return "success";
        } catch (Exception e) {
            return "fail";
        }

    }

    public String upadateVideo(VideoUpdateRequest videoUpdateRequest) {
        Videos temp = videoUpdateRequest.toEntity();
        Optional<Videos> video = videoRepository.findVideosByVid(temp.getVid());

        if (video.isPresent()) {
            video.get().setTitle(temp.getTitle());
            video.get().setUrl(temp.getUrl());
            video.get().setCategory(temp.getCategory());
            video.get().setIsshow(temp.isIsshow());
            video.get().setThumbnail(temp.getThumbnail());
            video.get().setIscomment(temp.isIscomment());
            video.get().setIsscore(temp.isIsscore());
            video.get().setClickcnt(temp.getClickcnt());
            video.get().setExposecnt(temp.getExposecnt());

            videoRepository.save(video.get());

            return "success";
        }
        return "fail";
    }

    public String deleteVideos(long vid) {
        Optional<Videos> video = videoRepository.findVideosByVid(vid);

        if (video.isPresent()) {
            videoRepository.deleteById(video.get().getVid());
            return "success";
        }
        return "fail";
    }

    //전체 영상 가져오기
    public List<Videos> readAllVideo() {
        try {
            List<Videos> video = videoRepository.findAll();
            System.out.println("DB에서 영상 정보 가져오기 성공");
            return video;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public List<Videos> readCategoryVideo(int category) {
        try {
            List<Videos> video = videoRepository.findVideosByCategory(category);
            for (Videos v : video
            ) {
                v.setName(userRepository.findByUid(v.getUid()).get().getName());
            }
            System.out.println("DB에서 영상 정보 가져오기 성공");
            return video;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }

    }

    public Optional<Videos> readOneVideo(long vid) {
        try {
            Optional<Videos> video = videoRepository.findVideosByVid(vid);
            System.out.println("DB에서 영상 정보 가져오기 성공");
            return video;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public List<Videos> readMyCategoryVideo(VideoMyCategoryRequest videoMyCategoryRequest) {
        Videos temp = videoMyCategoryRequest.toEntity();
        try {
            List<Videos> video = videoRepository.findVideosByUidAndCategory(temp.getUid(), temp.getCategory());
            System.out.println("DB에서 영상 정보 가져오기 성공");
            return video;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }

    }

    public List<Videos> readMylikeVideo(UserlikeCreateRequest userlikeCreateRequest) {


        return null;
    }
    //Read를 하는데..... 어떡하지 그냥 카테고리만 입력 받고 하면 될려나?

}
