package com.shakeup.controller;

import com.shakeup.model.WorldCup;
import com.shakeup.repository.mapping.CupMapping;
import com.shakeup.repository.UserRepository;
import com.shakeup.repository.VideoTwoRepository;
import com.shakeup.repository.WorldCupRepository;
import com.shakeup.request.cup.CupRateResponse;
import com.shakeup.request.cup.CupRequestBody;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RequestMapping("/cup")
@RestController
public class CupController {

    @Autowired
    private VideoTwoRepository videoTwoRepository;
    @Autowired
    private WorldCupRepository worldCupRepository;
    @Autowired
    private UserRepository userRepository;

    @ApiOperation(value = "해당 vid List를 통해서 월드컵 생성.")
    @PostMapping(value = "/create")
    public ResponseEntity<?> createCup(@RequestBody CupRequestBody cupRequestBody) {

        try {
            for (long request : cupRequestBody.getVid()) {
                WorldCup temp = WorldCup.builder().cupid(cupRequestBody.getCup_id()).cupname(cupRequestBody.getCup_name()).videos2(videoTwoRepository.findByVid(request).get()).build();

                worldCupRepository.save(temp);
            }
            return new ResponseEntity<>("성공", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }


        return new ResponseEntity<>("실패", HttpStatus.BAD_REQUEST);
    }

    @ApiOperation(value = "현재 유저의 uid를 통해 현재 유저가 참여한 월드컵의 기록을 볼 수 있음.")
    @GetMapping(value = "/read/{uid}")
    public ResponseEntity<?> readUserInfo(@PathVariable long uid) {

        try {
            List<WorldCup> res = worldCupRepository.findByVideos2UsersUid(uid);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
    }

    @ApiOperation(value = "cup_id를 통해서 해당 월드컵의 목록과 승률을 볼 수 있음.")
    @GetMapping(value = "/list/{cupuid}")
    public ResponseEntity<?> readCupList(@PathVariable int cupuid) {

        try {
            List<WorldCup> temp = worldCupRepository.findByCupid(cupuid);
            List<CupRateResponse> res = new ArrayList<>();
            for (WorldCup wc : temp) {
                CupRateResponse cupRateResponse = wc.toEntity();
                float rate = ((float) cupRateResponse.getVideos2().getClickcnt() / (float) cupRateResponse.getVideos2().getExposecnt()) * 100;
                if (rate == 0) {
                    cupRateResponse.setRate(0);
                } else {
                    cupRateResponse.setRate(rate);
                }
                res.add(cupRateResponse);
            }
            res.sort((o1, o2) -> (int) (o2.getRate() - o1.getRate()));
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
    }

    @ApiOperation(value = "현재 진행중인 월드컵 List 보기")
    @GetMapping(value = "/list")
    public ResponseEntity<?> nowCupList() {

        List<CupMapping> res = worldCupRepository.findCupidAndCupname();

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}
