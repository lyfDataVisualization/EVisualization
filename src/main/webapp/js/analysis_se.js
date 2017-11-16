/**
 * 网络空间密度分析
 */
function AddSubway()
{
//	alert("fun_analysisDANS");
	require([
	         "esri/Map",
	         "esri/views/SceneView",
	         "esri/layers/FeatureLayer",
	         "esri/layers/GraphicsLayer",
	         "esri/layers/support/LabelClass",
	         "esri/widgets/Legend",
	         "esri/widgets/Sketch/SketchViewModel",
	         "esri/Graphic",
	         "esri/tasks/IdentifyTask",
	         "esri/tasks/support/IdentifyParameters",
	         "dojo/_base/array",
	         "dojo/on",
	         "dojo/dom",
	         "dojo/domReady!"
	       ], function(Map, SceneView,FeatureLayer,GraphicsLayer,LabelClass,Legend,
	    		   SketchViewModel, Graphic,IdentifyTask, IdentifyParameters,
	    		      arrayUtils, on, dom) {
			var identifyTask, params;
			var bufferLayer=new FeatureLayer({//道路图层
		       	 //#595A5C
	            url: "http://10.2.3.222:6080/arcgis/rest/services/foshan_subway/FeatureServer/2"
	            
	        });
		// URL to the map service where the identify will be performed
	        var subwayPointURL =
	           "http://10.2.3.222:6080/arcgis/rest/services/foshan_subway/MapServer";
		
	        var markerSymbol = {
	                type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
	                color: [226, 119, 40],
	                outline: { // autocasts as new SimpleLineSymbol()
	                  color: [255, 255, 255],
	                  width: 2
	                }
	              };
	     // executeIdentifyTask() is called each time the view is clicked
	        on(view, "click", executeIdentifyTask);

	        // Create identify task for the specified map service
	        identifyTask = new IdentifyTask(subwayPointURL);

	        // Set the parameters for the Identify
	        params = new IdentifyParameters();
	        params.tolerance = 3;
	        params.layerIds = [0];
	        params.layerOption = "top";
	        params.width = view.width;
	        params.height = view.height;
	        
	      /*
	      view.then(function(evt) {
	        // create a new sketch view model
	        var sketchViewModel = new SketchViewModel({
	          view: view,
	          pointSymbol: { // symbol used for points
	            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
	            style: "square",
	            color: "#8A2BE2",
	            size: "16px",
	            outline: { // autocasts as new SimpleLineSymbol()
	              color: [255, 255, 255],
	              width: 3 // points
	            }
	          },
	          polylineSymbol: { // symbol used for polylines
	            type: "simple-line", // autocasts as new SimpleMarkerSymbol()
	            color: "#F2C32A",
	            width: "4",
	            style: "dash"
	          },
	          polygonSymbol: { // symbol used for polygons
	            type: "simple-fill", // autocasts as new SimpleMarkerSymbol()
	            color: "rgba(138,43,226, 0.8)",
	            style: "solid",
	            outline: {
	              color: "white",
	              width: 1
	            }
	          }
	        });

	        
	        sketchViewModel.on("draw-complete", function(evt) {
	          view.graphics.add(evt.graphic);
	          alert("ok");
	          //setActiveButton();
	        });

	      
	        var drawLineButton = document.getElementById("polylineButton");
	        drawLineButton.onclick = function() {
	          // set the sketch to create a polyline geometry
	          sketchViewModel.create("polyline");
	          //setActiveButton(this);
	        };

	       
	        document.getElementById("resetBtn").onclick = function() {
	          view.graphics.removeAll();
	          sketchViewModel.reset();
	          //setActiveButton();
	        };

	        function setActiveButton(selectedButton) {
	          // focus the view to activate keyboard shortcuts for sketching
	          view.focus();
	          var elements = document.getElementsByClassName("active");
	          for (var i = 0; i < elements.length; i++) {
	            elements[i].classList.remove("active");
	          }
	          if (selectedButton) {
	            selectedButton.classList.add("active");
	          }
	        }
	        
	     });
		*/
		// Executes each time the view is clicked
	      function executeIdentifyTask(event) {
	    	  	
	        // Set the geometry to the location of the view click
	        params.geometry = event.mapPoint;
	        //console.log(event.mapPoint);
	        params.mapExtent = view.extent;
	        dom.byId("mapview").style.cursor = "wait";

	        // This function returns a promise that resolves to an array of features
	        // A custom popupTemplate is set for each feature based on the layer it
	        // originates from
	        identifyTask.execute(params).then(function(response) {

	          var results = response.results;
//	          console.log(results);
	          
	          return arrayUtils.map(results, function(result) {

	            var feature = result.feature;
	            
	            return feature;
	          });
	        }).then(showBuffer); // Send the array of features to showPopup()

	        // Shows the results of the Identify in a popup once the promise is resolved
	        function showBuffer(response) {
	        		 
		          if (response.length > 0) {
		        	  	var feature = response[0];
		        	  	view.graphics.removeAll();//清除之前遗留的缓冲区
		        	  	
		        	  	view.goTo(feature);
		        	  	map.remove(bufferLayer);//删除之前的
		            var name = feature.attributes.name;
		            var distance = $('#analysisSE_Distance option:selected').val();//Distance
		            if(name=="南桂路站")
		            	{
		            		
		            		if(distance=="2")
		            		{
		            			bufferLayer = new FeatureLayer({//道路图层
		           		       	 //#595A5C
		           	            url: "http://10.2.3.222:6080/arcgis/rest/services/foshan_subway/FeatureServer/2"
		           	            
		           	        });
		            			
		            		}
		            		else{//distance=="3"
		            			bufferLayer = new FeatureLayer({//道路图层
			           		       	 //#595A5C
			           	            url: "http://10.2.3.222:6080/arcgis/rest/services/foshan_subway/FeatureServer/3"
			           	            
			           	    });
		            		}
		            		
		            		bufferLayer.renderer=bufferLayerrenderer;
		            		map.add(bufferLayer);
		            	}
		            if(name=="千灯湖站")
		            	{
			            	if(distance=="2")
		            		{
			            		bufferLayer = new FeatureLayer({//道路图层
			           		       	 //#595A5C
			           	            url: "http://10.2.3.222:6080/arcgis/rest/services/foshan_subway/FeatureServer/4"
			           	            
			           	    });
		            		}
		            		else{//distance=="3"
		            			bufferLayer = new FeatureLayer({//道路图层
			           		       	 //#595A5C
			           	            url: "http://10.2.3.222:6080/arcgis/rest/services/foshan_subway/FeatureServer/5"
			           	            
			           	    });
		            		}
			            	bufferLayer.renderer=bufferLayerrenderer;
			            	map.add(bufferLayer);
		            	}
		            aboutStreet(name,distance);
		          }
		          dom.byId("mapview").style.cursor = "auto";
	        }
	      }
	      
		var subwayLineRenderer = {
		          type: "simple", // autocasts as new SimpleRenderer()
		          symbol: {
		            type: "simple-line", // autocasts as new SimpleLineSymbol()
		            width: 4,
		            color: [160,224, 255,0.8]
		          }
		        };
		var bufferLayerrenderer = {
				  type: "simple",  // autocasts as new SimpleRenderer()
				  symbol: {
				    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
				    color: [104, 58, 183,0.4],
				    outline: {  // makes the outlines of all features consistently light gray
				      color: "lightgray",
				      width: 0.5
				    }
				  }
			};
		var subwayPointRenderer = {
                type: "simple", // autocasts as new SimpleRenderer()
                symbol: {
                  type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                  size: 6,
                  color: "#FF4000",
                  outline: { // autocasts as new SimpleLineSymbol()
			            color: [255, 255, 255],
			            width: 1
			          }
                }
              };
//		var weiboLayerRenderer = {
//                type: "simple", // autocasts as new SimpleRenderer()
//                symbol: {
//                  type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
//                  size: 6,
//                  color: "#FF4000"
//                }
//              };
		var subwayLineLayer = new FeatureLayer({//道路图层
       	 //#595A5C
            url: "http://10.2.3.222:6080/arcgis/rest/services/foshan_subway/FeatureServer/1",
            	renderer: subwayLineRenderer
//            	,
//            	popupTemplate: { // autocasts as new PopupTemplate()
//                    content: [{
//                      type: "fields",
//                      fieldInfos: [{
//                        fieldName: "fclass",
//                        label: "等级"
//                      }, {
//                        fieldName: "name",
//                        label: "名称"
//                      }]
//                    }]
//                  }
        });
		var labelClass = new LabelClass({
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
              expression: "$feature.name"
            }
          });
		var subwayPointLayer = new FeatureLayer({//道路图层
	       	 //#595A5C
	            url: "http://10.2.3.222:6080/arcgis/rest/services/foshan_subway/FeatureServer/0",
	            	renderer: subwayPointRenderer,
	            	outFields: ["SNAME"],
	            	labelsVisible: true,
		        labelingInfo: [labelClass]
	        });
//		var poiLayer = new FeatureLayer({//poi数据
//	       	 //#595A5C
//	            url: "http://10.2.3.222:6080/arcgis/rest/services/foshan/FeatureServer/0"
//	            	
//	        });
//		var weiboLayer = new FeatureLayer({//微博签到数据
//	       	 //#595A5C
//	            url: "http://10.2.3.222:6080/arcgis/rest/services/nanhaiweibo_road/FeatureServer/1"
////	            	renderer: weiboLayerRenderer 
//	        });
		map.removeAll();
//		map.add(poiLayer);
//		map.add(weiboLayer);
//		map.basemap = "osm";
		map.add(subwayPointLayer);
		map.add(subwayLineLayer);
		view.ui.empty("bottom-left");
		var legend = new Legend({
	           view: view,
	           layerInfos: [
	                        {
	                          layer: subwayLineLayer,
	                          title: "Subway"
	                        }]
	         });
		view.ui.add(legend, "bottom-left");
	});
}
function Heat_Map()
{
	require([
	         "esri/Map",
	         "esri/views/SceneView",
	         "esri/layers/FeatureLayer",
	         "esri/layers/GraphicsLayer",
	         "esri/layers/MapImageLayer",
	         "esri/layers/support/LabelClass",
	         "esri/widgets/Legend",
	         "esri/widgets/Sketch/SketchViewModel",
	         "esri/Graphic",
	         "dojo/domReady!"
	       ], function(Map, SceneView,FeatureLayer,GraphicsLayer,MapImageLayer,LabelClass,Legend,
	    		   SketchViewModel, Graphic) {
		
			var heat_map_Layer = new MapImageLayer({//poi数据
	       	 //#595A5C
	            url: "http://10.2.3.222:6080/arcgis/rest/services/nanhai_weibo_heatmap/MapServer"
	            	
	        });
			map.removeAll();
//			map.basemap = "osm";
			map.add(heat_map_Layer);
	});
}
function aboutStreet(name,distance)
{
	SE_option.series[0].data.splice(0,SE_option.series[0].data.length);
	SE_option.series[1].data.splice(0,SE_option.series[0].data.length);
	
	if(name=="南桂路站")
	{
		SE_option.series[0].data=[0,259,61,238,73,21,0,1,7,109,11,55,97,42,84,6,73,369,24,33];
		SE_option.series[1].data=[0,100,33,150,10,11,0,0,2,22,5,10,14,5,9,105,14,189,9,22];
	}
	if(name=="千灯湖站")
	{
		SE_option.series[0].data=[4,186,26,157,249,18,0,0,12,132,23,21,190,37,41,14,90,307,43,49];
		SE_option.series[1].data=[0,105,3,55,110,2,0,0,5,23,6,3,89,13,12,190,34,320,11,100];
	}
	myChart_parallel.clear();
	myChart_parallel.setOption(SE_option);//data.js
	//人口统计
	var myChart_peopleDensity = echarts.init(document.getElementById('analysisSE_peopleDensity'));
	var data0 = getVirtulData(2017);
	var data1 = data0.sort(function (a, b) {
		return b[1] - a[1];
    }).slice(0, 12);
	myChart_peopleDensity.clear();
	peopleDensity_option.series[0].data=data0;
	peopleDensity_option.series[1].data=data1;
	myChart_peopleDensity.setOption(peopleDensity_option);
}