package com.green.team3_app.patie.service;

import com.green.team3_app.patie.vo.MemberVO;
import com.green.team3_app.patie.vo.PatieVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("patieService")
public class PatieServiceImpl implements PatieService {
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public int getNextPatieNum() {
        return sqlSession.selectOne("patieMapper.getNextPatieNum");
    }

    /*초진 환자 전용*/
    @Override
    public void insertPatie(PatieVO patieVO) {
        sqlSession.insert("patieMapper.insertPatie", patieVO);
    }

    /*초진 환자 접수 취소*/

    @Override
    public void delFirPatie(int patieNum) {
        sqlSession.delete("patieMapper.delFirPatie", patieNum);
    }

    @Override
    public PatieVO login(MemberVO memberVO) {
        return sqlSession.selectOne("patieMapper.login", memberVO);
    }
}
