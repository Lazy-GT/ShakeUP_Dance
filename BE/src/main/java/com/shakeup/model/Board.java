package com.shakeup.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="bid",columnDefinition = "INT")
    private long bid;

    private int category;
    private String title;
    private String content;
    private String url;
    private int uid;
    private LocalDateTime date;

    @PrePersist
    public void createAt() {
        this.date = LocalDateTime.now();
    }

}
