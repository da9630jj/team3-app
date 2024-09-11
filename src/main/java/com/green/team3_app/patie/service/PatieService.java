package com.green.team3_app.patie.service;

import com.green.team3_app.patie.vo.PatieVO;

import java.util.List;

public interface PatieService {

    //다음에 들어간 환자번호 조회
    int getNextPatieNum();

    /*첫방문 환자등록*/
    void insertPatie(PatieVO patieVO);



}