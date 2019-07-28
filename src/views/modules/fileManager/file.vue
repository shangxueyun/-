<template>
  <div>
    <el-form :inline="true">
      <!-- <el-form-item>
        <el-input v-model="input" placeholder="请输入文件名"></el-input>
      </el-form-item> -->
      <el-form-item>
        <!-- <el-button primary="primary" icon="el-icon-search" @click="search">搜索</el-button> -->
        <el-button @click="createLabel()" icon="el-icon-edit">新建文件夹</el-button>
        <el-button @click="backHome" v-if="this.$store.state.folder.viewFolder.id!=0">返回资料管理首页</el-button>
      </el-form-item>
    </el-form>
    <div v-show="viewup">
      <el-row :gutter="20">
        <el-col :span="24">
          <mainContent ref="content" :viewLabelData="viewLabelData" @back2Parent="back2Parent"
                       @clickLabel="clickFolder" @changeTree="changeTreeFun"></mainContent>
        </el-col>
      </el-row>
    </div>
    <div v-show="viewclick">
      <el-row :gutter="20">
        <el-col :span="4">
          <div >
            <labelMenu ref='menus' @clickFolder="clickFolder" v-show="viewclick"></labelMenu>
          </div>
        </el-col>
        <el-col :span="20">
          <div v-show="listhide">
                <mainContent ref="content"  :viewLabelData="viewLabelData" @back2Parent="back2Parent"
                            @clickLabel="clickFolder" @changeTree="changeTreeFun"></mainContent>
                </div>
          <div  v-show="listshide">
                <mainContents ref="content"  :viewLabelData="viewLabelData"
                            @clickLabel="clickFolder" @changeTrees="changeTreeFuns"></mainContents>

          </div>

        </el-col>
      </el-row>
    </div>
    <labelAdd v-if="labelAddVisiable" @refresh="refreshMenu" @contentRefresh="contentRefresh" ref="labelAdd"></labelAdd>
  </div>
</template>

<script>
  import labelMenu from './labelMenu'
  import mainContent from './fileList'
  import mainContents from './fileLists'
  import labelAdd from './labelAdd'

  import global from "@/utils/publicUrl";

  export default {
    data () {
      return {
        globalurls:global.uploadImgUrl,
        listhide:true,
        listshide:false,
        loading: false,
        viewup: true,
        viewclick: false,
        input: '',
        labelAddVisiable: false,
        viewLabelData: {
          fileList: {},
          folder: {},
          labelList: {}
        },
        histroy: [],
        height: {
          height: window.innerHeight - 100 + 'px'
        }
      }
    },
    components: {labelMenu, mainContent, labelAdd , mainContents},
    mounted () {
      this.init()
    },
    destroyed () {
      this.$store.state.folder.viewFolder = {id: 0, parentId: 0}
    },
    methods: {
      changeTreeFun(){
          this.$refs.menus.init();
          this.init();
      },
      changeTreeFuns(){
          this.$refs.menus.init();
          this.inits();
      },
      init (id) {
        this.$store.commit('setViewFolder', {id: 0, parentId: 0})
        this.$http({
          url: this.$http.adornUrl('/bim/datalabel/getFolderList?id=0'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.code === 0) {
            var viewlists = data.result.fileList
            viewlists.forEach((item) => {
              var indexurl = item.url
              var reg = /([^\\/]+)\.([^\\/]+)/i;
              reg.test(indexurl);
              var formatname = RegExp.$2
              item.format = formatname
              item.urls = this.globalurls + item.url
            })
            this.viewLabelData = data.result
            // console.log('111',this.viewLabelData)
          }
        })
      },
      inits () {
        // this.viewclick = true
        this.listhide =false,
        this.listshide =true,
        this.$store.commit('setViewFolder', {id: sessionStorage.getItem('nameid'), parentId: 0})
        this.$http({
          url: this.$http.adornUrl('/bim/datalabel/getFolderList?id='+sessionStorage.getItem('nameid')),
          method: 'get'
        }).then(({data}) => {
          if (data && data.code === 0) {
            var viewlists = data.result.fileList
            viewlists.forEach((item) => {
              var indexurl = item.url
              var reg = /([^\\/]+)\.([^\\/]+)/i;
              reg.test(indexurl);
              var formatname = RegExp.$2
              item.format = formatname
              item.urls = this.globalurls + item.url
            })
            this.viewLabelData = data.result
            // console.log('111',this.viewLabelData)
          }
        })
      },
      back2Parent () {
        console.log(that.parentId)
        // 回退，请求当view的信息，请求他父级菜单的内容
        let that = this.$store.state.folder.viewFolder
        // 请求完父级的信息，放入DATA渲染;
        this.$http({
          url: this.$http.adornUrl('/bim/datalabel/getFolderList?id=' + that.parentId),
          method: 'get'
        }).then(({data}) => {
          if (data && data.code === 0) {
            // console.log(data.result)
            var viewlists = data.result.fileList
            viewlists.forEach((item) => {
              var indexurl = item.url
              var reg = /([^\\/]+)\.([^\\/]+)/i;
              reg.test(indexurl);
              var formatname = RegExp.$2
              item.format = formatname
              item.urls = this.globalurls + item.url
            })
            this.viewLabelData = data.result
            this.$store.commit('setViewFolder', data.result.folder)
          }
        })
      },
      backHome () {
        this.viewclick = false
        this.viewup = true

        this.$nextTick(() => {
          this.init()
          this.$store.commit('cleanExpand')
          this.refreshMenu()
        })

          // this.$refs.menus.init();
        // let tree = this.$refs.menus.$refs.nodeTree.store
        // for (var i = 0; i < tree._getAllNodes().length; i++) {
        //   tree._getAllNodes()[i].expanded = false
        // }
      },
      clickFolders(){

      },
      clickFolder (clickNode) {

        
        this.listhide = false,
        this.listshide=true,

        this.viewup = false
        this.viewclick = true
        this.$store.commit('setViewFolder', clickNode)
        this.$store.commit('setExpand', clickNode)
        // for (var i = 0; i < tree._getAllNodes().length; i++) {
        //   tree._getAllNodes()[i].expanded = false
        // }
        // console.log(this.$refs.menus.$refs.nodeTree.store.nodesMap[clickNode.id])
        this.$refs.menus.$refs.nodeTree.store.nodesMap[clickNode.id].expanded = true
        this.$refs.menus.$refs.nodeTree.setCurrentKey(clickNode.id)

        this.$nextTick(() => {
              this.$http({
                url: this.$http.adornUrl('/bim/datalabel/getFolderList?id=' + clickNode.id),
                method: 'get'
              }).then(({data}) => {
                if (data && data.code === 0) {
                  var viewlists = data.result.fileList
                  viewlists.forEach((item) => {
                    var indexurl = item.url
                    var reg = /([^\\/]+)\.([^\\/]+)/i;
                    reg.test(indexurl);
                    var formatname = RegExp.$2
                    item.format = formatname
                    item.urls = this.globalurls + item.url
                  })
                  this.viewLabelData = data.result
                }
              })

        });
      },
      refreshMenu () {
        this.$refs.menus.refresh()
      },
      contentRefresh () {
        let view = this.$store.state.folder.viewFolder
        this.$http({
          url: this.$http.adornUrl('/bim/datalabel/getFolderList?id=' + view.id),
          method: 'get'
        }).then(({data}) => {
          if (data && data.code === 0) {
            var viewlists = data.result.fileList
            viewlists.forEach((item) => {
              var indexurl = item.url
              var reg = /([^\\/]+)\.([^\\/]+)/i;
              reg.test(indexurl);
              var formatname = RegExp.$2
              item.format = formatname
              item.urls = this.globalurls + item.url
            })
            this.viewLabelData = data.result
          }
        })
      },
      createLabel () {
        this.labelAddVisiable = true
        this.$nextTick(() => {
          this.$refs.labelAdd.init()
        })
      },
      search () {
        if (this.input) {
          this.$http({
            url: this.$http.adornUrl('/bim/datafile/searchFile?search=' + this.input),
            method: 'post'
          }).then(({data}) => {
            if (data && data.code === 0) {

              this.listhide =false
              this.listshide =true
              // this.viewLabelData.labelList = data.result.dataLable
              // this.viewLabelData.fileList = data.result.dataFile
              this.viewLabelData = data.result
              this.$store.commit('cleanExpand')
                        // this.inits();
              this.refreshMenu()

            }
          })
        } else {
          this.$refs.content.viewFolder({id: 0, parentId: 0})
        }
      }
    }
  }
</script>

<style scoped>

</style>
