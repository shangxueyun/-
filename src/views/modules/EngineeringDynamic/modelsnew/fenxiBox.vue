<template>
  <div class="fx">
    <header>产值分析图</header>
    <div ref="containerShadow" style="width: 100%;height: 280px;"></div>
  </div>
</template>

<script>
  import {option, workerPlace, senvenData} from './options'
    export default {
        name: "fenxiBox",
      daa(){
          return {

          }
      },
      mounted(){
        this.analysisChart(new Date().getFullYear())
      },
      methods:{
        analysisChart (year){ // 产值
          this.$http({
            url: this.$http.adornUrl('/bim/index/analysisChart'),
            method: 'post',
            data: this.$http.adornData({
              'dateTime': year
            })
          }).then((data) => {
            if(data.data.code==0){
              this.analysisChartOption=option
              let result=data.data.result,
                arr=[],
                subcontractingOutputValueArr=[],
                constructionOutputValueArr=[],
                installationOutputValueArr=[]
              for(var item in result.production){
                let obj={}
                obj.index=Number(item.split('-')[1])
                obj.subcontractingOutputValue=result.production[item].subcontractingOutputValue
                obj.constructionOutputValue=result.production[item].constructionOutputValue
                obj.installationOutputValue=result.production[item].installationOutputValue
                arr.push(obj)
              }

              for(let i=1; i<13; i++){
                subcontractingOutputValueArr.push(0)
                constructionOutputValueArr.push(0)
                installationOutputValueArr.push(0)
              }
              // console.log(arr)
              subcontractingOutputValueArr=this.publicFun(subcontractingOutputValueArr, arr, 'subcontractingOutputValue')
              constructionOutputValueArr=this.publicFun(constructionOutputValueArr, arr, 'constructionOutputValue')
              installationOutputValueArr=this.publicFun(installationOutputValueArr, arr, 'installationOutputValue')
              this.analysisChartOption.series[0].data=subcontractingOutputValueArr
              this.analysisChartOption.series[1].data=constructionOutputValueArr
              this.analysisChartOption.series[2].data=installationOutputValueArr
              this.getEchart('containerShadow', option)
            }
          })
        },
        publicFun (data, arr, str){
          data.forEach((a, i) => {
            arr.forEach((m, n) => {
              if(i+1==m.index){
                data[i]=m[str]
              }
            })
          })
          // console.log(data)
          return data
        },
        getEchart (id, data){
          let chart = echarts.init(this.$refs[id], 'macarons')
          // let chart = this.$echarts.init(this.$refs[id], 'macarons')
          chart.setOption(data, true)
        }
      }
    }
</script>

<style lang="scss" scoped>
  .fx{
    width: 100%;
    background: url("../../../../assets/img/home/fx.png") no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding-top: 8px;
  header{
    color: #A9DDEE;
    font-weight: bold;
    font-size: 18px;
    text-align: center;
  }
  }
</style>
