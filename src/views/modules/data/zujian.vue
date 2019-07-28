<template>
  <el-container>
     <el-header>
       <el-row :gutter="10">
         <el-col :span="8">
           <el-input v-model="input" placeholder="请输入内容"></el-input>
         </el-col>
         <el-col :span="8">
           <el-button type="primary" @click="init">搜索</el-button>
           <el-button type="primary" @click="dialogVisible">添加面板</el-button>
         </el-col>
         <el-col :span="8"></el-col>
       </el-row>
     </el-header>
    <el-main>
      <div v-for=" list in File">
        <el-card class="box-card box-cardwh">
          <div slot="header" class="clearfix">
            <el-row>
              <el-col :span="20"><span>{{list.name}}</span></el-col>
              <el-col :span="4">
                <el-dropdown>
                      <span class="el-dropdown-link">
                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="rename(list.id)">修改属性</el-dropdown-item>
                    <el-dropdown-item @click.native="dropLabel(list.id)">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col>
              <upload :labelId="list.id" @changeDom="changeDom"></upload>
            </el-col>
          </el-row>
          <div class="text item">
            <DataFileTable ref="dataFile" :item="list.dataFileList" @changeDom="changeDom"></DataFileTable>
          </div>
        </el-card>
      </div>
      <AddForm v-if="dialogVisibles" ref="addOrUpdate" @changeDom="changeDom"></AddForm>
    </el-main>
  </el-container>
</template>

<script>
  import AddForm from './zujianAdd'
  import DataFileTable from './zujianTable'
  import upload from './DataUpload'

  export default {
    data () {
      return {
        File: {},
        input: '',
        fileList: '',
        dialogVisibles: false,
        dataListLoading: false
      }
    },
    components: {AddForm, DataFileTable, upload},
    mounted () {
      this.init()
    },
    activated () {
    },
    methods: {
      changeDom () {
        console.log('重新加载数据列表')
        this.init()
      },
      dialogVisible () {
        this.dialogVisibles = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init()
        })
      },
      init () {
        let request = this.$http.adornUrl('/bim/datafile/getPage')
        if (this.input !== '') {
          request = this.$http.adornUrl('/bim/datafile/getPage?search=' + this.input)
        }
        this.$http({
          url: request,
          methods: 'get'
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.File = data.result
          }
        })
      },
      dropLabel (id) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/bim/datalabel/deleteOne?id=' + id),
            method: 'post'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.init()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
        // 如果下面没有数据，弹窗。否则直接删除
      },
      rename (id) {
        this.dialogVisibles = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      }
    }
  }
</script>
<style scope>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-cardwh {
    width: 500px;
    float: left;
    margin: 0 20px 20px 0;
  }

  .el-dropdown-link {
    color: #0BB2D4;
  }
</style>
