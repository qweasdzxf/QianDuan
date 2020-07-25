/* eslint-disable */

<template>
<!-- 步骤条 -->
  <div class="detail-container1">
    <el-row :gutter="20">
      <el-col :span="12" :offset="2">
        <el-steps :space="200" :active="1" finish-status="success">
          <el-step title="训练选型" />
          <el-step title="配置规格" />
          <el-step title="完成" />
        </el-steps>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <!-- 创建训练表单 -->
    <el-col :span="24">
      <el-card shadow="hover">
        <el-form ref="form" :model="form" label-width="100px">
          <!-- 训练作业名称输入框、版本号输入框 -->
          <el-form-item label="训练作业名称">
            <el-col :span="10">
              <el-input
                v-model="form.trainTask.trainTaskName"
                placeholder="请输入训练作业名称"
                style="width: 300px"
              />
            </el-col>
            <el-col :span="2" :offset="1">版本号</el-col>
            <el-col :span="10">
              <el-autocomplete
                v-model="form.trainTask.trainTaskVersion"
                style="width: 300px"
                :fetch-suggestions="querySearch"
                placeholder="请输入版本号"
              />
            </el-col>
          </el-form-item>
          <!-- 算法选择器、数据集选择器 -->
          <el-form-item label="算法">
            <el-col :span="10">
                <el-select v-model="form.trainTaskConf.trainTaskAlgorithmId"
                  @change="getParams(form.trainTaskConf.trainTaskAlgorithmId)"
                  placeholder="请选择算法"
                  style="width: 300px">
                  <el-option
                    v-for="al in algorithmList"
                    :key="al.algorithmId"
                    :label="al.algorithmName"
                    :value="al.algorithmId">
                  </el-option>
                </el-select>
            </el-col>
            <el-col :span="2" :offset="1">数据集</el-col>
            <el-col :span="10">
               <el-select v-model ="datasetId"
                  placeholder="请选择数据集"
                  style="width: 300px">
                  <el-option
                    v-for="ds in datasetList"
                    :key="ds.datasetId"
                    :label="ds.datasetName"
                    :value="ds.datasetId">
                  </el-option>
                </el-select>
            </el-col>
          </el-form-item>
          <!-- 硬件规格选择器\AI引擎选择器 -->
          <el-form-item label="作业硬件规格">
            <el-col :span="10">
            <el-select
            v-model="form.trainTaskConf.train_task_specification"
            style="width: 300px"
            placeholder="请选择"
            @focus="getInstanceType">
              <el-option
                  v-for="instanceType in instanceTypeList"
                  :key="instanceType.instanceTypeId"
                  :label="instanceType.instanceTypeDescription"
                  :value="instanceType.instanceTypeId.toString()">
                </el-option>
            </el-select>
            </el-col>
            <el-col :span="2" :offset="1">AI引擎</el-col>
            <el-col :span="10">
              <el-cascader
                v-model="form.trainTaskConf.engineValue"
                style="width: 300px"
                placeholder="请选择"
                :options="engineList"
                :props="{ expandTrigger: 'hover' }"
                @focus="getEngines"
                @change="setEngineId"
              />
            </el-col>
            <!-- 模型输出路径 -->
          </el-form-item>
          <!-- 模型輸出路徑輸入框 -->
          <el-form-item label="模型输出路径">
            <el-input
            v-model="form.trainTaskConf.trainTaskModelOutPath"
            placeholder="请输入模型输出的相对路径"
            style="width: 720px">
            </el-input>
          </el-form-item>
          <el-form-item>
            <!-- 超参赋值列表 -->
            <el-table
            :data=" hyperParameterList"
            style="width: 100%">
              <!-- 第一列参数名称 -->
              <el-table-column
                label="参数名称"
                width="180">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>名称: {{ scope.row.hyperParaName }}</p>
                    <p>描述: {{ scope.row.hyperParaDescription }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.hyperParaName }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <!-- 第二列 参数类型 -->
              <el-table-column
                label="类型"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.hyperParaType }}</span>
                </template>
              </el-table-column>
              <!-- 第三列 参数范围 -->
              <el-table-column
                label="范围"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.hyperParaRange }}</span>
                </template>
              </el-table-column>
              <!-- 第四列 超参赋值 -->
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-input
                  placeholder="请输入超参"
                  v-model="scope.row.hyperParaDefaultValue">
                  </el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <!-- 训练作业描述输入框 -->
          <el-form-item label="训练作业描述">
            <el-input
              type="textarea"
              :rows="3"
              style="width: 720px"
              placeholder="请输入内容"
              v-model="form.trainTaskConf.trainTaskDescription">
            </el-input>
          </el-form-item>
          <!-- 提交表单按钮\取消按钮 -->
          <el-form-item>
            <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="onSubmit">立即创建</el-button>
            <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="onStartTrain">立即訓練</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky/index'
import MdInput from '@/components/MDinput/index'
import axios from 'axios'
import global from '@/global'
export default {
  name: 'Create',
  components: { MdInput, Sticky },
  mounted(){
    this.getAlgotithms()
    this.getEngines()
    this.getInstanceType()
    // this.fromAlgorithm = this.$route.param.algorithm
    // this.form.trainTaskName=this.fromAlgorithm.algorithm_name
    // this.form.trainTask.trainTaskVersion=this.fromAlgorithm.algorithm_version
    // this.form.trainTaskConf.trainTaskVersion=this.fromAlgorithm.algorithm_version
    // this.form.trainTaskConf.trainTaskAlgorithmId//要另外传一下
    // this.trainTaskConf.trainTaskAiEngine=this.fromAlgorithm.algorithm_engine_id
    // this.trainTaskConf.trainTaskDescription=this.fromAlgorithm.algorithm_description
  },  
  data() {
    return {
      step:1,
      fullscreenLoading: false,
      algorithmList: [],
      datasetId:'',
      datasetList:[
        {'datasetId':1,'datasetName':'MINIST 1'},
        {'datasetId':2,'datasetName':'MINIST 2'},
        {'datasetId':3,'datasetName':'MINIST 3'},
      ],
      hyperParameterList: [],
      //global:this.global,
      paramsStringList:'',
      tmpParamValue:'',
      instanceType: [],
      engines: [],
      engineList: [],
      engineValue: [],
      form: {
        trainTask: {
          trainTaskCreateTime: "2020-07-21T02:37:59.733Z",
          trainTaskId: 0,
          trainTaskName: "BP_10_3_4_MINIST",
          trainTaskRunningTime: "string",
          trainTaskStatus: 0,
          trainTaskUpdateTime: "2020-07-21T02:37:59.734Z",
          trainTaskUserId: 1,
          trainTaskVersion: "1.0"
        },
        trainTaskConf: {
          trainTaskAiEngine: "string",
          trainTaskAlgorithmId: "0",
          trainTaskConfId: 0,
          trainTaskDatasetId: 0,
          trainTaskDescription: "三层全连接神经网络_MINIST_V1.0",
          trainTaskFinishTime: "2020-07-21T02:37:59.734Z",
          trainTaskId: 0,
          trainTaskLogOutPath: "string",
          trainTaskModelOutPath: "./model/",
          trainTaskName: "BP_10_3_4_MINIST",
          trainTaskParams: "--epochs 10",
          trainTaskRunningTime: "string",
          trainTaskSpecification: "7",
          trainTaskStartTime: "2020-07-21T02:37:59.734Z",
          trainTaskStatus: 0,
          trainTaskVersion: "1.0"
        }
      },
        
      //推荐版本号
      autoVersions:[
        { "value": "1.0"},
        { "value": "2.0"},
        { "value": "3.0"},
        { "value": "4.0"},
        ],
      instanceTypeList:[],
    }
  },
  methods: {
    // 推荐版本号：正确
    querySearch(queryString, cb) {
        var autoVersions = this.autoVersions
        var results = queryString ? autoVersions.filter(this.createFilter(queryString)) : autoVersions;
        // 调用 callback 返回建议列表的数据
        cb(results)
    },
    //：正确
    createFilter(queryString) {
      return (version) => {
        return (version.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    //获取从我的算法页面传来的数据
     getParams() {
      console.log("getparams");

      this.id = self.$route.query.id;
      console.log("self.id：" + self.id);
    },

    //提交表单：正确
    onSubmit() {
      this.hyperParameterList.forEach(param => {
        this.paramsStringList+=("--"+param.hyperParaName+" "+param.hyperParaDefaultValue+" ")
      })
      this.form.trainTaskConf.trainTaskVersion=this.form.trainTask.trainTaskVersion
        console.log("trying post form")
        this.fullscreenLoading=true
        console.log(this.form)
      // axios({
      //   method: 'post',
      //   url: '/apis/train/frontstage/trainTask',
      //   // xhrFields: { withCredentials: true },
      //   // headers: {
      //   //   'Content-Type': 'multipart/form-data'
      //   // },
      //   // withCredentials: true,
      //   data: this.form
      // }).then(
      //   (response) => {
      //     console.log(response)
      //     this.fullscreenLoading = false
      //     if (response.data.code == '00000') {
      //       alert('训练创建成功')
      //     } else {
      //       alert('训练创建失败')
      //     }
      //   }
      // )
      axios.post('/train/frontstage/trainTask/',this.form)
        .then(response=>{
          console.log('成功得到创建返回值')
          console.log(response)
          this.fullscreenLoading = false
          if (response.data.code == '00000') {
            alert('训练创建成功')
          } else {
            alert('训练创建失败')
          }
        })
    },

    onStartTrain(){
        console.log("trying start a task")
        axios.get('/train/frontstage/trainTask/start/'+(global.BASE_ID+global.DETA_ID))
        .then(Response=>{
          console.log(Response)
          console.log('trying get the information of new task')
          axios.get('/train/frontstage/trainTask/'+(global.BASE_ID+global.DETA_ID))
          .then(res=>{
            console.log(res)
            var newTrainTask={
              'trainTaskId':global.BASE_ID + global.DETA_ID,
              'trainTaskName':res.data.extend.trainTaskAndTrainTaskConfig.trainTask.trainTaskName
            }
            global.RUNNING_TASK_LIST.push(newTrainTask)
            console.log(global.RUNNING_TASK_LIST)
            global.DETA_ID++
            console.log('new global.DETA:'+global.DETA_ID)
          })
          this.$router.push({path: "/train/trainboard"})
        })
    },

    //获取算法列表:正确
    getAlgotithms(){
      console.log('trying get algotithms')
      axios.get('/algorithm/backstage/algorithms')
        .then(
          response=>{
            console.log("algotithms")
            console.log(response)
            this.algorithmList=response.data.extend.pageInfo.list
            console.log(this.algorithmList)
          }
        )
    },

    //判斷是否具有超參
    hasParams(){
      axios.get('/algorithm/frontstage/algorithm/basic/'+this.form.trainTaskAlgorithmId)
      .then(response=>{

      })
    },
    //获取参数列表
    getParams(value) {
      console.log(value)
      console.log('trying get params')
      axios.get('/algorithm/frontstage/algorithm/hyperPara/' + value)
        .then(
          response => {
            console.log(response)
            if(response.data.code=="00000"){
              this.hyperParameterList = response.data.extend.hyperParameters
              console.log(this.hyperParameterList)
            }
          }
        )
        .catch(function(error) {
          console.log(error)
        })
    },

    //获取算法引擎:正确
    getEngines() {
      console.log('trying get engines!')
      axios.get('/algorithm/frontstage/engines')
        .then(
          response => {
            console.log(response.data['extend'])
            var engines = (response.data['extend']).engines
            console.log(engines)
            var engineList = []
            for (var i = 0; i < engines.length; i++) {
              var engine = engines[i]
              var flag = true
              // 先根据引擎名查找
              engineList.forEach(
                (value) => {
                  if (engine.algorithmEngineName == value.value) {
                    console.log('find!')
                    // 找到后查看children节点
                    var innerFlag = true
                    value.children.forEach(
                      (childValue) => {
                        if (childValue.value == engine.algorithmEngineVersion) {
                          innerFlag = false
                          childValue.children.push(
                            {
                              value: engine.pythonVersionName,
                              label: engine.pythonVersionName
                            }
                          )
                        }
                      }
                    )
                    if (innerFlag) {
                      value.children.push(
                        {
                          value: engine.algorithmEngineVersion,
                          label: engine.algorithmEngineName + engine.algorithmEngineVersion,
                          children: [
                            {
                              value: engine.pythonVersionName,
                              label: engine.pythonVersionName
                            }
                          ]
                        }
                      )
                    }
                    flag = false
                  }
                }
              )
              if (flag) {
                engineList.push(
                  {
                    value: engine.algorithmEngineName,
                    label: engine.algorithmEngineName,
                    children: [
                      {
                        value: engine.algorithmEngineVersion,
                        label: engine.algorithmEngineName + engine.algorithmEngineVersion,
                        children: [
                          {
                            value: engine.pythonVersionName,
                            label: engine.pythonVersionName
                          }
                        ]
                      }
                    ]
                  }
                )
              }
            }
            console.log(engineList)
            this.engineList = engineList
            this.engines = engines
          }
        )
    },

    // 设置引擎ID
    setEngineId() {
      console.log(this.engineValue)
      if (this.engineValue.length != 3) {
        return
      }
      this.engines.forEach(
        engine => {
          if (engine.algorithmEngineName == this.engineValue[0] &&
          engine.algorithmEngineVersion == this.engineValue[1] &&
          engine.pythonVersionName == this.engineValue[2]) {
            this.form.algorithm_engine_id = engine.algorithmEngineId
          }
        }
      )
      console.log(this.form.algorithm_engine_id)
    },

    //获取配置类型:正确
    getInstanceType() {
      console.log('trying get instance type!')
      axios.get('/algorithm/frontstage/instanceType')
        .then(
          response => {
            console.log(response)
            this.instanceTypeList = response.data.extend.instanceType
            console.log(this.instanceTypeList)
          }
        )
    }
  }
}
</script>

<style scoped>
  .detail-container1 {
     padding: 40px 50px 20px;
  }
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
</style>
