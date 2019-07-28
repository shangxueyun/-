<template>
  <div class="visualProgress" v-loading="visualProgressLoading">
    <div v-if="switchModule == 1">
      <el-form :inline="true" :model="dataForm" ref="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item label="单体：" prop="modelMonomerId">
          <el-select v-model="dataForm.modelMonomerId" @change="modelAjax(dataForm.modelMonomerId)" placeholder="请选择">
            <el-option
              v-for="item in monomerOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="流水段：" prop="modelId">
          <el-select v-model="dataForm.modelId" @change="floorAjax(dataForm.modelId)" placeholder="请选择">
            <el-option
              v-for="item in modelOptions"
              :key="item.id"
              :label="item.modelName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼层：" prop="glId">
          <el-select v-model="dataForm.glId" @change="glIdAjax(dataForm.glId)" placeholder="请选择">
            <el-option
              v-for="item in threeOptions"
              :key="item.glId"
              :label="item.name"
              :value="item.glId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传时间区间：">
            <el-date-picker
            type="datetimerange"
            v-model="date"
            value-format='yyyy-MM-dd HH:mm:ss'
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            style="width:18rem">
            </el-date-picker>
        </el-form-item>
        <el-form-item class="inquire">
          <el-button @click="getDataList('1')">查询</el-button>
          <el-button type="primary" @click="resetForm()">清空筛选</el-button>
        </el-form-item>
      </el-form>

      <div class="form_list">
        <el-table
            :data="dataList"
            border
            @cell-dblclick="scheduleDetails"
            v-loading="dataListLoading"
            header-row-class-name="dataListheader"
            highlight-current-row
            style="width: 100%">
            <el-table-column
                type="index"
                header-align="center"
                width="60"
                align="center"
                label="序号">
            </el-table-column>
            <el-table-column
                prop="monomerName"
                label="单体"
                header-align="center"
                align="center"
                >
            </el-table-column>
            <el-table-column
                prop="flowSectionName"
                header-align="center"
                align="center"
                label="流水段">
            </el-table-column>
            <el-table-column
                prop='floorName'
                header-align="center"
                align="center"
                label="楼层">
            </el-table-column>
            <el-table-column
                prop="content"
                header-align="center"
                align="center"
                min-width="150"
                :show-overflow-tooltip="true"
                label="工作内容">
            </el-table-column>
            <el-table-column
                prop="createTime"
                header-align="center"
                align="center"
                label="上传时间">
            </el-table-column>
            <el-table-column
                prop="createUser"
                header-align="center"
                align="center"
                label="上传人员">
            </el-table-column>
        </el-table>
      </div>

      <div>
        <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :current-page="pageIndex"
            :page-sizes="[10, 20, 50]"
            :page-size="pageSize"
            :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>

    <div v-else-if="switchModule == 2" class="scheduleDetails" style="width:100%">
      <el-breadcrumb style="position: absolute;top: 16px;" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item><a @click="exit()" href="javascript:;">形象进度</a></el-breadcrumb-item>
        <el-breadcrumb-item style="color:#008CD6FF">形象进度详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="position: absolute;width: 97.5%;top: 3rem;">
        <el-row>
          <el-col :span="12">
              <el-table
                :data="constructionRegionData"
                style="width: 100%"
                :header-row-style="{color:'#666666FF',lineHeight:'34px'}"
                class="constructionRegion"
                border>
                <el-table-column
                  label="施工区域"
                  header-align="center"
                  align="center"
                  min-width="180">
                  <template slot-scope="scope">
                    <div style="border-right: 1px solid #eee;">{{scope.row.monomerName}}</div>
                    <div style="border-right: 1px solid #eee;">{{scope.row.flowSectionName}}</div>
                    <div>{{scope.row.floorName}}</div>
                </template>
                </el-table-column>
              </el-table>
              <el-table
                :data="numberEmploymentData"
                style="width: 100%"
                :header-row-style="{color:'#666666FF',lineHeight:'34px'}"
                class="numberEmployment"
                border>
                <el-table-column
                  label="用工数量 "
                  header-align="center"
                  align="center"
                  min-width="180">
                  <template slot-scope="scope">
                    <el-row style="border-bottom: 1px solid #eee;">
                      <el-col style="width:33.3%;background: #F6F6F6FF;" :span="8">工种总数（种）</el-col>
                      <el-col :span="16">{{scope.row.totalNumber}}</el-col>
                    </el-row>
                    <el-row>
                      <el-col style="width:33.3%;background: #F6F6F6FF;" :span="8">用工总量（人）</el-col>
                      <el-col :span="16">{{scope.row.totalEmployment}}</el-col>
                    </el-row>
                  </template>
                </el-table-column>
              </el-table>
              <el-table
                :data="leftContentData"
                style="width: 100%"
                :header-row-style="{color:'#666666FF',lineHeight:'34px'}"
                class="leftContent"
                :row-style="{height:'52px'}"
                header-cell-class-name="leftContentWidth"
                height="414px"
                border>
                <el-table-column
                  type="index"
                  header-align="center"
                  class-name="leftContentWidth"
                  align="center"
                  label="序号">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="工种"
                  class-name="leftContentWidth"
                  header-align="center"
                  align="center"
                  >
                </el-table-column>
                <el-table-column
                  prop="number"
                  class-name="leftContentWidth"
                  header-align="center"
                  align="center"
                  label="数量（人）">
                </el-table-column>
              </el-table>
              <el-row class="bottom_row" style="border-bottom: 1px solid #eee;">
                <el-col style="width:33.3%;background: #F6F6F6FF;" :span="8">上传时间</el-col>
                <el-col :span="16">{{scheduleDetailsObjD.createTime}}</el-col>
              </el-row>
              <el-row class="bottom_row">
                <el-col style="width:33.3%;background: #F6F6F6FF;" :span="8">上传人员</el-col>
                <el-col :span="16">{{scheduleDetailsObjD.createUser}}</el-col>
              </el-row>
          </el-col>
          <el-col :span="12">
            <el-container>
              <el-header height="50px">工作内容</el-header>
              <el-main style="height: 196px;line-height: 36px;font-size: 14px;">
                {{scheduleDetailsObjD.scheduleDetailscontent}}
              </el-main>
            </el-container>
            <el-container>
              <el-header height="50px">照片 </el-header>
              <el-main style="padding: 3rem;height: 455px;line-height: 36px;font-size: 14px;border-bottom: 1px solid #eee;">
                <el-row :gutter="10">
                  <el-col v-for="(item,key) in Detailsimgs"  v-if="key<6" :key="key" :sm="12" :md="12" :lg="12" :xl="8">
                    <a href="javascript:void(0);" @click="swiperdialog">
                      <img :src="item" alt="图片1">
                      图片{{key+1}}
                    </a>
                  </el-col>
                </el-row>
              </el-main>
            </el-container>
          </el-col>
        </el-row>        
      </div>

    </div>

    <el-dialog
        title="图片预览"
        :visible.sync="dialogVisible"
        width="56%"
        :modal-append-to-body="true"
        :append-to-body="true"
        :before-close="clearClose">
      <div v-if="swiperdialogBle" style="height: 640px">
        <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
          <swiper-slide v-for="(item,key) in swiperimgs" :key="key" class="slide-1">
            <a href="javascript:void(0);">
              <img style="width:100%;" :src="item" alt="图片1">
            </a>
          </swiper-slide>
          <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
          <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        </swiper>
        <!--  -->
        <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
          <swiper-slide v-for="(item,key) in swiperimgs" :key="key" class="slide-1">
            <a href="javascript:void(0);">
              <img style="width:100%;" :src="item" alt="图片1">
            </a>
          </swiper-slide>
        </swiper>
      </div>            
    </el-dialog>

  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    components: {
      swiper,
      swiperSlide,
    },
    inject: ['refresh'],
    data () {
      return {
        dataForm:{
          modelMajorId:3,
          modelMonomerId:'',
          modelId:'',
          glId:'',
          createBeginTime:'',
          createEndTime:'',
        },
        date:'',
        dataList:[],
        monomerOptions:[],
        modelOptions:[],
        threeOptions:[],
        //
        constructionRegionData:[
        ],
        numberEmploymentData:[
        ],
        leftContentData:[ 
        ],
        scheduleDetailscontent:'',
        scheduleDetailsObjD:{
          scheduleDetailscontent:'',
          createTime:'',
          createUser:'',
        },
        Detailsimgs:[],
        swiperimgs:[],
        swiperdialogBle:false,
        //
        dataListLoading:false,
        visualProgressLoading:false,
        dialogVisible:false,
        bouncedTitle:'name',
        switchModule:1,
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        //
        swiperOptionTop: {
          spaceBetween: 6,
          slideTo:2,
          loop: true,
          loopedSlides: 3, //looped slides should be the same
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        swiperOptionThumbs: {
          spaceBetween: 6,
          slidesPerView: 4,
          touchRatio: 0.2,
          slideTo:2,
          loop: true,
          loopedSlides: 3, //looped slides should be the same
          slideToClickedSlide: true,
        }
      }
    },
    watch: {
      switchModule(val){
        if(val == 1)
        {
          this.refresh();
        }
      },
    },
    created() {

    },
    computed: {

    },
    beforeRouteLeave(to, from, next) {
      this.$destroy();
      next();
    },
    mounted() {
      this.monomerAjax();
      this.getDataList();
    },
    methods: {
      getDataList(num){
        if(num == 1){
            this.pageIndex = 1
        }
        debugger
        this.visualProgressLoading = true;
        this.$http({
          url: this.$http.adornUrl('/bim/imageProgress/list'),
          method: 'POST',
          data: this.$http.adornData({
              'pageNo': this.pageIndex,
              'pageSize': this.pageSize,
              'param':this.dataForm
          })
        }).then(({data}) => {
          this.visualProgressLoading = false;
          if (data && data.code === 0) {
            this.dataList = data.result.list;
            this.totalPage = data.result.totalCount;
            this.pageIndex = data.result.currPage;
          }else
          this.$message.error(data.msg);
        });
      },
      changeDate(val){
        if(val){
          this.dataForm.createBeginTime = val[0]
          this.dataForm.createEndTime = val[1]; 
        }else{
          this.dataForm.createBeginTime = '';
          this.dataForm.createEndTime = ''; 
        }
      },
      ClickChange(){
        this.getDataList();
      },
      resetForm(){
        this.date = '';
        this.monomerOptions = []
        this.modelOptions = []
        this.threeOptions = []
        this.$refs['dataForm'].resetFields();
        this.dataForm = {
          modelMajorId:3,
          modelMonomerId:'',
          modelId:'',
          glId:'',
          createBeginTime:'',
          createEndTime:'',
        },
        this.monomerAjax();
        this.getDataList();
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      //获取单体
      monomerAjax(id){
        this.$http({
          url: this.$http.adornUrl('/bim/modelMonomer/listSuccessModelMonomer'),
          method: 'POST',
          data: this.$http.adornData({
            'modelMajorId':3
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataForm.modelMonomerId = "";
            this.dataForm.modelId = "";
            this.dataForm.glId = "";
            this.monomerOptions = [];
            this.modelOptions = [];
            this.threeOptions = [];
            data.result.forEach((v,i)=>{
              this.monomerOptions.push(v);
            });
          }else
          this.$message.error(data.msg);
        });          
      },
      //获取模型方法
      modelAjax(monomer){
          if(monomer)
          {
            this.$http({
              url: this.$http.adornUrl('/bim/model/listModel'),
              method: 'POST',
              data: this.$http.adornData({
                'modelMajorId':3,
                'modelMonomerId':monomer,
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.modelId = "";
                this.dataForm.glId = "";
                this.modelOptions = [];
                this.threeOptions = [];
                data.result.forEach((v,i)=>{
                  this.modelOptions.push(v);
                });
              }else
              this.$message.error(data.msg);
            });
          }
      },
      floorAjax(floor){
          if(floor)
          {
            this.$http({
              url: this.$http.adornUrl('/bim/modelTree/listModelTree'),
              method: 'POST',
              data: this.$http.adornData({
                'modelId':floor,
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.glId = "";
                this.threeOptions = [];
                data.result.forEach((v,i)=>{
                  this.threeOptions.push(v);
                });
              }else
              this.$message.error(data.msg);
            });
          }
      },
      glIdAjax(glId){
        this.dataForm.glId = glId;
      },
      scheduleDetails(obj){
        this.visualProgressLoading = true;
        this.$http({
          url: this.$http.adornUrl('/bim/imageProgress/findByPK'),
          method: 'POST',
          data: this.$http.adornData({
            'id':obj.id,
          })
        }).then(({data}) => {
          this.visualProgressLoading = false;
          if (data && data.code === 0) {
            this.DetailsEleData(data.result);
          }else
          this.$message.error(data.msg);
        });
      },
      DetailsEleData(Obj){
        //施工区域
        this.constructionRegionData = [];
        this.constructionRegionData = [{
          monomerName:Obj.monomerName,
          flowSectionName:Obj.flowSectionName,
          floorName:Obj.floorName,
        }]
        this.numberEmploymentData = [];
        this.numberEmploymentData = [
          {totalNumber:Obj.totalNumber,
          totalEmployment:Obj.totalEmployment}
        ]
        this.leftContentData = Obj.laborDtoList;
        this.scheduleDetailsObjD = {
          scheduleDetailscontent:Obj.content,
          createTime:Obj.createTime,
          createUser:Obj.createUser,
        }
        this.Detailsimgs = [];
        this.Detailsimgs = Obj.imgs;
        this.switchModule = 2;
      },
      swiperdialog(){
        this.swiperdialogBle = true;
        this.swiperimgs = [];
        this.swiperimgs = this.Detailsimgs;
        this.swiperOptionThumbs.slidesPerView = this.Detailsimgs.length;
        this.dialogVisible = true;
        this.$nextTick(() => {
          const swiperTop = this.$refs.swiperTop.swiper
          const swiperThumbs = this.$refs.swiperThumbs.swiper
          swiperTop.controller.control = swiperThumbs
          swiperThumbs.controller.control = swiperTop
        })
      },
      //Object
      examine(obj){
          for(let i in obj)
          {
              if(obj[i] == "")
              {
                  return false;
              }
          }
      },
      clearClose(){
        this.dialogVisible = false;
        this.swiperdialogBle = false;
        this.swiperimgs = [];
      },
      exit(){
        this.switchModule = 1;
        this.date = '';
        this.monomerAjax();
        this.getDataList();
      },
    },
  }
</script>

<style lang="scss" scoped>
.visualProgress{
  position: relative;
  // .log{
  //   position: absolute;
  // }
  .constructionRegion{
    .cell{
      div{
        width: 33%;
        float: left;
        line-height: 48px;
      }
    }
  }
  .numberEmployment{
    .cell{
      div{
        line-height: 48px;
      }
    }
  }
  .scheduleDetails{
    .bottom_row{
          border-bottom: 1px solid rgb(238, 238, 238);
          line-height: 44px;
          border-left: 1px solid #eee;
          border-right: 1px solid #eee;
          div{
            text-align: center;
          }
    }
  }
  .el-main{
    border-right: 1px solid #eee;
    a{
    width: 11rem;
    display: block;
    height: 11rem;
    float: left;
    text-align: center;
    font-size: 14px;
    color: #333;
    margin-left: 24px;
      img{
        width: 10.8rem;
        height: 82%;
      }
    }
  }
  .dataListheader{
    padding: 0
  }
}
</style>
<style>
.visualProgress .inquire button {
    padding: 10px 20px;
}
/* 表格头高度 */
.visualProgress .dataListheader th{
  padding: 0;
  height: 40px;
}
.visualProgress .scheduleDetails .constructionRegion td{
  padding: 0px;
}
.visualProgress .scheduleDetails .constructionRegion .cell{
  padding: 0px !important;
}
.visualProgress .scheduleDetails .numberEmployment td{
  padding: 0px;
}
.visualProgress .scheduleDetails .numberEmployment .cell{
  padding: 0px !important;
}
.visualProgress .scheduleDetails .leftContent tr{
  width: 100%
}
.visualProgress .scheduleDetails .leftContent .leftContentWidth{
  width: 33.3%;
}
.visualProgress .scheduleDetails .leftContent .el-table__header {
    width: 100%;
    table-layout: auto;
}
.visualProgress .scheduleDetails .leftContent .el-table__body{
    width: 100% !important;
    table-layout: inherit;
}
 .visualProgress .scheduleDetails .el-header, .visualProgress .scheduleDetails .el-footer {
    background-color: #f8f8f8;
    color: #333;
    text-align: center;
    line-height: 50px;
    font-weight: 600;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
  }
</style>
<style lang="scss" scoped>
  .swiper-container {
    background-color: #eee;
  }
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }
  .gallery-top {
    height: 80%!important;
    width: 100%;
  }
  .gallery-thumbs {
    height: 20%!important;
    box-sizing: border-box;
    padding: 10px 0;
  }
  .gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }
  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
</style>

