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

    @Column(name = "image_type_code")
    private String imageTypeCode;

    @Column(name = "parent_no")
    private Integer parentNo;

    @Column(name = "image_url")
    private String imageUrl;

    @Builder
    public Image(String imageTypeCode, Integer parentNo, String imageUrl) {
        this.imageTypeCode = imageTypeCode;
        this.parentNo = parentNo;
        this.imageUrl = imageUrl;
    }

}
