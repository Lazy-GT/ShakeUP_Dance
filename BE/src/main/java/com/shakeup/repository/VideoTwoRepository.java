package com.shakeup.repository;

import com.shakeup.model.VideosTwo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VideoTwoRepository extends JpaRepository<VideosTwo, Long> {
    Optional<VideosTwo> findByVid(long vid);
}
