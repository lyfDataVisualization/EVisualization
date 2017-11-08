/**
 * Sep 19, 2017
10:11:48 AM
lyf
 */
package lyf.test.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;

import lyf.test.entity.foshanpoista;

import lyf.test.entity.traffic_negotiate_point;
import lyf.test.service.foshanpoi_Service;
import lyf.test.service.traffic_negotiate_point_Service;


/**
 * @author lyf
Sep 19, 2017
 *
 */
@Controller
public class controller {
	private static Logger logger = Logger.getLogger(controller.class); 
//	@Resource
//	private traffic_negotiate_point_Service t_n_p_s;
	@Resource
	private foshanpoi_Service foshanpoi_service;
	
	@RequestMapping("/index")
	public String toIndex(HttpServletRequest request,Model model)
	{
//		traffic_negotiate_point test = t_n_p_s.selectByPrimaryKey_Service(1);
//		model.addAttribute("test", test);
//		logger.info(JSON.toJSONString(test)); 
		
		
		return "index";
	}
	@ResponseBody  
	@RequestMapping("doinitpoista")
	public List<foshanpoista> doinitpoista(HttpServletRequest request,Model model)
	{
		 try {
			List<foshanpoista> foshanpoista = foshanpoi_service.selectPoiSta();
//			logger.info(JSON.toJSONString(foshanpoista)); 
			return foshanpoista;
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getMessage());
		}
     
		 return null;
     
		
	}
}
