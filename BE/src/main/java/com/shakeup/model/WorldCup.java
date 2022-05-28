package com.shakeup.model;

import com.shakeup.request.cup.CupRateResponse;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "worldcup_ranking")
public class WorldCup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;//고유 id

    @OneToOne
    @JoinColumn(name = "vid")
    private VideosTwo videos2;// join vid with videos2
    @Column(name = "cup_id")
    private int cupid;// cup_id
    @Column(name = "cup_name")
    private String cupname;

    public CupRateResponse toEntity() {
        return CupRateResponse.builder().videos2(videos2)
                .cupid(cupid)
                .cupname(cupname)
                .build();
    }
}
