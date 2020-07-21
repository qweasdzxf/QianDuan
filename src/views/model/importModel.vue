<template>
  <div class="page">
    <el-card class="box-card modelCard">
      <el-form
        :label-position="left"
        :model="modelForm"
        :rules="rules"
        ref="modelForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="名称" prop="name">
          <el-col :span="8">
            <el-input v-model="modelForm.name" placeholder="请输入名称"></el-input>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="版本" prop="version">
          <el-col :span="8">
            <el-input v-model="modelForm.name" placeholder="请输入版本"></el-input>
          </el-col>
        </el-form-item>-->
        <el-form-item label="类型" prop="type">
          <el-col :span="8">
            <el-select v-model="value" clearable placeholder="请选择类型">
              <el-option
                v-for="item in modelForm.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="标签" prop="tag">
          <el-col :span="8">
            <el-input v-model="modelForm.name" placeholder="请输入标签"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-col :span="16">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 6}"
              placeholder="请输入内容"
              v-model="modelForm.description"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload action="#" list-type="picture-card" :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview2(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload2(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove2(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
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
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="modelForm.fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>

        <!-- <el-form-item label="元模型来源" prop="description">
          <el-col :span="20">
            <el-radio-group v-model="labelPosition" size="small">
              <el-radio-button label="train">从训练中选择</el-radio-button>
              <el-radio-button label="template">从模板中选择</el-radio-button>
              <el-radio-button label="container">从容器镜像中选择</el-radio-button>
              <el-radio-button label="obs">从对象存储服务(OBS)中选择</el-radio-button>
            </el-radio-group>
          </el-col>

        </el-form-item>

        <el-form-item label="部署类型" prop="deployType">
             <el-checkbox v-model="checked">在线服务</el-checkbox>
              <el-checkbox v-model="checked">批量服务</el-checkbox>
               <el-checkbox v-model="checked">边缘服务</el-checkbox>
        </el-form-item>-->

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
export default {
  data() {
    return {
      input: "",
      modelForm: {
        name: "",
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
        version: "",
        tag: "",
        description: "",
        deployType: "",
        imageList: [],
        fileList: [
          {
            name: "food.jpeg",
            url:
              "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
          },
          {
            name: "food2.jpeg",
            url:
              "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
          }
        ]
      },
      value: "",
      dialogImageUrl: "",
      dialogVisible: false,
      labelPosition: "left",
      disabled: false,
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        version: [{ required: true, message: "请选择版本", trigger: "change" }],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    //模型
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //图片
    handlePictureCardPreview2(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove2(file) {   
      const tmp_path = file.response
      //* 2. 从 pics 数组中，找到这个图片对应的索引值
      const i = this.modelForm.imageList.findIndex(item => item.pic == tmp_path)
      //* 3. 调用数组的splice方法，把图片信息对象，从pics数组中移除
      this.modelForm.imageList.splice(i, 1);
      console.log(file);
    },
    handleDownload(file) {
      console.log(file);
    },
    //
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
