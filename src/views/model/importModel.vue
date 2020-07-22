<template>
  <div class="page">
    <el-card class="box-card modelCard">
      <el-form
        ref="modelForm"
        :label-position="left"
        :model="modelForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="名称" prop="modelName">
          <el-col :span="8">
            <el-input v-model="modelForm.modelName" placeholder="请输入名称" />
          </el-col>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-col :span="8">
            <el-select v-model="modelForm.modelTypeId" clearable placeholder="请选择类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-col :span="16">
            <el-input
              v-model="modelForm.description"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 6}"
              placeholder="请输入内容"
            />
          </el-col>
        </el-form-item>

        <el-form-item label="成功使用过">
          <el-radio v-model="modelForm.modelIsSuccessful" label="1">是</el-radio>
          <el-radio v-model="modelForm.modelIsSuccessful" label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="上传图片">
          <el-upload
            ref="upload"
            action="#"
            accept="image/png, image/gif, image/jpg, image/jpeg"
            list-type="picture-card"
            :limit="limitNum"
            :auto-upload="false"
            :on-exceed="handleExceed"
            :on-success="handleSuccess"
            :before-upload="handleBeforeUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
             :on-change="addImage"
             :file-list="imageList"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </el-form-item>

        <el-form-item label="上传模型">
          <el-upload
            ref="upload"
            action="#"
            :auto-upload="false"
            :on-preview="handlePreview"
            :on-remove="handlePictureRemove"
            :before-remove="beforeRemove"
            :on-change="addFile"
            multiple
            :limit="5"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="12" offset="10">
              <el-button type="primary" @click="submitForm('modelForm')">提交</el-button>
              <el-button @click="resetForm('modelForm')">重置</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      input: '',
      options: [
        {
          value: '1',
          label: '类型1'
        },
        {
          value: '2',
          label: '类型2'
        },
        {
          value: '3',
          label: '类型3'
        }
      ],
      imageList: [],
      fileList: [],
      //上传文件测试部分
      formData:null,
      //
      modelForm: {
        modelName: '',
        modelTypeId: '',
        modelIsSuccessful: '',
        description: '',
      },
      dialogImageUrl: '',
      dialogVisible: false,
      labelPosition: 'left',
      disabled: false,
      limitNum: 3,
      rules: {
        modelName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
      }
    }
  },
  created() {
    this.formData = new FormData()
  },
  methods: {
    // 模型
    handleRemove(file, fileList) {
      // console.log(this.imageList);
      console.log('picutre')
      console.log(file, fileList)
      console.log(file.url)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    addFile(file, fileList) {
      this.formData.append('modelFile', file.raw)
      console.log(file.file)
      console.log(fileList)
    },
    addImage(file, imageList) {
      this.formData.append('modelImage ', file.raw)
      console.log(file.file)
      console.log(imageList)
    },
    // handleSuccess(file){
    //   console.log("success");
    // },
    // 图片
    handleBeforeUpload(file) {
      console.log('befor upload')
      // this.modelForm.modelPhotoUrl=file.url
      if (
        !(
          file.type === 'image/png' ||
          file.type === 'image/gif' ||
          file.type === 'image/jpg' ||
          file.type === 'image/jpeg'
        )
      ) {
        this.$notify.warning({
          title: '警告',
          message:
            '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
        })
      }
      const size = file.size / 1024 / 1024 / 2
      if (size > 2) {
        this.$notify.warning({
          title: '警告',
          message: '图片大小必须小于2M'
        })
      }
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {},
    // 文件列表移除文件时的钩子
    handlePictureRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    uploadFile() {
      this.$refs.upload.submit()
    },
    //上传文件测试
  
    // 交互
    submitForm(modelForm) {
      var url = '/test'
      this.formData.append('data',JSON.stringify(this.modelForm))
      axios
        .post(url, this.formData)
        .then(response => {
          self.$message({
            message: '申请已发送',
            type: 'success'
          })
        })
        .catch(e => self.$message.error(e.response.data))
    },
    resetForm(modelForm) {
      this.$refs[modelForm].resetFields()
    }
  }
}
</script>

<style scoped>
.page {
  background-color: aliceblue;
}
.modelCard {
  margin: 20px;
  /* height: 500px; */
}
</style>
