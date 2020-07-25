<template>
  <div>
    <el-container>
      <el-main>
        <el-col :span="18" :offset="3">
          <el-card shadow="hover" style="height:600px">  
            <div slot="header" class="clearfix">
              <el-row>
              <span><h2>模型发布（{{getModelType()}}）</h2></span>
               <el-button style=" padding: 3px 0" type="text" @click="handlTurnPage()">切换模型</el-button>
              </el-row>
            </div>
            <el-container>
              <el-main>
                <el-container>
                  <!-- 进度条 -->
                  <el-header>
                    <el-col :span="18" :offset="3">
                      <el-steps :active="active" finish-status="success">
                        <el-step title="上传图片" />
                        <el-step title="模型推理" />
                        <el-step title="查看结果" />
                      </el-steps>
                    </el-col>
                  </el-header>
                  <el-main>
                    <div>
                      <el-col :span="10"> 
                        <el-row>
                          <el-col :span="22" :offset="4">
                            <span style="align-content: center"> <h2>测试图片</h2></span>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="24" :offset="4">
                            <el-upload
                              action="#"
                              list-type="picture-card"
                              :multiple="false"
                              :auto-upload="false"
                              :on-change="addFile"
                              :file-list="fileList"
                              @change="shhowFileList">
                              <i slot="default" class="el-icon-plus" />
                              <div slot="file" slot-scope="{file}">
                                <img
                                  class="el-upload-list__item-thumbnail"
                                  :src="file.url"
                                  alt=""
                                >
                                <span class="el-upload-list__item-actions">
                                  <span
                                    class="el-upload-list__item-preview"
                                    @click="handlePictureCardPreview(file)"
                                  >
                                    <i class="el-icon-zoom-in" />
                                  </span>
                                  <span
                                    v-if="!disabled"
                                    class="el-upload-list__item-delete"
                                    @click="handleDownload(file)"
                                  >
                                    <i class="el-icon-download" />
                                  </span>
                                  <span
                                    v-if="!disabled"
                                    class="el-upload-list__item-delete"
                                    @click="handleRemove(file)"
                                  >
                                    <i class="el-icon-delete" />
                                  </span>
                                </span>
                              </div>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                              <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                          </el-col>
                        </el-row>
                      </el-col>
                      <el-col :span='3' :offset="0" style="line-height:250px">
                        <el-button type="success" 
                        @click="submitPic" 
                        round icon="el-icon-search" 
                        style="vertical-align: middle">模型推理</el-button>
                      </el-col> 
                      <el-col :span="7" :offset="3" >
                        <el-row>
                            <span style="align-content: center"> <h2>预测结果</h2></span>
                        </el-row>
                        <div v-if="isClassify()">
                          <el-card class="box-card" style="height:150px">
                              <div style="vertical-align: middle">
                                {{result}}
                              </div>
                          </el-card>
                        </div>
                        <div >
                          <div v-if="!isClassify()" class="demo-image__lazy">
                            <el-image v-for="url in imageUrls" :key="url" :src="url" lazy />
                          </div>
                        </div>
                      </el-col>
                    </div>
                  </el-main>
                </el-container>
              </el-main>
            </el-container>
          </el-card>
        </el-col>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import ScrollPane from '../../layout/components/TagsView/ScrollPane'
import axios from 'axios'
export default {
  name: 'List',
  components: { ScrollPane },
  data() {
    return {
      active: 1,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      checkResult: false,
      formData: null,
      fileList: [],
      imageUrls: [],
      model:{
        modelName: "string",
        modelTypeId: 1,
        modelIsSuccessful: 1,
        modelDescription: "this is description"
      },
      result:""
    }
  },
  created() {
    this.formData = new FormData()
  },
  methods: {
    handlTurnPage(){
      this.$router.push({path: "/model/manage", query: {traintaskId: 74}})
    },
    isClassify(){
      if(this.model.modelTypeId==0){
        return true
      }else if(this.model.modelTypeId==1){
        return false
      }
    },
    getModelType(){
      if(this.model.modelTypeId==0){
        return "图像分类任务"
      }else if(this.model.modelTypeId==1){
        return "目标检测任务"
      }
    },
    shhowFileList() {
      console.log(this.fileList)
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
      console.log(file)
    },
    handleDownload(file) {
      console.log(file)
    },
    addFile(file, fileList) {
      this.formData.append('file', file.raw)
      this.fileList=fileList
      console.log("trying add file,file name is:")
      console.log(this.fileList[0].name)
    },
    submitPic() {
      this.active=2
      console.log(this.fileList[0].name)
      if(this.isClassify()==true){
        console.log('is classify')
        axios.get('/model/classify/'+this.fileList[0].name)
        .then(
          response => {
            console.log(response)
            this.result="类别："+response.data.extend.class
              +" 置信度："+response.data.extend.confidence
            console.log(this.result)  
            if (response.data.code == '00000') {
              alert('数据预测成功！')
               this.active=3
            } else {
              alert('上传失败，请重试！')
            }
            this.checkResult = true
          }
        )
      }else{
        console.log('is detection')
      axios.get('/model/detection'+this.fileList[0].name)
        .then(
          response => {
            console.log(response)
            this.imageUrls.push(response.data.extend.url)
            console.log(this.imageUrls)
            if (response.data.code == '00000') {
              alert('数据预测成功！')
               this.active=3
            } else {
              alert('上传失败，请重试！')
            }
            this.checkResult = true
          }
        )
      }

    }
  }

}
</script>

<style scoped>

</style>
