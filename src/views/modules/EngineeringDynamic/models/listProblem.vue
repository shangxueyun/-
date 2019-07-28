<template>
  <div class="marquee_box marquee_boxs">
    <ul class="marquee_list" :class="{marquee_top:animate}">
      <template v-if="type==1">
        <li class="listHeader"  >工程动态</li>
        <li v-for="(item, index) in result" class="item">
          <span class="a">{{item.index}}</span>
          <span class="a">{{item.name}}</span>
          <span class="b">{{item.createTime.slice(0,10)}}</span>

        </li>
      </template>
      <template v-if="type==2">
        <li class="listHeader"  >安保巡查</li>
        <li v-for="(item, index) in result" class="item">
          <span class="a">{{item.index}}</span>
          <span class="a">{{item.rfId}}</span>
          <span class="b">{{item.createTime.slice(0,13)}}</span>
          <span class="b">{{item.createUser}}</span>
        </li>
      </template>
      <template v-if="type==3">
        <li class="listHeader"  >安全巡查</li>
        <li v-for="(item, index) in result" class="item">
          <span class="a">{{item.index}}</span>
          <span class="a">{{item.safetyPatrolFormName+''+item.examinationResults==1?'合格':item.examinationResults==2?'不合格':'复查合格'}}</span>
          <span class="b">{{item.createTime.slice(0,13)}}</span>
<!--          <span class="b">{{item.createUser}}</span>-->
        </li>
      </template>
      <template v-if="JSON.stringify(result)=='{}'">
        <li><span>暂无数据</span></li>
      </template>
    </ul>
  </div>
</template>

<script>
    export default {
      name: 'listProblem',
      props: ['url', 'type'],
      data (){
        return {
          result: [],
          animate: false
        }
      },
      // watch: {
      //   datas: {
      //     handler (a, b){
      //       console.log(a)
      //     this.result=this.datas;
      //       setInterval(this.showMarquee( this.result), 2000)
      //
      //     }
      //   }
      // },
      created (){

        // console.log(this.datas)
      },
      mounted (){
        // console.log(this.url)
        this.getListProblem()
        setInterval(this.showMarquee, 2000)
      },
      activated () {

      },
      methods: {
        getListProblem (){
          this.$http({
            url: this.$http.adornUrl(this.url),
            method: 'post',
            data: this.$http.adornData({

            })
          }).then((data) => {
            if(data.data.code==0){
              this.result=data.data.result
              console.log(this.result)
              this.result.forEach((a, i) => {
                a.index=i+1
              })
            }
          }).catch((err) => {

          })
        },
        showMarquee () {
          this.animate = true
          setTimeout(() => {
            this.result.push(this.result[0])

            this.result.shift()

            this.animate = false
          }, 500)
        }
      }
    }
</script>

<style scoped>
  .listHeader{
    font-size: 18px;
    font-weight:bold;
    color: #AAF5FE;
    margin-bottom:1.3em;
    cursor: pointer;
  }
  .marquee_top {
    transition: all 0.5s;
    margin-top: -43px
  }
  .marquee_box {
    display: block;
    position: relative;
    width: 100%;
    height: 140px;
    color:#fff;
    overflow: hidden;
  }
  .marquee_list {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    padding:0;
    width:100%;
    margin:0;
  }
  .item{
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
  }
  .marquee_boxs{
    height: 200px;
  }
</style>
