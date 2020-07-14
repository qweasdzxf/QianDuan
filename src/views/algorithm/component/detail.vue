/* eslint-disable */
<template>
  <el-form ref="form" :model="form">
<sticky :class-name="'sub-navbar'">
  <el-button @click="showGuide">显示帮助</el-button>
  <el-button v-loading="loading" @click="submitForm" type="success" style="margin-left:15px"> {{isEdit?'编辑算法':'新增算法' }}</el-button>
</sticky>
    <div class="detail-container">
        <warning></warning>
        <el-row>
          <el-row :gutter="20">
            <el-col :span="16"><div class="grid-content bg-purple">

            <el-input type="file" id="fileInput1" name="myfile" onchange="fileonchange()"   multiple webkitdirectory mozdirectory />
    </div></el-col>
          </el-row>

          <el-col :span="24">


            <el-row>
              <el-col :span="12"></el-col>
              <el-col :span="12"></el-col>
            </el-row>
          </el-col>
        </el-row>
      <br>
      <el-form-item >
        <md-input v-model="form.algorithm_name" name="name">算法名称</md-input>
      </el-form-item>

      <el-form-item >
        <md-input v-model="form.algorithm_version" name="name">版本号</md-input>
      </el-form-item>

      <el-form-item labe="算法描述">
        <el-input type="textarea" v-model="form.algorithm_description"></el-input>
      </el-form-item>

      <el-divider></el-divider>

      <el-autocomplete
        v-model="form.algorithm_engine_id"
        :fetch-suggestions="querySearchAsync"
        placeholder="请选择引擎"
        @select="handleSelect"
      ></el-autocomplete>

      <el-form-item label="启动文件相对路径">
        <el-input v-model="form.algorithm_starter_URL"></el-input>
      </el-form-item>

      <el-form-item label='实例类型'>
        <el-input v-model="form.algorithm_instance_type_id"></el-input>
      </el-form-item>

      <el-form-item label='输入映射'>
        <el-input v-model="form.algorithm_input_reflect"></el-input>
      </el-form-item>

      <el-form-item label='输出映射'>
        <el-input v-model="form.algorithm_output_reflect"></el-input>
      </el-form-item>

      <el-form-item label="python版本">
        <el-select v-model="form.pythonversion" placeholder="请选择python版本">
          <el-option label="3.8" value="1"></el-option>
          <el-option label="3.7" value="2"></el-option>
          <el-option label="3.6" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否支持自定义超参">
        <el-switch @click="isCustomize" v-model="form.algorithm_customize_hyper_para" ></el-switch>
      </el-form-item>

      <el-form-item label="超参数列表">

        <el-input type="textarea"  v-model="form.hyperparameters"
        aria-placeholder= 'hyper_para_name: "hyper parameters",
        hyper_para_description: "this is description",
        hyper_para_type: 0,
        hyper_para_allow_adjust: true,
        hyper_para_range: "0-100",
        hyper_para_default_value: 10,
        hyper_para_is_needed: false'>

        </el-input>
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
  import Warning from '@/views/algorithm/component/warning'
  import MdInput from '@/components/MDinput/index'
  import axios from 'axios'

  export default {
    name: 'create',
    components: { MdInput,  Warning, Sticky },
    props:{
      isEdit:Boolean
    },
    methods:{
      showGuide(){

      },

      submitForm(){
          this.loading=true
        setTimeout(()=>{
            this.loading=false
        },1000)
      },
      onSubmit(event)  {
        let formData = new FormData();
        for(var key in this.data){
          formData.append(key,this.data
            [key]);
        }

        axios({
          method:"post",
          url:"xxxxxxx",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials:true,
          data:formData
        }).then((res)=>{
          console.log(res);
        });
      }

      },

      isCustomize(){
        algorithm_customize_hyper_para=!algorithm_customize_hyper_para;
      },

    data(){

      return{
       loading:false,
        form: {
          algorithm_name: '',
          algorithm_version: '',
          algorithm_type_id: 0,
          algorithm_engine_id: 0,
          algorithm_description: '',
          algorithm_instance_type_id: 0,
          algorithm_input_reflect: '',
          algorithm_output_reflect: '',
          algorithm_starter_URL: '/example/bootfile',
          algorithm_customize_hyper_para:true,
          algorithm_python_version_id: 0,

          hyperparameters: [
            {
              hyper_para_name: "hyper parameters",
              hyper_para_description: "this is description",
              hyper_para_type: 0,
              hyper_para_allow_adjust: true,
              hyper_para_range: "0-100",
              hyper_para_default_value: 10,
              hyper_para_is_needed: false
            }
        ]
        }
      }
    },
  }


</script>

<style lang="scss" scoped>
 .detail-container{
   padding: 40px 50px 20px;
 }
</style>
