package com.green.team3_app.patie.vo;

import lombok.Data;

import java.util.List;

@Data
public class ReceivePatieVO {
    private String patieName;
    private List<String> patieBirth;
    private List<String> patieTel;
    private List<String> patieAddr;
}
