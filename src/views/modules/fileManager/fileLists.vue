<template>

  <div>
    <el-form :inline="true">
      <el-form-item v-if="this.$store.state.folder.viewFolder.id!=0">
        <upload @refresh="successRefresh"></upload>
      </el-form-item>
    </el-form>

      <div class="folder-class" v-for="list in viewLabelData.labelList" @dblclick="viewFolder(list)" key="list.id">
        <el-popover
          placement="bottom"
          width="10px"
          trigger="hover">
          <div style="text-align: center">
            <el-button-group>
              <el-button @click="rename(list.id,list)" type="primary" plain icon="el-icon-edit"></el-button>
              <el-button @click="dropFolder(list.id,list)" type="primary" plain icon="el-icon-delete"></el-button>
            </el-button-group>
          </div>
          <div class="icon" slot="reference">
            <img src="~@/assets/icons/svg/icon-folder.svg" style="height:50px;width: 50px;">
          </div>
        </el-popover>
        <span>{{list.name}}</span>
      </div>
        <el-table
          v-show="tablelists"
          :data="datafile"
          border
          stripe
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            header-align="center"
            prop="fileName"
            label="全部文件" >
            <template slot-scope="scope">
                  <span v-if="scope.row.format == 'rar'">
                    <i class="el-icon-thirdRARtubiao formaticon"></i>
                  </span>
                  <span v-else-if="scope.row.format == 'png'">
                      <img :src="scope.row.urls" class="formatimg">
                  </span>
                  <span v-else-if="scope.row.format == 'jpeg'">
                      <img :src="scope.row.urls" class="formatimg">
                  </span>
                  <span v-else-if="scope.row.format == 'jpg'">
                      <img :src="scope.row.urls" class="formatimg">
                  </span>
                  <span v-else-if="scope.row.format == 'gif'">
                      <img :src="scope.row.urls" class="formatimg">
                  </span>
                  <span v-else-if="scope.row.format == 'tiff'">
                      <img :src="scope.row.urls" class="formatimg">
                  </span>
                  <span v-else-if="scope.row.format == 'swf'">
                      <img :src="scope.row.urls" class="formatimg">
                  </span>
                  <span v-else-if="scope.row.format == 'txt'">
                      <i class="el-icon-thirdTXT formaticon" ></i>
                  </span>
                  <span v-else-if="scope.row.format == 'pdf'">
                      <i class="el-icon-thirdpdf formaticon" ></i>
                  </span>
                  <span v-else-if="scope.row.format == 'doc'">
                      <i class="el-icon-thirddoc formaticon" ></i>
                  </span>
                  <span v-else-if="scope.row.format == 'docx'">
                      <i class="el-icon-thirddoc formaticon" ></i>
                  </span>
                  <span v-else-if="scope.row.format ==  'pptx'">
                      <i class="el-icon-thirdppt formaticon" ></i>
                  </span>
                  <span v-else-if="scope.row.format ==  'xls'">
                      <i class="el-icon-thirdxls formaticon" ></i>
                  </span>
                  <span v-else-if="scope.row.format ==  'xlsx'">
                      <i class="el-icon-thirdxls formaticon" ></i>
                  </span>
                  <span v-else-if="scope.row.format ==  'rmvb'">
                      <i class="el-icon-thirdgeshi_shipinrmvb formaticon" ></i>
                  </span>
                  <span v-else-if="scope.row.format ==  'flv'">
                      <i class="el-icon-thirdFLVtubiao formaticon" ></i>
                  </span>
                  <span v-else-if="scope.row.format ==  'mp4'">
                      <i class="el-icon-thirdmp formaticon" ></i>
                  </span>
                  <span v-else-if="scope.row.format ==  'mvb'">
                      <i class="el-icon-thirdmp formaticon" ></i>
                  </span>
                  <em class="fileName">{{scope.row.fileName}}</em>
            </template>
          </el-table-column>
          <el-table-column
            prop="createUser"
            width="100"
            label="上传人"
            align="center">
          </el-table-column>
          <el-table-column
            prop="fileSize"
            width="100"
            label="文件大小"
            align="center">
          </el-table-column>
          <el-table-column
            prop="createTime"
            width="260"
            label="上传时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop=""
            width="160"
            label="操作"
            align="center">
              <template slot-scope="scope">
          <el-button type="text" size="small" @click="download(scope.row.url,scope.row.fileName)">下载</el-button>
          <el-button type="text" size="small" @click="dropFile(scope.row.id,scope.row)">删除</el-button>
              </template>
          </el-table-column>
        </el-table>

    </div>
  </div>
</template>


<script>
  import upload from './fileUpload'

  export default {
    props: ['viewLabelData'],
    components: {upload},
    data () {
      return {
        view: '',
        visible: false,
        loading: true,
        uploadhide: false,
        datafile:[],
        tablelists:true
      }
    },
    watch: {
      viewLabelData (newV, oldV) {
        // alert(1)
        // console.log("11111",newV)
        this.viewLabelData = newV
        this.datafile = this.viewLabelData.fileList
        this.datafile = this.viewLabelData.fileList
        if(this.datafile.length == 0){
            this.tablelists = false
        }else{
            this.tablelists = true
        }
      }
    },
    methods: {
      back2Parent () {
        this.$nextTick(() => {
          this.$emit('back2Parent')
        })
      },
      viewFolder (data) {
        this.$nextTick(() => {
          this.$emit('clickLabel', data)
        })
      },
      successRefresh () {
        // alert(2)

          this.$emit('changeTrees')
        // this.viewFolder(this.$store.state.folder.viewFolder)
      },
      download (url, fileName) {
        // console.log(url)
        // console.log(fileName)
        let address = this.$http.adornUrl('/file/download/' + url)
        this.$http({ // 用axios发送post请求
          method: 'get',
          url: address, // 请求地址
          responseType: 'blob' // 表明返回服务器返回的数据类型
        })
          .then(({data}) => {
            const content = data
            const blob = new Blob([content])
            if ('download' in document.createElement('a')) { // 非IE下载
              const elink = document.createElement('a')
              elink.download = fileName
              elink.style.display = 'none'
              elink.href = URL.createObjectURL(blob)
              document.body.appendChild(elink)
              elink.click()
              URL.revokeObjectURL(elink.href) // 释放URL 对象
              document.body.removeChild(elink)
            } else { // IE10+下载
              navigator.msSaveBlob(blob, fileName)
            }
          })
      },
      dropFile (id,list) {
        // alert(1)
        // console.log(list)
        this.$confirm('此操作将永久删除该文件，不可恢复',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/bim/datafile/deleteOne?id=' + id),
            method: 'post'
          }).then(({data}) => {
            if (data && data.code === 0) {
              // this.$message.success('删除成功')
              // this.successRefresh()
                  if(list.dataLabelId == 0){
                    // alert(1)
                    this.successRefresh()
                    this.$message.success('删除成功')
                    this.$emit('changeTree')
                  }else{
                    // alert(2)
                    sessionStorage.setItem('nameid',list.dataLabelId)
                    // this.successRefresh()
                    this.$message.success('删除成功')
                    this.$emit('changeTrees')
                  }
            }
          })
        }).catch(() => {

        })
      },
      dropFolder (id,list) {
        // console.log(id)
        this.$confirm(
          '此操作将永久删除该文件夹及文件夹内的文件，不可恢复',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          this.$http({
            url: this.$http.adornUrl('/bim/datalabel/deleteOne?id=' + id),
            method: 'post'
          }).then(({data}) => {
            if (data && data.code === 0) {
              // this.successRefresh()
              // this.$message.success('删除成功')
                  if(list.parentId == 0){
                    // alert(1)
                    this.successRefresh()
                    this.$message.success('删除成功')
                    this.$emit('changeTree')
                  }else{
                    // alert(2)
                    sessionStorage.setItem('nameid',list.parentId)
                    this.successRefresh()
                    this.$message.success('删除成功')
                    this.$emit('changeTrees')
                  }
            }
          })
        }).catch((e) => {
        })
      },
      rename (id,list) {
        // console.log(list)
        this.$http({
          url: this.$http.adornUrl('/bim/datalabel/info/' + id),
          method: 'post'
        }).then(({data}) => {
          if (data) {
            this.$prompt('请输入新文件夹名', '重命名', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPattern: /(^$)|(^[\u4E00-\u9FA5a-zA-Z0-9,，]{1,10}$)/,
              inputValue: data.result.name,
              inputErrorMessage: '输入格式不正确'
            }).then(({value}) => {
              // console.log(value)
              this.$http({
                url: this.$http.adornUrl('/bim/datalabel//rename?id=' + id + '&name=' + value),
                method: 'post'
              }).then(({data}) => {
                if (data && data.code === 0) {
                  if(list.parentId == 0){
                    this.successRefresh()
                    this.$message.success('成功')
                    this.$emit('changeTree')
                  }else{
                    sessionStorage.setItem('nameid',list.parentId)
                    this.successRefresh()
                    this.$message.success('成功')
                    this.$emit('changeTrees')

                  }
                }
              })
            }).catch(() => {
            })
          }
        })

      }
    },
    mounted () {
    }
  }
</script>
<style>
  body .el-popover {
    min-width: 0px;
    padding: 0px;
  }
</style>
<style scoped>


  .icon {
    margin-top: 2vh;
    margin-left: auto;
    margin-right: auto;
  }

  .folder-class {
    text-align: center;
    /* border:1px solid red; */
    margin: 0 40px 0 0;
    display: inline-block;
    /* border:1px solid red; */
    width:80px;

  }

  .folder-class span.tst {
    font-size: 15px;
    display: block;
    margin-top: 8px;
  }

/* 新增 */
.fileName{
  font-style:normal;
}
.formaticon{
  font-size:30px;
  vertical-align: middle;
}
.formatimg{
  width:30px;
  height:30px;
}
.el-icon-thirdppt{
  color:#9a2c05;
}
.el-icon-thirdxls{
  color:#3a7d04;
}
.el-icon-thirddoc,.el-icon-thirdTXT,.el-icon-thirdRARtubiao{
  color:#0470c4;
}
.el-icon-thirdpdf,.el-icon-thirdTXT{
  color:red;
  font-size:35px;
}
</style>
