<template>
    <div class="baidumapDiv" :style="siteContentViewHeight">
      <div class="colseMap" @click="dialogMap"><i class="el-icon-close"></i></div>
      <baidu-map  class="bm-view" center="海门市" :zoom="12">
          <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true">
          <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
          </bm-marker>
      </baidu-map>
    </div>
</template>

<script>
  import { isURL } from '@/utils/validate'
  export default {
    data () {
      return {     
        isRouterAlive: true,
        visible:false,
        isfullscreen:true,
        lng:'',
        lat:''
      }
    },
    computed: {
      siteContentViewHeight () {
        var height = this.$store.state.common.documentClientHeight
        if (this.$route.meta.isTab) {
          height -= 70
          return isURL(this.$route.meta.iframeUrl) ? { height: height + 'px' } : { minHeight: height + 'px' }
        }
        return { minHeight: height + 'px' }
      }
    },
    methods: {
      init (lat , lng) {
        this.visible = true
        this.lng = lat
        this.lat = lng
      },
      dialogMap(){
        this.visible = false
        this.$emit('dialogMap')
      },
      closeDialog(){
          this.isRouterAlive = false
          this.$nextTick(() => (this.isRouterAlive = true))
      }
    }
  }
</script>
<style >
.baidumapDiv{
  position: absolute;
  padding: 20px;
  width: 100%;
  height:100%;
}
.baidumapDiv .bm-view{
  width: 100%;
  height:100%;
}
.dialogmap .el-dialog__header{
     display: none;
}
.dialogmap .el-dialog__body{
     padding:0;
}
.colseMap{
  position: absolute;
  right:20px;
  top:20px;
  height:50px;
  width:50px;
  z-index: 99999;
  background-color: rgba(0,0,0,0.5);
  border-radius: 50%;
  line-height: 55px;
  text-align: center;
  cursor: pointer;
}
.colseMap i{
  color:#fff;
  font-size:20px;
}
</style>
