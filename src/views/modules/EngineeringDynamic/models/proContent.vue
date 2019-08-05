<template>
<!--    工程概况/动态-->
<div>
  <div class="tips_l"></div>
  <ul class="list listgz" v-loading="loading"  element-loading-background="rgba(0, 0, 0, 0.8)">
    <template v-if="name=='工程概况'">
    <li class="listHeadersss"  @click="goDetail">工程概况</li>
    <li><span>工程名称:</span><span>{{proResult.projectName}}</span></li>
    <li><span>工程地点:</span><span>{{proResult.address}}</span></li>
    <li><span>建设单位:</span><span>{{proResult.ownerUnit}}</span></li>
    <li><span>监理单位:</span><span>{{proResult.supervisorUnit}}</span></li>
    <li><span>施工单位:</span><span>{{proResult.constructionCompanies}}</span></li>
    <li style="width: 200px"><span>建筑面积:</span><span>{{proResult.floorage}}m²</span></li>
    <li style="width: 200px"><span>工程造价:</span><span>{{proResult.engineeringCost}}万元</span></li>
    </template>

    <template v-if="JSON.stringify(proResult)=='{}'">
      <li><span>暂无数据</span></li>
    </template>
  </ul>
</div>
</template>

<script>
    export default {
      name: 'proContent',
      data (){
        return {
          proResult: {},
          name: '',
          loading: false
        }
      },
      mounted () {

      },
      methods: {

        init (result, name){
          this.loading=false;
          this.proResult=result
          this.name=name
          // console.log(this.proResult)
    },
        goDetail (){
          if(this.name=='工程概况'){
            this.$router.push({path: '/home'})
          }
        }
      }
    }
</script>
<style lang="scss" scoped>

.tips_l{

    height:1rem;
    display: flex;
    flex-direction: column;
    background: url(~@/assets/img/home/tips_l.png) no-repeat;
    background-size: 100% 100%;
    margin-bottom:1rem;
    left:10px;
    position: relative;
}
      .listHeadersss{
        font-size: 18px;
        font-weight:bold;
        color: #AAF5FE;
        margin-bottom:1.3em;
        cursor: pointer;
        text-align: left;
        color:#00E5FF
      }
   .list{
     list-style: none;
       width: 100%;
     text-align: left;
     font-size: 14px;
     box-sizing: border-box;
     display: flex;
     flex-wrap: wrap;
     li{
       height: 30px;
       width: 100%;
       overflow: hidden;
       text-overflow: ellipsis;
       -wekit-line-clamp:3;
       margin-bottom: 1em;

       span{
         white-space:nowrap;

         &:nth-child(1){
           color: #00E5FF;
           font-weight: 400;
           margin-right: 19px;
         }
         &:nth-child(2){
           color: #fff;
           font-weight:400;
         }
       }
     }
   }
</style>
