package com.green.team3_app.patie.service;

import com.green.team3_app.patie.vo.PatieVO;

import java.util.List;

public interface PatieService {

    //다음에 들어간 환자번호 조회
    int getNextPatieNum();

    /*초진 환자 전용*/
    void insertPatie(PatieVO patieVO);

    /*초진 환자 접수 취소*/
    void delFirPatie(int patieNum);

    /*재진 환자 정보 찾기*/
    List<PatieVO> findRePatie(PatieVO patieVO);


}
