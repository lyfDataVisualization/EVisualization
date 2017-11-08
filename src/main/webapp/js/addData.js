/**
 * 添加数据
 */
function fun_addData()
{
	$("#indexpage_addData").click(function(){
		$('#addData_modal').modal('hide');
		gotoSelectPoiOnSceneview("交通设施服务");//
	});
}