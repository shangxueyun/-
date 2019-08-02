<template>
<div>
<el-row :gutter="20">
    <el-col :span="6">
        <div class="teamDistributions">
              <h2>质量管理</h2>
              <div class="superviselist">
                  <el-row :gutter="20">
                      <el-col :span="12">
                          <b>问题总量</b><el-tag type="danger">1325</el-tag>
                      </el-col>
                      <el-col :span="12">
                          <b>待整改</b><el-tag type="warning">325</el-tag>
                      </el-col>
                      <el-col :span="12">
                          <b>待复查</b><el-tag>325</el-tag>
                      </el-col>
                      <el-col :span="12">
                          <b>已复查</b><el-tag type="info">325</el-tag>
                      </el-col>
                  </el-row>
              </div>
        </div>  
    </el-col>
    <el-col :span="12">
        <div class="teamDistributions">
              <h2>项目里程碑</h2>
              <div class="superviselist">
                  <el-row :gutter="20">
                      <el-col :span="12">
                          <b>问题总量</b><el-tag type="danger">1325</el-tag>
                      </el-col>
                      <el-col :span="12">
                          <b>待整改</b><el-tag type="warning">325</el-tag>
                      </el-col>
                      <el-col :span="12">
                          <b>待复查</b><el-tag>325</el-tag>
                      </el-col>
                      <el-col :span="12">
                          <b>已复查</b><el-tag type="info">325</el-tag>
                      </el-col>
                  </el-row>
              </div>
        </div>  
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </el-col>
    <el-col :span="6">
        <div class="teamDistributions">
              <h2>安全管理</h2>
              <div class="superviselist">
                  <el-row :gutter="20">
                      <el-col :span="12">
                          <b>问题总量</b><el-tag type="danger">1325</el-tag>
                      </el-col>
                      <el-col :span="12">
                          <b>待整改</b><el-tag type="warning">325</el-tag>
                      </el-col>
                      <el-col :span="12">
                          <b>待复查</b><el-tag>325</el-tag>
                      </el-col>
                      <el-col :span="12">
                          <b>已复查</b><el-tag type="info">325</el-tag>
                      </el-col>
                  </el-row>
              </div>
        </div>  

    </el-col>
</el-row>

</div>

</template>

<script>
  export default {
    data () {
      return {
      
      }
    },
    activated(){

    },
    methods: {
      // 获取数据列表
      getDataList () {
      }
    }
  }
</script>

<style lang="scss" scoped>
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

.teamDistributions{
  // box-shadow: 0 2px 1px 0 rgba(0,0,0,.1);
  border:1px solid #ebeef5;
  border-radius: 4px;
  h2{
    border-bottom:1px solid #ebeef5;
    color:#303133;
    height:40px;
    line-height: 40px;
    font-size: 14px;
    text-indent: 20px;
  }
}
.superviselist{
  padding:15px;
  .el-col{
    // border:1px solid red;
    line-height: 50px;
    height:50px;
    overflow: hidden;
    
    
  }
  b{
    float: left;
    font-size:12px;
    color:#616161;
  }
  span{
    float: right;
    margin:10px 0 0 0;
  }
}


</style>