package lyf.test.mapper;

import java.util.List;

import lyf.test.entity.foshanpoi;
import lyf.test.entity.foshanpoista;

public interface foshanpoiMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(foshanpoi record);

    int insertSelective(foshanpoi record);

    foshanpoi selectByPrimaryKey(Integer id);
    List<foshanpoista> selectPoiSta();

    int updateByPrimaryKeySelective(foshanpoi record);

    int updateByPrimaryKey(foshanpoi record);
}