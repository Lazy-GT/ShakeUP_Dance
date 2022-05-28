package com.shakeup.model;


import lombok.*;

import javax.persistence.*;
import java.util.Comparator;

@Entity
@Data
@Table(name = "copy_video")
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class CopyVideo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int copyid;

    @ManyToOne
    @JoinColumn(name = "original_vid")
    private Videos original;

    @ManyToOne
    @JoinColumn(name = "copy_vid")
    private Videos copy;

    private String origin_profile;
    private String origin_name;

    private int uid;


}
