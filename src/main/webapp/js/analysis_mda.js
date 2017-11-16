/**
 * 多维数据分析-MDA
 */
function fun_analysisMDA_Buffer()
{
	var time = $('#analysisMDA_time_selectTime option:selected').text();//时间
	var bywhat = $('#analysisMDA_time_selectBywhat option:selected').val();//出行方式
	//alert(time+","+bywhat);
	//进行缓冲区分析
	require([
	         "esri/Map",
	         "esri/views/MapView",
	         "esri/views/SceneView",
	         "esri/layers/FeatureLayer",
	         "esri/layers/GraphicsLayer",
	         "esri/geometry/geometryEngine",
	         "esri/Graphic",

	         "dojo/on",
	         "dojo/dom",
	         "dojo/dom-construct",
	         "dojo/domReady!"
	       ],
	       function(
	         Map, MapView,SceneView,
	         FeatureLayer,
	         GraphicsLayer,
	         geometryEngine,
	         Graphic,
	         on, dom, domConstruct
	       ) {
			var quakesUrl =
				"http://10.2.3.222:6080/arcgis/rest/services/foshan/FeatureServer/0";
	          //"https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/ks_earthquakes_since_2000/FeatureServer/0";

	        var wellBuffer, wellsGeometries, magnitude;
	     // historic earthquakes
	        var quakesLayer = new FeatureLayer({
	          url: quakesUrl,
	          outFields: ["*"],
	          visible: false
	        });
	      //Approved Intent to Drill
	        var wellsLayer = new FeatureLayer({
//	        		portalItem: { // autocasts as new PortalItem()
//	                id: "8af8dc98e75049bda6811b0cdf9450ee"
//	              },
	        		url: quakesUrl,
	            outFields: ["*"],
	            visible: false
	        });
	        //map.add(quakesLayer);
	        //map.add(wellsLayer);
	        // GraphicsLayer for displaying results
	        
	        //map.add(resultsLayer);
	     // set the definition expression on the wells
	        // layer to reflect the selection of the user
//	        setWellsDefinitionExpression("Approved Intent to Drill")
//	        .then(createBuffer);
	        setWellsDefinitionExpression(myChart_select_seriesname)
	        .then(createBuffer)//创建缓冲区
	        .then(queryEarthquakes)//对poi进行缓冲区筛选
	        .then(displayResults);//渲染筛选之后的poi
	        
	        function setWellsDefinitionExpression(newValue) {
//	          wellsLayer.definitionExpression = "STATUS2 = '" + newValue + "'";
	        		wellsLayer.definitionExpression = "poi_catego = '" + newValue + "'";
//	          if (!wellsLayer.visible) {
//	            wellsLayer.visible = true;
//	          }

	          return queryForWellGeometries();
	        }

	        // Get all the geometries of the wells layer
	        // the createQuery() method creates a query
	        // object that respects the definitionExpression
	        // of the layer
	        function queryForWellGeometries() {
	          var wellsQuery = wellsLayer.createQuery();

	          return wellsLayer.queryFeatures(wellsQuery)
	            .then(function(response) {
	              wellsGeometries = response.features.map(function(feature) {
	                return feature.geometry;
	              });

	              return wellsGeometries;
	            });
	        }
	     // creates a single buffer polygon around
	        // the well geometries
	        function createBuffer(wellPoints) {
	        		var bufferDistance = parseInt(time)*parseInt(bywhat);
//	          alert(bufferDistance);
//	          alert(wellPoints.length);
	          var wellBuffers = geometryEngine.geodesicBuffer(wellPoints, [
	              bufferDistance
	            ], "meters",
	            true);
	          wellBuffer = wellBuffers[0];
	          
//	          var polygon = {
//	                  type: "polygon", // autocasts as new Polygon()
//	                  rings: wellBuffer.rings
//	                };
//
//	                var fillSymbol = {
//	                  type: "simple-fill", // autocasts as new SimpleFillSymbol()
//	                  color: [227, 139, 79, 0.8],
//	                  outline: { // autocasts as new SimpleLineSymbol()
//	                    color: [255, 255, 255],
//	                    width: 1
//	                  }
//	                };
//
//	                var polygonGraphic = new Graphic({
//	                  geometry: polygon,
//	                  symbol: fillSymbol
//	                });
	                

	          // add the buffer to the view as a graphic
	          var bufferGraphic = new Graphic({
	            geometry: wellBuffer,
	            symbol: {
	              type: "simple-fill", // autocasts as new SimpleFillSymbol()
	              outline: {
	                width: 1.5,
	                color:"#F103F2"
	              },
	              style: "none"
	            }
	          });
	          //resultsLayer.add(polygonGraphic);
	          view.graphics.removeAll();
	          view.graphics.add(bufferGraphic);
	          //map.add(resultsLayer);
	          
	        }

	        //queryEarthquakes().then(displayResults);//进行poi缓冲区筛选
		function queryEarthquakes() {
	          var query = featureLayer.createQuery();
//	          query.where = "mag >= " + magSlider.value;
//	          console.log(wellBuffer);
	          query.geometry = wellBuffer;
	          query.spatialRelationship = "intersects";

	          return featureLayer.queryFeatures(query);
	        }

	        // display the earthquake query results in the
	        // view and print the number of results to the DOM
	        function displayResults(results) {

	        	resultsBufferLayer.removeAll();
	          var features = results.features.map(function(graphic) {
	            graphic.symbol = {
	              type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
	              style: "diamond",
	              size: 6.5,
	              color: "darkorange"
	            };
	            return graphic;
	          });
	          
	          resultsBufferLayer.addMany(features);
	          
	        }
	});
}
function fun_analysisMDA_ModalPage()
{
	$("input[name='mda']").click(function () {
        //获得所有name为love的选中的复选框
        var $Checks = $("input[name='mda']:checked");
        MDA_Modal_checked_arr = new Array();
        //使用了元素的each方法
        //循环Jquery对象里的dom数组
        $Checks.each(function (index, value) {
            //alert(value);
        		MDA_Modal_checked_arr[index] = value.value;
        });
//        alert("你选择了" + arr.length + "个爱好," + arr.join(","));
    });
	
	$("#mdamodalpage_submit").click(function(){
		//alert("你选择了" + MDA_Modal_checked_arr.length + "个爱好," + MDA_Modal_checked_arr.join(","));
		var parallelAxis = parallelOption_new.parallelAxis;
		parallelAxis.splice(0,parallelAxis.length);  //清空数组
		var series = parallelOption_new.series;
		series.splice(0,series.length);  
		
		for(var i = 0;i<MDA_Modal_checked_arr.length;i++)//几条轴
		{
			var parallelAxis_son = {};
			
			parallelAxis_son.dim = i;
			parallelAxis_son.name = MDA_Modal_checked_arr[i];
			parallelAxis.push(parallelAxis_son);
		}
		var mda_kinds = parseInt($("#mda_kinds").val());
		
		for(var m = 0;m<mda_kinds;m++)//几条线
		{
			var dataParent = [];
			var data = [];
			for(var n = 0;n<MDA_Modal_checked_arr.length;n++)//几条轴
			{
				data.push(parseInt((Math.random()*10).toFixed(0)));
			}
			dataParent.push(data);
			var series_son = {
	            name: m.toString(),
	            type: 'parallel',
	            lineStyle:{
	                normal:{
	                    color:color_kinds[m],
	                    width: 4,
	                    opacity: 0.5
	                }
	            },
	            data: dataParent
	        };
			series.push(series_son);
		}
		myChart_parallel.clear();
		myChart_parallel.setOption(parallelOption_new);
		
		MdaSelectedPoi(mda_kinds);//对当前选择的POi进行渲染 如“汽车销售”分为5类，对每类进行不同颜色渲染
		
		$('#myModal').modal('hide');
	});
}
function MdaSelectedPoi(mda_kinds)//对当前选择的poi进行mda 分类
{
	require([
	 		"esri/Map",
	 		"esri/views/SceneView",
	 		"esri/layers/GraphicsLayer",
	 		"esri/Graphic",
	 		"esri/symbols/PointSymbol3D",
	 		"esri/symbols/ObjectSymbol3DLayer",
	 		"esri/tasks/QueryTask",
	 		"esri/tasks/support/Query",
	 		"dojo/_base/array",
	 		"dojo/_base/lang",
	 		"dojo/dom",
	 		"dojo/on",
	 		"dojo/domReady!"
	 	       ], function(Map, SceneView, GraphicsLayer,Graphic,PointSymbol3D, ObjectSymbol3DLayer,
	 	    		      QueryTask, Query, arrayUtils,lang, dom, on) {
		

			var graphics = resultsLyr.graphics.clone();
			resultsLyr.removeAll();
			
			//var testLayer = new GraphicsLayer();
			
			var peakResults = arrayUtils.map(graphics.items, function(graphic) {
				
//				console.log(graphic);
				//var newgraphic = graphic.clone();
				
				var kind = parseInt((Math.random()*mda_kinds).toFixed(0));
//				
				graphic.attributes.Kind=kind;//添加Kind 属性字段
//				graphic.symbol.color = "red";
				
				var markerSymbol = {
				          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
				          color: color_kinds1[kind],
				          outline: { // autocasts as new SimpleLineSymbol()
				            color: [255, 255, 255],
				            width: 1
				          }
				        };
				
				var newGraphic = new Graphic({
			          geometry: graphic.geometry,
			          //symbol: graphic.symbol,
			          symbol:markerSymbol,
			          attributes: graphic.attributes
			        });
//				testLayer.add(newGraphic);
				//console.log(newGraphic);
		          return newGraphic;
//				return newgraphic;
		        });
			//map.add(testLayer);
			resultsLyr.addMany(peakResults);
			
	});
}
function HighLight_Serie(selectedKind)
{
	require([
		 		"esri/Map",
		 		"esri/views/SceneView",
		 		"esri/layers/GraphicsLayer",
		 		"esri/Graphic",
		 		"esri/symbols/PointSymbol3D",
		 		"esri/symbols/ObjectSymbol3DLayer",
		 		"esri/tasks/QueryTask",
		 		"esri/tasks/support/Query",
		 		"dojo/_base/array",
		 		"dojo/_base/lang",
		 		"dojo/dom",
		 		"dojo/on",
		 		"dojo/domReady!"
		 	       ], function(Map, SceneView, GraphicsLayer,Graphic,PointSymbol3D, ObjectSymbol3DLayer,
		 	    		      QueryTask, Query, arrayUtils,lang, dom, on) {
		
			var graphics = resultsLyr.graphics.clone();
			resultsLyr.removeAll();
			
//			var filtergraphicsbyselectedKind = arrayUtils.filter(graphics.items, function(graphic){
//			      return graphic.attributes.Kind == parseInt(selectedKind);
//		    });
//			
			var peakResults = arrayUtils.map(graphics.items, function(graphic) {

			if(graphic.attributes.Kind==parseInt(selectedKind))
			{
				graphic.visible=true;
			}
			else{
				graphic.visible=false;
			}
	          return graphic;
		
	        });
		
			resultsLyr.addMany(peakResults);
	});
	
}
function RestoreClear()//恢复之前的 resultsLyr
{
	require([
		 		"esri/Map",
		 		"esri/views/SceneView",
		 		"esri/layers/GraphicsLayer",
		 		"esri/Graphic",
		 		"esri/symbols/PointSymbol3D",
		 		"esri/symbols/ObjectSymbol3DLayer",
		 		"esri/tasks/QueryTask",
		 		"esri/tasks/support/Query",
		 		"dojo/_base/array",
		 		"dojo/_base/lang",
		 		"dojo/dom",
		 		"dojo/on",
		 		"dojo/domReady!"
		 	       ], function(Map, SceneView, GraphicsLayer,Graphic,PointSymbol3D, ObjectSymbol3DLayer,
		 	    		      QueryTask, Query, arrayUtils,lang, dom, on) {
		
			var graphics = resultsLyr.graphics.clone();
			resultsLyr.removeAll();
			
			var peakResults = arrayUtils.map(graphics.items, function(graphic) {

				graphic.visible=true;
			
				return graphic;
		
	        });
		
			resultsLyr.addMany(peakResults);
	});
}