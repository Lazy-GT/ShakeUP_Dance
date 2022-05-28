package com.shakeup.request.tag;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class TagCreateRequest {
    private int uid;
    private Long vid;
    private List<String> tname;
}
