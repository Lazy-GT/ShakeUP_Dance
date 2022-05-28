package com.shakeup.request.cup;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CupRequestBody {
    private List<Long> vid;
    private int cup_id;
    private String cup_name;
}
