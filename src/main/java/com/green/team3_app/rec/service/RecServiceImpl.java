package com.green.team3_app.rec.service;

import com.green.team3_app.rec.vo.PartVO;
import com.green.team3_app.rec.vo.RecVO;
import com.green.team3_app.rec.vo.StaffVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service("recService")
public class RecServiceImpl implements RecService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    /*초진 환자 전용*/
    @Override
    public void insertRec(@RequestBody RecVO recVO) {
        sqlSession.insert("recMapper.insertRec", recVO);
    }

    /*진료과 조회*/
    @Override
    public List<PartVO> getPartList() {
        return sqlSession.selectList("staffMapper.getPartList");
    }

    /*담당의 조회*/
    @Override
    public List<StaffVO> selectStaffName(int partNum) {
        return sqlSession.selectList("staffMapper.selectStaffName", partNum);
    }

    /*대기현황*/

    @Override
    public RecVO waitPatie(RecVO recVO) {
        return sqlSession.selectOne("recMapper.waitPatie", recVO);
    }
}

