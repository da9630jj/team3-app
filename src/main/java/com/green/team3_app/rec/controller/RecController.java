package com.green.team3_app.rec.controller;

import com.green.team3_app.rec.service.RecService;
import com.green.team3_app.rec.vo.PartVO;
import com.green.team3_app.rec.vo.RecVO;
import com.green.team3_app.rec.vo.StaffVO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rec")
public class RecController {
    @Resource(name = "recService")
    private RecService recService;

    /*초진 환자 전용*/
    @PostMapping("/insertRec")
    void insertRec(@RequestBody RecVO recVO) {
        recService.insertRec(recVO);
    }

    //부서 목록 조회
    @GetMapping("/getPart")
    public List<PartVO> getPartList(){
        return recService.getPartList();
    }

    /*담당의 조회*/
    @GetMapping("selectStaffName/{selectedPart}")
    public List<StaffVO> selectStaffName(@PathVariable("selectedPart") int partNum){
        return recService.selectStaffName(partNum);}

    /*대기 현황*/
    @GetMapping("waitPatie/{patieNum}")
    public RecVO waitPatie(@PathVariable("patieNum") int patieNum){
        return recService.waitPatie(patieNum);
    }

    /*대기 인원*/
    @GetMapping("/waitCount/{partNum}")
    public int waitCount(@PathVariable("partNum") int partNum){
        return recService.waitCount(partNum);
    }

    /*예상 대기 시간*/
    @GetMapping("/estimatedWaitTime/{partNum}")
    public int estimatedWaitTime(@PathVariable("partNum") int partNum) {
        return recService.estimatedWaitTime(partNum);
    }
}
