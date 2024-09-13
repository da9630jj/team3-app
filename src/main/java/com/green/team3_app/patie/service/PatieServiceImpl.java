package com.green.team3_app.patie.service;

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


    /*재진 환자 찾기*/
    @Override
    public List<PatieVO> findRePatie(PatieVO patieVO) {
        return sqlSession.selectList("patieMapper.findRePatie", patieVO);
    }
}
