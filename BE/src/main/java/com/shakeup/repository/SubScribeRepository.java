package com.shakeup.repository;

import com.shakeup.model.Subscribe;
import com.shakeup.repository.mapping.FollowMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface SubScribeRepository extends JpaRepository<Subscribe, Long> {
    Optional<Subscribe> findByCuruidAndTargetuid(int curuid, int targetuid);

    @Query("select v as video ,u.profile as profile, u.name as name " +
            "from Subscribe s " +
            "left join Videos v " +
            "on s.targetuid=v.uid " +
            "left join Users u " +
            "on u.uid=v.uid " +
            "where s.curuid=:curuid " +
            "order by v.date DESC")
    List<FollowMapping> findVideoAndprofileAndName(@Param("curuid") int curuid);

    @Query("select count(s.targetuid)" +
            "FROM Subscribe s " +
            "where s.targetuid=:targetuid")
    long findCountByUid(@Param("targetuid") int targetuid);
}
