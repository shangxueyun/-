<template>
  <div class="productionManagement">
      <div class="form_operation">
        <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
            <el-date-picker
            v-model="dataForm.date"
            type="month"
            value-format='yyyy-MM'
            style="width:18rem"
            placeholder="进度时点">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button v-if="isAuth('bim:production:list')" @click="getDataList('1')">查询</el-button>
            <el-form-item v-if="productionList">
                <el-button style="margin-left:10px" v-if="isAuth('bim:production:save')"  @click="addPush()" type="primary">添加产值</el-button>
                <el-button v-if="isAuth('bim:production:delete')" type="danger" @click="deleteHandle(dataListSelections.id)" :disabled="dataListSelections.length <= 0">删除</el-button>
                 
            </el-form-item>
        </el-form-item>
        </el-form>
      </div>
      <div class="form_list">
        <!-- cell-click单击详情 -->
        <el-table
            :data="dataList"
            border
            v-loading="dataListLoading"
            highlight-current-row
            @current-change="selectionChangeHandle"
            :header-row-style="{height:'40px'}"
            :header-cell-style="{padding:'0'}"
            :row-style="{height:'44px'}"
            :cell-style="{padding:'0'}"
            style="width: 100%">
            <el-table-column
                type="index"
                header-align="center"
                width="60"
                align="center"
                label="序号">
                <template slot-scope="scope">
                  <div
                  style="line-height: 42px;"
              　　@click="doubleclickclear(scope.row,$event,'index')"
                  >{{scope.$index+1}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                header-align="center"
                align="center"
                label="项目名称">
                <template slot-scope="scope">
                  <div v-if="!productionList"
                  style="line-height: 42px;"
              　　@click="doubleclickclear(scope.row,$event,'name')"
                  >{{scope.row.name}}</div>
                  <div v-if="productionList"
              　　@click="doubleclickclear(scope.row,$event,'name')" 
　　              @dblclick.native="doubleclickclear(scope.row,$event,'name')" 
                  >{{scope.row.name}}</div>
                  <input @blur="handleSuccess(scope.row,$event,'name')" 
                  style="display:none;width: 90%;border-radius: 4px;border: 1px solid #ccc;text-align: center;"
                   type="text" v-model="scope.row.name">
                </template>
            </el-table-column>
            <el-table-column
                prop="scheduleTime"
                label="进度时点"
                sortable
                header-align="center"
                align="center"
                >
                <template slot-scope="scope">
                  <div v-if="!productionList"
                  style="line-height: 42px;"
              　　@click="doubleclickclear(scope.row,$event,'scheduleTime')"
                  >{{scope.row.scheduleTime}}</div>
                  <div v-if="productionList"
                  style="line-height: 42px;"
              　　@click="doubleclickclear(scope.row,$event,'scheduleTime')" 
　　              @dblclick.native="doubleclickclear(scope.row,$event,'scheduleTime')" 
                  >{{scope.row.scheduleTime}}</div>
                  <el-date-picker
                    @change="DateAjax(scope.row,'scheduleTime')" style="display:none;text-align: center;width:100%"
                    @blur="DateAjax(scope.row,'scheduleTime')"
                    :ref="`scheduleTime${scope.row.id}`"
                    v-model="scheduleTimeValue"
                    value-format='yyyy-MM-dd'
                    type="date">
                  </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column
                prop="completeOutputValue"
                header-align="center"
                align="center"
                label="本月完成产值（万元）">
                <template slot-scope="scope">
                  <div v-if="!productionList"
                  style="line-height: 42px;"
              　　@click="doubleclickclear(scope.row,$event,'completeOutputValue')"
                  >{{scope.row.completeOutputValue}}</div>
                  <div v-if="productionList"
                  style="line-height: 42px;"
              　　@click="doubleclickclear(scope.row,$event,'completeOutputValue')" 
　　              @dblclick.native="doubleclickclear(scope.row,$event,'completeOutputValue')" 
                  >{{scope.row.completeOutputValue}}</div>
                  <input @blur="handleSuccess(scope.row,$event,'completeOutputValue')" 
                  style="display:none;width: 90%;border-radius: 4px;border: 1px solid #ccc;text-align: center;"
                   type="number" v-model="scope.row.completeOutputValue">
                </template>
            </el-table-column>
            <el-table-column
                prop='yearCumulativeOutputValue'
                header-align="center"
                align="center"
                label="自年初累计产值（万元）">
                <template slot-scope="scope">
                  <div 
                  style="line-height: 42px;"
              　　@click="doubleclickclear(scope.row,$event,'yearCumulativeOutputValue')"
                  >{{scope.row.yearCumulativeOutputValue}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="cumulativeOutputValue"
                header-align="center"
                align="center"
                label="自开工累计产值（万元）">
                <template slot-scope="scope">
                  <div
                  style="line-height: 42px;"
              　　@click="doubleclickclear(scope.row,$event,'cumulativeOutputValue')"
                  >{{scope.row.cumulativeOutputValue}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="createTime"
                header-align="center"
                align="center"
                label="创建时间">
                <template slot-scope="scope">
                  <div
                  style="line-height: 42px;"
              　　@click="doubleclickclear(scope.row,$event,'createTime')"
                  >{{scope.row.createTime}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="createUser"
                header-align="center"
                align="center"
                label="创建人员">
                <template slot-scope="scope">
                  <div
                  style="line-height: 42px;"
              　　@click="doubleclickclear(scope.row,$event,'createUser')"
                  >{{scope.row.createUser}}</div>
                </template>
            </el-table-column>
        </el-table>
      </div>
      <div>
        <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :current-page="pageIndex"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <!-- 添加、修改 -->
      <div class="pop-up" >
        <el-dialog
            :title="bouncedTitle"
            :visible.sync="dialogVisible"
            width="30%"
            :modal-append-to-body="true"
            :append-to-body="true"
            :before-close="clearClose">
            <!--  -->
            <el-form :model="addData" status-icon ref="addData"  :rules="rules" label-width="110px" @keyup.esc.native="clearClose()" class="demo-ruleForm">
                <el-form-item label="项目名称:" prop="name" :rules="rules.name">
                    <el-input style="width:100%" type="text" v-model="addData.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="进度时点:" :rules="rules.scheduleTime" prop="scheduleTime">
                    <el-date-picker
                    v-model="addData.scheduleTime"
                    value-format='yyyy-MM-dd'
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="本月完成产值:" prop="completeOutputValue" :rules="rules.completeOutputValue">
                  <el-input style="width:100%" type="text" v-model="addData.completeOutputValue" autocomplete="off"><template slot="append"><span>万元</span></template></el-input>
                </el-form-item>
                <el-form-item label="土建完成产值:" prop="constructionOutputValue" :rules="rules.constructionOutputValue">
                  <el-input style="width:100%" type="text" v-model="addData.constructionOutputValue" autocomplete="off"><template slot="append"><span>万元</span></template></el-input>
                </el-form-item>
                <el-form-item label="安装完成产值:" prop="installationOutputValue" :rules="rules.installationOutputValue">
                  <el-input style="width:100%" type="text" v-model="addData.installationOutputValue" autocomplete="off"><template slot="append"><span>万元</span></template></el-input>
                </el-form-item>
                <el-form-item label="其他分包产值:" prop="subcontractingOutputValue" :rules="rules.subcontractingOutputValue">
                  <el-input style="width:100%" type="text" v-model="addData.subcontractingOutputValue" autocomplete="off"><template slot="append"><span>万元</span></template></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="clearClose">取 消</el-button>
                <el-button type="primary" @click="productionSubmit">确 定</el-button>
            </span>
        </el-dialog>
      </div>
<!-- rowspan合并行，colspan 合并列 -->
        <el-dialog
            :title="detailsName"
            :visible.sync="detailsVisible"
            width="30%"
            :modal-append-to-body="true"
            :append-to-body="true"
            :before-close="detailsclearClose">
            <div class="table_div">
              <table :model="detailsData"  border="0" cellspacing="0" cellpadding="0">
                <tr><td style="font-weight: 600;">填表时间</td><td>{{detailsData.createTime}}</td><td style="font-weight: 600;">单位</td><td>万元</td></tr>
                <tr>
                  <td style="font-weight: 600;" :rowspan="detailsData.list.length+1">往年累计完成产值</td>
                  <td style="font-weight: 600;">时间</td>
                  <td style="font-weight: 600;">年度产值</td>
                  <td style="font-weight: 600;">累计产值</td>
                </tr>
                <tr v-for="(item,key) in detailsData.list" :key="key">
                  <td>{{item.year}}</td><td>{{item.yearCumulativeOutputValue}}</td><td>{{item.cumulativeOutputValue}}</td>
                </tr>
                <tr><td rowspan="3" style="font-weight: 600;">本月完成产值</td><td rowspan="3">{{detailsData.completeOutputValue}}</td><td style="font-weight: 600;">土建完成产值</td><td>{{detailsData.constructionOutputValue}}</td></tr>
                <tr><td style="font-weight: 600;">安装完成产值</td><td>{{detailsData.installationOutputValue}}</td></tr>
                <tr><td style="font-weight: 600;">其他分包完成产值</td><td>{{detailsData.subcontractingOutputValue}}</td></tr>
                <tr><td rowspan="3" style="font-weight: 600;">自年初累计产值</td><td rowspan="3">{{detailsData.yearCumulativeOutputValue}}</td><td style="font-weight: 600;">土建累计产值</td><td>{{detailsData.cumulativeOutputValueList.constructionOutputValue}}</td></tr>
                <tr><td style="font-weight: 600;">安装累计产值</td><td>{{detailsData.cumulativeOutputValueList.installationOutputValue}}</td></tr>
                <tr><td style="font-weight: 600;">其他分包累计产值</td><td>{{detailsData.cumulativeOutputValueList.subcontractingOutputValue}}</td></tr>
                <tr><td style="font-weight: 600;">自开工累计产值</td><td colspan="3">{{detailsData.cumulativeOutputValue}}</td></tr>
              </table>
            </div>
            <!--  -->
        </el-dialog>
  </div>
</template>

<script>
var time = null;
var num = 0;
  export default {
    components: {
    },
    data() {
      var installationOutputValue = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入安装完成产值'))
        }else{
          if(Number(value)>=1)
          callback(new Error('请输入安装完成产值不能大于1'))
          else if(Number(value)<0)
          callback(new Error('请输入安装完成产值不能小于0'))
          else
          callback()
        }
      }
      var DayDate = new Date().toISOString().replace(/T/g," ");
      var ValueSize = (rule, value, callback) => {
        if (value === '') {
          callback(new Error())
        }else{
          if(Number(value)>=100000000){
            rule.message = '请输入产值不能大于100000000';
            callback(new Error())
          }
          else if(Number(value).toString() == "NaN"){
            rule.message = '请输入产值格式不正确，请输入数字格式';
            callback(new Error())
          }else
          callback()
        }
      }
      return {
        dataForm: {
          date:'',
        },
        dataList:[
        ],
        dataListLoading:false,
        dataListSelections:[],
        detailsData:{
          createTime:'',
          completeOutputValue:'',
          constructionOutputValue:'',
          installationOutputValue:'',
          subcontractingOutputValue:'',
          yearCumulativeOutputValue:'',
          cumulativeOutputValue:'',
          cumulativeOutputValueList:'',
          list:[],
        },
        addData:{
            completeOutputValue:'',
            createTime:DayDate.substring(0,DayDate.lastIndexOf(".")),
            createUser:this.$store.state.user.name,
            name:'',
            constructionOutputValue:'',
            installationOutputValue:'',
            subcontractingOutputValue:'',
            scheduleTime:'',
            updateTime:DayDate.substring(0,DayDate.lastIndexOf(".")),
            updateUser:this.$store.state.user.name,
        },
        rules:{
          scheduleTime: [{ required: true, message: '请选择进度时点', trigger: 'blur' },],
          name:[{ required: true, message: '请输入项目名称', trigger: 'blur' }],
          completeOutputValue:[{ required: true,validator: ValueSize, message: '请输入本月完成产值', trigger: 'blur' }],
          constructionOutputValue:[{ required: true,validator: ValueSize, message: '请输入土建完成产值', trigger: 'blur' }],
          installationOutputValue:[{ required: true, validator: installationOutputValue, trigger: 'blur' }],
          subcontractingOutputValue:[{ required: true,validator: ValueSize, message: '请输入其他分包产值', trigger: 'blur' }],
        },
        dialogVisible:false,
        detailsVisible:false,
        modification:false,
        productionList:true,
        scheduleTimeValue:'',
        bouncedTitle:'',
        detailsName:'',
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
      };
    },
    watch: {

    },
    created() {

    },
    computed: {

    },
    mounted() {
        this.getDataList();
        if(/fileManager-productionManagement/.test(window.location.href))
        this.productionList = true;
        else
        this.productionList = false;
    },
    methods: {
      getDataList (num) {
        if(num == 1){
            this.pageIndex = 1
        }
        this.dataListLoading = true;
        let startTime = '',endTime = '';
        if(!(typeof this.dataForm.date == 'string') && this.dataForm.date)
        {
            startTime = this.dataForm.date[0];
            endTime = this.dataForm.date[1];
        }
        this.$http({
              url: this.$http.adornUrl('/bim/production/list'),
              method: 'post',
              data: this.$http.adornData({
                'pageNo': this.pageIndex,
                'pageSize': this.pageSize,
                'param':{
                    'choiceTime':this.dataForm.date,
                }
            })
        }).then(({data}) => {
            
            if (data && data.code === 0) {
                let list = data.result.list;
                this.dataList = list;
                this.totalPage = data.result.totalCount;
                this.pageIndex = data.result.currPage;
            } else {
                this.dataList = []
                this.totalPage = 0
            }
            this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        if(val)
        this.dataListSelections = val
      },
      handleSuccess (response, event,str) {
        clearTimeout(time);  num = 0;//清除
        if(event.target.parentElement.children[1].style.display == "none")
        {
          event.target.parentElement.children[1].style.display = "inline-table";
          event.target.parentElement.children[1].focus();
          event.target.parentElement.children[0].style.display = "none";
          let str = response.scheduleTime;
          this.scheduleTimeValue = str;
        }else{
          this.dataListLoading = true;
          let obj = {id:response.id};
          obj[str] = response[str];
          this.EAjax(obj);
          event.target.parentElement.children[1].style.display = "none";
          event.target.parentElement.children[0].style.display = "block";
        }
      },
      EAjax(obj){
          let vm = this;
          vm.$http({
              url: vm.$http.adornUrl('/bim/production/update'),
              method: 'post',
              data: vm.$http.adornData(obj)
          }).then(({data})  => {
              vm.dataListLoading = false
              if (data && data.code === 0)
              {
                  vm.$message({
                      message: '修改成功',
                      type: 'success',
                      duration: 1000,
                      onClose: () => {
                      }
                  })
                  vm.getDataList()
                  vm.clearClose();
                  vm.dialogVisible = false;
              } else {
                vm.$message.error(data.msg)
              }
          })
      },
      DateAjax(response, str){
        var times = null;
        let obj = {id:response.id};
        obj[str] = this.scheduleTimeValue;
        let Ele = this.$refs[`scheduleTime${response.id}`].$el.parentElement
        Ele.children[1].style.display = "none";
        Ele.children[0].style.display = "block";
        //为后台字段空判断
        if(!obj.scheduleTime)
        {
          
        }else{
          this.dataListLoading = true;
          let vm = this;
          times = setTimeout(() => {
            vm.EAjax(obj);
          }, 200);
        }
      },
      // 单击事件函数
      detailsFunc(row, event, column){
        clearTimeout(time);  num = 0;//清除
        let vm = this;
        vm.detailsName = row.name;
        vm.dataListLoading = true;
        vm.detailsData.createTime = row.createTime;
        vm.detailsData.completeOutputValue = row.completeOutputValue;
        vm.detailsData.constructionOutputValue = row.constructionOutputValue;
        vm.detailsData.subcontractingOutputValue = row.subcontractingOutputValue;
        vm.detailsData.installationOutputValue = row.installationOutputValue;
        vm.detailsData.yearCumulativeOutputValue = row.yearCumulativeOutputValue;
        vm.detailsData.cumulativeOutputValue = row.cumulativeOutputValue;
        vm.$http({
            url: vm.$http.adornUrl('/bim/production/info/'+row.id),
            method: 'get',
        }).then(({data})  => {
            vm.dataListLoading = false;
            if (data && data.code === 0)
            {
              vm.detailsData.list = data.result.previousYears;
              vm.detailsData.cumulativeOutputValueList = data.result.cumulativeOutputValue;
              vm.detailsVisible = true;
            } else {
              vm.$message.error(data.msg)
            }
        })       
      },
      doubleclickclear(row, event, column){
        clearTimeout(time);  //首先清除计时器
        num++;
        let vm = this;
        time = setTimeout(() => {
          if(num > 1)
          vm.handleSuccess(row, event, column);
          else if(num == 1)
          vm.detailsFunc(row);
        }, 300);
      },
      detailsclearClose(){
        this.detailsVisible = false;
        this.detailsData = {
          createTime:'',
          completeOutputValue:'',
          constructionOutputValue:'',
          subcontractingOutputValue:'',
          yearCumulativeOutputValue:'',
          cumulativeOutputValue:'',
          cumulativeOutputValueList:'',
          list:[],
        };
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/bim/production/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '删除成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
      //添加 /修改 模块
      productionSubmit(){
        let vm = this,url = '';
        this.$refs['addData'].validate((valid) => {
          if (valid) {
                if(vm.examine(vm.addData) === false)
                {
                    vm.$alert('必填项不能为空。', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {}
                    });
                    return
                }
                for(let i in vm.addData)
                {
                  if(i == "completeOutputValue" || i == "constructionOutputValue" || i == "installationOutputValue" || i == "subcontractingOutputValue")
                  vm.addData[i] = Number(vm.addData[i]);
                }
                vm.addData.scheduleTime = vm.addData.scheduleTime.toLocaleString().replace(/[\u4e00-\u9fa5]/g,"").replace(/\//g,"-")
                url = '/bim/production/save';
                vm.$http({
                    url: vm.$http.adornUrl(url),
                    method: 'post',
                    data: vm.$http.adornData(vm.addData)
                }).then(({data}) => {
                    vm.dataListLoading = false
                    if(data && data.code === 0)
                    {
                        vm.$message({
                            message: '添加成功',
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                            }
                        })
                        vm.getDataList()
                        vm.clearClose();
                        vm.dialogVisible = false;
                    }else{
                      this.$message.error(data.msg);
                    }
                })      
          }
        })
      },
      //添加/修改参数
      addPush(obj){
        let vm = this;
        if(obj)
        {
            this.bouncedTitle = '修改';
            this.addData = {};
            let objS = {};
            Object.keys(obj).forEach((v,i)=>{
                if(v == 'actualProgress' || v == 'planProgress'){
                    objS[v] = Number(obj[v].replace(/%/g,""));
                }
                else
                objS[v] = obj[v]
            });
            this.addData = JSON.parse(JSON.stringify(objS));
            this.modification = true;
        }else{
            this.bouncedTitle = '添加';
            this.modification = false;
            this.clearClose();
        }
        this.dialogVisible = true;
      },
      clearClose(){
            this.dialogVisible = false;
            let DayDate = new Date().toISOString().replace(/T/g," ");
            if(this.$refs['addData'])
            this.$refs['addData'].resetFields();
            this.addData = {
              completeOutputValue:'',
              createTime:DayDate.substring(0,DayDate.lastIndexOf(".")),
              name:'',constructionOutputValue:'',
              installationOutputValue:'',
              subcontractingOutputValue:'',
              createUser:this.$store.state.user.name,scheduleTime:'',updateUser:this.$store.state.user.name,
              updateTime:DayDate.substring(0,DayDate.lastIndexOf(".")),
            }
      },
      ObjectCheck(obj){
        let vm = this;
        Object.keys(obj).forEach((v,i)=>{
            if(v == 'createUser' || v == 'updateUser')
                obj[v] = vm.$store.state.user.name;
                else if(v == 'createTime' || v == 'updateTime')
                   obj[v] = new Date().toLocaleString().replace(/[\u4e00-\u9fa5]/g,"").replace(/\//g,"-");
                    else
                    obj[v] = '';
        });
      },
      //Object
      examine(obj){
          for(let i in obj)
          {
              if(obj[i] == "")
              {
                  return false;
              }
          }
      },

    },
  }
</script>

<style lang="scss" scoped>

.productionManagement{
    .form_operation{
        // padding-left: 14rem;
    }
    .pop-up{
        width: 70%;
        margin: 0 auto;
    }
    .form_table{
        table{
            width: 100%;
            border-right:1px solid #eee;border-bottom:1px solid #eee;
            th{
                border-left:1px solid #eee;border-top:1px solid #eee
            }
            td{
                border-left:1px solid #eee;border-top:1px solid #eee;
                line-height: 2.4rem;
            }
        }
        .td{
            width: 100%;
            text-align: center;
            .el-date-editor.el-input, .el-date-editor.el-input__inner {
                width: 100%;
            }
            input[type='text'],input[type='number']{
                width: 100%;
                line-height: 1.6rem;
                border-radius: 2px;
                border: 1px solid #ccc;
            }
        }
    }
    .form_table::-webkit-scrollbar{
        width: 2px !important;
    }
    .table_div{
      width: 100%;
      table{
        width: 100%;
      }
    }
}
    .table_div{
      width: 100%;
      table{
        border-right: 1px solid #000;
        border-bottom: 1px solid #000;
        width: 100%;
        tr{
          td{
            border-left: 1px solid #000;
            border-top: 1px solid #000;
            line-height: 34px;
            font-size: 16px;
            text-align: center;
          }
        }
      }
    }
    .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;
}
</style>
<style>
.productionManagement .el-table .cell{
padding: 0;
}
.productionManagement .el-table__row:hover{
  cursor: pointer;
}
</style>


