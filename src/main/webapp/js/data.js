/**
 * 
 */
//[0,259,61,238,73,21,0,1,7,109,11,55,97,42,84,6,73,369,24,33]
//[0,100,33,150,10,11,0,0,2,22,5,10,14,5,9,5,14,189,9,22]
//[4,186,26,157,249,18,0,0,12,132,23,21,190,37,41,14,90,307,43,49]
//[0,105,3,55,110,2,0,0,5,23,6,3,89,13,12,190,34,320,11,100]
var poi_category = ['汽车销售','餐饮服务','政府机构及社会团体','生活服务',
                    '地名地址信息','住宿服务','道路附属设施','摩托车服务','汽车维修',
                    '交通设施服务','汽车服务','医疗保健服务','公司企业','公共设施',
                    '科教文化服务','风景名胜','商务住宅','购物服务',
                    '金融保险服务','体育休闲服务'];
var color_for_poi_category = {
		'汽车销售':'#00F5FF',
		'餐饮服务':'#66CDAA',//
		'政府机构及社会团体':'#00FF7F',
		'生活服务':'#C0FF3E',//
        '地名地址信息':'#8B658B',
        '住宿服务':'#FF6A6A',
        '道路附属设施':'#FF3030',
        '摩托车服务':'#FF1493',
        '汽车维修':'#FFBBFF',
        '交通设施服务':'#00DDD5',
        '汽车服务':'#008B8B',
        '医疗保健服务':'#1E90FF',//
        '公司企业':'#FF6347',//
        '公共设施':'#A020F0',
        '科教文化服务':'#FF00FF',//
        '风景名胜':'#FF1493',//
        '商务住宅':'#FF8C00',
        '购物服务':'#FA8072',//
        '金融保险服务':'#CD5C5C',
        '体育休闲服务':'#32CD32'//
		};
var color_kinds = ['#00F5FF','#66CDAA','#00FF7F','#C0FF3E','#8B658B','#FF6A6A'];
var color_kinds1 = [[0,245,255,0.7],[102,205,170,0.7],[0,255,127,0.7],
                    [192,255,62,0.7],[139,101,139,0.7],[255,106,106,0.7]];
var data1 = [//禅城区
    [1,4,9,8,7,5,6,2]
   ];
var data2 = [//高明区
	[3,5,4,3,2,5,8,9]
   ];
var data3 = [//南海区
	[4,3,6,9,6,8,9,3]
   ];
var data4 = [//三水区
    [1,3,5,3,6,5,2,1]
   ];
var data5 = [//顺德区
    [4,7,9,3,2,5,3,7]
   ];
var schema = [
              {name: '餐饮服务', index: 0, text: '餐饮服务'},
              {name: '生活服务', index: 1, text: '生活服务'},
              {name: '医疗保健服务', index: 2, text: '医疗保健服务'},
              {name: '公司企业', index: 3, text: '公司企业'},
              {name: '科教文化服务', index: 4, text: '科教文化服务'},
              {name: '风景名胜', index: 5, text: '风景名胜'},
              {name: '购物服务', index: 6, text: '购物服务'},
              {name: '体育休闲服务', index: 7, text: '体育休闲服务'}
          ];
var lineStyle = {
	    normal: {
	        width: 2,
	        opacity: 0.5
	    }
	};
parallelOption = {
		title : {
		        text: '佛山市各区功能结构分析',
		        textStyle: {
	            color: '#AADFFF',
	            fontSize: 16
		        }
		},
	    backgroundColor: '#474848',
	    legend: {
//	        top: 5,
	        data: ['禅城区','高明区','南海区','三水区','顺德区'],
	        itemGap: 20,
	        textStyle: {
	            color: '#AADFFF',
	            fontSize: 14
	        }
	    },
	    toolbox: {
	        iconStyle: {
	            normal: {
	                borderColor: '#fff'
	            },
	            emphasis: {
	                borderColor: '#b1e4ff'
	            }
	        }
	    },
	    brush: {
	    		throttleType: 'debounce',
	        throttleDelay: 300,
	        toolbox:['clear']
	    },
	    parallelAxis: [
	        {dim: 0, name: schema[0].text},
	        {dim: 1, name: schema[1].text},
	        {dim: 2, name: schema[2].text},
	        {dim: 3, name: schema[3].text},
	        {dim: 4, name: schema[4].text},
	        {dim: 5, name: schema[5].text},
	        {dim: 6, name: schema[6].text},
	        {dim: 7, name: schema[7].text}
	    ],
	    
	    parallel: {
	        left: 35,
	        //right: '18%',
	        bottom: 15,
	        parallelAxisDefault: {
	            type: 'value',
	            name: 'AQI指数',
	            nameLocation: 'end',
	            nameGap: 20,
	            nameTextStyle: {
	                color: '#AADFFF',
	                fontSize: 12
	            },
	            axisLine: {
	                lineStyle: {
	                    color: '#aaa'
	                }
	            },
	            axisTick: {
	                lineStyle: {
	                    color: '#777'
	                }
	            },
	            splitLine: {
	                show: false
	            },
	            axisLabel: {
	                textStyle: {
	                    color: '#AADFFF'
	                }
	            }
	        }
	    },
	    series: [
	        {
	            name: '禅城区',
	            type: 'parallel',
	            lineStyle:{
	                normal:{
	                    color:"#E085A5",
	                    width: 4,
	                    opacity: 0.6
	                }
	            },
	            data: data1
	        },
	        {
	            name: '高明区',
	            type: 'parallel',
	            lineStyle:{
	                normal:{
	                    color:"#A5E3D6",
	                    width: 4,
	                    opacity: 0.6
	                }
	            },
	            data: data2
	        },
	        {
	            name: '南海区',
	            type: 'parallel',
	            lineStyle:{
	                normal:{
	                    color:"#B6D85B",
	                    width: 4,
	                    opacity: 0.6
	                }
	            },
	            data: data3
	        },
	        {
	            name: '三水区',
	            type: 'parallel',
	            lineStyle:{
	                normal:{
	                    color:"#D1E4D1",
	                    width: 4,
	                    opacity: 0.6
	                }
	            },
	            data: data4
	        },
	        {
	            name: '顺德区',
	            type: 'parallel',
	            lineStyle:{
	                normal:{
	                    color:"#DCC7BF",
	                    width: 4,
	                    opacity: 0.6
	                }
	            },
	            data: data5
	        }
	    ]
	};
parallelOption_new = {
		color:['#2FC8EC','#dbfbff'],
	    backgroundColor: '#474848',
	    brush: {
	        toolbox:['clear']
	    },
	    parallelAxis: [],
	    
	    parallel: {
	        left: 35,
	        //right: '18%',
	        bottom: 15,
	        parallelAxisDefault: {
	            type: 'value',
	            name: 'AQI指数',
	            nameLocation: 'end',
	            nameGap: 20,
	            nameTextStyle: {
	                color: '#AADFFF',
	                fontSize: 12
	            },
	            axisLine: {
	                lineStyle: {
	                    color: '#aaa'
	                }
	            },
	            axisTick: {
	                lineStyle: {
	                    color: '#777'
	                }
	            },
	            splitLine: {
	                show: false
	            },
	            axisLabel: {
	                textStyle: {
	                    color: '#AADFFF'
	                }
	            }
	        }
	    },
	    series: []
	};

SE_option = {
	    title : {
			        text: '站点周边设施分析',
			        textStyle: {
		            color: '#AADFFF',
		            fontSize: 16
			        }
		},
	    backgroundColor: '#474848',
	    color:['#2FC8EC','#9D88EE'],
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross',
	            crossStyle: {
	                color: '#999'
	            }
	        }
	    },
	    toolbox: {
	        feature: {
	            dataView: {show: true, readOnly: false},
	            magicType: {show: true, type: ['line', 'bar']},
	            restore: {show: true},
	            saveAsImage: {show: true}
	        },
	        iconStyle:{
	     		normal:{
	     			color:'#AADFFF'
	     		}
	        }
	    },
	    legend: {
	        data:['POI','微博签到'],
	        textStyle: {
	 	    	color: '#AADFFF',
	 	    	fontSize: 16
	 	    }
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: poi_category,///////
	            axisPointer: {
	                type: 'shadow'
	            },
	            axisLine: {
	 	    		lineStyle: {
	 	    		    color: '#AADFFF'
	 	    		}
	 	    	}
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            name: 'POI',
	            nameTextStyle: {
		 	    	color: '#AADFFF',
		 	    	fontSize: 16
		 	    },
	             axisLine: {
	                lineStyle: {
	                    color: '#fff'
	                }
	            }
	        },
	        {
	            type: 'value',
	            name: '微博签到',
	            nameTextStyle: {
		 	    	color: '#AADFFF',
		 	    	fontSize: 16
		 	    },
	             axisLine: {
	                lineStyle: {
	                    color: '#fff'
	                }
	            }
	        }
	    ],
	    series: [
	        {
	            name:'POI',
	            type:'bar',
	            data:[]////////
	        },
	        
	        {
	            name:'微博签到',
	            type:'line',
	            yAxisIndex: 1,
	            data:[]/////////
	        }
	    ]
	};
function getVirtulData(year) {
    year = year || '2017';
    var date = +echarts.number.parseDate(year + '-01-01');
    var end = +echarts.number.parseDate((+year + 1) + '-01-01');
    var dayTime = 3600 * 24 * 1000;
    var data = [];
    for (var time = date; time < end; time += dayTime) {
        data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 5000)
        ]);
    }
    return data;
}

//var data = getVirtulData(2017);

peopleDensity_option = {
	backgroundColor: '#474848',

//    title: {
//        top: 0,
//        text: '2017年站点周边人群统计',
//        
//        left: 'center',
//        textStyle: {
//            color: '#fff'
//        }
//    },
    tooltip : {
        trigger: 'item'
    },
    legend: {
    		top: '0',
        left: 'right',
        data:['人数'],
        textStyle: {
            color: '#fff'
        }
    },
    calendar: [{
        top: 20,
        left: 'center',
        range: ['2017-05-01', '2017-06-30'],
        splitLine: {
            show: true,
            lineStyle: {
                color: '#000',
                width: 4,
                type: 'solid'
            }
        },
        dayLabel: {
            color: '#fff',
            firstDay: 1 // 从周一开始
        },
        monthLabel:{
            color: '#fff'
        },
        yearLabel: {
            formatter: '{start}年站点周边人群统计',
            textStyle: {
                color: '#fff'
            },
            fontSize:12
        },
        itemStyle: {
            normal: {
                color: '#323c48',
                borderWidth: 1,
                borderColor: '#111'
            }
        }
    }],
    series : [
        {
            name: '人数',
            type: 'scatter',
            coordinateSystem: 'calendar',
            data: [],
            symbolSize: function (val) {
                return val[1] / 250;
            },
            itemStyle: {
                normal: {
                    color: '#4B90DE'
                }
            }
        },
        {
            name: 'Top',
            type: 'effectScatter',
            coordinateSystem: 'calendar',
//            data: data.sort(function (a, b) {
//                return b[1] - a[1];
//            }).slice(0, 12),
            data:[],
            symbolSize: function (val) {
                return val[1] / 500;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            itemStyle: {
                normal: {
                    color: '#f4e925',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 1
        }
    ]
};
