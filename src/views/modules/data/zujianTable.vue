<template>
  <div>
    <el-table
      :data="tableData"
      height="500"
      style="width: 100%">
      <el-table-column
        type="index" width="50">
      </el-table-column>
      <el-table-column
        prop="cresteTime"
        label="上传时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="fileName"
        label="文件名"
        width="150">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        操作<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="viewFile(scope.row.id)">详情</el-dropdown-item>
              <el-dropdown-item @click.native="dropFile(scope.row.id)">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    props: ['item'],
    comments: {},
    data () {
      return {
        detailVisable: false,
        tableData: []
      }
    },
    watch: {
      item: {
        handler (newV, oldV) {
          this.tableData = newV
        },
        deep: true
      }
    },
    mounted () {
      this.tableData = this.item
    },
    methods: {
      dropFile (id) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/bim/datafile/deleteOne?id=' + id),
            method: 'post'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.$emit('changeDom')
            // this.$parent.init()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      viewFile (id) {
        this.$router.push({path: '/data/FileDetail', query: {'id': id}})
      }
    }
  }
</script>

<style scoped>

</style>
