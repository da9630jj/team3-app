package com.green.team3_app.patie.controller;

import com.green.team3_app.patie.service.PatieService;
import com.green.team3_app.patie.vo.PatieVO;
import com.green.team3_app.patie.vo.ReceivePatieVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/partie")
public class PatieController {
    @Resource(name = "patieService")
    private PatieService patieService;

    /*초진 환자 전용*/
    @PostMapping("/insertPatie")
    public int insertPatie(@RequestBody ReceivePatieVO receivePatieVO){
        System.out.println(receivePatieVO);

        //이번에 추가할 환자번호 조회
        int patieNum = patieService.getNextPatieNum();

        PatieVO patieVO = new PatieVO();
        patieVO.setPatieNum(patieNum);
        patieVO.setPatieBirth(receivePatieVO.getPatieBirth().get(0) + "-" + receivePatieVO.getPatieBirth().get(1));
        patieVO.setPatieAddr(receivePatieVO.getPatieAddr().get(0) + " " + receivePatieVO.getPatieAddr().get(1));
        patieVO.setPatieTel(receivePatieVO.getPatieTel().get(0) + "-" + receivePatieVO.getPatieTel().get(1) + "-" + receivePatieVO.getPatieTel().get(2));
        patieVO.setPatieName(receivePatieVO.getPatieName());

        patieService.insertPatie(patieVO);

        return patieNum;
    }

    /*초진 환자 접수 취소*/
    @DeleteMapping("/delFirPatie/{patieNum}")
    public void delFirPatie(@PathVariable("patieNum") int patieNum){
        patieService.delFirPatie(patieNum);
    }
}
