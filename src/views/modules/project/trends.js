
export let option = {
  title: {
    text: '产值分析图',
    left: 'center',
    textStyle: {
      color: '#3b3b3b',
      fontSize: 14
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  grid: {
      left: '3%',     //图表距离左右上下之间的距离
      right: '4%',
      top: '30%',
      bottom: '0',
      containLabel: true
  },
  legend: {
    type: 'scroll',
    x: 'center',
    top:"40",
    data: ['','分包产值', '土建产值', '安装产值'],
    textStyle: {// 图例文字的样式
      color: '#636363',
      fontSize: 14
    }
  },
  toolbox: {
    show: false

  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLine: {
        lineStyle: {
          color: '#000'
        }
      },
      axisPointer: {
        type: 'shadow'
      },
      splitArea: {
        show: false,
        lineStyle: {
          color: ['#aaa', '#ddd'],
          width: 1,
          type: 'dashed'
        }
      }

    }
  ],
  yAxis: [
    {
        type: 'value',
        min: 0,
        max: 1000,
        interval: 200,
        axisLabel: {
            formatter: '{value}'
        }
    },
  ],
  series: [
    {
      name: '分包产值',
      type: 'bar',
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
    },
    {
      name: '土建产值',
      type: 'bar',
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]

    },
    {
      name: '安装产值',
      type: 'bar',
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]

    }
  ]
}

export let workerPlace={
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)'
  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    formatter: function (name) {
      if (!name) return ''
      if (name.length > 3) {
        return name.slice(0, 3) + '...'
      }else{
        return name
      }
    },
    x: 'right',
    top: '10px',    
    textStyle: {// 图例文字的样式
      color: '#fff',
      fontSize: 14
    },    
    data: []

  },

  series: [
    {
      name: '',
      type: 'pie',
      selectedMode: 'single',
      center: ['30%', '50%'],
      radius: [0, '30%'],
      label: {
        normal: {
          show: false,
          position: 'inner',
          textStyle: {
            fontWeight: 300,
            fontSize: 14   // 文字的字体大小
          }
          // formatter: '{d}%'
        }
      },
      labelLine: {
        normal: {
          show: true
        }
      },
      data: []
    },
    {
      name: '',
      type: 'pie',
      center: ['30%', '50%'],
      radius: ['50%', '70%'],
      label: {

        normal: {
          // show: false,
          formatter: '{c}  ',
          // backgroundColor: '#119BD8',
          borderColor: '#119BD8',
          shadowBlur: 3,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
          shadowColor: '#999',
          // padding: [0, 7],
          rich: {
            a: {
              color: '#999',
              lineHeight: 22,
              align: 'center'
            },
            hr: {
              borderColor: '#aaa',
              width: '100%',
              borderWidth: 0.5,
              height: 0
            },
            b: {
              fontSize: 16,
              lineHeight: 33
            },
            per: {
              color: '#eee',
              backgroundColor: '#334455',
              padding: [2, 4],
              borderRadius: 2
            }
          }
        }
      },
      data: []
    }
  ]
}
export let senvenData= {
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    },
    formatter: (params) => {
      let info = params;
      var newArr = [];
      for (var i = 0; i < info.length; i++) { 
          if(info[i].value !== 0){
              newArr.push(info[i]);
          }
      }
      var num=0;
      var num=0;
      for(var i in newArr){
           num += newArr[i].value
      
      }
      for (var j = 0; j < newArr.length; j++) { 
              return `
              <div>
                  <div>总班组：${newArr.length}个</div>
                  <div>总人数：${num}人</div>
              </div>
              `
      }

  }
  },
  legend: {
    show: false,
    data: [],
    textStyle: {// 图例文字的样式
      color: '#00EAFF',
      fontSize: 12
    }
  },
  grid: {
    left: '1%',
    right: '1%',
    bottom: '1%',
    top: '1%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    splitLine: {
      show: false,
      lineStyle: {
        color: ['#00EAFF'],
        width: 1,
        type: 'solid'
      }
    },
    axisLine: {
      lineStyle: {
        color: '#00EAFF'
      }
    }
  },
  yAxis: {
    type: 'category',
    data: [],
    axisLine: {
      lineStyle: {
        color: '#00EAFF'
      }
    }
  },
  series: [
  ]
}
export let pie= {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
        {value: 335, name: '直接访问'},
        {value: 310, name: '邮件营销'},
        {value: 234, name: '联盟广告'},
        {value: 135, name: '视频广告'},
        {value: 1548, name: '搜索引擎'}
      ]
    }
  ]
}
export let pieTopWeightPie={
  title: {
    zlevel: 0,
    text: [
      '{b}'
    ].join('\n'),
    rich: {
      value: {
        color: '#00E4FF',
        fontWeight: 'bold',
        lineHeight: 40
      },
      name: {
        color: '#00E4FF',
        // lineHeight: 20
      }
    },
    top: 'center',
    left: '70%',
    textAlign: 'center',
    textStyle: {
      color: '#636363',
      fontSize: 14,
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'

  },
  legend: {
    icon: 'circle',
    type: 'scroll',
    orient: 'vertical',
    formatter: function (name) {
      if (!name) return ''
      if (name.length > 5) {
        return name.slice(0, 5) + '...'
      }else{
        return name
      }
    },
    x: 'left',
    top:50,
    data: [],
    textStyle: {// 图例文字的样式
      color: '#4d4d4d',
      fontSize: 12
    },
    height:200,

  },
  series: [
    {
      name: '质量管理',
      type: 'pie',
      radius: ['50%', '30%'],
      center: ['72%', '50%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: false,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: []
    }
  ]
}

export let teamoption = {
  title: {
    zlevel: 0,
    text: [
      '{b}'
    ].join('\n'),
    rich: {
      value: {
        color: '#00E4FF',
        fontWeight: 'bold',
        lineHeight: 40
      },
      name: {
        color: '#00E4FF',
        // lineHeight: 20
      }
    },
    top: 'center',
    left: '68%',
    textAlign: 'center',
    textStyle: {
      color: '#636363',
      fontSize: 14,
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    icon: 'circle',
    type: 'scroll',
    orient: 'vertical',
    formatter: function (name) {
      if (!name) return ''
      if (name.length > 5) {
        return name.slice(0, 5) + '...'
      }else{
        return name
      }
    },

    x: 'left',
    top:50,
    data: [],
    textStyle: {// 图例文字的样式
      color: '#4d4d4d',
      fontSize: 12
    },
    height:200,
  },
  toolbox: {
    show: false,
    feature: {
      mark: {show: true},
      dataView: {show: true, readOnly: false},
      magicType: {
        show: true,
        type: ['pie', 'funnel']
      },
      restore: {show: true},
      saveAsImage: {show: true}
    }
  },
  calculable: true,
  series: [
    {
      name: '质量管理',
      type: 'pie',
      // radius : [20, 110],
      radius: ['20%', '50%'],
      center: ['70%', '50%'],
      roseType: 'radius',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      lableLine: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      data: [
        // {value: 10, name: 'rose1'},
        // {value: 5, name: 'rose2'},
        // {value: 15, name: 'rose3'},
        // {value: 25, name: 'rose4'},
        // {value: 20, name: 'rose5'},
        // {value: 35, name: 'rose6'},
        // {value: 30, name: 'rose7'},
        // {value: 40, name: 'rose8'}
      ]
    }

  ]
}
// 安全部分
export let safepieToptPie={
  title: {
    zlevel: 0,
    text: [
      '{b}'
    ].join('\n'),
    rich: {
      value: {
        color: '#00E4FF',
        fontWeight: 'bold',
        lineHeight: 40
      },
      name: {
        color: '#00E4FF',
        // lineHeight: 20
      }
    },
    top: 'center',
    left: '70%',
    textAlign: 'center',
    textStyle: {
      color: '#636363',
      fontSize: 14,
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'

  },
  legend: {
    icon: 'circle',
    type: 'scroll',
    orient: 'vertical',
    formatter: function (name) {
      if (!name) return ''
      if (name.length > 5) {
        return name.slice(0, 5) + '...'
      }else{
        return name
      }
    },
    x: 'left',
    top:50,
    data: [],
    textStyle: {// 图例文字的样式
      color: '#4d4d4d',
      fontSize: 12
    },
    height:200,
  },
  series: [
    {
      name: '安全管理',
      type: 'pie',
      radius: ['50%', '30%'],
      center: ['72%', '50%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: false,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
        // {value: 335, name: '直接访问'},
        // {value: 310, name: '邮件营销'},
        // {value: 234, name: '联盟广告'},
        // {value: 135, name: '视频广告'},
        // {value: 1548, name: '搜索引擎'}
      ]
    }
  ]
}
export let safepieToptTeamPie={
  title: {
    zlevel: 0,
    text: [
      '{b}'
    ].join('\n'),
    rich: {
      value: {
        color: '#00E4FF',
        fontWeight: 'bold',
        lineHeight: 40
      },
      name: {
        color: '#00E4FF',
        // lineHeight: 20
      }
    },
    top: 'center',
    left: '68%',
    textAlign: 'center',
    textStyle: {
      color: '#636363',
      fontSize: 14,
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'

  },
  legend: {
    icon: 'circle',
    type: 'scroll',
    orient: 'vertical',
    formatter: function (name) {
      if (!name) return ''
      if (name.length > 5) {
        return name.slice(0, 5) + '...'
      }else{
        return name
      }
    },

    x: 'left',
    top:50,
    data: [],
    textStyle: {// 图例文字的样式
      color: '#4d4d4d',
      fontSize: 12
    },
    height:200,
  },
  series: [
    {
      name: '安全管理',
      type: 'pie',
      radius: ['20%', '50%'],
      center: ['70%', '50%'],
      roseType: 'radius',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      lableLine: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      data: [
        // {value: 335, name: '直接访问'},
        // {value: 310, name: '邮件营销'},
        // {value: 234, name: '联盟广告'},
        // {value: 135, name: '视频广告'},
        // {value: 1548, name: '搜索引擎'}
      ]
    }
  ]
}
export let fenxioption = {
  title: {
    text: '质量安全数量统计图',
    left: 'center',
    textStyle: {
      color: '#3b3b3b',
      fontSize: 14
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  grid: {
      left: '3%',     //图表距离左右上下之间的距离
      right: '4%',
      top: '30%',
      bottom: '0',
      containLabel: true
  },
  toolbox: {
    // feature: {
    //   dataView: {show: true, readOnly: false},
    //   magicType: {show: true, type: ['line', 'bar']},
    //   restore: {show: true},
    //   saveAsImage: {show: true}
    // }
  },
  legend: {
    type: 'scroll',
    x: 'center',
    top:"40",
    data: ['','质量总量', '安全总量', '质量安全总量'],
    textStyle: {// 图例文字的样式
      color: '#636363',
      fontSize: 14
    }
  },
  xAxis: [
    {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLine: {
        lineStyle: {
          color: '#000'
        }
      },
      axisPointer: {
        type: 'shadow'
      },
      splitArea: {
        show: false,
        lineStyle: {
          color: ['#aaa', '#ddd'],
          width: 1,
          type: 'dashed'
        }
      }

    }
  ],
  yAxis: [
    {
        type: 'value',
        name: '个数',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
            formatter: '{value}'
        }
    },
    {
        type: 'value',
        name: '总量',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
            formatter: '{value}'
        }
    }
  ],
  series: [
    {
      name: '质量总量',
      type: 'bar',
      data: []
    },
    {
      name: '安全总量',
      type: 'bar',
      data: []
    },
    {
      name: '质量安全总量',
      type: 'line',
      yAxisIndex: 1,
      areaStyle: {
        normal: {
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(88,160,253,1)'
              }, {
                  offset: 0.5, color: 'rgba(88,160,253,0.7)'
              }, {
                  offset: 1, color: 'rgba(88,160,253,0)'
              }]
            }
        }
      },
      z:1,
      data: []
    }
  ]
}
