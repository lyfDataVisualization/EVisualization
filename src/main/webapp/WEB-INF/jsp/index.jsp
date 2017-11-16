<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>Urban Evaluation System</title>

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/grid.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <!-- <script src="../../assets/js/ie-emulation-modes-warning.js"></script> -->
	<script src="js/echarts.min.js"></script>
	<link rel="stylesheet" href="https://js.arcgis.com/4.5/esri/css/main.css">
  	<script src="https://js.arcgis.com/4.5/"></script>
  	<script src="js/initpage.js"></script>
  	<script src="js/jquery-3.1.1.min.js"></script>
  	<script src="js/bootstrap-3.3.7/js/button.js"></script>
  	<script src="js/bootstrap.min.js"></script>
  	<!-- <script src="js/d3.js"></script> -->
  	<!-- <script src="js/echarts.min.js"></script> -->
  	<script src="js/data.js"></script>
  	<script src="js/analysis_mda.js"></script>
  	<script src="js/analysis_ufa.js"></script>
  	<script src="js/analysis_se.js"></script>
  	<script src="js/addData.js"></script>
  </head>
<body>
<!-- <h2>1Hello World!</h2> -->
<!-- ${test.name}   --> 
	<nav class="navbar navbar-inverse navbar-fixed-top mynav">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand navbar_title" href="#">Urban Evaluation System</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
<div class="container-fluid">

      <div class="row">
      	<ul id="myTab1" class="nav nav-pills">
			<li class="label-warning e_warning"><a class="e_warning" href="#addData" id = "myTab1_addData" data-toggle="modal" data-target="#addData_modal">Data</a></li>
			<!-- <li><a href="#analysisDANS" data-toggle="tab">DANS</a></li> -->
		</ul>
        <!-- <div class="col-md-12">.col-md-12</div> -->
        <!-- <div class="col-md-4">.col-md-4</div>
        <div class="col-md-4">.col-md-4</div> -->
      </div>

      
      <div class="row">
      	<!-- <div class="col-md-8">.col-md-4</div>
        <div class="col-md-4">.col-md-4</div> -->
        <div id="mapview">
        		<div id="topbar">
		      
		      <button class="action-button esri-icon-polyline" id="polylineButton" type="button"
		        title="Draw polyline"></button>
		      
		      <button class="action-button esri-icon-trash" id="resetBtn" type="button" title="Clear graphics"></button>
		    </div>
        </div>
        <!-- 	<div id="analysis1">
        	</div>	 -->
      </div>
      
      <div id = "searchBox">
	
		<div class="row">
			
			<div class="col-lg-12">
				<div class="input-group">
					<input type="text" id="searchBox_text" class="form-control">
					<span class="input-group-btn">
						<button id="searchBox_button" class="btn btn-warning e_warning" type="button" onclick="doSearch()">
							Go!
						</button>
					</span>
				</div><!-- /input-group -->
			</div><!-- /.col-lg-6 -->
		</div><!-- /.row -->
	
	</div>
	<div id="analysis">
		<div class="container-fluid">
			<div class="row">
		        <div class="analysis_title">Analysis</div>
	      	</div>
	      	<div class="row">
		        <div id="analysis_poi_sta"></div>
	      	</div>
	      	<div class="row center-block">
		        <!-- <div class="col-md-4">col-sm-4</div>
		        <div class="col-md-4">col-sm-4</div>
		        <div class="col-md-4">col-sm-4</div> -->
		        <!-- <div class="btn-group center-block" data-toggle="buttons-radio">
					<button id = "analysisMDA" class="btn btn-warning btn-lg center-block analysis_button">MDA</button>
					<button id = "analysisUFA" class="btn btn-warning btn-lg center-block analysis_button">UFA</button>
					<button id = "analysisDANS" class="btn btn-warning btn-lg center-block analysis_button">DANS</button>             
				</div> -->
				<ul id="myTab" class="nav nav-pills label-warning">
					<!-- <li class="active"><a href="#analysisMDA" data-toggle="tab">MDA</a>
					</li> -->
					<li class="dropdown">
						<a href="#" id="myTabDrop1" class="dropdown-toggle" 
						   data-toggle="dropdown">MDA 
							<b class="caret"></b>
						</a>
						<ul class="dropdown-menu" role="menu" aria-labelledby="myTabDrop1">
							<li><a href="#analysisMDA_time" tabindex="-1" data-toggle="tab">等时间</a></li>
							<li><a href="#analysisMDA_distance" tabindex="-1" data-toggle="tab">等距离</a></li>
						</ul>
					</li>
					<li><a href="#analysisUFA" data-toggle="tab">UFA</a></li>
					<li><a href="#analysisSE" data-toggle="tab">SE</a></li>
				</ul>
				<div id="myTabContent" class="tab-content">
					<div class="tab-pane fade in active" id="analysisMDA_time">
						<!-- <form class="form-horizontal" role="form"> -->
							<div class="row">
						        <label class="col-sm-4 control-label my-control-label analysis-label">Time(m):</label>
								<div class="col-sm-8">
									<select id="analysisMDA_time_selectTime" class="form-control my-form-control">
										<option value="10">10</option>
										<option value="15">15</option>
									</select>
								</div>
					      	</div>
							
							<div class="row">
								<label class="col-sm-4 control-label my-control-label analysis-label">Method:</label>
								<div class="col-sm-8">
									<select id="analysisMDA_time_selectBywhat" class="form-control my-form-control">
										<option value="60">公交</option>
										<option value="80">自驾</option>
										<option value="20">骑行</option>
										<option value="10">步行</option>
									</select>
								</div>
							<div class="row">
							</div>
							<div class="col-sm-6">
								<button id = "analysisMDA_Buffer" class="btn btn-warning btn-lg center-block analysis_button e_warning">Buffer</button>
							</div>
							<div class="col-sm-6">
								<button id = "analysisMDA_ModalPage" class="btn btn-warning btn-lg center-block analysis_button e_warning" data-toggle="modal" data-target="#myModal">MDA</button>
							</div>
							</div>
							<!-- <div class="form-group">
								<label class="col-sm-4 control-label">变量</label>
								<label class="col-sm-4 control-label">归一化</label>
								<label class="col-sm-4 control-label">权重</label>
							</div>
							<div class="form-group myformgroup">
								<div class="checkbox col-sm-4 ">
									<label class="control-label"><input type="checkbox" value="">选项 1</label>
								</div>
								<label class="col-sm-4 control-label">归一化</label>
								<label class="col-sm-4 control-label">权重</label>
							</div> -->
							
						<!-- </form> -->
					</div>
					<div class="tab-pane fade" id="analysisMDA_distance">
						<p>analysisMDA_distance</p>
					</div>
					<div class="tab-pane fade" id="analysisUFA">
						<p>analysisUFA</p>
					</div>
					<div class="tab-pane fade" id="analysisSE">
						<div class="row">
							<div class="col-sm-6">
								<button id = "heat_map" class="btn btn-warning btn-lg center-block analysis_button e_warning">heat map</button>
							</div>
							<div class="col-sm-6">
								<button id = "add_subway" class="btn btn-warning btn-lg center-block analysis_button e_warning">subway</button>
							</div>
							
							<!-- <div class="col-sm-6">
								<button id = "analysisMDA_ModalPage" class="btn btn-warning btn-lg center-block analysis_button" data-toggle="modal" data-target="#myModal">MDA</button>
							</div> -->
						</div>
						<div class="row">
					        <label class="col-sm-4 control-label my-control-label analysis-label">Subway Line:</label>
							<div class="col-sm-8">
								<select id="analysisSE_subwayLine" class="form-control my-form-control">
									<option value="0">广佛线</option>
									
								</select>
							</div>
					    </div>
					    <div class="row">
					        <label class="col-sm-4 control-label my-control-label analysis-label">Distance:</label>
							<div class="col-sm-8">
								<select id="analysisSE_Distance" class="form-control my-form-control">
									<option value="2">2km</option>
									<option value="3">3km</option>
								</select>
							</div>
					    </div>
						<div class="row">
							<div id="analysisSE_peopleDensity" class="col-sm-12 analysisSE_peopleDensity">
								
							</div>
							<!-- <div id="analysisSE_poi" class="col-sm-6 analysisSE_poi">
								111111
							</div>
							<div class="col-sm-6">
								<div class="row">
									<div id="analysisSE_peopleDensity" class="col-sm-12 analysisSE_peopleDensity">
									11111
									</div>
								</div>
								<div class="row">
									<div id="analysisSE_trafficDensity"  class="col-sm-12 analysisSE_trafficDensity">
									1111
									</div>
								</div>
							</div> -->
							
							<!-- <div class="col-sm-6">
								<button id = "analysisMDA_ModalPage" class="btn btn-warning btn-lg center-block analysis_button" data-toggle="modal" data-target="#myModal">MDA</button>
							</div> -->
						</div>
					</div>
				</div>
	      	</div>
	      	<!-- <div class="row">
		        <div id="analysis_other"></div>
	      	</div> -->
		</div>
	</div>
      
      <!-- <div class="row">
      	<div class="col-md-12">.col-md-12</div>
        
      </div> -->

      
      <div class="row">
        <div id="parallelgraphics"></div>
      </div>

    </div> <!-- /container -->
   	<!-- 模态框（Modal） -->
<div class="modal fade" id="addData_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					选择数据
				</h4>
			</div>
			<div class="modal-body">
				<table class="table table-striped">
					<caption>数据列表</caption>
				   <thead>
				      <tr>
				      	<th></th>
				         <th>名称</th>
				         <th>类型</th>
						  <th>描述</th>
				         <th>创建时间</th>
				      </tr>
				   </thead>
				   <tbody>
				      <tr>
				      	<td><label><input type="checkbox" value=""></label></td>
				         <td>公交站点</td>
				         <td>point</td>
						  <td>该数据由南海区交通运输局（公路）提供</td>
				         <td>2017-04-14</td>
				      </tr>
				      
				   </tbody>
				</table>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭
				</button>
				<button type="button" class="btn btn-primary" id="indexpage_addData">
					添加
				</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content modal-content-E">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					多维数据分析
				</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" role="form">
							
							<div class="form-group">
								<label class="col-sm-4 control-label">变量</label>
								<label class="col-sm-4 control-label">归一化</label>
								<label class="col-sm-4 control-label">权重</label>
							</div>
							<div class="modal-header">
				
							</div>
							<div class="form-group myformgroup">
								<div class="checkbox col-sm-4 ">
									<label class="control-label"><input type="checkbox" name="mda" value="餐饮服务">餐饮服务</label>
								</div>
								<div class="col-sm-4">
									<select class="form-control">
										<option>归一化</option>
									</select>
								</div>
								<div class="col-sm-4">
									<input type="text" value="1" class="form-control" id="inputSuccess">
								</div>
							</div>
							<div class="form-group myformgroup">
								<div class="checkbox col-sm-4 ">
									<label class="control-label"><input type="checkbox" name="mda" value="生活服务">生活服务</label>
								</div>
								<div class="col-sm-4">
									<select class="form-control">
										<option>归一化</option>
									</select>
								</div>
								<div class="col-sm-4">
									<input type="text" value="1" class="form-control" id="inputSuccess">
								</div>
							</div>
							<div class="form-group myformgroup">
								<div class="checkbox col-sm-4 ">
									<label class="control-label"><input type="checkbox" name="mda" value="医疗保健服务">医疗保健服务</label>
								</div>
								<div class="col-sm-4">
									<select class="form-control">
										<option>归一化</option>
									</select>
								</div>
								<div class="col-sm-4">
									<input type="text" value="1" class="form-control" id="inputSuccess">
								</div>
							</div>
							<div class="form-group myformgroup">
								<div class="checkbox col-sm-4 ">
									<label class="control-label"><input type="checkbox" name="mda" value="公司企业">公司企业</label>
								</div>
								<div class="col-sm-4">
									<select class="form-control">
										<option>归一化</option>
									</select>
								</div>
								<div class="col-sm-4">
									<input type="text" value="1" class="form-control" id="inputSuccess">
								</div>
							</div>
							<div class="form-group myformgroup">
								<div class="checkbox col-sm-4 ">
									<label class="control-label"><input type="checkbox" name="mda" value="科教文化服务">科教文化服务</label>
								</div>
								<div class="col-sm-4">
									<select class="form-control">
										<option>归一化</option>
									</select>
								</div>
								<div class="col-sm-4">
									<input type="text" value="1" class="form-control" id="inputSuccess">
								</div>
							</div>
							<div class="form-group myformgroup">
								<div class="checkbox col-sm-4 ">
									<label class="control-label"><input type="checkbox" name="mda" value="风景名胜">风景名胜</label>
								</div>
								<div class="col-sm-4">
									<select class="form-control">
										<option>归一化</option>
									</select>
								</div>
								<div class="col-sm-4">
									<input type="text" value="1" class="form-control" id="inputSuccess">
								</div>
							</div>
							<div class="form-group myformgroup">
								<div class="checkbox col-sm-4 ">
									<label class="control-label"><input type="checkbox" name="mda" value="购物服务">购物服务</label>
								</div>
								<div class="col-sm-4">
									<select class="form-control">
										<option>归一化</option>
									</select>
								</div>
								<div class="col-sm-4">
									<input type="text" value="1" class="form-control" id="inputSuccess">
								</div>
							</div>
							<div class="form-group myformgroup">
								<div class="checkbox col-sm-4 ">
									<label class="control-label"><input type="checkbox" name="mda" value="体育休闲服务">体育休闲服务</label>
								</div>
								<div class="col-sm-4">
									<select class="form-control">
										<option>归一化</option>
									</select>
								</div>
								<div class="col-sm-4">
									<input type="text" value="1" class="form-control" id="inputSuccess">
								</div>
							</div>
							<div class="modal-header">
				
							</div>
							<div class="form-group myformgroup">
								<div class="checkbox col-sm-6 ">
									<label class="col-sm-4 control-label">分类数:</label>
								</div>
								<div class="col-sm-6">
									<select class="form-control" id=mda_kinds>
										<option value="5">5</option>
										<option value="6">6</option>
									</select>
								</div>
							</div>
						</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭
				</button>
				<button type="button" class="btn btn-primary" id="mdamodalpage_submit">
					提交
				</button>
			</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal -->
	</div>
</body>
<script>
	//Add a known server to the list.
	var map;
	var view;
	var featureLayer;//poi图层
	var resultsLyr;//点击poi统计图，根据name过滤poi 生成的GraphicLayer
	var searchResultLayer;//根据地名查询的结果图层
	var resultsBufferLayer;//根据生成的缓冲区过滤poi 生成的GraphicLayer
	var MDA_Modal_checked_arr;//mda 选中的类别
	var myChart_parallel;//平行坐标系 图
	
	var myChart_select_seriesname;//poi统计图当前点击的名称
    init();
  </script>
</html>
