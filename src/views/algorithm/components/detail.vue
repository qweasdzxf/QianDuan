
<template>
  <el-form ref="form" :model="form" >
    <sticky :class-name="'sub-navbar'">
      <el-button @click="showGuide">显示帮助</el-button>
      <el-button type="success" style="margin-left:15px" @click="submitForm"> {{ isEdit?'编辑算法':'新增算法' }}</el-button>
    </sticky>
    <div class="detail-container">
      <warning />
      <el-row>
        <el-row :gutter="20">
          <el-col :span="16"><div class="grid-content bg-purple">
            <input id="filesInput" class="file" type="file" name="myfile" onchange="fileonchange()" multiple webkitdirectory mozdirectory>
          </div></el-col>
        </el-row>
        <el-col :span="24">
          <el-row>
            <el-col :span="12" />
            <el-col :span="12" />
          </el-row>
        </el-col>
      </el-row>
      <br>
      <el-form-item>
        <md-input v-model="form.algorithm_name" name="name">算法名称</md-input>
      </el-form-item>

      <el-form-item>
        <md-input v-model="form.algorithm_version" name="name">版本号</md-input>
      </el-form-item>

      <el-form-item label="算法描述">
        <el-input v-model="form.algorithm_description" type="textarea" />
      </el-form-item>
      <el-divider />
      <div>
        <span class="demonstration">选择算法类别</span>
      </div>
      <br>
      <el-select v-model="form.algorithm_instance_type_id" placeholder="请选择" @focus="getAlgorithmType">
        <el-option
          v-for="item in algorithmType"
          :key="item.algorithmTypeId"
          :label="item.algorithmTypeName"
          :value="item.algorithmTypeId"
        >
        </el-option>
      </el-select>
      <div class="block">
        <br>
        <el-row>
          <span class="demonstration">选择AI引擎</span>
        </el-row>
        <br>
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
      <br>
      <div>
        <span class="demonstration">选择推荐运行的规格</span>
      </div>
      <br>
      <el-select v-model="form.algorithm_instance_type_id" placeholder="请选择" @focus="getInstanceType">
        <el-option
          v-for="item in instanceType"
          :key="item.instanceTypeId"
          :label="item.instanceTypeDescription"
          :value="item.instanceTypeId"
        >
        </el-option>
      </el-select>
      <br>
      <el-divider />

      <el-form-item label="启动文件相对路径">
        <el-input v-model="form.algorithm_starter_URL" />
      </el-form-item>

      <el-form-item label="输入路径映射">
        <el-input v-model="form.algorithm_input_reflect" />
      </el-form-item>

      <el-form-item label="输出路径映射">
        <el-input v-model="form.algorithm_output_reflect" />
      </el-form-item>

      <el-form-item label="是否支持自定义超参">
        <el-switch v-model="form.algorithm_customize_hyper_para" @click="isCustomize" />
      </el-form-item>

      <el-form-item label="超参数列表">

        <el-input
          v-model="form.hyperParameter"
          type="textarea"
          aria-placeholder="hyper_para_name: &quot;hyper parameters&quot;,
          hyper_para_description: &quot;this is description&quot;,
          hyper_para_type: 0,
          hyper_para_allow_adjust: true,
          hyper_para_range: &quot;0-100&quot;,
          hyper_para_default_value: 10,
          hyper_para_is_needed: false"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" v-loading.fullscreen.lock="fullscreenLoading">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>

import Sticky from '@/components/Sticky/index'
import Warning from '@/views/algorithm/components/warning'
import MdInput from '@/components/MDinput/index'
import axios from 'axios'

export default {
  name: 'Detail',
  components: { MdInput, Warning, Sticky },
  props: {
    isEdit: Boolean
  },

  data() {
    return {
      fullscreenLoading: false,
      engineValue: null,
      instanceType: [],
      algorithmType: [],
      engines: [],
      engineList: [],
      form: {
        algorithm_name: '',
        algorithm_version: '',
        algorithm_type_id: 0,
        algorithm_engine_id: null,
        algorithm_description: '',
        algorithm_instance_type_id: null,
        algorithm_input_reflect: '',
        algorithm_output_reflect: '',
        algorithm_starter_URL: '',
        algorithm_customize_hyper_para: true,
        hyperParameter: [
          {
            hyper_para_name: 'hyper parameters',
            hyper_para_description: 'this is description',
            hyper_para_type: 0,
            hyper_para_allow_adjust: true,
            hyper_para_range: '0-100',
            hyper_para_default_value: 10,
            hyper_para_is_needed: false
          }
        ]
      }
    }
  },
  methods: {
    showGuide() {

    },

    submitForm() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    onSubmit(event) {
      this.loading = true
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
          }
        )
      this.loading = false
    },
    isCustomize() {
      this.form.algorithm_customize_hyper_para = !this.form.algorithm_customize_hyper_para
    },
    fileonchange() {
      console.log('on change!')
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
    getAlgorithmType() {
      axios.get('http://localhost:10001/algorithm/type')
        .then(
          response => {
            this.algorithmType = response.data.extend.algorithmType
            console.log(response)
            console.log(this.algorithmType)
          }
        )
    },
    setEngineId() {
      if (value.length != 3) {
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
    }
  }
}
</script>
<style lang="scss" scoped>
body {
  margin: 0;
}
 .detail-container{
   padding: 40px 50px 20px;
 }
 .file {
   position: relative;
   display: inline-block;
   background: #D0EEFF;
   border: 1px solid #99D3F5;
   border-radius: 4px;
   padding: 4px 12px;
   overflow: hidden;
   color: #1E88C7;
   text-decoration: none;
   text-indent: 0;
   line-height: 20px;
 }
 .file input {
   position: absolute;
   font-size: 100px;
   right: 0;
   top: 0;
   opacity: 0;
 }
 .file:hover {
   background: #AADFFD;
   border-color: #78C3F3;
   color: #004974;
   text-decoration: none;
 }
</style>
