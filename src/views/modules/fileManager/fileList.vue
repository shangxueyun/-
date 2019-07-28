<template>

  <div>

   
    <el-form :inline="true">
      <el-form-item v-if="this.$store.state.folder.viewFolder.id!=0">
        <upload @refresh="successRefresh"></upload>
      </el-form-item>
    </el-form>
    <div >
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
             <!-- <i class="el-icon-thirdwenjianjia formatwjj"></i> -->
            <img src="~@/assets/icons/svg/icon-folder.svg" style="height:50px;width: 50px;">
          </div>
        </el-popover>
        <span>{{list.name}}</span>
      </div>
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
        uploadhide: false
      }
    },
    watch: {
      viewLabelData (newV, oldV) {
        this.viewLabelData = newV
      }
    },
    methods: {
      back2Parent () {
        this.$nextTick(() => {
          this.$emit('back2Parent')
        })
      },
      viewFolder (data) {
        // console.log(data)
        this.$nextTick(() => {
          this.$emit('clickLabel', data)
        })
      },
      successRefresh () {
        // this.viewFolder(this.$store.state.folder.viewFolder)
      },
      download (url, fileName) {
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
      dropFile (id ,list) {
        // console.log(list)
        this.$confirm(
          '此操作将永久删除该文件，不可恢复',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          this.$http({
            url: this.$http.adornUrl('/bim/datafile/deleteOne?id=' + id),
            method: 'post'
          }).then(({data}) => {
            if (data && data.code === 0) {
                if(list.dataLabelId == 0){
                    // alert(3)
                    this.successRefresh()
                    this.$message.success('删除成功')
                    this.$emit('changeTree')
                  }else{
                    // alert(4)
                    sessionStorage.setItem('nameid',list.dataLabelId)
                    this.successRefresh()
                    this.$message.success('删除成功')
                    this.$emit('changeTrees')
                  }
            }
          })
        }).catch(() => {

        })
      },
      dropFolder (id,list) {
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
              console.log(value)
              this.$http({
                url: this.$http.adornUrl('/bim/datalabel//rename?id=' + id + '&name=' + value),
                method: 'post'
              }).then(({data}) => {
                if (data && data.code === 0) {
                  if(list.parentId == 0){
                    // alert(1)
                    this.successRefresh()
                    this.$message.success('成功')
                    this.$emit('changeTree')
                  }else{
                    this.$emit('changeTree')
                    // this.$parent.listshide = true
                    // sessionStorage.setItem('nameid',list.id)
                    this.successRefresh()
                    this.$message.success('成功')

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

.formatwjj{
  font-size:40px;
  color:#4caef9;
  margin:0 0 10px 0;
}

</style>
