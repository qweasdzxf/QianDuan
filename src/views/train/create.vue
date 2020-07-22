
/* eslint-disable */

<template>
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
<<<<<<< HEAD
    <el-divider></el-divider>
    <el-col :span="24">
=======
    <el-divider />
    <el-col :span="24" :offset="0">
>>>>>>> 9817e25945ff5552d82f15d6cf68b56808e6920f
      <el-card shadow="hover">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="训练作业名称">
            <el-col :span="10">
<<<<<<< HEAD
            <el-input 
            v-model="form.trainTask.trainTaskName"  
            placeholder="请输入训练作业名称"
            style="width: 300px"
            ></el-input>
=======
              <el-input
                v-model="form.train_task_name"
                placeholder="请输入训练作业名称"
                style="width: 300px"
              />
>>>>>>> 9817e25945ff5552d82f15d6cf68b56808e6920f
            </el-col>
            <el-col :span="2" :offset="1">版本号</el-col>
            <el-col :span="10">
              <el-autocomplete
                v-model="form.trainTask.trainTaskVersion"
                style="width: 300px"
                :fetch-suggestions="querySearch"
                placeholder="请输入版本号"
<<<<<<< HEAD
              ></el-autocomplete>
            </el-col>
          </el-form-item>
          <!-- 要改成下拉列表，显示算法列表 -->
          <el-form-item label="算法">
            <el-col :span="10">
<<<<<<< HEAD
            <el-input v-model="form.trainTaskConf.trainTaskAlgorithmId"  placeholder="请输入算法ID" style="width: 300px"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">数据集</el-col>
            <el-col :span="10">
               <el-input placeholder="算法默认数据集" style="width: 300px"></el-input>
=======
              <el-input v-model="form.train_task_algorithm_id" placeholder="请输入算法ID" style="width: 300px" />
            </el-col>
            <el-col :span="2" :offset="1">数据集</el-col>
            <el-col :span="10">
              <el-input v-model="form.train_task_dataset_id" placeholder="请输入数据集ID" style="width: 300px" />
>>>>>>> 9817e25945ff5552d82f15d6cf68b56808e6920f
            </el-col>
          </el-form-item>
          <el-form-item label="训练作业描述">
            <el-input
              v-model="textarea"
              type="textarea"
              :rows="3"
              style="width: 720px"
              placeholder="请输入内容"
<<<<<<< HEAD
              v-model="form.trainTaskConf.trainTaskDescription">
            </el-input>
          </el-form-item>

        <el-form-item label="作业硬件规格"> 
          <el-col :span="10">
          <el-select 
          v-model="form.trainTaskConf.train_task_specification" 
          style="width: 300px"
          placeholder="请选择"
           @focus="getInstanceType">
            <el-option
                v-for="instanceType in instanceTypes"
                :key="instanceType.instanceTypeId"
                :label="instanceType.instanceTypeDescription"
                :value="instanceType.instanceTypeId">
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
        </el-form-item>

        <el-form-item>
        <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
        </el-form-item>
=======
            />
          </el-form-item>

          <el-form-item label="作业硬件规格">
            <el-col :span="10">
              <el-select
                v-model="form.train_task_specification"
                style="width: 300px"
                placeholder="请选择"
                @focus="getInstanceType"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="2" :offset="1">AI引擎</el-col>
            <el-col :span="10">
              <el-cascader
                v-model="engineValue"
                style="width: 300px"
                placeholder="请选择"
                :options="engineList"
                :props="{ expandTrigger: 'hover' }"
                @focus="getEngines"
                @change="setEngineId"
              />
            </el-col>
          </el-form-item>

          <el-form-item>

            <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
>>>>>>> 9817e25945ff5552d82f15d6cf68b56808e6920f
        </el-form>
      </el-card>
    </el-col>
  </div>
</template>

<script>

import Sticky from '@/components/Sticky/index'
import MdInput from '@/components/MDinput/index'
import axios from 'axios'

export default {
  name: 'Create',
  components: { MdInput, Sticky },
  data() {
    return {

      fullscreenLoading: false,
      algorithmCustomizeHyperPara: {},//
      algorithmList: [],//
      hyperParameter: [],//
      instanceType: [],
      engines: [],
      engineList: [],
      engineValue: null,
      form: {
        trainTask: {
          trainTaskCreateTime: "2020-07-21T02:37:59.733Z",//
          trainTaskId: 0,
          trainTaskName: "string",
          trainTaskRunningTime: "string",//
          trainTaskStatus: 0,
          trainTaskUpdateTime: "2020-07-21T02:37:59.734Z",//
          trainTaskUserId: 0,
          trainTaskVersion: "0"
        },
<<<<<<< HEAD
        trainTaskConf: {
          trainTaskAiEngine: "string",
          trainTaskAlgorithmId: 0,
          trainTaskConfId: 0,
          trainTaskDatasetId: 0,//
          trainTaskDescription: "string",
          trainTaskFinishTime: "2020-07-21T02:37:59.734Z",
          trainTaskId: 0,
          trainTaskLogOutPath: "string",
          trainTaskModelOutPath: "string",
          trainTaskName: "string",
          trainTaskParams: "string",
          trainTaskRunningTime: "string",
          trainTaskSpecification: "string",
          trainTaskStartTime: "2020-07-21T02:37:59.734Z",
          trainTaskStatus: 0,
          trainTaskVersion: "0"
        }
      },
      //推荐版本号
      autoVersions:[
        { "value": "1.0"},
        { "value": "2.0"},
        { "value": "3.0"},
        { "value": "4.0"},
        ],
      instanceTypes:[]

    }   
=======
        train_task_specification: '',
        train_task_Ai_engine: '',
        train_task_log_out_path: '',
        train_task_model_out_path: ''
      },
      // 推荐版本号
      autoVersions: [
        { 'value': 'v1.0.0' },
        { 'value': 'v1.1.0' },
        { 'value': 'v2.0.0' },
        { 'value': 'v2.1.0' }
      ]
    }
>>>>>>> 9817e25945ff5552d82f15d6cf68b56808e6920f
  },
  methods: {
    // 推荐版本号
    querySearch(queryString, cb) {
<<<<<<< HEAD
        var autoVersions = this.autoVersions;
        var results = queryString ? autoVersions.filter(this.createFilter(queryString)) : autoVersions;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
    
=======
      var autoVersions = this.autoVersions
      var results = queryString ? autoVersions.filter(this.createFilter(queryString)) : autoVersions
      // 调用 callback 返回建议列表的数据
      cb(results)
    },

>>>>>>> 9817e25945ff5552d82f15d6cf68b56808e6920f
    createFilter(queryString) {
      return (version) => {
        return (version.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
<<<<<<< HEAD

    //提交表单
=======
    // 提交表单
>>>>>>> 9817e25945ff5552d82f15d6cf68b56808e6920f
    onSubmit() {
      console.log("trying post form")
      this.fullscreenLoading=true
      console.log(JSON.stringify(this.form))
      axios.post('http://47.113.97.26:20003/frontstage/trainTask',JSON.stringify(this.form))
        .then(response=>{
          console.log(response)
          this.fullscreenLoading=false
          if(response.data.code=="00000"){
            alert("训练创建成功")
          }
          else{
            alert("训练创建失败")
          }
        })
    },

    //获取算法列表
    getAlgotithms(){
      console.log('trying get algotithms')
      axios.get('http://210.42.123.4:10001/algorithms'+'?pagenum=1')
        .then(
          response=>{
            this.algorithmList=response.data.extend.pageInfo.algorithms
            console.log(this.algorithmList) 
          }
        )
    },
<<<<<<< HEAD

    //获取参数列表
=======
    // 获取参数列表
>>>>>>> 9817e25945ff5552d82f15d6cf68b56808e6920f
    getParams() {
      console.log('trying get params')
      axios.get('http://210.42.123.4:10001/algorithm/' + this.data.form.trainTaskAlgorithmId)
        .then(
          response => {
            this.algorithmCustomizeHyperPara = response.data.extend.algorithm.algorithmCustomizeHyperPara
            console.log(response)
            console.log(this.algorithmCustomizeHyperPara)
          }
        )
        .catch(function(error) {
          console.log(error)
        })
    },
<<<<<<< HEAD

    //获取算法引擎
=======
    // 获取算法引擎
>>>>>>> 9817e25945ff5552d82f15d6cf68b56808e6920f
    getEngines() {
      console.log('trying get engines!')
      axios.get('http://210.42.123.4:10001/algorithm/engines')
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
<<<<<<< HEAD

    //设置引擎ID
=======
    // 设置引擎ID
>>>>>>> 9817e25945ff5552d82f15d6cf68b56808e6920f
    setEngineId() {
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

    //获取配置类型
    getInstanceType() {
      console.log('trying get instance type!')
      axios.get('http://210.42.123.4:10001/instanceType')
        .then(
          response => {
            console.log(response)
            this.instanceType = response.data.extend.instanceType
            console.log(this.instanceType)
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
