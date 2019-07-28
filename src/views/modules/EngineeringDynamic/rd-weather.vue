<template>
  <div class="rd-weather">
    <div class="rd-1 Me_one" :style="cssStyle.Me_one">
        <div class="top">
          <p><span class="font">06月04日  星期二  五月初二</span><span class="text-r font">南通</span></p>
          <h1>32℃</h1>
          <div class="iocn"><i style="font-size: 3.2rem;" class="el-icon-thirdtianqi"></i></div>
          <p class="font_p"><span class="font">22℃-33℃</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="font">晴</span></p>
          <p class="font_p"><span class="font">东风3-5级</span></p>
        </div>
        <div class="bottom">
          <div class="list" v-for="(items,index) in Weatherlist" :key="index">
            <p class="list_p">{{items.week}}</p>
            <p class="list_p">{{items.date}}</p>
            <i :class="items.ionc"></i>
            <p class="list_p">{{items.temperature}}</p>
            <p class="list_p">{{items.Weather}}</p>
          </div>
        </div>
    </div>

    <div class="rd-1 rd-2 Me_two" :style="cssStyle.Me_two">
      <div class="rd-2-top">
        <h2>项目里程碑</h2>
        <div class="wire"></div>
        <p class="list_p"><span>06月01日-06月30计划</span><span class="text-r">截止06月30计划</span></p>
        <h3 class="" style="float: left;font-weight: 400;">累计延期</h3>
        <h3 class=""  style="float: right;"> <span class="font">01</span> 天</h3>
        <p class="list_p two"><span class>项目倒计时</span><span class="text-r"><span class="font">234</span>天</span></p>
      </div>
      <div class="rd-2-bottom">
        <p class="bottom_p"><i class="el-icon-inform"></i><span class="font_H">通知</span><span class="font_p">未来三天都可能下雨。</span> <span class="time">2019-06-23</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  import { ObjectClear } from '@/utils'
  export default {
    data () {
      return {
        Weatherlist:[
          {week:"星期三",date:"06.30", temperature :"24℃-34℃",Weather:"多云转晴",ionc:'el-icon-thirdtianqi'},
          {week:"星期四",date:"07.01", temperature :"22℃-36℃",Weather:"晴转多云",ionc:'el-icon-thirdtianqi'},
          {week:"星期五",date:"07.02", temperature :"23℃-30℃",Weather:"多云",ionc:'el-icon-thirdtianqi'},
          {week:"星期六",date:"07.03", temperature :"20℃-28℃",Weather:"多云转小雨",ionc:'el-icon-thirdxiaoyu'},
          {week:"星期三",date:"07.04", temperature :"16℃-22℃",Weather:"多云转小雨",ionc:'el-icon-thirdxiaoyu'},
        ],
        cssStyle:{
          Me_one:{width:'49.7%',marginBottom:'1rem',marginRight: '10px'},
          Me_two:{width:'49.7%',marginBottom:'1rem',},
        },
      }
    },
    props:{
      // Weather:String,
      // //今天数据替换上面
      // today:Object
    },
    created () {
      // if(this.Weather)
      //   this.Weatherlist = this.Weather;
    },
    mounted () {
      //改变颜色
      if(/model-amplification/.test(window.location.href))
      this.cssStyle = ObjectClear(this.cssStyle,true);
    },
    methods: {
      // 提交表单
      dataFormSubmit () {
      },
    }
  }
</script>

<style lang="scss" scoped>
/* magnify.png */
.rd-weather{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  color: #fff;
}
.rd-1{
    width: 49.5%;
    background: transparent;
    height: 16rem;
    border-radius: .3rem;
}
.text-r{
  float: right;
}
.rd-1 .top{
    height: 50%;
    background: #26A3FD;
    width: 100%;
    float: left;
    padding: 16px;
    border-radius: 10px 10px 0px 0px;
    position: relative;
    h1{
      font-weight: 400;
      text-align: center;
      padding-left: 2rem;
      line-height: 1.6rem;
    }
    .iocn{
      width: 4rem;
      height: 4rem;
      font-size: 3.4rem;
      float: right;
      margin: -3rem .3rem 0rem;
    }
    .font{
      font-size: .5rem;
    }
    .font_p{
        line-height: 6px;
    }
}

.rd-1 .bottom{
    height: 54%;
    width: 100%;
    background: #fff;
    color: #666666;
    clear: both;
    padding: 0px 10px 10px 10px;
    border-radius: 0px 0px 10px 10px;
    padding-top: 16px;
    .list{
      width: 20%;
      float: left;
      height: 100%;
      text-align: center;
      .list_p{
        line-height: 10px;
        font-size: .5rem;
      }
    }
}
.rd-2{
  background: transparent;
      color: #666666;
  .rd-2-top{
    width: 100%;
    height: 13rem;
    background: #fff;
    border-radius: .5rem;
    margin-top: -14px;
    padding: 0 10px;
    position: relative;
    h2{
        font-size: 1rem;
        line-height: .8rem;
        padding-top: 14px;
    }
    .wire{
      position: absolute;
      left: 0;
      width: 100%;
      height: 1px;
      background: #eee;
    }
    .list_p{
    line-height: 0px;
    padding-top: 2rem;
    clear: both;
    }
    h3{
    line-height: 2rem;
    }
    .font{
    font-size: 2rem;
    padding-right: 1rem;
    color: #008CD6;
    font-weight: bold;
    }
    .two{
    font-size: 1rem;
    padding-top: 1rem;
    font-weight: 500;
    }
  }
  .rd-2-bottom{
    width: 100%;
    height: 2.8rem;
    background: #fff;
    border-radius: .5rem;
    margin-top: -2px;
    padding: 0 10px;
    .bottom_p{
      line-height: 3rem;
      margin-top: 16px;
    }
    .font_H{
      font-size: 1rem;
      font-weight: bolder;
      padding: 0 10px;
    }
    i{
      font-size: 1.2rem;
      color:#0C92D8;
    }
    .font_p{
      line-height: 3rem;
    }
    .time{
      display: block;
      float: right;
    }
  }
}

.rd-weather .el-icon-inform{
    display: block;
    width: 20px;
    height: 20px;
    float: left;
    margin-top: 14px;
    background: url(~@/assets/img/inform.png) no-repeat;
}
.rd-2 .rd-2-top{
    margin-top: 0px;
        height: 207px;
}
.rd-1 .top h1{
    color: #fff;
}
.rd-2 .rd-2-top h2{
    font-size: 1rem;
    margin: 0px;
    line-height: inherit;
    padding: 10px 0px;
}
@media (max-width: 1800px) and  (min-width: 1000px) {
    .rd-1 .bottom .list .list_p{
        font-size: .4rem;
        text-overflow: clip;
        white-space: nowrap;
    }
    .Me_one{
      width: 54%;
    }
    .Me_two{
      width: 45%;
    }
}
</style>
