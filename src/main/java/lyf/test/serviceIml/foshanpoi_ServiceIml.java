/**
 * Sep 28, 2017
9:33:46 AM
lyf
 */
package lyf.test.serviceIml;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import lyf.test.entity.foshanpoi;
import lyf.test.entity.foshanpoista;
import lyf.test.mapper.foshanpoiMapper;
import lyf.test.service.foshanpoi_Service;

/**
 * @author lyf
Sep 28, 2017
 *
 */
@Service("foshanpoi_Service")
public class foshanpoi_ServiceIml implements foshanpoi_Service{
	@Resource foshanpoiMapper foshanpoiDao;
	/* (non-Javadoc)
	 * @see lyf.test.service.foshanpoi_Service#deleteByPrimaryKey(java.lang.Integer)
	 */
	@Override
	public int deleteByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return foshanpoiDao.deleteByPrimaryKey(id);
	}

	/* (non-Javadoc)
	 * @see lyf.test.service.foshanpoi_Service#insert(lyf.test.entity.foshanpoi)
	 */
	@Override
	public int insert(foshanpoi record) {
		// TODO Auto-generated method stub
		return foshanpoiDao.insert(record);
	}

	/* (non-Javadoc)
	 * @see lyf.test.service.foshanpoi_Service#insertSelective(lyf.test.entity.foshanpoi)
	 */
	@Override
	public int insertSelective(foshanpoi record) {
		// TODO Auto-generated method stub
		return foshanpoiDao.insertSelective(record);
	}

	/* (non-Javadoc)
	 * @see lyf.test.service.foshanpoi_Service#selectByPrimaryKey(java.lang.Integer)
	 */
	@Override
	public foshanpoi selectByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return foshanpoiDao.selectByPrimaryKey(id);
	}

	/* (non-Javadoc)
	 * @see lyf.test.service.foshanpoi_Service#selectPoiSta()
	 */
	@Override
	public List<foshanpoista> selectPoiSta() {
		// TODO Auto-generated method stub
		return foshanpoiDao.selectPoiSta();
	}

	/* (non-Javadoc)
	 * @see lyf.test.service.foshanpoi_Service#updateByPrimaryKeySelective(lyf.test.entity.foshanpoi)
	 */
	@Override
	public int updateByPrimaryKeySelective(foshanpoi record) {
		// TODO Auto-generated method stub
		return foshanpoiDao.updateByPrimaryKeySelective(record);
	}

	/* (non-Javadoc)
	 * @see lyf.test.service.foshanpoi_Service#updateByPrimaryKey(lyf.test.entity.foshanpoi)
	 */
	@Override
	public int updateByPrimaryKey(foshanpoi record) {
		// TODO Auto-generated method stub
		return foshanpoiDao.updateByPrimaryKey(record);
	}

}
