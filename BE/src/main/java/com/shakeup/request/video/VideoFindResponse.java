package com.shakeup.request.video;

import com.shakeup.model.Videos;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VideoFindResponse {
    String url;//url
    long vid;//vid
    String title;//title
    String thumbnail;//thumbnail
    String profile;//profile
    @Builder.Default
    boolean islike = false;
}
