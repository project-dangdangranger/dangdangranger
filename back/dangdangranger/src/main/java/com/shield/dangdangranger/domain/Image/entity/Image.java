package com.shield.dangdangranger.domain.Image.entity;

import com.shield.dangdangranger.global.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "image_info")
public class Image extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_no")
    private Integer imageNo;

    @Column(name = "image_type_no")
    private Integer imageTypeNo;

    @Column(name = "parent_no")
    private Integer parentNo;

    @Column(name = "image_url")
    private String imageUrl;

    @Builder
    public Image(Integer imageTypeNo, Integer parentNo, String imageUrl) {
        this.imageTypeNo = imageTypeNo;
        this.parentNo = parentNo;
        this.imageUrl = imageUrl;
    }

}
