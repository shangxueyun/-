<template>

<div v-if="sitedetailsBle" id="site-details">
    <div class="breadcrumbtab">
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/safe-site' }">安全巡检</el-breadcrumb-item>
          <el-breadcrumb-item>安全巡检详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :inline="true"  >
        <el-form-item label="RFID号" >
                <el-input class="zdyinput"  style="width:180px;" disabled v-model="rfId"></el-input>
        </el-form-item>
        <el-form-item label="标签名称">
                <el-input class="zdyinput"  style="width:180px;" disabled v-model="labelName"></el-input>
        </el-form-item>
        <el-form-item label="属性">
                <el-input class="zdyinput"  style="width:180px;" disabled v-model="attributeName"></el-input>
        </el-form-item>
        <el-form-item label="类别">
                <el-input class="zdyinput"  style="width:180px;" disabled v-model="type"></el-input>
        </el-form-item>
    </el-form>

    <ul v-for="(item,key) in safetyPatrolDetailList" class="ullists"  :key="key">
          <li v-if="item.type == '1'">
                <h2>检查信息</h2>
<el-row :gutter="20">
      <el-col :span="15">
        <el-form :inline="true"  >
            <el-form-item label="巡检人员" >
                   <el-input class="zdyinput"  style="width:180px;" disabled v-model="item.createUser"></el-input>
            </el-form-item>
            <el-form-item label="巡检时间">
                   <el-input class="zdyinput"  style="width:180px;" disabled v-model="item.createTime"></el-input>
            </el-form-item>
        </el-form>
<el-table
  class="listtables"
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;">
      <el-table-column
        type="index"
        header-align="center"
        align="center"
        width="80"
        label="序号">
      </el-table-column>
     <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="检查内容">
      </el-table-column>
      <el-table-column
        prop="examinationResults"
        header-align="center"
        align="center"
        width="100"
        label="检查结果">
            <template slot-scope="scope">
                  <span class="h" v-if="scope.row.examinationResults == 1">
                    合格
                  </span>
                  <span class="b" v-if="scope.row.examinationResults == 2">
                    不合格
                  </span>
            </template>
      </el-table-column>
</el-table>

            <el-form :inline="true"  v-if="item.examinationResults == '合格'">
                <el-form-item label="检查结果">
                        <el-input class="zdyinput h"   style="width:180px;color:red;"  disabled v-model="item.examinationResults"></el-input>
                </el-form-item>
            </el-form>
            <el-form :inline="true"  v-if="item.examinationResults == '不合格'">
                <el-form-item label="检查结果">
                        <el-input class="zdyinput b"   style="width:180px;color:red;"  disabled v-model="item.examinationResults"></el-input>
                </el-form-item>
                <el-form-item label="整改人员">
                      <el-input class="zdyinput"   style="width:180px;" disabled v-model="item.rectificationPersonnel"></el-input>
                </el-form-item>
                <el-form-item label="整改期限">
                      <el-input class="zdyinput"   style="width:180px;" disabled v-model="item.timeLimitRectification"></el-input>
                </el-form-item>
            </el-form>
      </el-col>

      <el-col :span="9" >
              <div>照片</div>
              <div v-for="(img,i) in item.imgs" class="imgbox" :key="i">
                    <img class="itemimgs" @click="getInfo" :src="img">
              </div>
      </el-col>
</el-row>
          </li>
          <li v-if="item.type == '2'">
                <h2>整改信息</h2>
<el-row :gutter="20">
      <el-col :span="15">
        <el-form :inline="true"  >
            <el-form-item label="整改人员" >
                   <el-input class="zdyinput"  style="width:180px;" disabled v-model="item.rectificationPersonnel"></el-input>
            </el-form-item>
            <el-form-item label="整改时间">
                   <el-input class="zdyinput"  style="width:180px;" disabled v-model="item.timeLimitRectification"></el-input>
            </el-form-item>
            <el-form-item label="是否逾期">
                   <el-input class="zdyinput"  style="width:180px;" disabled v-model="item.isOverdue"></el-input>
            </el-form-item>
        </el-form>
<el-table
  class="listtables"
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;">
      <el-table-column
        type="index"
        header-align="center"
        align="center"
        width="80"
        label="序号">
      </el-table-column>
     <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="检查内容">
      </el-table-column>
      <el-table-column
        prop="examinationResults"
        header-align="center"
        align="center"
        width="100"
        label="检查结果">
            <template slot-scope="scope">
                  <span class="h" v-if="scope.row.examinationResults == 1">
                    合格
                  </span>
                  <span class="b" v-if="scope.row.examinationResults == 2">
                    不合格
                  </span>
            </template>
      </el-table-column>
</el-table>

        <el-form :inline="true"  v-if="item.examinationResults == '合格'">
            <el-form-item label="检查结果" label-width="70px">
                    <el-input class="zdyinput h"   style="width:180px;"  disabled v-model="item.examinationResults"></el-input>
            </el-form-item>
        </el-form>
        <el-form :inline="true"  v-if="item.examinationResults == '不合格'">
            <el-form-item label="检查结果" label-width="70px">
                    <el-input class="zdyinput b"   style="width:180px;"  disabled v-model="item.examinationResults"></el-input>
            </el-form-item>
            <el-form-item label="整改人员" label-width="70px">
                   <el-input class="zdyinput"  style="width:180px;" disabled v-model="item.rectificationPersonnel"></el-input>
            </el-form-item>
            <el-form-item label="整改期限" label-width="70px">
                   <el-input class="zdyinput"  style="width:180px;" disabled v-model="item.timeLimitRectification"></el-input>
            </el-form-item>
        </el-form>
        <el-form>
        <el-form-item label="备注" label-width="70px">  
                <el-input class="zdyinput"  style="width:100%;" type="textarea" disabled v-model="item.remark"></el-input>
        </el-form-item>
        </el-form>

      </el-col>

      <el-col :span="9">
              <div>照片</div>
              <div v-for="(img,i) in item.imgs" class="imgbox" :key="i">
                    <img class="itemimgs" :src="img" @click="getInfo">
              </div>
      </el-col>
</el-row>      
          </li>
          <li v-if="item.type == '3'">
                <h2>复查信息</h2>

<el-row :gutter="20">
      <el-col :span="15">
        <el-form :inline="true"  >
            <el-form-item label="复查人员" >
                   <el-input class="zdyinput"  style="width:180px;" disabled v-model="item.createUser"></el-input>
            </el-form-item>
            <el-form-item label="复查时间">
                   <el-input class="zdyinput"  style="width:180px;" disabled v-model="item.createTime"></el-input>
            </el-form-item>
            <el-form-item label="复查结果">
                   <el-input class="zdyinput"  style="width:180px;" disabled v-model="item.examinationResults"></el-input>
            </el-form-item>
        </el-form>


      </el-col>

      <el-col :span="9">
              <div>照片</div>
              <div v-for="(img,i) in item.imgs" class="imgbox" :key="i">
                    <img class="itemimgs" :src="img" @click="getInfo">
              </div>
      </el-col>
</el-row> 
          </li>

               
    </ul>
    </div>

</template>

<script>
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
  export default {
    data () {
      return {
        visible: false,
        safetyPatrolDetailList:[],
        dataListLoading: false,
        dataList:[],
        isfullscreen:true,
        sitedetailsBle:true,
        rfId:'',
        labelName:'',
        attributeName:'',
        type:''
      }
    },
    activated () {
      this.sitedetailsBle = false;
      this.init()
    },
    mounted(){
    },
    methods: {
      init (id) {
        var id = this.$route.query.id

        this.visible = true
        this.$http({
          url: this.$http.adornUrl('/bim/safetyPatrol/findSafetyPatrolById'),
          method: 'post',
          data: this.$http.adornParams({
            'id': id
          })
        }).then(({data}) => {
            if (data && data.code === 0) {
                this.rfId = data.result.rfId
                this.labelName = data.result.labelName
                this.attributeName = data.result.attributeName
                this.type = data.result.type
                this.dataList = data.result.safetyPatrolDetailFormList
                var safelist = data.result.safetyPatrolDetailList
                safelist.forEach((item) =>{
                  if(item.examinationResults == 1){
                    item.examinationResults = '合格'
                  }else{
                    item.examinationResults = '不合格'
                  }
                  if(item.isOverdue == 0){
                    item.isOverdue = '否'
                  }else{
                    item.isOverdue = '是'
                  }

                    
                })
                this.safetyPatrolDetailList = safelist;
                this.sitedetailsBle = true;
            } else {

            }
        })
      },
      getInfo(){
          var ViewerDom = document.getElementById('site-details');
          var viewer = new Viewer(ViewerDom, {
                navbar:true,
                title:false,
                toolbar:true,
                rotatable:false,
                scalable:false,
                zoomable:false,
                transition:true,
                fullscreen:false,
                keyboard:false,
                backdrop:true,
                loop:true,
                loading:true,
          })

      }
    }
  }
</script>
<style>

/* .eldialogbody .el-dialog__body{padding:10px 20px;} */
.zdyinput.is-disabled .el-input__inner{
  color:#606266;
}
.b.is-disabled .el-input__inner{
  color:red;
}
.h.is-disabled .el-input__inner{
  color:#378906;
}
</style>

<style  lang="scss" scoped>
.breadcrumbtab{
  height:30px;
  border-bottom:1px solid #ebeef5;
  margin-bottom:20px;
}
.tableDatatable{
  margin:10px 0 0 0;
}
.tableDatatable td, .tableDatatable th{
    padding:0;
}
.tableDatatable td{
  padding:4px 0;
}
.listtables{
  margin:0 0 20px 0;
}
.itemimgs{
  width:80px;
  height:80px;
  margin: 10px 20px 10px 0;

}
.ullists{
  list-style: none;
  padding:0;
  margin:0;
  h2{

    padding:0;
    margin:0 0 20px 0;
    font-size:16px;
    border-bottom:1px solid #ebeef5;
    line-height: 40px;
  }
  li{
    border:1px solid #ebeef5;
    padding:0 20px 20px 20px;
    margin:0 0 20px 0;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.1);
    .h{
      color:#378906;
    }
    .b{
      color:red;
    }
  }

}
.imgbox{
  display: inline-block;
}
</style>

