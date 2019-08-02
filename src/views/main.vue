<template>
  <div
    class="site-wrapper"
    :class="{ 'site-sidebar--fold': sidebarFold }"
    v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中">
    <template v-if="!loading">
      <main-navbar  @routingResponse="routingResponse"/>
      <main-sidebar :menuListData="menNavData"/>      
      <div class="site-content__wrapper animated bounceInRight" :style="{ 'min-height': documentClientHeight + 'px' }">
        <main-content v-if="!$store.state.common.contentIsNeedRefresh" />
      </div>
    </template>
  </div>
</template>

<script>
  import MainNavbar from './main-navbar'
  import MainSidebar from './main-sidebar'
  import MainContent from './main-content'
  export default {
    provide () {
      return {
        // 刷新
        refresh () {
          this.$store.commit('common/updateContentIsNeedRefresh', true)
          this.$nextTick(() => {
            this.$store.commit('common/updateContentIsNeedRefresh', false)
          })
        },
      }
    },
    data () {
      return {
        loading: true,
        menNavData:[],
        NavDataBl:true,
      }
    },
    components: {
      MainNavbar,
      MainSidebar,
      MainContent
    },
    computed: {
      documentClientHeight: {
        get () { return this.$store.state.common.documentClientHeight-26 },
        set (val) { this.$store.commit('common/updateDocumentClientHeight', val) }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold }
      },
      userId: {
        get () { return this.$store.state.user.id },
        set (val) { this.$store.commit('user/updateId', val) }
      },
      userName: {
        get () { return this.$store.state.user.name },
        set (val) { this.$store.commit('user/updateName', val) }
      }
    },
    created () {
      this.getUserInfo()
    },
    mounted () {
      this.resetDocumentClientHeight();
      let arr = JSON.parse(sessionStorage.getItem('menuList') || '[]');
      let menNavDataS = JSON.parse(sessionStorage.getItem('menNavData') || '[]');
      let hrefS = window.location.href;
      if(menNavDataS.length == 0 || hrefS.substring(hrefS.lastIndexOf("#")+1) == '/home' || hrefS.substring(hrefS.lastIndexOf("#")+1) == '/project-board')
      this.menNavData = arr[0].list;
      else{
        this.menNavData = menNavDataS;
      }
    },
    methods: {
      // 重置窗口可视高度
      resetDocumentClientHeight () {
        this.documentClientHeight = document.documentElement['clientHeight'];
        this.$store.commit('common/updateDocumentClientWidth', document.documentElement['clientWidth'])
        window.onresize = () => {
          this.documentClientHeight = document.documentElement['clientHeight'];
          this.$store.commit('common/updateDocumentClientWidth', document.documentElement['clientWidth'])
        }
      },
      // 获取当前管理员信息
      getUserInfo () {
        this.$http({
          url: this.$http.adornUrl('/sys/user/info'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.loading = false
            this.userId = data.result.userId
            this.userName = data.result.userName
          }
        })
      },
      routingResponse(e){
        if(e == "show")
        {
          let arr = JSON.parse(sessionStorage.getItem('menuList') || '[]');
          this.menNavData = [];
          this.menNavData = arr[0].list;
        }else{
          sessionStorage.setItem("menNavData",JSON.stringify(e.list));
          this.menNavData = [];
          this.menNavData = e.list;
        }
      }
    }
  }
</script>

<style scoped>
.site-content__wrapper {
    padding-top: 14px;
    background: #ffff
}
</style>
<style>
body {
    background: #ffff;
    padding-right: 0px !important;
}
h1, h2, h3, h4, h5, h6 {
  margin: 0;
}
.viewer-transition {
  z-index: 1111111;
}
</style>

