/**
 * 城市功能区
 */
function fun_analysisUFA()
{
	//alert("fun_analysisUFA");
	require([
	         "esri/Map",
	         "esri/views/SceneView",
	         "esri/layers/FeatureLayer",
	         "esri/layers/GraphicsLayer",
	         "esri/layers/support/LabelClass",
	         "esri/widgets/Legend",
	         "dojo/domReady!"
	       ], function(Map, SceneView,FeatureLayer,GraphicsLayer,LabelClass,Legend) {
		
			var poiAreaUniqueValueRenderer = {
                type: "unique-value", // autocasts as new UniqueValueRenderer()
                defaultSymbol: { type: "simple-fill" },
                defaultLabel: "Other",
                field: "poi_catego",
                uniqueValueInfos: [
                  {
	                   value: "餐饮服务", // code for interstates/freeways
	                   symbol: {
		                	    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
		                	    color: [102,205,170,0.7]
		               },
	                   label: "餐饮服务"
                  }, 
                  {
	                   value: "生活服务", // code for interstates/freeways
	                   symbol: {
		                	    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
		                	    color: [192,255,62,0.7]
		               },
	                   label: "生活服务"
                  }, 
                  {
	                   value: "医疗保健服务", // code for interstates/freeways
	                   symbol: {
		                	    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
		                	    color: [30,144,255,0.7]
		               },
	                   label: "医疗保健服务"
                  }, 
                  {
	                   value: "公司企业", // code for interstates/freeways
	                   symbol: {
		                	    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
		                	    color: [252,157,154,0.7]
		               },
	                   label: "公司企业"
                  }, 
                  {
	                   value: "科教文化服务", // code for U.S. highways
	                   symbol: {
	                	    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
	                	    color: [249,205,173,0.7]
	                   },
	                   label: "科教文化服务"
                },
               {
                   value: "风景名胜", // code for interstates/freeways
                   symbol: {
	                	    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
	                	    color: [200,200,169,0.7]
	               },
                   label: "风景名胜"
              }, 
              {
                  value: "购物服务", // code for interstates/freeways
                  symbol: {
	                	    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
	                	    color: [131,175,155,0.7]
	               },
                  label: "购物服务"
             },
             {
                 value: "体育休闲服务", // code for interstates/freeways
                 symbol: {
	                	    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
	                	    color: [50,205,50,0.7]
	               },
                 label: "体育休闲服务"
             }]
            };
			var labelClass = new LabelClass({
				minScale:150000,
	             symbol: {
	               type: "label-3d", // autocasts as new LabelSymbol3D()
	               symbolLayers: [{
	                 type: "text", // autocasts as new TextSymbol3DLayer()
	                 material: {
	                   color: [255,255,255,0.8]
	                 },
	                 size: 6
	               }]
	             },
	             labelPlacement: "above",
	             labelExpressionInfo: {
	               expression: "$feature.poi_catego"
	             }
	           });
			var poiAreaLayer = new FeatureLayer({
	        	 //#595A5C
	             url: "http://10.2.3.222:6080/arcgis/rest/services/foshan/FeatureServer/4",
	            	 renderer: poiAreaUniqueValueRenderer,
	            	 outFields: ["poi_catego"],
	            	 labelsVisible: true,
	             labelingInfo: [labelClass]
	         });
			view.graphics.removeAll();
			
			map.remove(resultsLyr);
			map.remove(searchResultLayer);
			map.remove(resultsBufferLayer);
			
			map.add(poiAreaLayer);
			
			view.ui.empty("bottom-left");
			var legend = new Legend({
		           view: view,
		           layerInfos: [
		                        {
		                          layer: poiAreaLayer,
		                          title: "POI Area"
		                        }]
		         });
			view.ui.add(legend, "bottom-left");
	});
}