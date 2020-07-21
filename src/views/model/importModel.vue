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
        <el-form-item label="名称" prop="name">
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
        <el-form-item label="标签" prop="tag">
          <el-col :span="8">
            <el-input v-model="modelForm.tag" placeholder="请输入标签" />
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
            :before-upload="handleBeforeUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>

        <el-form-item label="上传模型">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handlePictureRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
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
import axios from "axios";
export default {
  data() {
    return {
      input: "",
      options: [
        {
          value: "1",
          label: "类型1"
        },
        {
          value: "2",
          label: "类型2"
        },
        {
          value: "3",
          label: "类型3"
        }
      ],
      imageList: [],
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        // {
        //   name: "food2.jpeg",
        //   url:
        //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        // }
      ],
      modelForm: {
        modelName: "",
        modelTypeId: "",
        modelIsSuccessful: "",
        modelUrl:'',
        modelPhotoUrl:'',
        version: "",
        tag: "",
        description: ""
      },
      dialogImageUrl: "",
      dialogVisible: false,
      labelPosition: "left",
      disabled: false,
      limitNum: 1,
      rules: {
        modelName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        version: [{ required: true, message: "请选择版本", trigger: "change" }],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }

      //  editForm: {
      //         pics: [], // 上传的图片临时路径（对象）
      //       }, previewPath: '', // 预览路径
      //       previewVisible: false //预览弹框
    };
  },
  methods: {
    // 模型
    handleRemove(file, fileList) {
      console.log(this.imageList);
      console.log("picutre");
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 图片
    handleBeforeUpload(file) {
      console.log("before");
      this.modelForm.modelPhotoUrl=file.url
      if (
        !(
          file.type === "image/png" ||
          file.type === "image/gif" ||
          file.type === "image/jpg" ||
          file.type === "image/jpeg"
        )
      ) {
        this.$notify.warning({
          title: "警告",
          message:
            "请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片"
        });
      }
      let size = file.size / 1024 / 1024 / 2;
      if (size > 2) {
        this.$notify.warning({
          title: "警告",
          message: "图片大小必须小于2M"
        });
      }
      
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {},
    // 文件列表移除文件时的钩子
    handlePictureRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadFile() {
      this.$refs.upload.submit();
    },
    //交互

    submitForm(modelForm) {
      var url = "/test";
      this.modelForm.modelUrl=this.fileList[0].url
      axios
        .post(url, {
          modelForm: this.modelForm
        })
        .then(response => {
          self.$message({
            message: "申请已发送",
            type: "success"
          });
        })
        .catch(e => self.$message.error(e.response.data));
      if (valid) {
        alert("submit!");
      } else {
        console.log("error submit!!");
        return false;
      }
    },
    resetForm(modelForm) {
      this.$refs[modelForm].resetFields();
    }
  }
};
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
