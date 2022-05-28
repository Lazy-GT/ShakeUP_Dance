package com.shakeup.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Userlike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ulid",columnDefinition = "INT")
    @JsonIgnore
    private long ulid;

    private int uid;

    @ManyToOne
    @JoinColumn(name = "vid")
    private Videos videos;

    private LocalDateTime date;

    @PrePersist
    public void createAt() {
        this.date = LocalDateTime.now();
    }
}
