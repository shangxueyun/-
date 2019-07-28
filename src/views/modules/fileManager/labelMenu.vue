<template>
  <el-tree :data="data"
   class="treeslists"
           :props="defaultProps"
           ref="nodeTree"
           node-key="id"
           :highlight-current="true"
           @node-click="handleNodeClick"
           :expand-on-click-node="false"
           :default-expanded-keys="this.$store.state.folder.expand"
           style="font-size: larger">
    <span class="slot-t-node" slot-scope="{ node, data }">
          <div><em class="icon-folder"></em>{{ node.label }}</div>
          <!-- <div><i class="el-icon-thirdwenjianjia formatwjjmenu"></i>{{ node.label }}</div> -->
          
    </span>
  </el-tree>
</template>

<script>
  export default {
    data () {
      return {
        expand: [],
        viewLabel: {   // 当前node
          child: '',
          createTime: '',
          createUser: '',
          id: '',
          name: '',
          parentId: '',
          updateTime: '',
          updateUser: ''
        },
        parentLabel: {  // 父级node
          child: '',
          createTime: '',
          createUser: '',
          id: 0,
          name: '',
          parentId: 0,
          updateTime: '',
          updateUser: ''
        },
        data: [],
        defaultProps: {
          children: 'child',
          label: 'name'
        }
      }
    },
    mounted () {
      this.init();
    },
    methods: {
      init(){
        this.$http({
          url: this.$http.adornUrl('/bim/datalabel/getAllFileList'),
          method: 'post'
        }).then(({data}) => {
          if (data.code === 0) {
            this.data = data.result
            this.$nextTick(() => {
                this.$refs.nodeTree.setCurrentKey(sessionStorage.getItem('nameid'))
                // this.$refs.nodeTree.setCurrentKey('48')
            })
          }
        })
      },
      handleNodeClick (data) {  // 点击文件夹
        this.viewLabel = data
        this.$emit('clickFolder', data)
      },
      refresh () {
        this.$http({
          url: this.$http.adornUrl('/bim/datalabel/getAllFileList'),
          method: 'post'
        }).then(({data}) => {
          if (data.code === 0) {
            this.data = data.result
            this.$nextTick(() => {
                this.$refs.nodeTree.setCurrentKey(sessionStorage.getItem('nameid'))
                // this.$refs.nodeTree.setCurrentKey('48')
            })
          }
        })
      }
    }
  }
</script>

<style >
  .icon-folder {

    background-image: url("~@/assets/icons/svg/icon-folder.svg");
    background-size: 100%;
    height: 20px;
    width: 20px;
    display: inline-block;
    margin: 0 5px 0 0;
    position: relative;
    top: 3px;

  }
  .slot-t-nodeft {
    font-size: 14px;
    /* float: left; */
    line-height: 26px;
    display: block;
  }
  .slot-t-node{
    font-size:14px;
  }
  .formatwjjmenu{
    font-size:20px;
    color:#0586e9;
    margin: 0 5px 0 0;
    position: relative;
    top: 3px;
  }
  .treeslists {
    border:1px solid #ebeef5;
  }
  .treeslists .el-tree-node{
    border-bottom:1px solid #ebeef5;
  }
  .treeslists  .el-tree-node .el-tree-node{
    border:0;
  }
   .treeslists .el-tree-node__content{
    height:40px;
    line-height: 40px;
  }


</style>
