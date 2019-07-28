<template>
  <div class="contractWorkers" v-loading="contractWorkersLoading">
<!--       <el-row :gutter="10">-->
<!--         <el-col :span="24">-->
<!--           <div class="header">-->
<!--               <div class="search">-->
<!--                 <el-input v-model="name" placeholder="请输入内容"></el-input>-->
<!--                 <el-button type="success" @click="salaryFun">工资查看</el-button>-->
<!--               </div>-->
<!--                <div class="searchDate">-->
<!--                   -->
<!--                </div>-->
<!--           </div>-->
<!--         </el-col>-->
<!--       </el-row>-->
      <!-- <el-main>
        <el-row type="flex" class="row-bg">
          <el-col :span="5">
            <div class="main_left1">
              <el-header heigth="40px">场内实时人数<span>70人</span> </el-header>
              <main style="padding: 14px 0;width: 326px;height: 400px;">
                <div style="width: 100%;height: 100%;" ref="pie_left_1"></div>
              </main>
            </div>
            <div class="main_left1">
              <el-header heigth="40px">场内实时人数<span>70人</span> </el-header>
            </div>
          </el-col>
          <el-col :span="19">
            <el-row type="flex" class="row-bg">
              <el-col :span="8">1</el-col>
              <el-col :span="16">2</el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="24">1</el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="24">1</el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="8">1</el-col>
              <el-col :span="16">2</el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-main> -->
      <!-- <el-main>
        <el-row type="flex" class="row-bg">
          <el-col :span="5">
            <div class="main_left1">
              <el-header heigth="40px">场内实时人数<span>70人</span> </el-header>
              <main style="padding: 14px 0;width: 326px;height: 400px;">
                <div style="width: 100%;height: 100%;" ref="pie_left_1"></div>
              </main>
            </div>
            <div class="main_left1">
              <el-header heigth="40px">场内实时人数<span>70人</span> </el-header>
            </div>
          </el-col>
          <el-col :span="19">
            <el-row type="flex" class="row-bg">
              <el-col :span="8">1</el-col>
              <el-col :span="16">2</el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="24">1</el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="24">1</el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="8">1</el-col>
              <el-col :span="16">2</el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-main> -->
  </div>
</template>

<script>
  export default {
    components: {
    //   swiper,
    //   swiperSlide,
    },
    data () {
      return {
        name: '',
        contractWorkersLoading: false
      }
    },
    watch: {

    },
    created () {

    },
    computed: {

    },
    mounted () {

    },
    methods: {
      // salaryFun(){
      //
      // }
    }
  }
</script>

<style lang="scss" scoped>
.contractWorkers{
  main{
    padding: 10px;
    .main_left1{
      width: 98%;
      margin: 0 auto;
      padding: 10px 0;
      header{
          height: 60px;
          text-align: left;
          width: 326px;
          padding-left: 62px;
          font-size: 16px;
          line-height: 54px;
          background: rgba(12, 76, 91, 1);
          color: #fff;
          box-shadow: 4px 4px 10px 1px rgba(0, 0, 0, .5);
          span{
            display: inline-table;
            width: 88px;
            text-align: right;
            font-size: 24px;
          }
      }
    }
  }
}
</style>
