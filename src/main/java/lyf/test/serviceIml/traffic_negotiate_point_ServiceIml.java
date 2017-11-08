/**
 * Sep 19, 2017
9:34:07 AM
lyf
 */
package lyf.test.serviceIml;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import lyf.test.entity.traffic_negotiate_point;
import lyf.test.mapper.traffic_negotiate_pointMapper;
import lyf.test.service.traffic_negotiate_point_Service;

/**
 * @author lyf
Sep 19, 2017
 *
 */
@Service("traffic_negotiate_point_Service")
public class traffic_negotiate_point_ServiceIml implements traffic_negotiate_point_Service{
	@Resource traffic_negotiate_pointMapper traffic_negotiate_pointDao;
	/* (non-Javadoc)
	 * @see lyf.test.service.traffic_negotiate_point_Service#selectByPrimaryKey_Service(java.lang.Integer)
	 */
	@Override
	public traffic_negotiate_point selectByPrimaryKey_Service(Integer id) {
		// TODO Auto-generated method stub
		return traffic_negotiate_pointDao.selectByPrimaryKey(id);
	}

}
