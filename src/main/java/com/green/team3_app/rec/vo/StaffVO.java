package com.green.team3_app.rec.vo;

import com.green.team3_app.rec.vo.PartVO;
import lombok.Data;

@Data
public class StaffVO {
    private int staffNum;
    private String staffName;
    private String staffRole;
    private String staffBirth;
    private String staffTel;
    private String staffAddr;
    private String staffId;
    private String staffPw;
    private String staffGen;
    private String hireDate;
    private int partNum;
    private PartVO part;
}
