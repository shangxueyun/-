<template>
<!--    质量管理-->
  <div class="weightBox">
    <header>质量管理</header>
    <ul class="list">
      <li><span>问题总量</span><span style="color:#F6AB00">{{weightData.total}}</span></li>
      <li><span>待整改</span><span style="color:#FE3A5E">{{weightData.toBeRectifiedTotal}}</span></li>
      <li><span>待复查</span><span style="color:#D6FF1F">{{weightData.toBeReviewedTotal}}</span></li>
      <li><span>完成</span><span style="color:#54EEEC">{{weightData.completeTotal}}</span></li>
    </ul>
    <div ref="pieTopWeight" style="width: 100%;height: 300px"></div>
    <div ref="pieBtWeight" style="width: 100%;height: 300px"></div>
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
          }
      },
      mounted(){
        this.getQualityProblemCount()
      },
      methods:{
        getQualityProblemCount (){ // 质量
          this.$http({
            url: this.$http.adornUrl('/bim/index/getQualityProblemCount'),
            method: 'post',
            data: this.$http.adornData({

            })
          }).then((data) => {
            if(data.data.code==0){
              this.pieTopWeightPieData= pieTopWeightPie
              this.teamoptionData=teamoption
              this.weightData=data.data.result
              this.pieTopWeightPieData.legend.data=this.getLegend(this.weightData.problemTypeList).arr
              this.pieTopWeightPieData.series[0].data=this.getLegend(this.weightData.problemTypeList).arr1
              this.pieTopWeightPieData.title.text='共'+this.getLegend(this.weightData.problemTypeList).total+'条'
              // 班组
              this.teamoptionData.legend.data=this.getLegend(this.weightData.teamList).arr
              this.teamoptionData.series[0].data=this.getLegend(this.weightData.teamList).arr1
              this.teamoptionData.title.text='共'+this.getLegend(this.weightData.teamList).total+'条'
              this.getEchart('pieBtWeight', teamoption)
              this.getEchart('pieTopWeight', this.pieTopWeightPieData)
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
      text-align: center;
    }
  }
</style>
