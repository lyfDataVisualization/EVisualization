/**
 * Sep 28, 2017
9:31:29 AM
lyf
 */
package lyf.test.service;

import java.util.List;

import lyf.test.entity.foshanpoi;
import lyf.test.entity.foshanpoista;

/**
 * @author lyf
Sep 28, 2017
 *
 */
public interface foshanpoi_Service {
	int deleteByPrimaryKey(Integer id);

    int insert(foshanpoi record);

    int insertSelective(foshanpoi record);

    foshanpoi selectByPrimaryKey(Integer id);
    List<foshanpoista> selectPoiSta();

    int updateByPrimaryKeySelective(foshanpoi record);

    int updateByPrimaryKey(foshanpoi record);
}
