<template>
  <div class="mod-config tablesbox">
    <el-table
      :data="dataList"
      border
      ref="tab"
      v-loading="cancelBtn"
      @current-change="currentChange"
      :show-header="false"
      @row-click="rowClick"
      style="width: 100%;">
      <el-table-column
        prop="name2"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name1"
        header-align="center"
        align="center"
        width="120">

      </el-table-column>


      <el-table-column

        header-align="center"
        align="center">

      </el-table-column>
      <el-table-column
        prop="name"
        :show-overflow-tooltip="true"
        header-align="center"
        align="center">
        <template slot-scope="scope">
          <span type="primary" @click="getExcelDetail(scope.row.id)" :title="scope.row.name" style="cursor: pointer;">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        header-align="center"
        align="center">
        <template slot-scope="scope">
          <img v-if="scope.row.status" src="../../../../assets/img/succLj.png" alt="">
          <img v-if="!scope.row.status" src="../../../../assets/img/errLj.png" alt="">
        </template>
      </el-table-column>
<!--      <el-table-column-->
<!--        fixed="right"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        width="150"-->

<!--        label="">-->
<!--&lt;!&ndash;        <template slot-scope="scope" >&ndash;&gt;-->
<!--&lt;!&ndash;          <el-button type="text" size="small" @click="assOrUpdateHandle(scope.row.id)"  v-if="isShow">详情查看</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-button type="text" size="small" @click="assOrUpdateHandle(scope.row.id)"  v-if="!isShow">关联模型</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;          <template v-if="!isShow">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-button  type="text" size="small" @click="removeOrUpdateHandle(scope.row.id)" v-if="scope.row.status">取消关联</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;          </template>&ndash;&gt;-->

<!--&lt;!&ndash;          <el-button v-if="!isShow" type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-button v-if="!isShow" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-button v-if="!isShow" type="text" size="small" @click="importExcelFun(scope.row.id)">导出计划清单</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;        </template>&ndash;&gt;-->
<!--      </el-table-column>-->
    </el-table>
    <importExcel ref="importExcel" @changedom="changeTabDataFun"></importExcel>
  </div>
</template>

<script>
  import importExcel from "../models/importExcel"
  import {exportFun} from "@/utils/httpRequest"
  import {getUrl} from "@/utils/httpRequest";
  import {getExcelDetailData} from "@/utils/index"
  import $ from "jquery"
  export default {
    props:['childData','isShow'],
    data () {
      return {
        dataForm: {
          key: ''
        },
        cancelBtn:false,
        dataList: [

        ]
      }
    },
    watch:{
      childData:{
        handler(a,b){
          console.log(a);
          this.dataList=a;
        },
        deep:true
      }
    },
    components: {
      // AddOrUpdate
      importExcel
    },
    activated () {

    },
    destroyed(){
      $(".table_scol tr.el-table__row").each(function() {
        $(this).click(function(){
          $("tr").css("background-color","");
          // $(this).css("background-color","#f0f9eb");
        })
      });
    },
    updated() {
      $(".table_scol tr.el-table__row").each(function() {
        $(this).click(function(){
          $("tr").css({"background-color":"","color":"#606266"});
          $(this).css({"background-color":"rgb(253, 243, 234)","color":"#f19944"});
        })
      });
    },
    mounted(){
      this.dataList=this.childData;
    },
    methods: {
      getUrl,
      // tableRowClassName({row, rowIndex}){
      //   if(row.isClick){
      //     return 'success-row';
      //   }
      //
      // },
      rowClick(row, column, event){

        this.$emit('getRowData',row)
      },
      currentChange(currentRow, oldCurrentRow){
        // console.log(oldCurrentRow)
        // // this.$refs.tab.setCurrentRow(currentRow);
        // if(oldCurrentRow){
        //   oldCurrentRow.isClick=false;
        // }
        // currentRow.isClick=true;

      },
      removeOrUpdateHandle(id){
        this.$confirm('是否取消关联', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.cancelBtn=true;
          this.$http({
            url:this.$http.adornUrl(`/bim/budget/remove?budgetId=${id}`),
            method : 'get'
          }).then((data)=>{
            if(data.data.code==0){
              this.cancelBtn=false;
              this.$message({
                message: '取消关联成功!',
                type: 'success'
              });
              this.$emit('changeTabData')
            }
          })
        }).catch(() => {
          this.cancelBtn=false;
          // this.$message({
          //   message: '取消关联失败!',
          //   type: 'error'
          // });
        });
      },
      importExcelFun(id){//导出excel

        window.open(this.$http.adornUrl(`/bim/budget/export?id=${id}`))


      },
      deleteHandle(id){//删除三层
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url:this.$http.adornUrl(`/bim/budget/delete`),
            method:"post",
            data:[id]
          }).then((data)=>{
            if(data.data.code==0){
              this.$message({
                message: '删除成功!',
                type: 'success'
              });
              this.$emit('changeTabData')
            }else{
              this.$message.error('删除失败!');
            }
          })
        }).catch(() => {

        });

      },
      addOrUpdateHandle(id){//修改excel
        console.log(id)
        getExcelDetailData(id,this).then((data)=>{
          this.$refs.importExcel.dialogVisible=true;
          this.$refs.importExcel.init(id,data);
        })

      },
      // getExcelDetailData(id){
      //   return new Promise((resolve,reject)=>{
      //     this.$http({
      //       url: this.$http.adornUrl(`/bim/budget/queryById?id=${id}`),
      //       method:"post",
      //       // data:this.$http.adornParams({'id':id})
      //     }).then((data)=>{
      //       if(data.data.code==0){
      //         resolve(data.data.result)
      //
      //       }
      //     }).catch((err)=>{
      //       reject(err)
      //     })
      //   })
      // },
      changeTabDataFun(){
       this.$emit('changeTabData')
      },
      changeResult(result){
        let arr=[];
        result.budgetSheet.forEach((a,i)=>{
          let obj={};
          obj.id=i;
          obj.sheetName=a.sheetName;
          arr.push(obj)
        })
        result.sheets=arr;
        return result;
      },
      assOrUpdateHandle(id){//关联模型
        sessionStorage.setItem('excelId',id)
        getExcelDetailData(id,this).then((data)=>{
          // let result=this.changeResult(data)
          // sessionStorage.setItem('tabList',JSON.stringify(result))
          if(!this.isShow){
            this.$router.push({path:"/associatedModel",query:{isShow:false}})
          }else{
            this.$router.push({path:"/associatedModel",query:{isShow:true}})
          }

        })
      },
      getExcelDetail(id){
        getExcelDetailData(id,this).then((data)=>{
           // let result=this.changeResult(data)
           this.$emit('getTabData',data)
         })
      }
    }
  }
</script>
<style>
.el-table__expanded-cell[class*=cell]{
  padding:0
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>

