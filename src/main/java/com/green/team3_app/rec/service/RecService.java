package com.green.team3_app.rec.service;


import com.green.team3_app.rec.vo.PartVO;
import com.green.team3_app.rec.vo.RecVO;
import com.green.team3_app.rec.vo.StaffVO;

import java.util.List;

public interface RecService {
    /*초진 환자 전용*/
    void insertRec(RecVO recVO);

    // 부서 목록 조회
    List<PartVO> getPartList();

    /*담당의 조회*/
    List<StaffVO> selectStaffName(int partNum);

    /*대기 현황*/
    RecVO waitPatie(int recNum);

    /*부서별 대기 인원*/
    int waitCount(int partNum);

    /*예상 대기 시간*/
    int estimatedWaitTime(int partNum);

    /*환자 접수 취소*/
    void delRec(int recNum);

    int getNextRecNum();
}
