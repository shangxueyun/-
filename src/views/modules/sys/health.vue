<template>


  <div class="healthBynamic" :style="{height:offHeight}" >
    <div v-for="(item,key) in dataList" :key="key" class="person" :style="random()" @mouseenter="enter($event)" @mouseleave="leave($event)"><i></i>
        <div class="health">
            <header style="text-align: center;line-height: 18px;background: #009966;">{{item.createUser}}</header>
            <main style="padding: 4px 8px;background: rgba(0, 153, 102, 0.6);">
                步数（步）: {{item.steps}}
                <br />
                睡眠（h）: {{item.sleep}}
                <br />
                心率（次/分钟）: {{item.heartRate}}
                <br />
                血压（mmHg）: {{item.bloodPressure}}
                <br />
                血氧（SpO2）: {{item.bloodOxygen}}
                <br />
                疲劳 : {{item.fatigue}}
                <br />
            </main>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
          offHeight:(this.$store.state.common.documentClientHeight-80)+"px",
          dataList:[],
      }
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList (num) {
         this.healthBynamicLoading = true;
          this.$http({
            url: this.$http.adornUrl('/bim/userHealthy/listUserHealthy'),
            method: 'post',
            data: this.$http.adornData({})
          }).then(({data}) => {
              this.healthBynamicLoading = false;
              if (data && data.code === 0) {
              this.dataList = data.result;
              } else {
              this.dataList = []
              }
          })
      },

        random(){
            return {top:(498 - (Math.floor(Math.random()*392)))+"px",left:(1058 - (Math.floor(Math.random()*664)))+"px"}
        },
        enter(e){
            e.target.children[1].style.display = "block"
        },
        leave(e){
           e.target.children[1].style.display = "none"
        },
    }
  }
</script>
<style lang="scss">
.healthBynamic{
    background: url(~@/assets/img/Healthdynamic.png) no-repeat;
    background-size: 100% 100%;
    position: relative;
    .Btn{
        margin: 24px;
    }
    .person{
        position: absolute;
        width: 54px;
        height: 62px;
        cursor: pointer;
        i{
            width: 90%;
            height: 90%;
            display: block;
            margin: 0 auto;
            background: url(~@/assets/img/person.png) no-repeat;
            background-size: 100%;
        }
        .health{
            width: 134px;
            height: 134px;
            font-size: 10px;
            color: #fff;
            margin-left: 44px;
            margin-top: -56px;
            display: none;
        }
    }
}
</style>

