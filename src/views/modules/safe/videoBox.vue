<template>

  <!--    视频-->
  <div class="containsBox"  >
    <el-row :gutter="10" >

      <el-col :span="18" class="video" >
        <div id="divPlugin" class="plugin" style="z-index: -1"></div>
        <div class="video-center" v-show="false">

          <table cellpadding="0" cellspacing="3" border="0">
            <tr>
              <td class="tt">IP地址</td>
              <td><input id="loginip" type="text" class="txt" value="49.79.100.38"/></td>
              <td class="tt">端口号</td>
              <td><input id="port" type="text" class="txt" value="8888"/></td>
            </tr>
            <tr>
              <td class="tt">用户名</td>
              <td><input id="username" type="text" class="txt" value="admin"/></td>
              <td class="tt">密码</td>
              <td><input id="password" type="password" class="txt" value="admin12345"/></td>
            </tr>
            <tr>
              <td class="tt">设备端口</td>
              <td colspan="2"><input id="deviceport" type="text" class="txt"/>（可选参数）</td>
              <td>
                窗口分割数&nbsp;
                <select class="sel2" v-model="changeWndNumVal" @change="changeWndNum">
                  <option value="1" >1x1</option>
                  <option value="2" >2x2</option>
                  <option value="3">3x3</option>
                  <option value="4">4x4</option>
                </select>
              </td>
            </tr>
            <tr>
              <td class="tt">RTSP端口</td>
              <td colspan="3"><input id="rtspport" type="text" class="txt"/>（可选参数）</td>
            </tr>
            <tr>
              <td colspan="4">
                <input type="button" class="btn" value="登录" onclick="clickLogin();"/>
                <input type="button" class="btn" value="退出" onclick="clickLogout();"/>
                <input type="button" class="btn2" value="获取基本信息" onclick="clickGetDeviceInfo();"/>
              </td>
            </tr>
            <tr>
              <td class="tt">已登录设备</td>
              <td>
                <select id="ip" class="sel" @change="getChannelInfo();getDevicePort();">
                </select>
              </td>
              <td class="tt">通道列表</td>
              <td>
                <select id="channels" class="sel"></select>
              </td>
            </tr>
          </table>
        </div>

        <table cellpadding="0" cellspacing="3" border="0" v-show="false">
          <tr>
            <td class="tt">码流类型</td>
            <td>
              <select id="streamtype" class="sel">
                <option value="1">主码流</option>
                <option value="2">子码流</option>
                <option value="3">第三码流</option>
                <option value="4">转码码流</option>
              </select>
            </td>
            <td>
              <input type="button" class="btn" value="开始预览" @click="clickStartRealPlay"/>
              <input type="button" class="btn" value="停止预览" onclick="clickStopRealPlay()"/>
            </td>
          </tr>
          <tr>
            <td class="tt">音量</td>
            <td>
              <input type="text" id="volume" class="txt" value="50" maxlength="3"/>&nbsp;
              <input type="button" class="btn" value="设置" onclick="clickSetVolume();"/>（范围：0~100）
            </td>
            <td>
              <input type="button" class="btn" value="打开声音" onclick="clickOpenSound();"/>
              <input type="button" class="btn" value="关闭声音" onclick="clickCloseSound();"/>
            </td>
          </tr>
        </table>
      </el-col>
      <el-col :span="6"  :style="{height:'900px',maxHeight:controlHeight+'px'}">
        <div class="drawerBox">
          <a-card title="基本信息" :headStyle="{background:'rgba(6,78,116,0.9)',color:'#07CDFF'}" :bodyStyle="{background:'rgba(6,78,116,0.9)',color:'#07CDFF',marginBottom:'10px'}" :bordered="false">
            <div>
              <p  >
                <span style="margin-right: 10px">账号:</span><span>{{szUsername}}</span>
              </p>
              <p >
                <span style="margin-right: 10px">IP地址:</span><span>{{szIP}}</span>
              </p>

            </div>

          </a-card>
          <a-card title="视图控制" :headStyle="{background:'rgba(6,78,116,0.9)',color:'#07CDFF'}" :bodyStyle="{background:'rgba(6,78,116,0.9)',color:'#07CDFF'}" :bordered="false">
            <div class="cardBox">
              <p v-for="item,index in sel2" @click="changeVideoNum(index)" class="cardItem">
                <img :src="item.icon" alt=""><span style="width: 100%;display: inline-block">{{item.label}}</span>
              </p>

            </div>

          </a-card>
          <a-card  title="视频点" :headStyle="{background:'rgba(6,78,116,0.9)',color:'#07CDFF','marginTop':'10px'}" :bodyStyle="{background:'rgba(6,78,116,0.9)',color:'#07CDFF'}" :bordered="false">
            <ul class="videoBox">
              <li v-for="item in videoBox" @click="clickVideoItem(item.id)" :class="{clickItem:item.isClick}">{{item.name}}</li>

            </ul>
          </a-card>
        </div>

      </el-col>
    </el-row>


<!--        <div   class="handle-button" @click="visible=!visible" :class="{trans:visible}">-->
<!--        <i :class="visible?'el-icon-close':'el-icon-setting'" />-->
<!--        </div>-->
<!--    <a-drawer-->
<!--      title="视频控制"-->
<!--      placement="right"-->
<!--      :zIndex="1000"-->
<!--      wrapClassName="drawerBox"-->
<!--      :closable="true"-->
<!--      :width="350"-->
<!--      @close="onClose"-->
<!--      :mask="false"-->
<!--      :visible="visible"-->
<!--    >-->
<!--     -->
<!--    </a-drawer>-->

  </div>
</template>

<script>
  // import { Drawer } from 'ant-design-vue'
  // import WebVideoCtrl from '@/utils/webVideoCtrl'
  import $ from 'jquery'

  export default {
    name: 'videoBox',
    data () {
      return {
        visible: true,
        controlHeight: '',
        detailVideoItem: 1, // 默认第一个视频点
        videoBox: [], // 视频点集合
        sel2: [{
          label: '1*1画面',
          icon: require('../../../assets/img/11@2x.png')
        }, {
          label: '2*2画面',
          icon: require('../../../assets/img/2@2x.png')
        }, {
          label: '3*3画面',
          icon: require('../../../assets/img/3@2x.png')
        }, {
          label: '4*4画面',
          icon: require('../../../assets/img/4@2x.png')
        }],
        changeWndNumVal: '1',
        szIP: '',
        szPort: '8888',
        szUsername: 'admin',
        szPassword: 'admin12345',
        g_iWndIndex: 0
      }
    },
    beforeRouteLeave (to, form, next){
      this.clickLogout()
      this.visible=false
      next()
    },
    // destroyed (){
    //   this.clickLogout()
    //   this.visible=false
    // },
    // components:{ ADrawer: Drawer },
    created (){
      this.visible=true
    //
    },

    mounted () {
      this.controlHeight=$('.el-card__body').height()
      console.log(this.controlHeight)
      this.visible=true
      this.init()
      this.clickLogin()
      this.changeWndNum()
    },

    methods: {
      myBrowser () { // 检验浏览器
        var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf('Opera') > -1 // 判断是否Opera浏览器
        var isIE = userAgent.indexOf('compatible') > -1 &&
        userAgent.indexOf('MSIE') > -1 && !isOpera // 判断是否IE浏览器
        var isEdge = userAgent.indexOf('Edge') > -1 // 判断是否IE的Edge浏览器
        var isFF = userAgent.indexOf('Firefox') > -1 // 判断是否Firefox浏览器
        var isSafari = userAgent.indexOf('Safari') > -1 &&
        userAgent.indexOf('Chrome') == -1 // 判断是否Safari浏览器
        var isChrome = userAgent.indexOf('Chrome') > -1 &&
        userAgent.indexOf('Safari') > -1 // 判断Chrome浏览器

        if (isIE) {
          return 'IE'
        }
        if (isOpera) {
          return 'Opera'
        }
        if (isEdge) {
          return 'Edge'
        }
        if (isFF) {
          return 'FF'
        }
        if (isSafari) {
          return 'Safari'
        }
        if (isChrome) {
          return 'Chrome'
        }
      },
      clickLogout () { // 退出
        var szDeviceIdentify = $('#ip').val()
        // szInfo = ''

        if (szDeviceIdentify == null) {
          return
        }

        var iRet = WebVideoCtrl.I_Logout(szDeviceIdentify)
        if (iRet == 0) {
          // szInfo = "退出成功！";
          console.log('退出成功')
          // $("#ip option[value='" + szDeviceIdentify + "']").remove();
          this.getChannelInfo()
          this.getDevicePort()
        } else {
          // szInfo = "退出失败！";
          console.log('退出失败')
        }
        // showOPInfo(szDeviceIdentify + " " + szInfo);
      },
      clickVideoItem (val){
        console.log(val)
        this.detailVideoItem=val
        this.videoBox.forEach((a, i) => {
          if(a.id==val){
            a.isClick=true
          }else{
            a.isClick=false
          }
        })
        this.clickStartRealPlay()
      },
      changeVideoNum (index){ // 视频分割
        this.changeWndNumVal=index+1
        var iType = parseInt(this.changeWndNumVal, 10)
        this.sel2.forEach((a, i) => {
          if(i==index){
            a.icon=require(`../../../assets/img/${index+1}1@2x.png`)
          }else{
            a.icon=require(`../../../assets/img/${i+1}@2x.png`)
          }
        })

        WebVideoCtrl.I_ChangeWndNum(iType)
      },
      init (){
        var that=this
        if(this.myBrowser()){
          that.$message({
            message: '为了正常的播放视频,请使用IE10+浏览器!',
            type: 'error'
          })
        }
        var iRet = WebVideoCtrl.I_CheckPluginInstall()
        if (iRet == -1) {
          // alert('您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装！')
          that.$message({
            message: '您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装！',
            type: 'error'
          })
          return
        }

        // 初始化插件参数及插入插件
        // eslint-disable-next-line no-unused-vars
        var width=$('.video').width()
        var height=900
        console.log(height)
        WebVideoCtrl.I_InitPlugin(width, height, {
          bWndFull: true,     // 是否支持单窗口双击全屏，默认支持 true:支持 false:不支持
          iPackageType: 2,    // 2:PS 11:MP4
          iWndowType: 2,
          bNoPlugin: true,
          cbSelWnd: function (xmlDoc) {
            that.g_iWndIndex = parseInt($(xmlDoc).find('SelectWnd').eq(0).text(), 10)
            console.log('当前选择的窗口编号1：' +that.g_iWndIndex)
            // var szInfo = '当前选择的窗口编号：' + g_iWndIndex
            // showCBInfo(szInfo)
          },
          cbDoubleClickWnd: function (iWndIndex, bFullScreen) {
            var szInfo = '当前放大的窗口编号：' + iWndIndex
            // if (!bFullScreen) {
            //   szInfo = '当前还原的窗口编号：' + iWndIndex
            // }
            // showCBInfo(szInfo)

          // 此处可以处理单窗口的码流切换
          /* if (bFullScreen) {
              clickStartRealPlay(1);
          } else {
              clickStartRealPlay(2);
          } */
          },
          cbEvent: function (iEventType, iParam1, iParam2) {
            if (iEventType == 2) { // 回放正常结束
              // showCBInfo('窗口' + iParam1 + '回放结束！')
            } else if (iEventType == -1) {
              // showCBInfo('设备' + iParam1 + '网络错误！')
            } else if (iEventType == 3001) {
              clickStopRecord(g_szRecordType, iParam1)
            }
          },
          cbRemoteConfig: function () {
            // showCBInfo('关闭远程配置库！')
          },
          cbInitPluginComplete: function () {
            WebVideoCtrl.I_InsertOBJECTPlugin('divPlugin')

        // 检查插件是否最新
            if (WebVideoCtrl.I_CheckPluginVersion() == -1) {
              alert('检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！')
            }
          }
        })
      },
      changeWndNum () {
        var iType = parseInt(this.changeWndNumVal, 10)
        WebVideoCtrl.I_ChangeWndNum(iType)
      },
      getIP (){
        return new Promise((resolve, reject) => {
          this.$http({
            url: this.$http.adornUrl(`/bim/dns/getIPByDNS?dns=t258765y59.wicp.vip`),
            method: 'post'
            // data: this.$http.adornData({
            //   dns:""
            // })
          }).then((data) => {
            if(data.data.code==0){
              resolve(data.data.result)
              // this.szIP=;
            }
          })
        })
      },
      async clickLogin () {
        let that = this
        this.szIP=await this.getIP()
      // var szIP = $('#loginip').val(),
      //   szPort = $('#port').val(),
      //   szUsername = $('#username').val(),
      //   szPassword = $('#password').val()

      // eslint-disable-next-line eqeqeq
        if (this.szIP == '' || this.szPort == '') {
          return
        }

        var szDeviceIdentify = this.szIP + '_' + this.szPort

        var iRet = WebVideoCtrl.I_Login(this.szIP, 1, this.szPort, this.szUsername, this.szPassword, {
          success: function (xmlDoc) {
            that.$message({
              message: '登录成功',
              type: 'success'
            })
            that.getChannelInfo()

          // $('#ip').prepend("<option value='" + szDeviceIdentify + "'>" + szDeviceIdentify + '</option>')
          // setTimeout(function () {
          //   $('#ip').val(szDeviceIdentify)
          //   getChannelInfo()
          //   getDevicePort()
          // }, 10)
          },
          error: function (status, xmlDoc) {
            that.$message({
              message: '登录失败',
              type: 'error'
            })
            // showOPInfo(szDeviceIdentify + ' 登录失败！', status, xmlDoc)
          }
        })

        if (iRet == -1) {
          // showOPInfo(szDeviceIdentify + ' 已登录过！')
        }
      },
      getChannelInfo () { // 获取通道
        var szDeviceIdentify = this.szIP,
          that = this,
          oSel = $('#channels').empty()

        if (szDeviceIdentify == null) {
          return
        }

        // 模拟通道
        WebVideoCtrl.I_GetAnalogChannelInfo(szDeviceIdentify, {
          async: false,
          success: function (xmlDoc) {
            var oChannels = $(xmlDoc).find('VideoInputChannel')
            console.log(JSON.stringify(oChannels))
            $.each(oChannels, function (i) {
              var id = $(this).find('id').eq(0).text(),
                name = $(this).find('name').eq(0).text()
              if (name == '') {
                name = 'Camera ' + (i < 9 ? '0' + (i + 1) : (i + 1))
              }
              oSel.append("<option value='" + id + "' bZero='false'>" + name + '</option>')
            })
            // that.$message({
            //   message: '获取模拟通道成功',
            //   type: 'success'
            // })
            console.log('获取模拟通道成功')
            // showOPInfo(szDeviceIdentify + ' 获取模拟通道成功！')
          },
          error: function (status, xmlDoc) {
            // that.$message({
            //   message: '获取模拟通道失败',
            //   type: 'success'
            // })
            console.log('获取模拟通道失败')
            // showOPInfo(szDeviceIdentify + ' 获取模拟通道失败！', status, xmlDoc)
          }
        })
        // 数字通道
        WebVideoCtrl.I_GetDigitalChannelInfo(szDeviceIdentify, {
          async: false,
          success: function (xmlDoc) {
            var oChannels = $(xmlDoc).find('InputProxyChannelStatus')
            console.log('xmlDoc'+JSON.stringify(xmlDoc))
            // oChannels.forEach((a, i) => {
            //   console.log(JSON.stringify(a))
            // })
            $.each(oChannels, function (i, a) {
              var obj={}
              var id = $(this).find('id').eq(0).text(),
                name = $(this).find('name').eq(0).text(),
                online = $(this).find('online').eq(0).text()
              if (online == 'false') { // 过滤禁用的数字通道
                return true
              }
              if (name == '') {
                name = 'IPCamera ' + (i < 9 ? '0' + (i + 1) : (i + 1))
              }
              obj.name=name
              obj.id=id
              obj.bZero=false
              if(i==0){
                obj.isClick=true
              }else{
                obj.isClick=false
              }

              that.videoBox.push(obj)
              oSel.append("<option value='" + id + "' bZero='false'>" + name + '</option>')
            })

            // that.$message({
            //   message: '获取数字通道成功',
            //   type: 'success'
            // })
            that.getDevicePort()
            console.log('获取数字通道成功')
            that.clickStartRealPlay()
            // showOPInfo(szDeviceIdentify + ' 获取数字通道成功！')
          },
          error: function (status, xmlDoc) {
            // that.$message({
            //   message: '获取数字通道失败',
            //   type: 'success'
            // })
            // showOPInfo(szDeviceIdentify + ' 获取数字通道失败！', status, xmlDoc)
          }
        })
        // 零通道
        WebVideoCtrl.I_GetZeroChannelInfo(szDeviceIdentify, {
          async: false,
          success: function (xmlDoc) {
            var oChannels = $(xmlDoc).find('ZeroVideoChannel')

            $.each(oChannels, function (i) {
              // eslint-disable-next-line one-var
              var id = $(this).find('id').eq(0).text(),
                name = $(this).find('name').eq(0).text()
              // eslint-disable-next-line eqeqeq
              if (name == '') {
                name = 'Zero Channel ' + (i < 9 ? '0' + (i + 1) : (i + 1))
              }
              if ($(this).find('enabled').eq(0).text() == 'true') { // 过滤禁用的零通道
                oSel.append("<option value='" + id + "' bZero='true'>" + name + '</option>')
              }
            })
            // that.$message({
            //   message: '获取零通道成功',
            //   type: 'success'
            // })
            // showOPInfo(szDeviceIdentify + ' 获取零通道成功！')
          },
          error: function (status, xmlDoc) {
            // showOPInfo(szDeviceIdentify + ' 获取零通道失败！', status, xmlDoc)
          }
        })
      },
      // 获取端口
      getDevicePort () {
        var szDeviceIdentify = this.szIP

        if (szDeviceIdentify == null) {
          return
        }

        // eslint-disable-next-line no-undef
        var oPort = WebVideoCtrl.I_GetDevicePort(szDeviceIdentify)
        if (oPort != null) {
          $('#deviceport').val(oPort.iDevicePort)
          $('#rtspport').val(oPort.iRtspPort)

          console.log(' 获取端口成功！')
        } else {
          console.log(' 获取端口失败！')
        }
      },
      clickStartRealPlay (iStreamType) {
        // eslint-disable-next-line no-undef,one-var
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex),
          szDeviceIdentify = this.szIP,
          iRtspPort = parseInt($('#rtspport').val(), 10),
          iChannelID =this.detailVideoItem,
          // bZeroChannel = $('#channels option').eq($('#channels').get(0).selectedIndex).attr('bZero') == 'true',
          bZeroChannel=false,
          szInfo = ''

        if (typeof iStreamType === 'undefined') {
          iStreamType = parseInt($('#streamtype').val(), 10)
          console.log('iStreamType'+JSON.stringify(iStreamType))
        }

        if (szDeviceIdentify == null) {
          return
        }

        var startRealPlay = function () {
          console.log(iRtspPort, JSON.stringify(iStreamType), iChannelID, bZeroChannel)
          WebVideoCtrl.I_StartRealPlay(szDeviceIdentify, {
            iRtspPort: iRtspPort,
            iStreamType: 1,
            iChannelID: iChannelID,
            bZeroChannel: bZeroChannel,
            success: function () {
              szInfo = '开始预览成功！'
              console.log(szInfo)
              // showOPInfo(szDeviceIdentify + ' ' + szInfo)
            },
            error: function (status, xmlDoc) {
              if (status === 403) {
                szInfo = '设备不支持Websocket取流！'
              } else {
                szInfo = '开始预览失败！'
              }
              console.log(szInfo)
              // showOPInfo(szDeviceIdentify + ' ' + szInfo)
            }
          })
        }

        if (oWndInfo != null) { // 已经在播放了，先停止
          WebVideoCtrl.I_Stop({
            success: function () {
              startRealPlay()
            }
          })
        } else {
          startRealPlay()
        }
      },
      showDrawer () {
        console.log(1)
        this.visible = true
      },
      onClose () {
        this.visible = false
      }
    }
  }
</script>
<style>
   .containsBox{
     height: 100%;
     /*padding: 0 !important;*/
   }
  .videoBox{
    list-style: none;
    padding:0;
    height: 380px;
    overflow: auto;
  }
     .videoBox::-webkit-scrollbar {
           width: 4px;}
      .videoBox::-webkit-scrollbar-thumb {
               border-radius: 10px;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
              background: rgba(0,0,0,0.2);}
       .videoBox::-webkit-scrollbar-track {
-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
 border-radius: 0;
 background: rgba(0,0,0,0.1);}

  .videoBox>li{
    margin-bottom: 10px;
    cursor: pointer;
    color: #fff;
  }
  .videoBox>li.clickItem{
    opacity: 0.5;
  }
  .videoBox>li:hover{
    opacity: 0.5;
  }
  .ant-drawer-body .ant-card-head{
    border-bottom:3px solid #064E74;
  }
  .drawerBox {
    height: 100%;
    background: #064E74;
    color: #07CDFF;

  }
  .ant-drawer-header{
    background: #064E74;
    border-bottom: 1px solid #00ffff;

  }
  .ant-drawer-header .ant-drawer-title{
    color: #07CDFF;
  }
</style>

<style lang="scss" scoped>

  .cardItem{
    display: flex;justify-content: center;flex-wrap: wrap;text-align: center;
    cursor: pointer;
  }
  .cardItem:hover{
    opacity: 0.5;
  }
  .cardItem>img{
    margin-bottom: 3px;
  }
  .handle-button {
    position: absolute;
    top:50%;
    right: 0;
    border-radius: 6px 0 0 6px !important;
    width: 48px;
    height: 48px;
    background: #3E8EF7;
    pointer-events: auto;
    z-index: 1000;
    cursor: pointer;
    pointer-events: auto;
    font-size: 24px;
    text-align: center;
    color: #fff;
    line-height: 48px;


  }
  .handle-button  i {
    font-size: 24px;
    line-height: 48px;
  }
  .trans{
    right: 333px;
    transition: all 0.3s
  }
  .cardBox{
    width: 100%;
    display: flex;
    justify-content:space-between;
    flex-wrap: nowrap;
  }
  .cardBox>span{
    display: inline-block;
    cursor: pointer;
     width:25%;
  }

</style>
