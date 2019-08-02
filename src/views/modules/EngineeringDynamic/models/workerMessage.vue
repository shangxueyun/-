<template>
  <div class="workerMessage" style="margin:20px 0 0 0;">
    <header class="fx" style="text-align: center;">人员动态管理</header>
    <ul class="workerItem">
      <li class="active"><p>进场人次</p><span>{{teamNumData.entryNums}}</span></li>
      <li><p>出场人次</p><span>{{teamNumData.appearanceNums}}</span></li>
      <li><p>在场人次</p><span>{{teamNumData.venueRealNums}}</span></li>
    </ul>
    <div class="workerPlaceBox" >
      <p class="header">班组在场人数</p>
      <div ref="workerPlace" id="workerPlace" style="width: 100%;height:190px"></div>
    </div>
    <div class="senvenDataBox">
      <p class="header">七天劳动力统计</p>
      <div ref="senvenData" style="width: 100%;height: 230px"></div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  import {option, workerPlace, senvenData} from './options'
    export default {
        name: "workerMessage",
      data(){
          return {
            teamNumData: {}, // 人员管理实时人数
            workerPlaceOptions: {}, // 在场班组和地区数据
            optionsData: [], //
          }
      },
      mounted(){
        this.getWorker();
        this.getWorkerOption()
      },
      methods:{
        getWorker (){ // 获取在场人数
          this.$http({
            url: this.$http.adornUrl('/bim/index/realTimeData'),
            method: 'get'

          }).then((data) => {
            if(data.data.code==0){
              this.teamNumData=data.data.result
            }
          })
        },
        getWorkerOption (){
          this.$http({
            url: this.$http.adornUrl('/bim/index/watchKanbanAttendance'),
            method: 'post'
          }).then((data) => {
            if(data.data.code==0){
              this.workerPlaceOptions=workerPlace
              this.sevenData=senvenData
              let province=data.data.result.province
              let teamArr=[]
              let obj=[]
              let sevenClassData=data.data.result.sevenClassData[this.getNowTime()],
                placeList=[],
                teamList=[],
                dateArr=new Array()
              data.data.result.groupByClassNo.forEach((a, i) => {
                teamArr.push(a.classNo)
              })
              for(var item in data.data.result.sevenClassData){
                dateArr.push(item)
                data.data.result.sevenClassData[item].forEach((a, i) => {
                  obj.push(a)
                })
              }
              // console.log(obj)

              province.forEach((a, i) => {
                let obj={}
                obj.value=a.nums
                obj.name=a.province
                placeList.push(obj)
                this.optionsData.push(a.province)
              })
              sevenClassData.forEach((a, i) => {
                let obj={}
                obj.value=a.sums
                obj.name=a.classNo
                teamList.push(obj)
                this.optionsData.push(a.classNo)
              })
              this.sevenData.yAxis.data=dateArr
           
              this.workerPlaceOptions.series[0].data=placeList
              this.workerPlaceOptions.series[1].data=teamList
              this.workerPlaceOptions.legend.data=teamList

              this.sevenData.legend.data=teamArr


              this.sevenData.series= this.getSeventData(data.data.result.groupByClassNo, obj, dateArr)
              // console.log(teamList)
              this.getEchart('workerPlace', this.workerPlaceOptions)
              this.getEchart('senvenData', this.sevenData)

            }
          })
        },
        getSeventData (groupByClassNo, arr, dateArr){
          var objArr=[]

          groupByClassNo.forEach((a, i) => {
            var obj={
              name: a.classNo,
              type: 'bar',
              stack: '人数',
              label: {
                normal: {
                  show: false,
                  position: 'insideRight'
                }
              },
              data: new Array(7).fill(0)
            }
            objArr.push(obj)
          })

          objArr.forEach((a, i) => {
            arr.forEach((m, n) => {
              if(a.name==m.classNo){
                a.data[this.indexVf(dateArr, m.photoDate)]=m.sums
              }
            })
          })
          // console.log(objArr)
          return objArr
        },
        indexVf (arr, str){ // 获取下标
          for(var i=0; i<arr.length; i++){
            if(arr[i]==str){
              return i
            }
          }
        },
        getNowTime (){
          var date=new Date(),
            year=date.getFullYear(),
            mouth=date.getMonth()+1,
            day=date.getDate()
          return year+'-'+this.add0(mouth)+'-'+this.add0(day)
        },
        add0 (str){
          if(Number(str)<=9){
            return '0'+str
          }else{
            return str
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
  .workerMessage{
    width: 100%;
    box-sizing: border-box;
    padding:10px;
    background: url("../../../../assets/img/home/worker.png") no-repeat;
    background-size: 100% 100%;
    // margin-top:20px;
    .header{
      text-align: left;
      color: #00E5FF;
      font-weight: bold;
      position: relative;
      box-sizing: border-box;
      padding-left: 10px;
    }
    .header:before{
      content: "";
      width: 4px;
      height:16px ;
      position: absolute;
      background: #00E5FF;
      top:3px;
      left:0;
    }
    header{
      font-size:18px;
      /*margin-bottom: 30px;*/
      font-weight: bold;
      color: #AAF5FE;
    }
    .workerItem{
      width: 100%;
      list-style: none;
      padding:0;
      display: flex;
      justify-content: space-between;
      li{
        background: url("../../../../assets/img/home/workerItem.png") no-repeat;
        background-size: 100% 100%;
        width: 30%;
        height: 79px;
        text-align: right;
        border:1px solid transparent;
        cursor: pointer;
        color: #fff;
        box-sizing: border-box;
        padding-right: 10px;
        font-size: 13px;
        p{
          margin-top:25px;
          margin-bottom: 2px;
          font-size: 13px;
        }
        span{
          color:#00E5FF;
          font-size: 0.9em;
          font-weight: bold;
        }
      }
      li.active{
        border:1px solid #3f3f3f;
      }
    }
  }
</style>
