package com.shakeup.request.cup;

import com.shakeup.model.VideosTwo;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Builder
@Setter
@Getter
public class CupRateResponse {
    private VideosTwo videos2;
    private int cupid;
    private String cupname;
    private float rate;
}
