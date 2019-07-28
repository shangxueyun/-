import Vue from 'vue'
export let option = {
  title: {
    // text: '某地区蒸发量和降水量',
    // subtext: '纯属虚构'
  },

  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {

    data: ['分包产值', '土建产值', '安装产值'],
    top: '10px',
    textStyle: {// 图例文字的样式
      color: '#00EAFF',
      fontSize: 16
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
          color: '#00EAFF'
        }
      }

    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#00EAFF'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#00EAFF'],
          width: 1,
          type: 'solid'
        }
      }
    }
  ],
  series: [
    {
      name: '分包产值',
      type: 'bar',
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
      // markPoint: {
      //   data: [
      //     {type: 'max', name: '最大值'},
      //     {type: 'min', name: '最小值'}
      //   ]
      // },
      // markLine: {
      //   data: [
      //     {type: 'average', name: '平均值'}
      //   ]
      // }
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
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    x: 'left',
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
      data: [
        // {value: 335, name: '直达', selected: true},
        // {value: 679, name: '营销广告'},
        // {value: 1548, name: '搜索引擎'}
      ]
    },
    {
      name: '',
      type: 'pie',
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
            // abg: {
            //     backgroundColor: '#333',
            //     width: '100%',
            //     align: 'right',
            //     height: 22,
            //     borderRadius: [4, 4, 0, 0]
            // },
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
      data: [
        // {value: 335, name: '直达'},
        // {value: 310, name: '邮件营销'},
        // {value: 234, name: '联盟广告'},
        // {value: 135, name: '视频广告'},
        // {value: 1048, name: '百度'},
        // {value: 251, name: '谷歌'},
        // {value: 147, name: '必应'},
        // {value: 102, name: '其他'}
      ]
    }
  ]
}
export let senvenData= {
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
    // {
      // name: '直接访问',
      // type: 'bar',
      // stack: '总量',
      // label: {
      //   normal: {
      //     show: true,
      //     position: 'insideRight'
      //   }
      // },
      // data: [320, 302, 301, 334, 390, 330, 320]
    // },
    // {
    //   name: '邮件营销',
    //   type: 'bar',
    //   stack: '总量',
    //   label: {
    //     normal: {
    //       show: true,
    //       position: 'insideRight'
    //     }
    //   },
    //   data: [120, 132, 101, 134, 90, 230, 210]
    // },
    // {
    //   name: '联盟广告',
    //   type: 'bar',
    //   stack: '总量',
    //   label: {
    //     normal: {
    //       show: true,
    //       position: 'insideRight'
    //     }
    //   },
    //   data: [220, 182, 191, 234, 290, 330, 310]
    // },
    // {
    //   name: '视频广告',
    //   type: 'bar',
    //   stack: '总量',
    //   label: {
    //     normal: {
    //       show: true,
    //       position: 'insideRight'
    //     }
    //   },
    //   data: [150, 212, 201, 154, 190, 330, 410]
    // },
    // {
    //   name: '搜索引擎',
    //   type: 'bar',
    //   stack: '总量',
    //   label: {
    //     normal: {
    //       show: true,
    //       position: 'insideRight'
    //     }
    //   },
    //   data: [820, 832, 901, 934, 1290, 1330, 1320]
    // }
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
        fontSize: 40,
        fontWeight: 'bold',
        lineHeight: 40
      },
      name: {
        color: '#00E4FF',
        lineHeight: 20
      }
    },
    top: 'center',
    left: '40%',
    textAlign: 'center',
    textStyle: {
      color: '#00E4FF'
      // rich: {
      //   value: {
      //
      //     fontSize: 40,
      //     fontWeight: 'bold',
      //     lineHeight: 40
      //   },
      //   name: {
      //     color: '#00E4FF',
      //     lineHeight: 20
      //   }
      // }
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'

  },
  legend: {
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

    x: 'right',
    data: [],
    textStyle: {// 图例文字的样式
      color: '#00EAFF',
      fontSize: 14
    }
  },
  series: [
    {
      name: '质量安全',
      type: 'pie',
      radius: ['50%', '70%'],
      center: ['40%', '50%'],
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

export let teamoption = {
  title: {
    zlevel: 0,
    text: [
      '{b}'
    ].join('\n'),
    rich: {
      value: {
        color: '#00E4FF',
        fontSize: 40,
        fontWeight: 'bold',
        lineHeight: 40
      },
      name: {
        color: '#00E4FF',
        lineHeight: 20
      }
    },
    top: 'center',
    left: '40%',
    textAlign: 'center',
    textStyle: {
      color: '#00E4FF'
      // rich: {
      //   value: {
      //
      //     fontSize: 40,
      //     fontWeight: 'bold',
      //     lineHeight: 40
      //   },
      //   name: {
      //     color: '#00E4FF',
      //     lineHeight: 20
      //   }
      // }
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    x: 'right',
    data: [],
    formatter: function (name) {
      if (!name) return ''
      if (name.length > 5) {
        name = name.slice(0, 5) + '...'
        console.log(name)
      }
      return name
    },
    textStyle: {// 图例文字的样式
      color: '#00EAFF',
      fontSize: 14
    }
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
      name: '半径模式',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['40%', '50%'],
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
        fontSize: 40,
        fontWeight: 'bold',
        lineHeight: 40
      },
      name: {
        color: '#00E4FF',
        lineHeight: 20
      }
    },
    top: 'center',
    left: '40%',
    textAlign: 'center',
    textStyle: {
      color: '#00E4FF'
      // rich: {
      //   value: {
      //
      //     fontSize: 40,
      //     fontWeight: 'bold',
      //     lineHeight: 40
      //   },
      //   name: {
      //     color: '#00E4FF',
      //     lineHeight: 20
      //   }
      // }
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'

  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: '10%',
    formatter: function (name) {
      if (!name) return ''
      if (name.length > 5) {
        return name.slice(0, 5) + '...'
      }else{
        return name
      }
    },

    x: 'right',
    data: [],
    textStyle: {// 图例文字的样式
      color: '#00EAFF',
      fontSize: 14
    }
  },
  series: [
    {
      name: '质量安全',
      type: 'pie',
      radius: ['50%', '70%'],
      center: ['40%', '50%'],
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
        fontSize: 40,
        fontWeight: 'bold',
        lineHeight: 40
      },
      name: {
        color: '#00E4FF',
        lineHeight: 20
      }
    },
    top: 'center',
    left: '40%',
    textAlign: 'center',
    textStyle: {
      color: '#00E4FF'
      // rich: {
      //   value: {
      //
      //     fontSize: 40,
      //     fontWeight: 'bold',
      //     lineHeight: 40
      //   },
      //   name: {
      //     color: '#00E4FF',
      //     lineHeight: 20
      //   }
      // }
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'

  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: '10%',
    formatter: function (name) {
      if (!name) return ''
      if (name.length > 5) {
        return name.slice(0, 5) + '...'
      }else{
        return name
      }
    },

    x: 'right',
    data: [],
    textStyle: {// 图例文字的样式
      color: '#00EAFF',
      fontSize: 14
    }
  },
  series: [
    {
      name: '质量安全',
      type: 'pie',
      radius: ['50%', '70%'],
      center: ['40%', '50%'],
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
export let fenxioption = {
  title: {
    text: '质量安全数量统计图',
    left: 'center',
    textStyle:  {
      color: '#AAF5FE'
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
    left: 'left',
    right: '10',
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
    x: 'left',
    data: ['质量总量', '安全总量', '质量安全总量'],
    textStyle: {// 图例文字的样式
      color: '#00EAFF',
      fontSize: 14
    }
  },
  xAxis: [
    {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLine: {
        lineStyle: {
          color: '#A2D4E6'
        }
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
      splitArea: {
        show: false,
        lineStyle: {
          color: ['#aaa', '#ddd'],
          width: 1,
          type: 'dashed'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#A2D4E6'
        }
      },
      axisLabel: {
        formatter: '{value} '

      }
    },
    {
      type: 'value',
      name: '总量',
      min: 0,
      max: 25,
      show: false,
      interval: 5,
      splitArea: {
        show: false,
        lineStyle: {
          color: ['#aaa', '#ddd'],
          width: 1,
          type: 'dashed'
        }
      },
      axisLabel: {
        formatter: '{value}',
        lineStyle: {
          color: '#00EAFF'
        }
      }
    }
  ],
  series: [
    {
      name: '质量总量',
      type: 'bar',
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
    },
    {
      name: '安全总量',
      type: 'bar',
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
    },
    {
      name: '质量安全总量',
      type: 'line',
      yAxisIndex: 1,
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    }
  ]
}
