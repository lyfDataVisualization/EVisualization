/**
 * Nov 25, 2016
2:36:30 PM
lyf
 */
package testmybatis;
import javax.annotation.Resource;  

import org.apache.log4j.Logger;  
import org.junit.Before;  
import org.junit.Test;  
import org.junit.runner.RunWith; 
import org.springframework.context.ApplicationContext;  
import org.springframework.context.support.ClassPathXmlApplicationContext;  
import org.springframework.test.context.ContextConfiguration;  
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;  

import com.alibaba.fastjson.JSON;

import lyf.test.entity.traffic_negotiate_point;
import lyf.test.service.traffic_negotiate_point_Service;
 

/**
 * @author lyf
Nov 25, 2016
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)     //表示继承了SpringJUnit4ClassRunner类  
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})  
public class testmybatis {
	private static Logger logger = Logger.getLogger(testmybatis.class); 
	private ApplicationContext ac = null;
	@Resource  
    private traffic_negotiate_point_Service traffic_negotiate_point_service; 
//  @Before  
//  public void before() {  
//      ac = new ClassPathXmlApplicationContext("applicationContext.xml");  
//      userService = (IUserService) ac.getBean("userService");  
//  }  
  
    @Test  
    public void test1() {  
//    		t1userKey key = new t1userKey();
//    		key.setId(1);
//    		key.setUsername("liuyunfei");
//    		key.setPaswd("123");
//    		t1user user = userService.selectByPrimaryKey_Service(key);  
        // System.out.println(user.getUserName());  
        // logger.info("值："+user.getUserName());  
    	traffic_negotiate_point point=new traffic_negotiate_point();
    	//point.setId(5);
    	point = traffic_negotiate_point_service.selectByPrimaryKey_Service(1);
    		
        logger.info(JSON.toJSONString(point));  
    }  
}
