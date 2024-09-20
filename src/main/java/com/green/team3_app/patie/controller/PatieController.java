package com.green.team3_app.patie.controller;

import com.green.team3_app.patie.service.PatieService;
import com.green.team3_app.patie.vo.MemberVO;
import com.green.team3_app.patie.vo.PatieVO;
import com.green.team3_app.patie.vo.ReceivePatieVO;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patie")
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
        patieVO.setPatieGen(receivePatieVO.getPatieGen());

        patieService.insertPatie(patieVO);

        return patieNum;
    }

    /*재진 환자 정보 찾기*/
    @GetMapping("/findRePatie")
    public List<PatieVO> findRePatie(
            @RequestParam("patieName") String patieName,
            @RequestParam("patieBirth") String patieBirth) {
        PatieVO patieVO = new PatieVO();
        patieVO.setPatieName(patieName);
        patieVO.setPatieBirth(patieBirth);
        return patieService.findRePatie(patieVO);
    }

    /*로그인*/
    @PostMapping("/login")
    public PatieVO login(@RequestBody MemberVO memberVO, HttpSession session) {

        //로그인 진행
        PatieVO loginInfo = patieService.login(memberVO);

        if(loginInfo != null){
            session.setAttribute("patNum", loginInfo.getPatieNum());
        }


        return patieService.login(memberVO);
    }
}
