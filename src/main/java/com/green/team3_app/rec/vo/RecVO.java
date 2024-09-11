package com.green.team3_app.rec.vo;

import com.green.team3_app.patie.vo.PatieVO;
import lombok.Data;

@Data
public class RecVO {
    private int recNum;
    private String recDate;
    private String recEDate;
    private String isRec;
    private String recStatus;
    private String recDetail;
    private int patieNum;
    private int staffNum;
    private String color;
    private String personalYN;
    private PatieVO patieVO;

}
