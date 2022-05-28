package com.shakeup.repository;

import com.shakeup.model.CopyVideo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CopyVideoRepository extends JpaRepository<CopyVideo, Long> {
    List<CopyVideo> findByCopyUidAndCopy_Category(int uid,int category);
}
