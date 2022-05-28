package com.shakeup.repository;

import com.shakeup.model.Tag;
import com.shakeup.model.Videos;
import com.shakeup.request.tag.TagSerachRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findByTname(String tname);
    Optional<Tag> findByVideosUidAndVideosVid(int uid,Long vid);
    Optional<Tag> deleteByTnameAndVideosVid(String tname,Long vid);
}
