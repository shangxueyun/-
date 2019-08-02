<template>
  <!--    质量管理-->
  <div class="weightBox">
    <header>安全管理</header>
    <ul class="list">
      <li><span>问题总量</span><span style="color:#F6AB00">{{safeResult.total}}</span></li>
      <li><span>待整改</span><span style="color:#FE3A5E">{{safeResult.toBeRectifiedTotal}}</span></li>
      <li><span>待复查</span><span style="color:#D6FF1F">{{safeResult.toBeReviewedTotal}}</span></li>
      <li><span>已复查</span><span style="color:#54EEEC">{{safeResult.completeTotal}}</span></li>
    </ul>
    <div ref="pieTopSafe" style="width: 100%;height: 300px"></div>
    <div ref="pieBtSafe" style="width: 100%;height: 300px"></div>
  </div>
</template>

<script>
  import {pie, pieTopWeightPie, teamoption, safepieToptPie, safepieToptTeamPie, fenxioption} from './options'
  export default {
    name: "weightBox",
    data(){
      return {
        weightData: {},
        pieTopWeightPieData: {},
        safeResult: {},
        safepieToptPieData: {},
        safepieToptTeamPieData: {},
      }
    },
    mounted(){
      this.getSafetyProblemCount()
    },
    methods:{
      getSafetyProblemCount (){ // 安全
        this.$http({
          url: this.$http.adornUrl('/bim/index/getSafetyProblemCount'),
          method: 'post',
          data: this.$http.adornData({

          })
        }).then((data) => {
          if(data.data.code==0){
            this.safeResult=data.data.result
            this.safepieToptPieData=safepieToptPie
            this.safepieToptTeamPieData=safepieToptTeamPie
            this.safepieToptPieData.legend.data=this.getLegend(this.safeResult.problemTypeList).arr
            this.safepieToptPieData.series[0].data=this.getLegend(this.safeResult.problemTypeList).arr1
            this.safepieToptPieData.title.text='共'+this.getLegend(this.safeResult.problemTypeList).total+'条'
            // 班组
            this.safepieToptTeamPieData.legend.data=this.getLegend(this.safeResult.teamList).arr
            this.safepieToptTeamPieData.series[0].data=this.getLegend(this.safeResult.teamList).arr1
            this.safepieToptTeamPieData.title.text='共'+this.getLegend(this.safeResult.teamList).total+'条'
            this.getEchart('pieTopSafe', safepieToptPie)
            this.getEchart('pieBtSafe', safepieToptTeamPie)
          }
        })
      },
      getLegend (data){
        let arr=[], arr1=[], total=0
        data.forEach((a, i) => {
          total+=a.number
          var obj={}
          arr.push(a.name||'')
          obj.name=a.name||'',
            obj.value=a.number
          arr1.push(obj)
        })
        // console.log(arr, arr1)
        return {
          arr,
          arr1,
          total
        }
      },
      getEchart (id, data){
        // let chart = this.$echarts.init(this.$refs[id], 'macarons')
        let chart = echarts.init(this.$refs[id], 'macarons')
        chart.setOption(data, true)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .weightBox{
    width: 100%;
    box-sizing: border-box;
    padding:10px;
    .list{
      width: 100%;
      list-style: none;
      padding:0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      li{
        width:45% ;
        height: 30px;

        text-align: left;
        margin-bottom: 20px;
        span{
          &:first-child{
            color: #fff;
            font-size: 18px;
            font-weight: 400;
            margin-right: 1.5em;
          }
          &:nth-child(2){
            font-size:24px;
            font-weight:bold;
          }
        }
      }
    }
    header{
      font-size:18px;
      margin-bottom: 30px;
      font-weight: bold;
      color: #AAF5FE;
    }
  }
</style>
