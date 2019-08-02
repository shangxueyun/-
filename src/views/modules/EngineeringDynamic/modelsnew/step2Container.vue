<template>
  <el-row :gutter="30" >
    <el-col :span="6">
      <weightBox></weightBox>
<!--      <div class="weightBox">-->
<!--      <header>质量管理</header>-->
<!--        <ul class="list">-->
<!--          <li><span>问题总量</span><span style="color:#F6AB00">{{weightData.total}}</span></li>-->
<!--          <li><span>待整改</span><span style="color:#FE3A5E">{{weightData.toBeRectifiedTotal}}</span></li>-->
<!--          <li><span>待复查</span><span style="color:#D6FF1F">{{weightData.toBeReviewedTotal}}</span></li>-->
<!--          <li><span>已复查</span><span style="color:#54EEEC">{{weightData.completeTotal}}</span></li>-->
<!--        </ul>-->
<!--        <div ref="pieTopWeight" style="width: 100%;height: 300px"></div>-->
<!--        <div ref="pieBtWeight" style="width: 100%;height: 300px"></div>-->
<!--      </div>-->
    </el-col>
    <el-col :span="12" style="box-sizing: border-box;padding:10px">
      <projectTime ref="projectTime"></projectTime>
      <el-carousel :interval="4000" type="card"  class="listImage">
        <el-carousel-item v-for="item in listImage" :key="item.id">
          <img :src="item.img">
          <ul class="itemconten">
              <li>单体：{{item.monomerName}}</li>
              <li>流水段：{{item.flowSectionName}}</li>
              <li>楼层：{{item.floorName}}</li>
              <li>劳动力总数：{{item.totalNumber}}</li>
              <li>上传人：{{item.createUser}}</li>
              <li>上传日期：{{item.createTime}}</li>
          </ul>
        </el-carousel-item>
      </el-carousel>
      <div ref="fenxiBox" style="width: 100%;height: 300px"></div>
    </el-col>
    <el-col :span="6">
      <safeBox></safeBox>
<!--      <div class="weightBox">-->
<!--        <header>安全管理</header>-->
<!--        <ul class="list">-->
<!--          <li><span>问题总量</span><span style="color:#F6AB00">{{safeResult.total}}</span></li>-->
<!--          <li><span>待整改</span><span style="color:#FE3A5E">{{safeResult.toBeRectifiedTotal}}</span></li>-->
<!--          <li><span>待复查</span><span style="color:#D6FF1F">{{safeResult.toBeReviewedTotal}}</span></li>-->
<!--          <li><span>已复查</span><span style="color:#54EEEC">{{safeResult.completeTotal}}</span></li>-->
<!--        </ul>-->
<!--        <div ref="pieTopSafe" style="width: 100%;height: 300px"></div>-->
<!--        <div ref="pieBtSafe" style="width: 100%;height: 300px"></div>-->
<!--      </div>-->
    </el-col>
  </el-row>
</template>

<script>
  import {pie, pieTopWeightPie, teamoption, safepieToptPie, safepieToptTeamPie, fenxioption} from './options'
  import projectTime from './projectTime'
  // import '@/utils/macarons.js'
  import weightBox from "./weightBox"
  import safeBox from "./safeBox"
  export default {
    name: 'step2Container',
    components: {
      projectTime,
      weightBox,
      safeBox
    },
    data (){
      return {
        weightData: {},
        pieTopWeightPieData: {},
        safeResult: {},
        teamoptionData: {},
        safepieToptPieData: {},
        safepieToptTeamPieData: {},
        fenxiOptionData: {},
        listImage:[]
      }
    },
    mounted (){
      this.$refs.projectTime.getLcbData()
      // this.getQualityProblemCount()
      this.getSafetyProblemCount()
      this.getProblemCount()
      this.listImageProgress()
    },
    methods: {
      listImageProgress(){
        this.$http({
          url: this.$http.adornUrl('/bim/index/listImageProgress'),
          method: 'post',
          data: this.$http.adornData({})
        }).then((data) => {
          if(data.data.code==0){
              data.data.result.forEach((item) =>{
                let date = new Date(item.createTime.replace(/-/g, "/"));
                let years = date.getFullYear();
                let months = date.getMonth() + 1;
                let strDates = date.getDate();
                if (months >= 1 && months <= 9) {
                  months = "0" + months;
                }
                if (strDates >= 0 && strDates <= 9) {
                  strDates = "0" + strDates;
                }
                item.createTime = years + '-' + months + '-' + strDates
                
            })

            this.listImage = data.data.result
          }
        })

      },
      getProblemCount (){
        this.$http({
          url: this.$http.adornUrl('/bim/index/getProblemCount'),
          method: 'post',
          data: this.$http.adornData({

          })
        }).then((data) => {
          if(data.data.code==0){
            this.fenxiOptionData=fenxioption
            this.fenxiOptionData.series[0].data=this.changeFenxiData(data.data.result.result).qualityProblemTotalArr
            this.fenxiOptionData.series[1].data=this.changeFenxiData(data.data.result.result).safetyProblemTotalArr
            this.fenxiOptionData.series[2].data=this.changeFenxiData(data.data.result.result).totalArr
            // this.fenxiOptionData=data.data.result;
            this.getEchart('fenxiBox', this.fenxiOptionData)
          }
        })
      },
      changeFenxiData (data){
        let qualityProblemTotalArr=[],
          safetyProblemTotalArr=[],
          totalArr=[]
        data.forEach((a, i) => {
          qualityProblemTotalArr.push(a.qualityProblemTotal)
          safetyProblemTotalArr.push(a.safetyProblemTotal)
          totalArr.push(a.qualityProblemTotal+a.safetyProblemTotal)
        })
        // console.log(qualityProblemTotalArr, safetyProblemTotalArr, totalArr)
        return {
          qualityProblemTotalArr,
          safetyProblemTotalArr,
          totalArr
        }
      },
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
      // getQualityProblemCount (){ // 质量
      //   this.$http({
      //     url: this.$http.adornUrl('/bim/index/getQualityProblemCount'),
      //     method: 'post',
      //     data: this.$http.adornData({
      //
      //     })
      //   }).then((data) => {
      //     if(data.data.code==0){
      //       this.pieTopWeightPieData= pieTopWeightPie
      //       this.teamoptionData=teamoption
      //       this.weightData=data.data.result
      //       this.pieTopWeightPieData.legend.data=this.getLegend(this.weightData.problemTypeList).arr
      //       this.pieTopWeightPieData.series[0].data=this.getLegend(this.weightData.problemTypeList).arr1
      //       this.pieTopWeightPieData.title.text='共'+this.getLegend(this.weightData.problemTypeList).total+'条'
      //       // 班组
      //       this.teamoptionData.legend.data=this.getLegend(this.weightData.teamList).arr
      //       this.teamoptionData.series[0].data=this.getLegend(this.weightData.teamList).arr1
      //       this.teamoptionData.title.text='共'+this.getLegend(this.weightData.teamList).total+'条'
      //       this.getEchart('pieBtWeight', teamoption)
      //       this.getEchart('pieTopWeight', this.pieTopWeightPieData)
      //     }
      //   })
      // },
      getLegend (data){
        let arr=[], arr1=[], total=0
        // console.log(data)
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
.listImage{
  height:300px;
  overflow: hidden;
}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
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
  .itemconten{
    background-color: rgba(0, 0, 0, 0.4);
    height:60px;
    position: absolute;
    bottom:0;
    left:0;
    width:100%;
    list-style: none;
    padding:10px 0 0 0;
    margin:0;
    li{
      float: left;
      width:155px;
      color:#fff;
      font-size: 12px;
      font-weight:normal;
      text-align: left;
      text-indent: 15px;
      line-height:22px;
    }
  }
</style>
