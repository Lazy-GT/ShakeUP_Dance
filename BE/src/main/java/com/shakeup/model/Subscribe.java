package com.shakeup.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@ToString
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Subscribe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ssid;

    @Column(name = "uid")
    private int curuid;

    @Column(name = "subid")
    private int targetuid;

    private LocalDateTime date;

    @PrePersist
    public void createAt() {
        this.date = LocalDateTime.now();
    }
}
