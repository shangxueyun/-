<template>
  <div class="contains" >
    <div  class="header" >

        <el-input v-model="params.name" placeholder="计划清单名称" style="width: 20%" clearable></el-input>

        <el-button type="success" @click="searchTree(params.name)" style="margin-left: 10px">搜索</el-button>

        <!--<el-button type="primary" @click="importExcel">导入计划清单</el-button>-->


<!--        <template v-if="checkNum===0">-->
<!--          <el-button  size="small" type="warning" @click="editOrUpdateHandle">修改</el-button>-->
<!--        </template>-->
      <template v-if="checkNum===1">
        <upload @getFile="getFileFun" :listId="uoloadData" ></upload>
      </template>
      <template v-if="checkNum===2">
        <el-button  type="warning" size="small" @click="addOrUpdateHandleExcel">修改</el-button>
        <el-button  type="danger"  size="small" @click="deleteHandle">删除</el-button>
        <el-button  type="primary" size="small" @click="importExcelFun">导出计划清单</el-button>
        <el-button type="primary" size="small" @click="assOrUpdateHandle" >关联模型</el-button>
        <el-button type="danger" size="small" @click="removeOrUpdateHandle" v-if="rowStatus==1">取消关联</el-button>
      </template>
        <!--<el-button type="primary">单体分组</el-button>-->


        <!-- <el-button type="primary" @click="goModel">预览模型</el-button> -->


        <!--<el-button type="primary"></el-button>-->

    </div>
    <el-row :gutter="20">
      <el-col :lg="24" :md="24" :sm="24" :xs="24" style="border-right: 1px solid #eee;">
        <el-table
          :data="dataList"
          border
          :row-class-name="tableRowClassName"
          default-expand-all
          v-loading="dataListLoading"
          @expand-change="expandChange"
          @row-click="rowClick"
          @selection-change="selectionChangeHandle"
          height="728px"
          style="width: 100%;"
          class="table_scol">
          <el-table-column
            header-align="center"
            align="center"
            width="50"
            type="expand">
            <template slot-scope="scope">
              <table-list :parentData="scope.row.monomerList" ref="tableList" @changeCurrent="changeCurrentFun" @getRowData="getRowDataFun" @changeDom="getDataList" @getTabDataChild="getTabDataChildFun" @changeTabDataChild="importExcelSucc"></table-list>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            header-align="center"
            align="center"
            width="120"
            label="专业分组">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="types"
            header-align="center"
            align="center"
            label="单体分组">
          </el-table-column>
          <el-table-column
            prop="remark"
            header-align="center"
            align="center"
            label="计划清单名称">
          </el-table-column>
          <el-table-column
            prop="remark"
            header-align="center"
            align="center"
            label="关联标记">
          </el-table-column>




<!--          <el-table-column-->
<!--            header-align="center"-->
<!--            align="center"-->
<!--            width="150"-->
<!--            label="操作">-->
<!--            <template slot-scope="scope">-->

<!--              &lt;!&ndash;<el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button> &ndash;&gt;&ndash;&gt;-->
<!--            </template>-->
<!--          </el-table-column>-->
        </el-table>

      </el-col>
<!--      <el-col :lg="14" :md="24" :sm="24" :xs="24">-->

<!--        <modelTableList :datas="data" ref="modelTableList"></modelTableList>-->
<!--      </el-col>-->
      
    </el-row>
    <div >
      <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="pageIndex"
          :page-sizes="[10,20,50]"
          :page-size="pageSize"
          :total="totalPage"
          layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
    <addGrouping ref="addGrouping" @changeDom="getDataList"></addGrouping>
    <AddOrUpdate v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></AddOrUpdate>
    <importExcel ref="importExcel" @changedom="getDataList"></importExcel>
    <excelDetail ref="excelDetail"></excelDetail>
  </div>
</template>
<script>
   import addGrouping from './models/addGrouping.vue'
   import TableList from './entity/table-list'
   import AddOrUpdate from './entity/model-add-or-update'
   import importExcel from './models/importExcel'
   import modelTableList from './models/modelTableList'
   import { mapActions, mapMutations } from 'vuex'
   import {getExcelDetailData} from '@/utils/index'
   import excelDetail from './entity/excelDetail.vue'
   import upload from './models/upload'
export default {
     data () {
       return {
         uoloadData: {}, // 上传excel数据
         loading: false,
         checkNum: '', // 点击表格行所呈现的按钮
         dataListLoading: true,
         addOrUpdateVisible: false,
         list: [],
         rowStatus: '', // 是否关联模型
         clickRow: {}, // 点击专业分组的当前数据
         childData: {}, // 传给子集数据
         form: {

         },
         params: {
           name: ''
         },
         tableData1: [],
         data: {
           budgetSheet: {

           }
         },
         dataList: [
         ],
         pageIndex: 1,
         pageSize: 10,
         totalPage: 0
       }
     },
     mounted (){
      // this.$http({
      //   url: this.$http.adornUrl('/bim/datalabel/getAllFileList'),
      //   method: 'post'
      // })

       this.getTabList()
   this.getGroupList()
     },
     components: {
       addGrouping,
       TableList,
       AddOrUpdate,
       importExcel,
       modelTableList,
       excelDetail,
       upload
     },
     computed: {
      // getName(){
      //   return this.$store.getters.groupingName;
      // }
     },
     methods: {
      // 一层
       rowClick (){
         this.checkNum=0
   },
       getRowDataFun (row){ // 点击获取行数据
         console.log(row)
         this.rowStatus=row.status
         this.checkNum=2
         sessionStorage.setItem('clickRow', JSON.stringify(row))
       },
       OrUpdateHandleExcelDetail (){ // 查看Excel

       },
      // 二层
       changeCurrentFun (row){
         this.uoloadData=row
         this.checkNum=1
   },
       getFileFun (result){
         console.log(result)
         this.$refs.importExcel.dialogVisible=true
         this.$refs.importExcel.init('', result)
   },
      // editOrUpdateHandleSecond(){//修改
      //   let row=JSON.parse(sessionStorage.getItem('clickRow'));
      //   console.log(row)
      //   this.$refs.addOrUpdate.visible=true;
      //   this.$nextTick(() => {
      //     this.$refs.addOrUpdate.init(row.name,row.id)
      //   })
      // },
      // deleteHandle(id){//删除
      //   this.$confirm('是否删除?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     this.$http({
      //       url:this.$http.adornUrl(`/bim/budgetmonomer/delete`),
      //       method:'post',
      //       data:[id]
      //     }).then((data)=>{
      //       if(data.data.code==0){
      //         this.$message({
      //           message: '删除成功',
      //           type: 'success',
      //           duration: 1500,
      //           onClose: () => {
      //             this.visible = false
      //             this.$emit('changeDom')
      //           }
      //         })
      //       }else{
      //         this.$message({
      //           message: '删除失败',
      //           type: 'error',
      //           duration: 1500,
      //
      //         })
      //       }
      //     })
      //   }).catch(() => {
      //
      //   });
      // },
      // 三层
       assOrUpdateHandle (){ // 关联模型
         let row=JSON.parse(sessionStorage.getItem('clickRow'))
         let id=row.id
         sessionStorage.setItem('excelId', id)
         getExcelDetailData(id, this).then((data) => {
          // let result=this.changeResult(data)
          // sessionStorage.setItem('tabList',JSON.stringify(result))

           this.$router.push({path: '/associatedModel', query: {isShow: false}})
         })
       },
       removeOrUpdateHandle (){ // 取消关联
         let row=JSON.parse(sessionStorage.getItem('clickRow'))
         let id=row.id
         this.$confirm('是否取消关联', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
           this.cancelBtn=true
           this.$http({
             url: this.$http.adornUrl(`/bim/budget/remove?budgetId=${id}`),
             method: 'get'
           }).then((data) => {
             if(data.data.code==0){
               this.cancelBtn=false
               this.$message({
                 message: '取消关联成功!',
                 type: 'success'
               })
               this.getTabList()
             }
           })
         }).catch(() => {
           this.cancelBtn=false
       // this.$message({
       //   message: '取消关联失败!',
       //   type: 'error'
       // });
         })
   },
       addOrUpdateHandleExcel (){ // 修改excel
         let row=JSON.parse(sessionStorage.getItem('clickRow'))
         let id=row.id
         console.log(id)
         getExcelDetailData(id, this).then((data) => {
           this.$refs.importExcel.dialogVisible=true
           this.$refs.importExcel.init(id, data)
         })
       },
       deleteHandle (){ // 删除三层
         let row=JSON.parse(sessionStorage.getItem('clickRow'))
         let id=row.id
         this.$confirm('确认删除?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
           this.$http({
             url: this.$http.adornUrl(`/bim/budget/delete`),
             method: 'post',
             data: [id]
           }).then((data) => {
             if(data.data.code==0){
               this.$message({
                 message: '删除成功!',
                 type: 'success'
               })
               this.getTabList()
             }else{
               this.$message.error('删除失败!')
             }
           })
         }).catch(() => {

         })
   },
       importExcelFun (){ // 导出excel
         let row=JSON.parse(sessionStorage.getItem('clickRow'))
         let id=row.id
         window.open(this.$http.adornUrl(`/bim/budget/export?id=${id}`))
       },
       tableRowClassName (){
         return 'testItem'
       },
       goModel (){
         this.$router.push({path: '/model-preview'})
       },
       searchTree (query){
         this.getTabList()
   },
       changeVal (val){
         this.$forceUpdate()
       // this.sheetName=val;
         if(!this.form.data[val].length){
           this.$message({
             message: '暂无数据!',
             type: 'warning'
           })
         }
       },
       getTabDataChildFun (){
         let row=JSON.parse(sessionStorage.getItem('clickRow'))
         let id=row.id
         this.$refs.excelDetail.init(id)

     // this.form.region=this.data.sheets[0]&&this.data.sheets[0].id;
   },
       importExcelSucc (){ // 添加excel成功回调
         this.getTabList()
       },
       importExcel (){ // 导入计划清单
         this.$refs.importExcel.init()
   },
       changeDomFun (){ // 添加/修改专业分组回调
         this.getTabList()
       },
       expandChange (row){ // 点击获取子集
         this.clickRow=row
         this.$http({
           url: this.$http.adornUrl(`/bim/budgetmonomer/queryByMajorId?id=${row.id}`),
           method: 'post'
           // data:this.$http.adornData({'id':row.id})
         }).then((data) => {
           if(data.data.code==0){
             this.childData=data.data.result
           }
         })
       },
       getDataList (){
        // this. expandChange(this.clickRow);
         this.getTabList()
       },
       getTabList (query){ //
        // console.log(query)
         this.$http({
           url: this.$http.adornUrl(`/bim/budget/queryTree`),
           method: 'get',
           params: this.$http.adornParams({
             'query': this.params.name,
             'pageNo': this.pageIndex,
             'pageSize': this.pageSize
           })
         }).then((data) => {
           if(data.data.code==0){
             this.dataListLoading=false
             this.dataList=data.data.result.records
             this.totalPage = data.data.result.total
             this.pageIndex = data.data.result.current
           }
         }).catch((err) => {
           this.dataListLoading=false
         })
       },

       getGroupList (){
         return new Promise((resolve, reject) => {
           this.$http({
             url: this.$http.adornUrl('/sys/sysdict/listSysdict'),
             method: 'post',
             data: this.$http.adornParams({'type': 2})
           }).then((data) => {
             if(data.data.code==0){
               this.list=data.data.result
               resolve(data.data.result)
              // this.list=
             }
           })
         })
       },
       getGroupName (id){
         let arr=this.list.filter((item) => {
           return item.id==id
         })
         return arr[0]&&arr[0].name
   },
      // editOrUpdateHandle(){
      //   let row=JSON.parse(sessionStorage.getItem('clickRow'));
      //   console.log(row)
      //   this.$refs.addGrouping.dialogVisible=true;
      //   this.$refs.addGrouping.init(row,this.list)
      //
      // },

       selectionChangeHandle (){

       },
       handleCurrentChange (){

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
       }
     }
}
</script>
<style>
  /*.el-dialog__wrapper::-webkit-scrollbar {*/
    /*width: 10px;*/
  /*}*/
  .contains .el-table__header .el-table--scrollable-y::-webkit-scrollbar-thumb{
    display:block; width:6px; margin:0 auto; border-radius: 10px; background:red;/*内层轨道*/
  }
</style>
<style scoped>
   .header{
     margin-bottom: 30px;
     display: flex;
     justify-content:flex-start;
   }
   .el-table  .testItem{
    background: red;
  }
  .table_scol::-webkit-scrollbar{
  width: 2px !important;
  }

</style>
