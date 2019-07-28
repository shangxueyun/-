<template>
    <transition name="el-fade-in-linear">
   　　 <div class="img-view" @click="bigImg">
   　　　　 <div class="img-layer"></div>
   　　　　 <div class="img">
   　　　　　　 <img :src="imgSrc">
   　　　　 </div>
    　　</div>
　　</transition>
</template>
<script>
　　export default {
　　　　props: ['imgSrc'],
　　　　methods: {
　　　　　　bigImg() {
　　　　　　// 发送事件
　　　　　　　　this.$emit('clickit')
　　　　　　}
　　　　}
　　}
</script>
<style lang="scss">
  html,body{
    // position: absolute;
    z-index: 99999;
  }
  .img-view{
    border:1px solid red;
    position: absolute;
    width: 100%;
    height:100%;
    z-index: 99999;
    .img-layer{
      position: fixed;
      z-index: 99999;
      top:0;
      left:0;
      width: 100%;
      height:100%;
      overflow: hidden;
    }
    img{
      max-width: 100%;
      display: block;
      position: absolute;
      left:0;
      right:0;
      margin: auto;
      z-index: 1000;
    }
  }


</style>
　