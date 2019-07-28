<template>
  <el-row :gutter="30" >
    <el-col :span="6">
      <listProblem :url="'/bim/index/listSecurityPatrol'" :type="2"></listProblem>
      <div class="weightBox">
        <header>设备状态</header>
        <ul class="list">
          <template v-if="!todayExceptionGroup.length">
          <li >
            <p>今日报警</p>
            <span>0</span>
          </li>
          <li>
            <p>今日违章</p>
            <span>0</span>
          </li>
          <li>
            <p>非正常断点</p>
            <span>0</span>
          </li>
          <li>
            <p>今日故障</p>
            <span>0</span>
          </li>
          </template>
          <template v-if="todayExceptionGroup.length">
            <li v-for="item in todayExceptionGroupTest">
              <p>{{item.name}}</p>
              <span>{{item.count}}</span>
            </li>
          </template>
        </ul>
        <ul class="list">
          <li>
            <p>NO.1重量</p>
            <span>{{equipmentDetail.weight}}</span>
          </li>
          <li>
            <p>NO.2力矩</p>
            <span>{{equipmentDetail.moment}}</span>
          </li>
          <li>
            <p>NO.3幅度</p>
            <span>{{equipmentDetail.towerRange}}</span>
          </li>
          <li>
            <p>NO.4高度</p>
            <span>{{equipmentDetail.height}}</span>
          </li>
        </ul>
        <el-select v-model="equipment" placeholder="请选择塔机" @change="onChange">
          <el-option
            v-for="item in equipmentList"
            :key="item.equipmentCode"
            :label="item.equipmentCode"
            :value="item.equipmentCode">
          </el-option>
        </el-select>
      </div>
    </el-col>
    <el-col :span="12" style="box-sizing: border-box;padding:10px">
      <projectTime ref="projectTime"></projectTime>
<!--      <projectTime></projectTime>-->
    </el-col>
    <el-col :span="6">
      <div class="weightBox">
        <listProblem :url="'/bim/index/listSafetyPatrol'" :type="3"></listProblem>
        <div ref="pieTopSafe" style="width: 100%;height: 300px"></div>
        <div ref="pieBtSafe" style="width: 100%;height: 300px"></div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import {pie} from './options'
  import proContent from './proContent'
  import listProblem from './listProblem'
  import projectTime from './projectTime'
  export default {
    name: 'step2Container',
    components: {
      proContent,
      listProblem,
      projectTime

    },
    data (){
      return {
        equipmentList: [],
        equipment: '',
        todayExceptionGroup: [], // 设备异常
        equipmentDetail:{},//设备详情
        todayExceptionGroupTest: [{
          type: '1',
          count: 0
        }, {
          type: '2',
          count: 0
        }, {
          type: '3',
          count: 0
        }, {
          type: '4',
          count: 0
        }]
      }
    },
    mounted (){
      this.getequipmentList();
      this.$refs.projectTime.getLcbData()

  },
    methods: {
      getDetail(val){
        this.$http({
          url: this.$http.adornUrl(`/equipment/index/infoByEquipmentCode/${val}`),
          method: 'post'
          // data: this.$http.adornData({
          //
          // })
        }).then((data) => {
          if(data.data.code==0){
             this.equipmentDetail=data.data.result
          }
        })
      },
      getequipmentList (){
        this.$http({
          url: this.$http.adornUrl('/equipment/index/equipmentList/1'),
          method: 'post'
          // data: this.$http.adornData({
          //
          // })
        }).then((data) => {
          if(data.data.code==0){
            this.equipmentList=data.data.result||{};
            this.equipment=this.equipmentList[0]&&this.equipmentList[0].equipmentCode
            this.getUnusual(this.equipment)
            this.getDetail(this.equipment);
          }
        })
      },
      onChange (val){
        this.getUnusual(val)
        this.getDetail(val);
      },
      getUnusual (val){ // 异常
        this.$http({
          url: this.$http.adornUrl(`/equipment/index/todayExceptionGroup/${val}`),
          method: 'post'
          // data: this.$http.adornData({
          //
          // })
        }).then((data) => {
          if(data.data.code==0){
            this.todayExceptionGroup=data.data.result
             if( this.todayExceptionGroup.length){
               this.todayExceptionGroupTest.forEach((a,i)=>{
                 this.todayExceptionGroup.forEach((m,n)=>{
                   if(a.type==m.type){
                     a.count=m.count
                   }
                 })
               })
             }

            this.todayExceptionGroupTest.forEach((a, i) => {
              if(a.type==1){
                a.name='违章  '
              }else if(a.type==2){
                a.name='报警 '
              }else if(a.type==3){
                a.name='非正常断电 '
              }else if(a.type==4){
                a.name='故障 '
              }
            })
            console.log(this.todayExceptionGroupTest)
          }
        })
      },
      getEchart (id, data){
        let chart = this.$echarts.init(this.$refs[id])
        chart.setOption(data, true)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .weightBox{
    width: 100%;
    box-sizing: border-box;
    padding:10px;
    .list{
      width: 100%;
      list-style: none;
      padding:0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      li{
        width:20% ;
        height: 50px;
        border:1px solid #3b4249;
        text-align: center;
        margin-bottom: 20px;
        color: #fff;
        span{
          color:#DD4A68;
        }
        p{
          margin:0;
        }
      }
    }
    header{
      font-size:18px;
      margin-bottom: 30px;
      color:#AAF5FE;
    }
  }
</style>
