<template>
  <!--table列表-->
   <div>

     <el-form ref="form" label-position="left" :model="form" label-width="100px">
       <el-row :gutter="10" style="margin-bottom: 20px">
         <el-col :span="24">
           <el-form-item label="表单名称:">
             {{tabData.tableName}}
           </el-form-item>
         </el-col>
         <el-col :span="12">
           <el-form-item label="项目名称:">
             {{tabData.projectName}}
           </el-form-item>
         </el-col>
         <el-col :span="12">
           <el-form-item label="标段:">
             {{tabData.teders}}
           </el-form-item>
         </el-col>
         <el-col :span="12">
           <el-form-item label="选择数据表">
             <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%" @change="changeVal">
               <el-option v-for="item in tabData.sheets" :label="item.sheetName" :value="item.id" :key="item.id"></el-option>

             </el-select>
           </el-form-item>
         </el-col>
       </el-row>
     </el-form>
     <el-table
       ref="singleTable"
       :data="tabData.budgetSheet[form.region]&&tabData.budgetSheet[form.region].list"
       border
       v-loading="loading"
       highlight-current-row
       @current-change="handleCurrentChange"
       @row-click="rowClickFun"
       :row-class-name="tableRowClassName"

       style="width: 100%">
       <el-table-column
         type="index"
         label="序号"
         align="center"
         width="50">
       </el-table-column>
       <el-table-column
         property="projectCode"
        align="center"
         label="项目编码"
         width="120">
       </el-table-column>
       <el-table-column
         property="projectName"
         align="center"
         label="项目名称"
         width="120">
       </el-table-column>
       <el-table-column
         property="description"
         align="center"
         :show-overflow-tooltip="true"
         label="项目描述">
       </el-table-column>
       <el-table-column
         property="unit"
         align="center"
         label="计量单位">
       </el-table-column>
       <el-table-column
         property="projectQuantity"
         align="center"
         label="工程量">
       </el-table-column>
       <el-table-column
         property="comprehensivePrice"
         align="center"
         label="综合单价">
       </el-table-column>

       <el-table-column
         property="valency"
         align="center"

         label="合价">
       </el-table-column>
     </el-table>
      <div v-if="tabData.budgetSheet[form.region]&&tabData.budgetSheet[form.region].list">
        <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :current-page="pageIndex"
            :page-sizes="[10]"
            :page-size="pageSize"
            :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
   </div>
</template>
<script>
  export default {
    props: ['datas'],
    data (){
      return {
        loading: false,
        tabData: {
          budgetSheet: {

          }
        },
        type: '',
        sheetName: '', // sheet选择的值
        form: {
          region: ''
        },
        tableArrData: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        selectIndexsData: 0,
        pagingIndex: 10
      }
    },
    methods: {
      rowClickFun (row, column, event){
        this.$emit('rowClickData', row)
      },
      init (data, type){
       //  console.log(data)
        console.log(data, type)
        if(type){
          this.type=type
        }

        this.tabData=data
        this.tableArrData = JSON.parse(JSON.stringify(data.budgetSheet))

        this.form.region=this.tabData.sheets.length&&this.tabData.sheets[0].id;

        if(this.sheetName){
          this.form.region=this.sheetName
          this.changeVal(this.form.region)
        }
        this.CalculatePagingData(data.budgetSheet)
      },
      tableRowClassName ({row, rowIndex}) {
        // console.log(row)
        if (this.type&&row.status) {
          if(row.modelStatus){
            return 'err-row'
          }else{
            return 'success-row'
          }
        }
        return ''
      },
      changeVal (val){
        this.$forceUpdate()
        this.sheetName=val
        this.CalculatePagingData(this.tableArrData)
        if(!this.tabData.budgetSheet[val].list.length){
          this.$message({
            message: '暂无数据!',
            type: 'warning'
          })
        }
      },
      handleCurrentChange (currentRow, oldCurrentRow){
        console.log(currentRow, oldCurrentRow)
        if(currentRow&&oldCurrentRow&&currentRow.id!=oldCurrentRow.id){
          this.$emit('getOldRow', oldCurrentRow)
        }

          // console.log(oldCurrentRow)
      },
      // 计算分页数据
      CalculatePagingData (data){
        // debugger
        let dataArr = data[this.form.region].list
        this.totalPage = dataArr.length
        this.pageIndex= 1
        this.pageSize = 10
        this.tabData.budgetSheet[this.form.region].list = this.tabData.budgetSheet[this.form.region].list.slice(0, this.pagingIndex)
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
      },
      // 当前页
      currentChangeHandle (val) {
        this.pagingIndex = val*10-10
        this.tabData.budgetSheet[this.form.region].list = []
        this.tabData.budgetSheet[this.form.region].list = this.tableArrData[this.form.region].list.slice(this.pagingIndex, val*10)
        this.pagingIndex = val*10
      }
    }
  }
</script>
<style>
  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-table .err-row{
    background: #f9a7a7;
    color:green;
  }
</style>

