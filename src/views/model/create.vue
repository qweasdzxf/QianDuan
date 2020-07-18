<template>
  <el-form :model="form" ref="form">
  <sticky :class-name="'sub-navbar'" >
    <el-button @click="showGuide">显示帮助</el-button>
    <el-button type="success" style="margin-left:15px" @click="submitForm"> {{ '上传模组' }}</el-button>
  </sticky>
  <div class="detail-container2">
    <h2>上传模组</h2>


      <el-form-item>
        <md-input v-model="form.model_name">模组名称</md-input>
      </el-form-item>

      <el-form-item>
      <md-input v-model="form.model_owner_id">模组拥有者</md-input>
      </el-form-item>

      <el-form-item>
        <md-input v-model="form.model_type_id">模型类型ID </md-input>
      </el-form-item>

      <el-form-item>
        <md-input v-model="form.status">模型状态</md-input>
      </el-form-item>

    <el-form-item>
      <md-input v-model="form.model_photo_url">模型图片URL</md-input>
    </el-form-item>

    <el-form-item>
      <md-input v-model="form.model_photo_url">模型图片URL</md-input>
    </el-form-item>

    <el-form-item>
      <md-input v-model="form.model_url">模型URL</md-input>
    </el-form-item>

    <el-form-item>
      <md-input v-model="form.model_url">模型URL</md-input>
    </el-form-item>

    <el-form-item>
      <md-input v-model="form.model_is_successful">模型是否成功使用过</md-input>
    </el-form-item>

    <br>
    <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>

  </div>
    </el-form>


</template>

<script>
  import Sticky from "@/components/Sticky/index";
  import MdInput from "@/components/MDinput/index";
  import axios from "axios";
  export default {

    name: 'create',
    components: {MdInput, Sticky},
    data(){
      return{
        fullscreenLoading:false,
      form:{
        model_owner_id : '',
        is_model_uploader : true,
        model_name : '',
        model_type_id :'',
        model_status :'',
        model_photo_url :'',
        model_url:'',
        model_api:'',
        model_is_successful:''
      },
        methods:{
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
                    alert('模型上传成功！')
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
        }
    }}
  }

</script>


<style scoped>
  .detail-container2{
    padding: 30px 50px 30px;
  }
</style>
