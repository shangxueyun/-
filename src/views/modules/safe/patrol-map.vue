<template>
  <el-dialog
    v-if="isRouterAlive"
    title="地图"
    class="dialogmap"
    :fullscreen="isfullscreen"
    :close-on-click-modal="false"
    :modal-append-to-body="true"
    :append-to-body="true"
    @close='closeDialog'
    width=100%
    height=100%
    :visible.sync="visible">
    <div class="colseMap" @click="dialogMap"><i class="el-icon-close"></i></div>
    <baidu-map class="bm-view" :center="{'lng': lng, 'lat': lat}" :zoom="15":scroll-wheel-zoom="true">
            <bm-marker :position="{'lng': lng, 'lat': lat}" :dragging="false" animation="BMAP_ANIMATION_BOUNCE" />
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>

    </baidu-map>

  </el-dialog>
</template>

<script>
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
    methods: {
      init (lat , lng) {
        this.visible = true
        this.lng = lat
        this.lat = lng
      },
      dialogMap(){
        this.visible = false
        this.$emit('close')
      },
      closeDialog(){
          this.isRouterAlive = false
          this.$nextTick(() => (this.isRouterAlive = true))
      }
    }
  }
</script>
<style >
.bm-view{
  position: absolute;
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
