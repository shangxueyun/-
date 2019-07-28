<template>
  <div class="headerBox">
    <el-row >
      <el-col :span="4">
        <img src="../../../../assets/img/home/logo.png" alt=""  style="margin-top:5px;">
      </el-col>
      <el-col :span="16" style="height: 10px">

      </el-col>
      <el-col :span="4" style="display: flex;justify-content: center;align-items: center">
        <img src="../../../../assets/img/home/layout.png" alt="" style="margin-top:5px;">
        <span class="layout" @click="layout" style="margin-top:5px;">
        
        退出项目看板</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "header",
        methods:{
          layout(){
            this.$router.go(-1)
          }
        }
    }
</script>

<style scoped>
   .headerBox{
     width: 100%;
     height: 118px;
     background:url("../../../../assets/img/home/header.png") no-repeat;
     background-size: 100% 100%;
   }
  .layout{
    cursor: pointer;
    font-weight:400;
    color:#00EAFF;
    font-size:18px;
    margin-left: 5px;
  }
</style>
