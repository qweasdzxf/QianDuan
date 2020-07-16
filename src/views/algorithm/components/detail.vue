
<template>
  <el-form ref="form" :model="form">
    <sticky :class-name="'sub-navbar'">
      <el-button @click="showGuide">显示帮助</el-button>
      <el-button v-loading="loading" type="success" style="margin-left:15px" @click="submitForm"> {{ isEdit?'编辑算法':'新增算法' }}</el-button>
    </sticky>
    <div class="detail-container">
      <warning />
      <el-row>
        <el-row :gutter="20">
          <el-col :span="16"><div class="grid-content bg-purple">
            <input id="filesInput" type="file" name="myfile" onchange="fileonchange()" multiple webkitdirectory mozdirectory>
          </div></el-col>
        </el-row>

        <el-col :span="24">
          ß
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

      <el-form-item labe="算法描述">
        <el-input v-model="form.algorithm_description" type="textarea" />
      </el-form-item>

      <el-divider />

      <el-autocomplete
        v-model="form.algorithm_engine_id"
        :fetch-suggestions="querySearchAsync"
        placeholder="请选择引擎"
        @select="handleSelect"
      />

      <el-form-item label="启动文件相对路径">
        <el-input v-model="form.algorithm_starter_URL" />
      </el-form-item>

      <el-form-item label="实例类型">
        <el-input v-model="form.algorithm_instance_type_id" />
      </el-form-item>

      <el-form-item label="输入映射">
        <el-input v-model="form.algorithm_input_reflect" />
      </el-form-item>

      <el-form-item label="输出映射">
        <el-input v-model="form.algorithm_output_reflect" />
      </el-form-item>

      <el-form-item label="python版本">
        <el-select v-model="form.algorithm_python_version_id" placeholder="请选择python版本">
          <el-option label="3.8" value="1" />
          <el-option label="3.7" value="2" />
          <el-option label="3.6" value="3" />
        </el-select>
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
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
      loading: false,
      form: {
        algorithm_name: 'front-end test',
        algorithm_version: '1.0.1',
        algorithm_type_id: 0,
        algorithm_engine_id: 0,
        algorithm_description: 'this is description',
        algorithm_instance_type_id: 0,
        algorithm_input_reflect: '/example',
        algorithm_output_reflect: '/example',
        algorithm_starter_URL: '/example/bootfile',
        algorithm_customize_hyper_para: true,
        algorithm_python_version_id: 0,
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
    },
    isCustomize() {
      // eslint-disable-next-line no-undef
      // algorithm_customize_hyper_para=!algorithm_customize_hyper_para;
    },
    fileonchange() {

    }
  }
}
</script>
<style lang="scss" scoped>
 .detail-container{
   padding: 40px 50px 20px;
 }
</style>
