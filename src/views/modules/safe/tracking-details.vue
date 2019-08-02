<template>

    <div v-if="trackingdetailsBle" id="tracking-details">
      <div class="breadcrumbtab">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/safe-tracking' }">安全问题跟踪</el-breadcrumb-item>
            <el-breadcrumb-item> 安全问题跟踪详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form :inline="true"  >
        <el-form-item label="问题区域" >
                <el-input class="zdyinput"  style="width:180px;" disabled v-model="monomerName"></el-input>
        </el-form-item>
        <el-form-item label="问题类型">
                <el-input class="zdyinput"  style="width:180px;" disabled v-model="problemTypeName"></el-input>
        </el-form-item>
    </el-form>

<div id="tracking">
    <ul v-for="(item,key) in safetyPatrolDetailList" :key="key" class="ullists" >
          <li v-if="item.type == '1'">
                <h2>问题信息</h2>
<el-row :gutter="20">
      <el-col :span="15">
            <el-form :inline="true"  >
                <el-form-item label="整改班组" >
                      <el-input class="zdyinput"  style="width:180px;" disabled v-model="item.teamName"></el-input>
                </el-form-item>
                <el-form-item label="整改时间">
                      <el-input class="zdyinput"  style="width:180px;" disabled v-model="item.timeLimitRectification"></el-input>
                </el-form-item>
                <el-form-item label="整改人员">
                      <el-input class="zdyinput"  style="width:180px;" disabled v-model="item.rectificationPersonnel"></el-input>
                </el-form-item>
                <el-form-item label="上报人员">
                      <el-input class="zdyinput"  style="width:180px;" disabled v-model="item.createUser"></el-input>
                </el-form-item>
                <el-form-item label="上报时间">
                      <el-input class="zdyinput"  style="width:180px;" disabled v-model="item.createTime"></el-input>
                </el-form-item>
                <el-form-item>
                  <div>
                    <span >通知人员</span><div class="tzuser" ><span v-for="i in safetyProblemUserList" :key="i">
                            <span>{{i.userName}}</span>
                      </span></div>
                  </div>
                </el-form-item>
            </el-form>
            <el-form>
              <el-form-item label="备注" label-width="70px">  
                      <el-input class="zdyinput"  style="width:100%;" type="textarea" disabled v-model="item.remark"></el-input>
              </el-form-item>
            </el-form>
           
      </el-col>

      <el-col :span="9" >
              <div>照片</div>
              <div v-for="(img,i) in item.imgs" class="imgbox" :key="i">
                    <img class="itemimgs" :src="img" @click="getInfo">
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

               
    </ul>
    </div>
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
        trackingdetailsBle:true,
        monomerName:'',
        problemTypeName:'',
        attributeName:'',
        type:'',
        safetyProblemUserList:[]
      }
    },
    activated () {
      this.trackingdetailsBle = false;
      this.init()
    },
    mounted(){
    },
    methods: {
      init (id) {
        this.visible = true
        var id = this.$route.query.id
        this.$http({
          url: this.$http.adornUrl('/bim/safetyProblem/findSafetyProblemById'),
          method: 'post',
          data: this.$http.adornParams({
            'id': id
          })
        }).then(({data}) => {
            if (data && data.code === 0) {
                this.monomerName = data.result.monomerName
                this.problemTypeName = data.result.problemTypeName
                this.dataList = data.result.safetyPatrolDetailFormList
                this.safetyProblemUserList = data.result.safetyProblemUserList
                var safelist = data.result.safetyProblemDetailList
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
                this.safetyPatrolDetailList = safelist
                this.trackingdetailsBle = true;
            } else {

            }
        })
      },
      getInfo(){
          var ViewerDom = document.getElementById('tracking-details');
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

.eldialogbody .el-dialog__body{padding:10px 20px;}
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
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
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
.tzuser{
  display: inline-block;
  height:36px;
  line-height: 36px;
  margin-left:14px;
  border:1px solid #e4e7ed;
  background:#f5f7fa;
  border-radius: 4px;
  min-width: 180px;
  text-indent: 12px;
}
</style>

