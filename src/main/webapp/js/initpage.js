/**
 * 
 */
//var map;
//var view;
//var featurelayer;
//var resultsLyr;
function init()
{
	
	$("#myTab1_addData").click(function(){
		fun_addData();
	});
	$("#analysisMDA_Buffer").click(function(){
		fun_analysisMDA_Buffer();
	});
	$("#analysisMDA_ModalPage").click(function(){
		fun_analysisMDA_ModalPage();
	});
	$("#analysisUFA").click(function(){
		fun_analysisUFA();
	});
	//analysisDANS
	$("#add_subway").click(function(){
		AddSubway();
	});
	$("#heat_map").click(function(){
		Heat_Map();
	});
	///poi统计初始化
	$.ajax({  
 	    type:"POST",  
 	    url:"doinitpoista",  
 	    dataType:"json",  
 	    async: false,  
 	    success:function(data){
 	    		//fieldsArray = data;
// 	    	console.log(data);
	 	    	var poi_num = [];
	 	    	var poi_category = [];
 	    		for(var i = 0;i<data.length;i++)
 	    			{
 	    				var poista = data[i];
 	    				poi_num.push(poista["num"]);
 	    				poi_category.push(poista["category"]);
 	    			}
 	    		option = {
 	    				backgroundColor: '#474848',
 	    				color:['#2FC8EC'],
 	    			    title : {
 	    			        text: '佛山市南海区POI',
 	    			        textStyle: {
	    			            color: '#AADFFF',
	    			            fontSize: 16
 	    			        }
 	    			    },
 	    			    grid:{
 	    			    		left:60,
 	    			    		right:10,
 	    			    		bottom:30
 	    			    },
 	    			    tooltip : {
 	    			        trigger: 'axis'
 	    			    },
 	    			    legend: {
 	    			        data:['POI'],
 	    			        textStyle: {
 	    			            color: '#AADFFF',
 	    			            fontSize: 16
 	    			        }
 	    			    },
 	    			    toolbox: {
 	    			        show : true,
 	    			        feature : {
 	    			            dataView : {show: true, readOnly: false},
 	    			            magicType : {show: true, type: ['line', 'bar']},
 	    			            restore : {show: true},
 	    			            saveAsImage : {show: true}
 	    			        },
 	    			       iconStyle:{
 	    			        		normal:{
 	    			        			color:'#AADFFF'
 	    			        		}
 	    			        }
 	    			    },
 	    			    calculable : true,
 	    			    xAxis : [
 	    			        {
 	    			            type : 'category',
 	    			            data : poi_category,
 	    			            
 	    			            nameTextStyle: {
 	    			              color: '#AADFFF',
 	    			              fontSize: 14
 	    			            },
 	    			            axisLine: {
 	    			              lineStyle: {
 	    			                  color: '#AADFFF'
 	    			              }
 	    			           	}
 	    			        }
 	    			    ],
 	    			    yAxis : [
 	    			        {
 	    			            	type : 'value',
	 	    			        nameLocation: 'end',
	 	    			        
	 	    			        nameTextStyle: {
	 	    			              color: '#AADFFF',
	 	    			              fontSize: 16
	 	    			        },
	 	    			        axisLine: {
	 	    			              lineStyle: {
	 	    			                  color: '#AADFFF'
	 	    			              }
	 	    			          },
 	    			        }
 	    			    ],
 	    			    series : [
 	    			        {
 	    			            name:'POI',
 	    			            type:'bar',
 	    			            data:poi_num,
 	    			            markPoint : {
 	    			                data : [
 	    			                    {type : 'max', name: '最大值'},
 	    			                    {type : 'min', name: '最小值'}
 	    			                ]
 	    			            }
 	    			        }
 	    			    ]
 	    			};
 	    	// 基于准备好的dom，初始化echarts实例
 	        var myChart = echarts.init(document.getElementById('analysis_poi_sta'));
 	    // 使用刚指定的配置项和数据显示图表。
 	        myChart.setOption(option);
	 	       myChart.on('click', function (params) {
	 	    	   	if (params.componentType === 'series') {
//	 	    	        alert(params.name);
	 	    	   		//myChart_select_seriesname = params.name;
	 	    	   		//initParallelGra(params.name);//初始化平行坐标系
	 	    	   		gotoSelectPoiOnSceneview(params.name);//对poi进行筛选查询
	 	    	    }
	
	 	    	});
 	    },  
 	    error:function(){  
 	         alert("方法执行不成功!");  
 	    }    
 	});
	function sum(list)
	{
		return eval(list.join("+"));
	}
	function initParallelGra()
	{
//		alert(name);
		// 基于准备好的dom，初始化echarts实例
	    myChart_parallel = echarts.init(document.getElementById('parallelgraphics'));
//	    // 使用刚指定的配置项和数据显示图表。
	    myChart_parallel.clear();
	    myChart_parallel.setOption(parallelOption);//data.js
	    
	    myChart_parallel.on('axisareaselected', function () {//获取当前选择的 线
	    		var series = myChart_parallel.getModel().getSeries();
	    		//console.log(series);
	    		for(var i = 0;i<series.length;i++)
    			{
	    			var indice = series[i].getRawIndicesByActiveState('active');
	    			if(indice.length>0)
	    			{
	    				//console.log(series[i].name);//获取当前选择的类别
	    				HighLight_Serie(series[i].name);//根据当前选择的类别 高亮显示
	    			}
    			}
	    		
	    });
	    myChart_parallel.on('brush', function (params) {//获取当前点击了哪个操作按钮 如清除选择
	        //console.log(params.command);
	        if(params.command=="clear")
	        	{
	        		RestoreClear();
	        	}
	    });
	}
	////地图初始化
	require([
	         "esri/Map",
	         "esri/views/SceneView",
	         "esri/views/MapView",
	         "esri/layers/FeatureLayer",
	         "esri/layers/GraphicsLayer",
	         "esri/layers/support/LabelClass",
	         "esri/widgets/Legend",
	         "dojo/domReady!"
	       ], function(Map, SceneView,MapView,FeatureLayer,GraphicsLayer,LabelClass,Legend) {

	         map = new Map({
	           basemap: "dark-gray-vector",
	           ground: "world-elevation"
	         });

	         view = new SceneView({
	           container: "mapview",
	           map: map
//	           ,
//	           scale: 50000000,
//	           center: [-101.17, 21.78]
	         });
	      // Add a legend to the view
	         var xianUniqueValueRenderer = {
	                 type: "unique-value", // autocasts as new UniqueValueRenderer()
	                 defaultSymbol: { type: "simple-fill" },
	                 defaultLabel: "Other",
	                 field: "SNAME",
	                 uniqueValueInfos: [
	                   {
		                   value: "佛山市", // code for interstates/freeways
		                   symbol: {
			                	    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
			                	    color: [224,133,165,0.5]
			               },
		                   label: "禅城区"
	                   }, 
	                   {
		                   value: "南海市", // code for interstates/freeways
		                   symbol: {
			                	    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
			                	    color: [182, 216, 91, 0.5]
			               },
		                   label: "南海区"
	                   }, 
	                   {
		                   value: "三水市", // code for interstates/freeways
		                   symbol: {
			                	    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
			                	    color: [209,228,209,0.5]
			               },
		                   label: "三水区"
	                   }, 
	                   {
		                   value: "顺德市", // code for interstates/freeways
		                   symbol: {
			                	    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
			                	    color: [220,199,191,0.5]
			               },
		                   label: "顺德区"
	                   }, 
	                   {
		                   value: "高明县", // code for U.S. highways
		                   symbol: {
		                	    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
		                	    color: [165,227,214,0.5]
		                   },
		                   label: "高明区"
	                 }]
	               };
	         var labelClass = new LabelClass({
//	        	 	symbol: {
//	        		    type: "text",  // autocasts as new TextSymbol()
//	        		    color: "white",
//	        		    haloSize: 1,
//	        		    haloColor: "black"
//	        		  },
	             symbol: {
	               type: "label-3d", // autocasts as new LabelSymbol3D()
	               symbolLayers: [{
	                 type: "text", // autocasts as new TextSymbol3DLayer()
	                 material: {
	                   color: "white"
	                 },
	                 size: 10
	               }]
	             },
	             labelPlacement: "above",
	             labelExpressionInfo: {
	               expression: "$feature.SNAME"
	             }
	           });
	         var xianLayer = new FeatureLayer({
	        	 //#595A5C
	             url: "http://10.2.3.222:6080/arcgis/rest/services/foshan/FeatureServer/2",
	            	 renderer: xianUniqueValueRenderer,
	            	 outFields: ["SNAME"],
	            	 labelsVisible: true,
	             labelingInfo: [labelClass]
	         });
	         var citydefaultRenderer = {
	                 type: "simple", // autocasts as new SimpleRenderer()
	                 symbol: {
	                   type: "simple-fill", // autocasts as new SimpleFillSymbol()
	                   color: [0, 255, 0, 0.1],
	                   outline: {
	                     color: [128, 128, 128],
	                     width: 1
	                   }
	                 }
	               };
	         var cityLayer = new FeatureLayer({
	        	 //#595A5C
	             url: "http://10.2.3.222:6080/arcgis/rest/services/foshan/FeatureServer/3",
	            	 renderer: citydefaultRenderer
	         });
	         var roadLayerRenderer = {
	                 type: "simple", // autocasts as new SimpleRenderer()
	                 symbol: {
	                   type: "simple-line", // autocasts as new SimpleLineSymbol()
	                   width: 1,
	                   color: [64, 255, 0]
	                 }
	               };
	         var roadLayer = new FeatureLayer({
	        	 //#595A5C
	             url: "http://10.2.3.222:6080/arcgis/rest/services/foshan/FeatureServer/1",
	            	 renderer: roadLayerRenderer
	         });
	         var featureLayerRenderer = {
	                 type: "simple", // autocasts as new SimpleRenderer()
	                 symbol: {
	                   type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
	                   size: 4,
	                   color: [214,0,120,0.7],
	                   outline: { // autocasts as new SimpleLineSymbol()
		    	            color: [255, 255, 255],
		    	            width: 0.5
		    	          }
	                 }
	               };
	         featureLayer = new FeatureLayer({//poi点
	        	 //#F103F2
	             url: "http://10.2.3.222:6080/arcgis/rest/services/foshan/FeatureServer/0",
	            	 renderer: featureLayerRenderer
	         });
	      // Create graphics layer and symbol to use for displaying the results of query    
		      resultsLyr = new GraphicsLayer();
		      searchResultLayer = new GraphicsLayer();
		      resultsBufferLayer = new GraphicsLayer();
		      map.add(resultsLyr);
		      map.add(searchResultLayer);
		      //map.add(cityLayer);
		      map.add(xianLayer);
	          map.add(featureLayer);
	          map.add(resultsBufferLayer);
	          
	         var legend = new Legend({
	           view: view,
	           layerInfos: [
	                        {
	                          layer: xianLayer,
	                          title: "foshan"
	                        }, 
	                        {
	                          layer: featureLayer,
	                          title: "poi"
	                        }]
	         });
	         view.ui.remove("compass");
	         view.ui.add(legend, "bottom-left");
	         
	           view.then(function() {
	             view.goTo(xianLayer.fullExtent);
	             initParallelGra();//初始化平行坐标系
	           });
	           
	       });

}
function gotoSelectPoiOnSceneview(name)
{
	//alert(name);
	myChart_select_seriesname = name;
	var poi_color = color_for_poi_category[name];
	require([
		"esri/Map",
		"esri/views/SceneView",
		"esri/layers/GraphicsLayer",
		"esri/symbols/PointSymbol3D",
		"esri/symbols/ObjectSymbol3DLayer",
		"esri/tasks/QueryTask",
		"esri/tasks/support/Query",
		"dojo/_base/array",
		"dojo/dom",
		"dojo/on",
		"dojo/domReady!"
	       ], function(Map, SceneView, GraphicsLayer, PointSymbol3D, ObjectSymbol3DLayer,
	    		      QueryTask, Query, arrayUtils, dom, on) {
		featureLayer.visible = false;
		var queryUrl = "http://10.2.3.222:6080/arcgis/rest/services/foshan/FeatureServer/0";
		var mtnSymbol = new PointSymbol3D({
	        symbolLayers: [new ObjectSymbol3DLayer({
	          resource: {
	            primitive: "cone"
	          }
	        })]
	      });
		
	      
	      var qTask = new QueryTask({
	        url: queryUrl
	      });
	      var params = new Query({
	          returnGeometry: true,
	          outFields: ["*"]
	        });
	   // Executes each time the button is clicked    
	      function doQuery(property,name) {
	        // Clear the results from a previous query
	    	  	view.graphics.removeAll();//清除之前遗留的缓冲区
	    	  	searchResultLayer.removeAll();//清除之前根据地名查询的结果图层
	    	  	resultsBufferLayer.removeAll();//清除之前的根据缓冲区过滤的poi图层
	        resultsLyr.removeAll();//清除之前的根据name过滤的poi图层
	        params.where = property+"='"+name+"'";

	        // executes the query and calls getResults() once the promise is resolved
	        // promiseRejected() is called if the promise is rejected
	        qTask.execute(params)
	          .then(getResults)
	          .otherwise(promiseRejected);
	      }
	      // Called each time the promise is resolved    
	      function getResults(response) {

	    	  	var markerSymbol = {
	    	          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
	    	          color: poi_color,
	    	          size: "4px",  // pixels
	    	          outline: { // autocasts as new SimpleLineSymbol()
	    	            color: [255, 255, 255],
	    	            width: 0.5
	    	          }
	    	        };
	        // Loop through each of the results and assign a symbol and PopupTemplate
	        // to each so they may be visualized on the map
	        var peakResults = arrayUtils.map(response.features, function(
	          feature) {

	        // Sets the symbol of each resulting feature to a cone with a 
	          // fixed color and width. The height is based on the mountain's elevation
	        		feature.symbol = 	markerSymbol;
//	          feature.symbol = new PointSymbol3D({
//	            symbolLayers: [new ObjectSymbol3DLayer({
//	              material: {
//	                //color: "red"
//	            	  color: poi_color
//	              },
//	              resource: {
//	                primitive: "sphere"
//	              },
//	              width: 100,
//	              height: 1000
//	            })]
//	          });
//	          console.log(feature);
	          return feature;
	        });

	        resultsLyr.addMany(peakResults);
 
//	        view.goTo(peakResults);
	        
	      }

	      // Called each time the promise is rejected    
	      function promiseRejected(err) {
	        console.error("Promise rejected: ", err.message);
	      }
	      doQuery("poi_catego",name);
	});
}
function doSearch()
{
	
	var address = $("#searchBox_text").val();
	//alert(address);
	require([
	 		"esri/Map",
	 		"esri/views/SceneView",
	 		"esri/layers/GraphicsLayer",
	 		"esri/symbols/PointSymbol3D",
	 		"esri/symbols/ObjectSymbol3DLayer",
	 		"esri/tasks/QueryTask",
	 		"esri/tasks/support/Query",
	 		"dojo/_base/array",
	 		"dojo/dom",
	 		"dojo/on",
	 		"dojo/domReady!"
	 	       ], function(Map, SceneView, GraphicsLayer, PointSymbol3D, ObjectSymbol3DLayer,
	 	    		      QueryTask, Query, arrayUtils, dom, on) {
			searchResultLayer.removeAll();
			var qTask = new QueryTask({
		        url: "http://10.2.3.222:6080/arcgis/rest/services/foshan/FeatureServer/0"
		    });
			var params = new Query({
	          returnGeometry: true,
	          outFields: ["*"]
	        });
			params.where = "poi_name"+"='"+address+"'";

	        // executes the query and calls getResults() once the promise is resolved
	        // promiseRejected() is called if the promise is rejected
	        qTask.execute(params)
	          .then(getResults)
	          .otherwise(promiseRejected);
	        // Called each time the promise is resolved    
		      function getResults(response) {

		        var peakResults = arrayUtils.map(response.features, function(
		          feature) {

		          feature.symbol = new PointSymbol3D({
		            symbolLayers: [new ObjectSymbol3DLayer({
		              material: {
		                color: "#FFFF00"
		              },
		              resource: {
		                primitive: "cylinder"
		              },
		              width: 100,
		              height:2000
		            })]
		          });
//		          
		          return feature;
		        });
		        
		        searchResultLayer.addMany(peakResults);
		        view.goTo(peakResults);
		       
		      }

		      // Called each time the promise is rejected    
		      function promiseRejected(err) {
		        console.error("Promise rejected: ", err.message);
		      }
	});
}
    