<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <!-- <el-form-item>
        <el-input v-model="dataForm.key" placeholder="请输入类型" clearable></el-input>
            <el-select v-model="dataForm.key" width=100% clearable placeholder="请选择区域类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
      </el-form-item> -->
      <el-form-item>
        <!-- <el-button @click="getDataList('1')">查询</el-button> -->
        
        <el-button v-if="isAuth('data:sysdict:save')" type="primary" @click="addOrUpdateHandle('0')">添加新分组</el-button>
        <el-button v-if="isAuth('data:sysdict:save')" type="primary" @click="subordinateHandle()" :disabled="dataListSelections.length <= 0">添加下级分组</el-button>
        <!-- <el-button v-if="isAuth('data:sysdict:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button> -->
        <el-button v-if="isAuth('sys:role:delete')" type="warning" @click="updatenameHandle()" :disabled="dataListSelections.length <= 0">修改</el-button>
        <el-button v-if="isAuth('sys:role:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">删除</el-button>
      </el-form-item>
    </el-form>

    <el-table v-if="isRouterAlive"
      :data="dataList"
      ref="multipleTable"
      @row-click="handleRowClick"
      highlight-current-row
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      style="width: 100%; ">
      <el-table-column
        prop="name"
        header-align="center"
        min-width="150"
        label="分组" >
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        width="300"
        label="操作时间">
      </el-table-column>
      <el-table-column
        prop="createUser"
        header-align="center"
        align="center"
        width="200"
        label="操作人">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>

    <updates v-if="updatesVisible" ref="updatesa" @refreshDataList="getDataList"></updates>

    <updatename v-if="updatenameVisible" ref="updatename" @refreshDataList="getDataList"></updatename>
  </div>
</template>

<script>
  import AddOrUpdate from './problemType-add'
  import updatename from './problemType-update'
  import updates from './problemType-adds'

  import { treeDataTranslate } from '@/utils'
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        updatesVisible:false,
        updatenameVisible:false,
        rowsid:'',
        isRouterAlive:''
      }
    },
    components: {
      AddOrUpdate,
      updates,
      updatename
    },
    activated () {
      this.getDataList()
    },
    beforeRouteLeave(to, from, next) {
        this.dataListSelections = []
        $(".el-table__row").css({"background-color":"","color":""}); 
        next();
    },
    methods: {
      // 获取数据列表
      getDataList (num) {
            if(num == 1){
                this.pageIndex = 1
            }
        this.dataListSelections = []
        $(".el-table__row").css({"background-color":"","color":""}); 
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/bim/problemType/safetyRootNodePage'),
          method: 'post',
          data: this.$http.adornParams({
            'pageNo': this.pageIndex,
            'pageSize': this.pageSize,
            'param': {
              'type':this.dataForm.key
            }
          })
        }).then(({data}) => {
               this.isRouterAlive = false

          this.$nextTick(() => (this.isRouterAlive = true))

          if (data && data.code === 0) {
              this.dataList = this.ObjectFilter(data.result.list);

              this.totalPage = data.result.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      load(tree, treeNode, resolve) {
        if(tree.hasChildren == 1){
            this.$http({
              url: this.$http.adornUrl('/bim/problemType/safetyChildrenNodes/'+tree.id),
              method: 'POST',
              params: this.$http.adornParams({})
            }).then(({data}) => {
              if (data && data.code === 0) {
                resolve(this.ObjectFilter(data.result))
                // resolve((data.result))
              }else
              this.$message.error(data.msg);
            });
        }else{
          resolve([])
        }
      },

      ObjectFilter(obj){
        obj.forEach((v,i)=>{
          if(v.hasChildren == 0){
            v.hasChildren = false;
          }else{
            v.hasChildren = true;
          }
          for(let o in v){
            if(o == "children")
            delete obj[i][o];
            if(o == "hasChildRen"){
              var value = obj[i][o];
              delete obj[i][o];
              obj[i]['hasChildren'] = value;
            }
          }
        });

        return obj;
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
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      handleRowClick(row, column, event) {
          // console.log(row)
          this.dataListSelections = row
          this.$refs.multipleTable.toggleRowSelection(row);
      },
      // 新增 / 修改
      addOrUpdateHandle (num) {
        var id ='';
        if(num == 0){
            id = 0
        }else{
            id = this.dataListSelections
        }
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id.id,'/bim/problemType/safetySave')
        })
      },
      updatenameHandle(){
        var rows = this.dataListSelections
        this.updatenameVisible = true
        this.$nextTick(() => {
          this.$refs.updatename.init(rows.name,rows.id,'/bim/problemType/safetyUpdate')
        })

      },
      subordinateHandle(){
        var rows = this.dataListSelections
        this.rowsid = rows.id
        this.updatesVisible = true
        this.$nextTick(() => {
          this.$refs.updatesa.init(rows.type,rows.id,'/bim/problemType/safetySave')
        })

      },
      // 删除
      deleteHandle (id) {
        var ids = this.dataListSelections
        this.$confirm(`确定进行[${ids.id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/bim/problemType/safetyDelete'+'/'+ids.id),
            method: 'post',
            data: this.$http.adornData()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    },
    updated() {
        $(".el-table__body-wrapper .el-table__row ").each(function() {
              $(this).click(function(){
                    $(".el-table__row").css({"background-color":"","color":""}); 
                    $(this).css({"background-color":"#fdf3ea","color":"#f19944"}); 
              })
        }); 
    }
  }
</script>
<style>

.switchStyle .el-switch__label{
  position: absolute;
  left:0;
  top:0;
  display: none;
  color: #fff;
  height:20px;
  line-height: 20px;

}
.switchStyle .el-switch__label *{
  font-size: 10px;
}
.is-checked .el-switch__label {
  /* position: absolute; */
  display: none;
  color:#5d5d5d;
  /* color: #fff; */
}

.switchStyle .el-switch__label--left {
  z-index: 9;
  left: 6px;
}
.switchStyle .el-switch__label--right {
  z-index: 9;
  left: -14px;
}
.switchStyle .el-switch__label.is-active {
  display: block;
}
.switchStyle.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 55px !important;
  line-height: 20px;
}
</style>

