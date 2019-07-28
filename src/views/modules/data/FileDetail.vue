<template>
  <el-container>
    <el-header>
      <el-button @click="goBack" class="el-icon-back"></el-button>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="10">
          <el-form ref="form" :model="file" label-width="80px">
            <el-form-item label="文件名称:">
              <el-input v-model="file.fileName" placeholder='请输入文件名' width="80"></el-input>
            </el-form-item>
            <el-form-item label="文件大小:">
              <el-input v-model="file.fileSize" placeholder='文件大小' disabled></el-input>
            </el-form-item>
            <el-form-item label="查看文件:">
              <img :src="viewUrl+file.url"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="downs(viewUrl+file.url)">下载文件</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
  export default {
    name: 'FileDetail',
    data () {
      return {
        viewUrl: '',
        file: {
          id: 0,
          fileName: '',
          createUser: '',
          fileSize: ''
        }
      }
    },
    mounted () {
      this.file.id = this.$route.query.id
      this.viewUrl = this.$http.adornUrl('/upload/view/')
      this.init(this.file.id)
    },
    methods: {
      init (id) {
        this.$http({
          url: this.$http.adornUrl('/bim/datafile/info/' + id),
          method: 'get'
        }).then(({data}) => {
          console.log(data)
          if (data.code === 0) {
            this.file = data.result
          }
        })
      },
      downs (url) {
        this.downloadIamge(url, 'pic')
      },
      downloadIamge (imgsrc, name) { // 下载图片地址和图片名
        console.log(imgsrc)
        var image = new Image()
        // 解决跨域 Canvas 污染问题
        image.setAttribute('crossOrigin', 'anonymous')
        image.onload = function () {
          var canvas = document.createElement('canvas')
          canvas.width = image.width
          canvas.height = image.height
          var context = canvas.getContext('2d')
          context.drawImage(image, 0, 0, image.width, image.height)
          var url = canvas.toDataURL('image/png') // 得到图片的base64编码数据
          var a = document.createElement('a') // 生成一个a元素
          var event = new MouseEvent('click') // 创建一个单击事件
          a.download = name || 'photo' // 设置图片名称
          a.href = url // 将生成的URL设置为a.href属性
          a.dispatchEvent(event) // 触发a的单击事件
        }
        image.src = imgsrc
      },
      goBack () {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>

</style>
