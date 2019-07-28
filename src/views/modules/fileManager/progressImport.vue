<template>
  <div class="progressImport" v-loading="dataListLoading">
    <el-form style="" @keyup.enter.native="getDataList()" :inline="true" :model="dataForm">
      <el-form-item>
          <el-input v-model="dataForm.key" placeholder="输入名称搜索" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-if="isAuth('bim:progress:info')" @click="getDataList('1')">查询</el-button>
        <el-form-item style="margin-left:10px;" v-if="progressDome">
            <el-upload
            multiple
            :auto-upload="true"
            :show-file-list="false"
            :http-request="uploadFile"
            :headers="header"
            :action="actionUrl"
            accept="application/vnd.ms-project"
            :on-success="handleSuccess">
            <el-button type="primary" >进度导入</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="progressDome">
          <!-- <el-button style="margin-left:10px;" v-if="isAuth('bim:progress:save')" type="primary" @click="addOrUpdateHandle(true)">新增分组</el-button> -->
          <el-button v-if="isAuth('bim:modelMonomer:listSuccessModelMonomer')" type="primary" @click="taskCorrelationModel()" :disabled="dataListSelections.id == undefined">任务关联模型</el-button>
          <el-button v-if="isAuth('bim:modelMonomer:listSuccessModelMonomer')" type="primary" @click="cancelCorrelationModel()" :disabled="dataListSelections.id == undefined">取消关联模型</el-button>
          <el-button v-if="isAuth('bim:progress:save')" type="primary"  :disabled="dataListSelections.id == undefined" @click="addChildUpdateHandle(dataListSelections)">新建分组</el-button>
          <el-button v-if="isAuth('bim:progress:update')"   type="warning"  :disabled="dataListSelections.id == undefined" @click="addOrUpdateHandle(dataListSelections)">修改</el-button>
          <el-button v-if="isAuth('bim:progress:delete')" type="danger"  :disabled="dataListSelections.id == undefined" @click="deleteHandle(dataListSelections.id)">删除</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
      <!-- 表格高度 -->
      <!-- :header-row-style="{height:'40px'}"
      :header-cell-style="{padding:'0'}"
      :row-style="{height:'40px'}"
      :cell-style="{padding:'0'}" -->
    <el-table
      :data="dataList"
      row-key="id"
      border
      highlight-current-row
      @current-change="selectionChangeHandle"
      :header-row-style="{height:'40px'}"
      :header-cell-style="{padding:'0'}"
      :row-style="{height:'44px'}"
      :cell-style="{padding:'0'}"
      :load="dataListLoad"
      lazy
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      style="width: 100%;height:100%">
      <el-table-column
        align="left"
        prop="name"
        min-width="100"
        label="名称" >
        <template slot-scope="scope">
          <span style="text-align: center;">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="80"
        label="关联标志">
        <template slot-scope="scope">
          <a href="javascript:;" @click="modelLink(scope.row)"><i v-if="scope.row.modelId" class="el-icon-thirdguanlian" style="font-size: 1.5rem;padding-top: 2px;"></i></a>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        width="80"
        label="任务状态">
        <template slot-scope="scope">
          <!--  v-if="DateDay - (new Date(scope.row.startTime).getTime()) >0" -->
          <span v-if="scope.row.actualStartTime==null||scope.row.actualStartTime==''|| DateDay - (new Date(scope.row.actualStartTime).getTime()) <0" style="color:#333">未开始</span>
          <span v-else-if="DateDay - (new Date(scope.row.actualEndTime).getTime()) >0" style="color:#00CC00">完成</span>
          <span v-else-if="DateDay - (new Date(scope.row.actualStartTime).getTime()) >0" style="color:#3E8EF7">开始</span>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="130"
        label="距离天数">
        <template slot-scope="scope">
          <span v-if="scope.row.startTime">{{DateTimeDay(scope.row.startTime.replace(/00:00:00/g,""),scope.row.endTime.replace(/00:00:00/g,""))}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="startTime"
        header-align="center"
        align="center"
        width="100"
        label="计划开始">
        <template slot-scope="scope">
          <span v-if="scope.row.startTime">{{scope.row.startTime.replace(/00:00:00/g,"")}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="endTime"
        header-align="center"
        align="center"
        width="100"
        label="计划完成">
        <template slot-scope="scope">
          <span v-if="scope.row.endTime">{{scope.row.endTime.replace(/00:00:00/g,"")}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="estimateStartTime"
        header-align="center"
        align="center"
        width="100"
        label="预计开始">
        <template slot-scope="scope">
          <span v-if="scope.row.estimateStartTime">{{scope.row.estimateStartTime.replace(/00:00:00/g,"")}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="estimateEndTime"
        header-align="center"
        align="center"
        width="100"
        label="预计完成">
        <template slot-scope="scope">
          <span v-if="scope.row.estimateEndTime">{{scope.row.estimateEndTime.replace(/00:00:00/g,"")}}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        prop="actualStartTime"
        header-align="center"
        align="center"
        width="100"
        label="实际开始">
        <template slot-scope="scope">
          <span v-if="scope.row.actualStartTime">{{scope.row.actualStartTime.replace(/00:00:00/g,"")}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="actualEndTime"
        header-align="center"
        align="center"
        width="100"
        label="实际完成">
        <template slot-scope="scope">
          <span v-if="scope.row.actualEndTime">{{scope.row.actualEndTime.replace(/00:00:00/g,"")}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="colour"
        header-align="center"
        align="center"
        width="80"
        label="模拟颜色">
        <template slot-scope="scope">
            <div :style="`width:100%;height: 2.5em;;background:${scope.row.colour}`"></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="milepost"
        header-align="center"
        align="center"
        width="80"
        label="里程碑">
        <template slot-scope="scope">
            <input type="checkbox" name="checkbox" :checked="scope.row.milepost" />
        </template>
      </el-table-column>
      <!-- <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        v-if="progressDome"
        label="操作">
        <template slot-scope="scope">
          <div style="display: flex;flex-direction: row;align-content: center;justify-content: space-between;">
            <el-button v-if="isAuth('bim:progress:save')" type="text" size="small" @click="addChildUpdateHandle(scope.row)">新建分组</el-button>
            <el-button v-if="isAuth('bim:progress:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row)">修改</el-button>
            <el-button v-if="isAuth('bim:progress:delete')" type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column> -->
    </el-table>
    
    <div>
      <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="pageIndex"
          :page-sizes="[10]"
          :page-size="pageSize"
          :total="totalPage"
          layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>


    <div class="h3" v-if="viewerDing">
      <h3>模型展示</h3>
      <el-checkbox v-model="Color_checked" @change="ColorFunc">非选中区透明</el-checkbox>
    </div>
    <div id="viewer" v-if="viewerDing" v-loading="dataListLoading">
    </div>
    <!-- 弹窗, 新增 / 修改 -->
    <div class="pop-up">
        <el-dialog
            :title="modification"
            :visible.sync="dialogVisible"
            width="40%"
            :modal-append-to-body="true"
            :append-to-body="true"
            :before-close="clearClose">
            <!--  -->
            <el-form :model="addData" status-icon ref="addData"  :rules="rules" label-width="100px" @keyup.enter.native="progressSubmit()" class="demo-ruleForm">
                <el-form-item label="分组名称" prop="name">
                    <el-input style="width: 70%;" type="text" v-model="addData.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="计划开始" prop="startTime">
                  <el-date-picker
                  v-model="addData.startTime"
                  type="date"
                  @change="startTimeDate(addData.startTime)"
                  value-format='yyyy-MM-dd 00:00:00'
                  placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="距离天数">
                  <div>{{TimeDaystring}}</div>
                </el-form-item>
                <el-form-item label="计划完成" prop="endTime">
                  <el-date-picker
                  v-model="addData.endTime"
                  type="date"
                  value-format='yyyy-MM-dd 00:00:00'
                  @change="endTimeDate(addData.startTime)"
                  placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <!-- <el-form-item label="预计开始" prop="estimateStartTime">
                  <el-date-picker
                  v-model="addData.estimateStartTime"
                  type="date"
                  @change="estimateStartTimeDate(addData.estimateStartTime)"
                  value-format='yyyy-MM-dd 00:00:00'
                  placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="预计完成" prop="estimateEndTime">
                  <el-date-picker
                  v-model="addData.estimateEndTime"
                  type="date"
                  value-format='yyyy-MM-dd 00:00:00'
                  @change="estimateEndTimeDate(addData.estimateStartTime)"
                  placeholder="选择日期">
                  </el-date-picker>
                </el-form-item> -->
                <el-form-item label="实际开始" prop="actualStartTime">
                  <el-date-picker
                  v-model="addData.actualStartTime"
                  type="date"
                  @change="actualStartTimeDate(addData.actualStartTime)"
                  value-format='yyyy-MM-dd 00:00:00'
                  placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="实际结束" prop="actualEndTime">
                  <el-date-picker
                  v-model="addData.actualEndTime"
                  type="date"
                  value-format='yyyy-MM-dd 00:00:00'
                  @change="actualEndTimeDate(addData.actualStartTime)"
                  placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="模拟颜色" prop="colour">
                  <el-color-picker style="width:100%" v-model="addData.colour"></el-color-picker>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="clearClose">取 消</el-button>
                <el-button type="primary" @click="progressSubmit">确 定</el-button>
            </span>
        </el-dialog>
      </div>
      <!-- CorrelationModel -->
      <div class="pop-up">
        <el-dialog
            title="关联模型"
            :visible.sync="CorrelationModeldialog"
            :modal-append-to-body="true"
            :append-to-body="true"
            width="40%"
            :before-close="CorrelationModelclearClose">
            <el-form :model="CorrelationModelData" status-icon  label-width="100px" class="demo-ruleForm">
                <el-form-item label="专业" prop="modelMajorId">
                  <el-select v-model="CorrelationModelData.modelMajorId" @change="majorAjax(CorrelationModelData.modelMajorId)" placeholder="请选择专业">
                    <el-option
                      v-for="item in majorOptions"
                      :key="item.id"
                      :label="item.majorName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="单体" prop="modelMonomerId">
                  <el-select v-model="CorrelationModelData.modelMonomerId" @change="monomerAjax(CorrelationModelData.modelMajorId,CorrelationModelData.modelMonomerId)" placeholder="请选择单体">
                    <el-option
                      v-for="item in monomerOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="流水段" prop="modelId">
                  <el-select v-model="CorrelationModelData.modelId" placeholder="请选择流水段">
                    <el-option
                      v-for="item in waterPeriodOptions"
                      :key="item.id"
                      :label="item.modelName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="CorrelationModelclearClose">取 消</el-button>
                <el-button type="primary" @click="CorrelationModelSubmit">确 定</el-button>
            </span>
        </el-dialog>
      </div>
  </div>
</template>

<script>
  import { ObjectClear,DateTimeDay } from '@/utils'
  export default {
    inject: ['refresh'],
    data () {
      var validateuserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入分组名称'))
        }else{
          if(value.length<20)
          callback()
          else
          callback(new Error('请输入字符不能大于20个'))
        }
      }
      
      return {
        dataForm: {
          key:'',
        },
        dataList: [],
        dataListLoading: false,
        CorrelationModeldialog:false,
        viewerDing:false,
        dialogVisible:false,
        dialogVisible: false,
        progressDome:true,
        dataListSelections:{},
        addData:{
            name:'',
            startTime:'',
            endTime:'',
            // estimateStartTime:'',
            // estimateEndTime:'',
            actualStartTime:'',
            actualEndTime:'',
            colour:'',
        },
        rules:{
          name: [{ required: true, trigger: 'blur' ,validator: validateuserName},],
          startTime:[{ required: true, message: '请选择计划开始时间', trigger: 'blur' }],
          endTime:[{ required: true, message: '请选择计划结束时间', trigger: 'blur' }],
          // estimateStartTime:[{ required: true, message: '请选择预计开始时间', trigger: 'blur' }],
          // estimateEndTime:[{ required: true, message: '请选择预计完成时间', trigger: 'blur' }],
          colour:[{ required: true, message: '请选择模拟颜色', trigger: 'blur' }],
        },
        CorrelationModelData:{
          modelMajorId:'',
          modelMonomerId:'',
          modelId:'',
        },
        modification:'',
        //任务状态
        //taskOptions:[{value: 1,label: '开始'},{value: 0,label: '未开始'},],
        majorOptions:[],
        monomerOptions:[],
        waterPeriodOptions:[],
        ModelRenderingName:"",
        DateDay:new Date().getTime(),
        ChildID:'',
        Color_checked:'',
        TimeDaystring:'',
        //上传
        actionUrl: '',
        header: {'token': ''},
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
      }
    },
    components: {
    },
    activated () {
      this.getDataList();
      if(/fileManager-progressImport/.test(window.location.href))
      this.progressDome = true;
      else
      this.progressDome = false;
    },
    methods: {
      // 获取数据列表
      getDataList (num) {
        if(num == 1){
            this.pageIndex = 1
        }
        this.dataListSelections = []
        $(".el-table__row").css({"background-color":"","color":""}); 
        this.dataListLoading = true;
        this.$http({
          url: this.$http.adornUrl('/bim/progress/queryTreeLazy'),
          method: 'get',
          params: this.$http.adornParams({
            'query':this.dataForm.key,
            'no':this.pageIndex,
            'pageSize':this.pageSize,
          })
        }).then(({data}) => {
          this.dataListLoading = false;
          if (data && data.code === 0) {
            this.dataList = this.ObjectFilter(data.result.records);
            this.totalPage = data.result.total;
            this.pageIndex = data.result.current;
            this.viewerDing = false;
            RemoveModel(this.ModelRenderingName);
          }
          else
          this.$message.error(data.msg)
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
      //表单下拉校验
      startTimeDate(val){
        if(val)
        this.verifyDate(val,'endTime','startTime');
      },
      endTimeDate(val){
        if(val)
        this.verifyDate('endTime',val);
      },
      // estimateStartTimeDate(val){
      //   if(val)
      //   this.verifyDate(val,'estimateEndTime','estimateStartTime');
      // },
      // estimateEndTimeDate(val){
      //   if(val)
      //   this.verifyDate('estimateEndTime',val);
      // },
      actualStartTimeDate(val){
        if(val)
        this.verifyDate(val,'actualEndTime','actualStartTime',);
      },
      actualEndTimeDate(val){
        if(val)
        this.verifyDate('actualEndTime',val);
      },
      verifyDate(data,val,str){
        let datastr,value,strs;
        if(data.length == 19)
        {
          datastr = val;
          value = data;
          strs = str;
        }else{
          datastr = data;
          value = val;
          strs = data;
        }
        if(!(this.addData[datastr] == null))
        {
          if(strs == datastr)
          {
            this.TimeDaystring = DateTimeDay(value.replace(/00:00:00/g,""),this.addData[datastr].replace(/00:00:00/g,""));
            if(!(new Date(this.addData[datastr]).getTime() - new Date(value).getTime()>0))
            {
              this.TimesAlert(strs);
            } 
          }else{
            this.TimeDaystring = DateTimeDay(data.replace(/00:00:00/g,""),this.addData[val].replace(/00:00:00/g,""));
            if(new Date(data).getTime() - new Date(this.addData[val]).getTime()>0){
              this.TimesAlert(strs);
            }
          }     
        }
      },
      TimesAlert(strs){
        let vm = this;
        this.$alert('请选择正确的时间范围', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              vm.addData[strs] = '';
            }
        });
      },
      // 新增 / 修改
      addOrUpdateHandle (Obj) {
        this.dialogVisible = true;
        if(typeof Obj === 'boolean')
        this.modification = '添加根分组';
        else if(typeof Obj === 'object')
        {
          this.modification = '修改';
          for(let i in this.addData)
          {
            for(let j in Obj)
            {
              if(i ==j)
              {
                this.addData[i] = Obj[j];
              }
            }
          }
          this.TimeDaystring = DateTimeDay(this.addData.startTime.replace(/00:00:00/g,""),this.addData.endTime.replace(/00:00:00/g,""));
          this.addData.status = Number(this.addData.status);
          this.addData.id = Obj.id;
        }
      },
      addChildUpdateHandle(Obj){
        this.modification = '添加子分组';
        this.dialogVisible = true;
        this.ChildID = '';
        this.ChildID = Obj.id;
      },
      //修改添加提交
      progressSubmit () {
        this.$refs['addData'].validate((valid) => {
          if (valid) {
            let vm = this,url = '';
            if(vm.modification == '添加根分组')
            {
              //添加
              //parentId
              this.addData.parentId = 0;
              this.AjaxSFunc(this.addData,'/bim/progress/save','添加成功');
            }else if(vm.modification == '修改'){
              //修改
              this.AjaxSFunc(this.addData,'/bim/progress/update','修改成功');
            }else{
              //新建子分组
              //添加
              this.addData.parentId = this.ChildID;
              this.AjaxSFunc(this.addData,'/bim/progress/save','添加成功');
            }            
          }
        })

      },
      // 选中
      selectionChangeHandle (val) {
        if(val)
        this.dataListSelections = val
      },
      // 删除
      deleteHandle (id) {
        this.$confirm('确定要删除这条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/bim/progress/delete'),
            method: 'post',
            data: this.$http.adornData([id], false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '删除成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.refresh();
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
      //添加、修改关闭
      clearClose(){
        this.dialogVisible = false;
        let vm = this;
        this.$refs['addData'].resetFields();
        this.addData = {name:'',startTime:'',endTime:'',actualStartTime:'',actualEndTime:'',colour:'',};
      },
      //关联模型 //点击显示
      taskCorrelationModel(){
        this.CorrelationModeldialog = true;
        //专业
        this.$http({
          url: this.$http.adornUrl('/bim/modelMajor/listMajor'),
          method: 'POST',
          data: this.$http.adornData({})
        }).then(({data}) => {
          if (data && data.code === 0) {
            data.result.forEach((v,i)=>{
              this.majorOptions.push(v);
            });
          }else
          this.$message.error(data.msg);
        })
      },
      //获取单体
      majorAjax(id){
        this.$http({
          url: this.$http.adornUrl('/bim/modelMonomer/listSuccessModelMonomer'),
          method: 'POST',
          data: this.$http.adornData({
            'modelMajorId':id
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            data.result.forEach((v,i)=>{
              this.monomerOptions.push(v);
            });
          }else
          this.$message.error(data.msg);
        });
      },
      //获取模型方法
      monomerAjax(major,monomer){
        if(major && monomer)
        {
          this.$http({
            url: this.$http.adornUrl('/bim/model/listModel'),
            method: 'POST',
            data: this.$http.adornData({
              'modelMajorId':major,
              'modelMonomerId':monomer,
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              data.result.forEach((v,i)=>{
                this.waterPeriodOptions.push(v);
              });
            }else
            this.$message.error(data.msg);
          });
        }
      },
      //关联模型关闭
      CorrelationModelclearClose(){
        this.majorOptions = [];
        this.monomerOptions = [];
        this.waterPeriodOptions = [];
        this.CorrelationModelData =JSON.parse(ObjectClear(this.CorrelationModelData,true));
        this.CorrelationModeldialog = false;
      },
      //关联提交
      CorrelationModelSubmit(){
          let id = this.dataListSelections.id;
          this.AjaxSFunc(Object.assign({id:id},this.CorrelationModelData),'/bim/progress/update','关联模型成功');
      },
      //取消
      cancelCorrelationModel(){
          if(this.dataListSelections.modelId != null)
          {
            let id = this.dataListSelections.id;
            this.AjaxSFunc(Object.assign({id:id},{
                "modelId": 0,
                "modelMajorId": null,
                "modelMonomerId": null,
            }),'/bim/progress/update','取消关联模型成功');            
          }else{
            this.$alert('该条记录没有关联模型', '提示', {
                confirmButtonText: '确定',
                callback: action => {

                }
            });
            return
          }

      },
      dataListLoad(tree, treeNode, resolve) {
        this.$http({
          url: this.$http.adornUrl('/bim/progress/queryChildNode'),
          method: 'POST',
          params: this.$http.adornParams({
            'id':tree.id,
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            resolve(this.ObjectFilter(data.result))
          }else
          this.$message.error(data.msg);
        });
      },
      //模型链接
      modelLink(obj){
        this.viewerDing = true;
        this.dataListLoading = true;
        //删除模型
        RemoveModel(this.ModelRenderingName);
        let vm = this;
          this.$http({
            url: this.$http.adornUrl('/bim/model/listModel'),
            method: 'POST',
            data: this.$http.adornData({
              'id':obj.modelId,
            })
          }).then(({data}) => {
            this.dataListLoading = false;
            if (data && data.code === 0) {
                //this.modelList = data.data.result
                var modelListarr = data.result;
                if(document.getElementById('viewer').childElementCount>0)
                {
                  document.getElementById('viewer').innerHTML = "";
                }
                //this.datatree = this.modelList
                modelListarr.forEach((item) =>{
                    var moname = item.modelUrl.replace(/\.[^.\/]+$/, "")
                    item.modelUrl = 'http://222.184.237.179:8088/'+moname+'/'+moname + 'List.json'
                })
                let routerNew = modelListarr
                routerNew.forEach(e => {
                    delete e.url
                })
                
                var modelList = []
                var modelNames = []
                for (var i = 0; i < routerNew.length; i++) {
                    modelList.push(routerNew[i].modelUrl)
                    modelNames.push(routerNew[i].modelName)
                }
                EngineInit('viewer', true, '../../../../config/cube.glb')
                var modelLists = modelList
                SetClickMode(2)
                // 加载第一个模型
                //背景颜色
                SetBackGroundColor(176,196,222,0);
                this.ModelRenderingName = modelNames[0];
                AddModel(modelList[0], modelNames[0], true)
                var _this = this
                // 模型加载完成回调函数
                OnLoadModelEnd = function (tag) {

                }

                // 监听到当前的加载进度
                OnLoadModelProcess = function (value) {
                    //  console.log(value);
                    // console.log('进度', value)
                }
                // 构件ID获取回调函数
                OnSelectionChanged = function(id){
                    _this.gid = id 
                    if(_this.kx == 1){
                        // 整体状态恢复 
                        ResetAllActor();
                        SetActorColor(id, 0, 0, 255);
                    }
                }
            }else
            this.$message.error(data.msg);
          });
      },
      //颜色切换
      ColorFunc(id){
        if(id)
        SetBackGroundColor(176,196,222,1);
        else
        SetBackGroundColor(176,196,222,0);
      },
      //统一走ajax
      AjaxSFunc(obj,url,msg){
        let vm = this;
        if(msg != '取消关联模型成功')
        {
          if(this.examine(obj) === false)
          {
              this.$alert('必填项不能为空。', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {

                  }
              });
              return
          }
        }
        this.dataListLoading = true;
        this.$http({
          url: this.$http.adornUrl(url),
          method: 'POST',
          data: this.$http.adornData(obj)
        }).then(({data}) => {
          this.dataListLoading = false;
          if (data && data.code === 0) {
            vm.$message({
              message: msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                vm.dialogVisible = false;
                vm.CorrelationModeldialog = false;
                vm.CorrelationModelclearClose();
                vm.addData = JSON.parse(ObjectClear(vm.addData,true));
                vm.CorrelationModelData = JSON.parse(ObjectClear(vm.CorrelationModelData,true));
                vm.refresh();
                vm.getDataList();
                if(vm.$refs['addData'])
                vm.$refs['addData'].resetFields();
              }
            })
          }
          else
          this.$message.error(data.msg)
        });
      },
      handleSuccess (response, file, fileList) {
        if (response.code === 0) {
          this.$message('上传成功')
        }
      },
      uploadFile (file) {
        debugger
        let uploadSize = file.file.size,vm = this,fromData = new FormData(),fileBle = true;
        let fileName = file.file.name.substr(0,file.file.name.lastIndexOf('.'));
        let type = file.file.name.substr(file.file.name.lastIndexOf('.'),file.file.name.length);
        if(type == ".mpp" )
        {
          this.dataList.every((v,i)=>{
            if(v.name.indexOf(fileName)>=0){
              fileBle = false;
              return false;
            }
          });
          if(!fileBle)
          {
              this.$message({
                 message: '您上传的文件名根数据列表名冲突，请重新选择',
                 type: 'warning'
              });
              return;
          }else{
            this.dataListLoading = true;
            fromData.append('file', file.file)
            this.actionUrl = this.$http.adornUrl('/bim/progress/import')
            this.$http.post(this.actionUrl, fromData,  {headers: {'Content-Type': 'multipart/form-data'}}).then(({data}) => {
              this.dataListLoading = false;
              if (data && data.code === 0) {
                this.$message({
                  message: '文件上传成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    vm.getDataList();
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        }else{
          this.$message({
              message: '您上传的文件类型不正确，正确格式支持mpp文件类型，请重新选择',
              type: 'warning'
          });
        }
      },
      DateTimeDay(start,end){
        return DateTimeDay(start,end);
      },
      //Object1
      ObjectFilter(obj){
        obj.forEach((v,i)=>{
          if(v.hasChildRen == 1)
          {
            v.hasChildRen = true;
          }else{
            v.hasChildRen = false;
          }
          for(let o in v)
          {
            if(o == "children")
            delete obj[i][o];
            if(o == "hasChildRen")
            {
              var value = obj[i][o];
              delete obj[i][o];
              obj[i]['hasChildren'] = value;
            }
          }
        });

        return obj;
      },
      //Object
      examine(obj){
          for(let i in obj)
          {
            if(!(obj[i]==null))
            {
              if(obj[i].toString() == "")
              {
                  if(i == 'actualStartTime' || i == 'actualEndTime'){}
                  else
                  return false;
              }
            }else{
              if(i == 'actualStartTime' || i == 'actualEndTime'){}
              else
              return false;
            }
          }
      },
    updated() {
        $(".el-table__body-wrapper .el-table__row ").each(function() {
              $(this).click(function(){
                    $(".el-table__row").css({"background-color":"","color":""}); 
                    $(this).css({"background-color":"#fdf3ea","color":"#f19944"}); 
              })
        }); 
    }
      
    }
  }
</script>

<style>

.progressImport .el-color-picker--medium .el-color-picker__trigger {
    height: 4rem !important;
    width: 4rem !important;
}
.progressImport .el-color-picker__icon {
    display: none;
}
/* .progressImport .el-checkbox{
  width:100px !important;
} */
/* .progressImport .el-table--scrollable-x .el-table__body-wrapper {
    height: 24rem;
    overflow-y: scroll;
} */

.progressImport #viewer{
    width: 100%;
    height: 34rem;
    position: relative;
}
.progressImport .h3{
    height: 2rem;
    border-bottom: 1px solid #333;
}
.progressImport .el-checkbox {
    background: #fff;
    z-index: 1;
    line-height: 1rem;
    margin-top: -3px;
}
.progressImport .el-color-picker__empty::before{
  content: '请选择';
  display: block;
  width: 3rem;
}

</style>
