package com.shakeup.repository;

import com.shakeup.model.WorldCup;
import com.shakeup.repository.mapping.CupMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WorldCupRepository extends JpaRepository<com.shakeup.model.WorldCup,Long> {
    List<WorldCup> findByVideos2UsersUid(long uid);
    List<WorldCup> findByCupid(int cupid);

    @Query(value = "select distinct cupid as cupid,cupname as cupname from WorldCup ")
    List<CupMapping> findCupidAndCupname();
}
