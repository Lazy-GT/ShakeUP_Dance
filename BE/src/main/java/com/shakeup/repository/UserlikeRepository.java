package com.shakeup.repository;


import com.shakeup.model.Userlike;
import com.shakeup.model.Videos;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserlikeRepository extends JpaRepository<Userlike, Long> {

    List<Userlike> findByUid(int uid);
    Optional<Userlike> findByUidAndVideosVid(int uid, long vid);
    Optional<Userlike> deleteByUidAndVideosVid(int uid, long vid);
}
