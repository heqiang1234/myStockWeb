
function show_k_line(data,type) {
    var myChart = echarts.init(document.getElementById('K-line-box'));
    //计算MA平均线，N日移动平均线=N日收盘价之和/N  dayCount要计算的天数(5,10,20,30)
    function calculateMA(Count) {
        var result = [];
        for (var i = 0, len = data.values.length; i < len; i++) {
            if (i < Count) {
                result.push('-');
                //alert(result);
                continue;   //结束单次循环，即不输出本次结果
            }
            var sum = 0;
            for (var j = 0; j < Count; j++) {
                //收盘价总和
                sum += data.values[i - j][1];
                //alert(sum);
            }
            result.push(sum / Count);
            // alert(result);
        }
        return result;
    }

    option = {
        title: {    //标题
            text: type,
            left: 0
        },
        tooltip: {  //提示框
            trigger: 'axis',    //触发类型：坐标轴触发
            axisPointer: {  //坐标轴指示器配置项
                type: 'cross'   //指示器类型，十字准星
            }
        },
        legend: {   //图例控件
            data: [type, 'MA5', 'MA10', 'MA20', 'MA30']
        },
        grid: {     //直角坐标系
            show: true,
            left: '10%',    //grid组件离容器左侧的距离
            right: '10%',
            bottom: '15%',
            backgroundColor:'#ccc'
        },
        xAxis: {
            type: 'category',   //坐标轴类型，类目轴
            data: data.categoryData,
            //scale: true,  //只在数字轴中有效
            boundaryGap: false,    //刻度作为分割线，标签和数据点会在两个刻度上
            axisLine: {onZero: false},
            splitLine: {show: false},   //是否显示坐标轴轴线
            //splitNumber: 20,    //坐标轴的分割段数，预估值，在类目轴中无效
            min: 'dataMin', //特殊值，数轴上的最小值作为最小刻度
            max: 'dataMax'  //特殊值，数轴上的最大值作为最大刻度
        },
        yAxis: {
            scale: true,    //坐标刻度不强制包含零刻度
            splitArea: {
                show: true  //显示分割区域
            }
        },
        dataZoom: [     //用于区域缩放
            {
                filterMode: 'filter',    //当前数据窗口外的数据被过滤掉来达到数据窗口缩放的效果  默认值filter
                type: 'inside', //内置型数据区域缩放组件
                start: 50,      //数据窗口范围的起始百分比
                end: 100        //数据窗口范围的结束百分比
            },
            {
                show: true,
                type: 'slider', //滑动条型数据区域缩放组件
                y: '90%',
                start: 50,
                end: 100
            }
        ],
        series: [   //图表类型
            {
                name: type,
                type: 'candlestick',    //K线图，也可以表示为k
                data: data.values,     //y轴对应的数据
                ////////////////////////图标标注/////////////////////////////
                markPoint: {    //图表标注
                    label: {    //标注的文本
                        normal: {   //默认不显示标注
                            show: true,
                            //position:['20%','30%'],
                            formatter: function (param) {   //标签内容控制器
                                return param != null ? Math.round(param.value) : '';
                            }
                        }
                    },
                    data: [     //标注的数据数组
                        {
                            name: 'XX标点',
                            coord: ['2013/5/31', 2300], //指定数据的坐标位置
                            value: 2300,
                            itemStyle: {    //图形样式
                                normal: {color: 'rgb(41,60,85)'}
                            }
                        },
                        //k线图谱数据显示最大值和最小值以及平均值标志
                        {
                            name: 'highest value',
                            type: 'max',    //最大值
                            valueDim: 'highest'     //在highest维度上的最大值 最高价
                        },
                        {
                            name: 'lowest value',
                            type: 'min',
                            valueDim: 'lowest'  //最低价
                        },
                        {
                            name: 'average value on close',
                            type: 'average',
                            valueDim: 'close'   //收盘价
                        }

                    ],
                    tooltip: {      //提示框
                        formatter: function (param) {
                            return param.name + '<br>' + (param.data.coord || '');
                        }
                    }
                },


                markLine: { //图标标线
                    symbol: ['none', 'none'],   //标线两端的标记类型
                    data: [
                        {
                            name: 'min line on close', //最小值标线
                            type: 'min',
                            valueDim: 'close'
                        },
                        {
                            name: 'max line on close',//最大值标线
                            type: 'max',
                            valueDim: 'close'
                        }
                    ]
                }
            },

            {   //MA5 5天内的收盘价之和/5
                name: 'MA5',
                type: 'line',
                data: calculateMA(5),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }
            },
            {
                name: 'MA10',
                type: 'line',
                data: calculateMA(10),
                smooth: true,
                lineStyle: {    //标线的样式
                    normal: {opacity: 0.5}
                }
            },
            {
                name: 'MA20',
                type: 'line',
                data: calculateMA(20),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }
            },
            {
                name: 'MA30',
                type: 'line',
                data: calculateMA(30),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }
            },
        ]
    };
    // 使用刚指定的配置项和数据显示图表
    myChart.setOption(option);
}