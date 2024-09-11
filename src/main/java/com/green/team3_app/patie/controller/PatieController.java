package com.green.team3_app.patie.controller;

import com.green.team3_app.patie.service.PatieService;
import com.green.team3_app.patie.vo.PatieVO;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/partie")
public class PatieController {
    @Resource(name = "patieService")
    private PatieService patieService;

    /*초진 환자 전용*/
    @PostMapping("/insertPatie")
    public int insertPatie(@RequestBody PatieVO patieVO){
        //이번에 추가할 환자번호 조회
        int patieNum = patieService.getNextPatieNum();

        //환자정보 등록
        patieVO.setPatieNum(patieNum);
        patieService.insertPatie(patieVO);

        return patieNum;
    }
}
