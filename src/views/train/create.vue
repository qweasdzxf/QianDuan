<template>

  <div class="modelarea">
    <sticky :class-name="'sub-navbar'">
      <el-button @click="showGuide">显示帮助</el-button>
      <el-button type="success" style="margin-left:15px" @click="submitForm"> {{ '创建训练' }}</el-button>
    </sticky>
    <br>
    <h2>创建训练</h2>
    <br>
    <el-form>
      <el-form-item>
        <md-input v-model="form.train_task_user_id" name="name">用户ID</md-input>
      </el-form-item>

      <el-form-item>
        <md-input v-model="form.train_task_name" name="name">训练作业名称</md-input>
      </el-form-item>

      <el-form-item>
        <md-input v-model="form.train_task_name" name="name">训练作业名称</md-input>
      </el-form-item>

      <el-form-item>
        <md-input v-model="form.train_task_version" name="name">训练版本号</md-input>
      </el-form-item>
      <br>
      <el-form-item>
        <md-input v-model="form.train_task_algorithm_id" name="name">作业对应的算法ID</md-input>
      </el-form-item>
      <br>
      <el-form-item>
        <md-input v-model="form.train_task_dataset_id" name="name">作业对应的数据集ID</md-input>
      </el-form-item>

      <br>
      <br>
      <el-form-item>
      <el-label>训练作业描述</el-label>
      <br>
      <br>
      <el-input
        v-model="form.train_task_description"
        type="textarea"
        :rows="2"
        placeholder="训练作业描述"
      />
        </el-form-item>
      <br>
      <br>
      <br>
      <el-label>训练作业时间</el-label>
      <br>
      <br>

      <el-form-item>
      <el-time-select
        v-model="form.train_task_start_time"
        placeholder="训练作业起始时间"
        :picker-options="{
          start: '00:00',
          step: '00:30',
          end: '24:00'
        }"
      />
      <el-time-select
        v-model="form.train_task_finish_time"
        placeholder="训练作业结束时间"
        :picker-options="{
          start: '00:00',
          step: '00:30',
          end: '24:00',
          minTime:form.train_task_start_time,
        }"
      />
        </el-form-item>
      <br>
      <br>
      <br>
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
      <br>
      <br>
      <br>
      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>参数列表</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="getParams">获取算法参数</el-button>
            </div>
            <div v-for="(item,index) in Params" :key="index" >
              {{item}}
            </div>
          </el-card>
          </el-col>
          <el-col :span="12">

    <el-label>选择作业算法超参列表</el-label>
      <el-input
        v-model="form.train_task_params"
        placeholder="请输入参数"
        :rows="6"
        > </el-input>
          </el-col>

        </el-row> </el-form-item>


<br>
<br>
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
      <br>
      <br>
      <el-form-item label="日志输出路径">
      <el-input v-model="form.train_task_log_out_path" > </el-input>
      </el-form-item>
      <br>
      <br>
      <el-form-item label="模型输出路径">
        <el-input v-model="form.train_task_model_out_path" > </el-input>
      </el-form-item>
      <br>
      <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>

    </el-form>
  </div>
</template>

<script>

import Sticky from '@/components/Sticky/index'
import MdInput from '@/components/MDinput/index'
import axios from "axios";

export default {
  name: 'Create',
  components: { MdInput, Sticky },
  data() {
    return {
      fullscreenLoading:false,
      algorithmCustomizeHyperPara: {

      },
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
        train_task_model_out_path: ''
      }}
  },
  methods: {
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
              alert('算法上传成功！')
            } else {
              alert('上传失败，请重试！')
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
        axios.get('http://localhost:10001/algorithm/'+this.data.form.train_task_algorithm_id)
      .then(
        response =>{
          this.algorithmCustomizeHyperPara =response.data.extend.algorithm.algorithmCustomizeHyperPara
          console.log(response)
          console.log(this.algorithmCustomizeHyperPara)
        }
      )
          .catch(function (error) {
            console.log(error);
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
    },

  }

}
</script>

<style scoped>
   .modelarea {

   }
       .text {
         font-size: 14px;
       }

   .item {
     margin-bottom: 18px;
   }
</style>
