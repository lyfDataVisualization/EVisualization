package lyf.test.mapper;

import lyf.test.entity.traffic_negotiate_point;

public interface traffic_negotiate_pointMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(traffic_negotiate_point record);

    int insertSelective(traffic_negotiate_point record);

    traffic_negotiate_point selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(traffic_negotiate_point record);

    int updateByPrimaryKey(traffic_negotiate_point record);
}