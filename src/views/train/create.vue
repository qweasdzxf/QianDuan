
/* eslint-disable */

<template>
  

  <div class="detail-container1">
    <el-row :gutter="20">
      <el-col :span="12" :offset="2">
        <el-steps :space="200" :active="1" finish-status="success">
          <el-step title="训练选型"></el-step>
          <el-step title="配置规格"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-col :span="24" :offset="1">
      <el-card shadow="hover">
        <el-form :model="form" ref="form" label-width="100px">
          <el-form-item label="训练作业名称">
            <el-col :span="10">
            <el-input v-model="form.train_task_name"  placeholder="请输入训练作业名称"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">版本号</el-col>
            <el-col :span="10">
              <el-autocomplete
                v-model="train_task_version"
                :fetch-suggestions="querySearch"
                placeholder="请输入版本号"
                @select="handleSelect"
              ></el-autocomplete>
            </el-col>
          </el-form-item>
          <!-- 要改成下拉列表，显示算法列表 -->
          <el-form-item label="算法">
            <el-col :span="10">
            <el-input v-model="form.train_task_algorithm_id"  placeholder="请输入算法ID"></el-input>
            </el-col>
          </el-form-item>
          <!-- 改成下拉列表，显示数据集列表 -->
          <el-form-item label="数据集">
            <el-col :span="10">
            <el-input v-model="form.train_task_dataset_id"  placeholder="请输入数据集ID"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="训练作业描述">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </el-form-item>

        <el-form-item>
          <div>
            <span class="demonstration">选择作业硬件规格</span>
          </div>
          <el-select v-model="form.train_task_specification" placeholder="请选择" @focus="getInstanceType">
            <el-option
              v-for="item in instanceType"
              :key="item.instanceTypeId"
              :label="item.instanceTypeDescription"
              :value="item.instanceTypeId"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>参数列表</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="getParams">获取算法参数</el-button>
                </div>
                <div v-for="(item,index) in Params" :key="index">
                  {{ item }}
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">

              <el-label>选择作业算法超参列表</el-label>
              <el-input
                v-model="form.train_task_params"
                placeholder="请输入参数"
                :rows="6"
              />
            </el-col>

          </el-row> </el-form-item>

        <el-form-item>
          <div class="block">
            <el-row>
              <span class="demonstration">选择AI引擎</span>
            </el-row>
            <el-cascader
              v-model="engineValue"
              style="width: 350px"
              placeholder="请选择"
              :options="engineList"
              :props="{ expandTrigger: 'hover' }"
              @focus="getEngines"
              @change="setEngineId"
            />
          </div>
        </el-form-item>
        <el-form-item label="日志输出路径">
          <el-input v-model="form.train_task_log_out_path" />
        </el-form-item>
        <el-form-item label="模型输出路径">
          <el-input v-model="form.train_task_model_out_path" />
        </el-form-item>
        <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
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
      algorithmCustomizeHyperPara: {},
      algorithm: [],
      algorithmList: [],
      hyperParameter: [],
      instanceType: [],
      engines: [],
      engineList: [],
      engineValue: null,
      form: {
        train_task_user_id: '',
        train_task_name: '',
        train_task_status: '',
        train_task_version: '',
        train_task_create_time: '',
        train_task_update_time: '',
        train_task_running_time: '',
        train_task_algorithm_id: '',
        train_task_dataset_id: '',
        train_task_description: '',
        train_task_start_time: '',
        train_task_finish_time: '',
        train_task_params: {

        },
        train_task_specification: '',
        train_task_Ai_engine: '',
        train_task_log_out_path: '',
        train_task_model_out_path: '',
      },
      //推荐版本号
      autoVersions:[
        { "value": "v1.0.0"},
        { "value": "v1.1.0"},
        { "value": "v2.0.0"},
        { "value": "v2.1.0"},
        ]
    }   
  },
  methods: {
    querySearch(queryString, cb) {
        var autoVersions = this.autoVersions;
        var results = queryString ? autoVersions.filter(this.createFilter(queryString)) : autoVersions;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
    createFilter(queryString) {
      return (version) => {
        return (version.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      }
    },
    onSubmit() {
      console.log('ready to submit!')
      this.fullscreenLoading = true
      var data = new FormData()
      var files = document.getElementById('filesInput').files
      for (var i = 0; i < files.length; i++) {
        data.append('myfile', files[i])
      }
      // data.append('myfile', document.getElementById('filesInput').files[0])
      data.append('data', JSON.stringify(this.form))
      console.log(files)
      console.log(JSON.stringify(this.form))

      // axios({
      //   method: 'post',
      //   url: 'http://localhost:10002/backstage/algorithm',
      //   xhrFields: { withCredentials: true },
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   withCredentials: true,
      //   data: data
      // }).then(
      //   (response) => {
      //     console.log(response)
      //   }
      // )
      axios.post('http://localhost:10002/backstage/algorithm', data)
        .then(
          response => {
            console.log(response)
            this.fullscreenLoading = false
            if (response.data.code == '00000') {
              alert('训练创建成功！')
            } else {
              alert('创建失败，请重试！')
            }
            location.reload()
          }
        )
      // setTimeout(() => {
      //   this.fullscreenLoading = false
      // }, 2000)
    },

    getParams() {
      console.log('trying get params')
      axios.get('http://localhost:10001/algorithm/' + this.data.form.train_task_algorithm_id)
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

    getEngines() {
      console.log('trying get engines!')
      axios.get('http://localhost:10001/algorithm/engines')
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
    setEngineId() {
      if (this.engineValue.length != 3) {
        return
      }
      this.engines.forEach(
        engine => {
          if (engine.algorithmEngineName == this.engineValue[0] && engine.algorithmEngineVersion == this.engineValue[1] && engine.pythonVersionName == this.engineValue[2]) {
            this.form.algorithm_engine_id = engine.algorithmEngineId
          }
        }
      )
      console.log(this.form.algorithm_engine_id)
    },

    getInstanceType() {
      console.log('trying get instance type!')
      axios.get('http://localhost:10001/instanceType')
        .then(
          response => {
            this.instanceType = response.data.extend.instanceType
            console.log(response)
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
