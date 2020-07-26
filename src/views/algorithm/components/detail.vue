/* eslint-disable */
<template>
  <div>
    <el-container>
      <el-header>
        <br />
        <el-col :span="22" :offset="1">
          <el-card shadow="hover">
            <sticky>
              <el-button @click="showGuide">显示帮助</el-button>
              <el-button
                type="success"
                style="margin-left:15px"
                @click="submitForm"
              >{{ isEdit?'编辑算法':'新增算法' }}</el-button>
            </sticky>
          </el-card>
        </el-col>
      </el-header>
      <el-main>
        <br />
        <el-col :span="22" :offset="1">
          <el-card shadow="hover">
            <el-form ref="form" :model="form">
              <div class="detail-container">
                <!-- <el-form-item label="上传模型">
                  <el-upload
                    ref="upload"
                    action="#"
                    :auto-upload="false"
                    :on-preview="handlePreview"
                    :on-remove="handlePictureRemove"
                    :before-remove="beforeRemove"
                    :on-change="addFile"
                    multiple
                    :limit="100"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                  >
                    <el-button size="small" type="primary" style="margin-left:30px">点击上传</el-button>
                  </el-upload>
                </el-form-item> -->
                <!-- <warning /> -->
                <el-row>
                  <el-row :gutter="20">
                    <el-col :span="16">
                      <div class="grid-content bg-purple">
                        <input
                          id="filesInput"
                          class="file"
                          type="file"
                          name="myfile"
                          onchange="fileonchange()"
                          multiple
                          webkitdirectory
                          mozdirectory
                        />
                      </div>
                    </el-col>
                  </el-row>
                  <el-col :span="24">
                    <el-row>
                      <el-col :span="12" />
                      <el-col :span="12" />
                    </el-row>
                  </el-col>
                </el-row>
                <br />
                <el-form-item>
                  <el-row>
                    <el-col :span="2">算法名称</el-col>
                    <el-col :span="8">
                      <el-input v-model="form.algorithm_name" name="name" placeholder="请输入算法名称">算法名称</el-input>
                    </el-col>
                    <el-col :span="2" :offset="2">版本号</el-col>
                    <el-col :span="8">
                      <el-input
                        v-model="form.algorithm_version"
                        name="name"
                        placeholder="请输入版本号"
                      >版本号</el-input>
                    </el-col>
                  </el-row>
                </el-form-item>

                <el-form-item>
                  <el-row>
                    <el-col :span="2">算法描述</el-col>

                    <el-col :span="20">
                      <el-input
                        v-model="form.algorithm_description"
                        placeholder="请输入算法描述"
                        type="textarea"
                      />
                    </el-col>
                  </el-row>
                </el-form-item>

                <el-form-item>
                  <el-row>
                    <el-col :span="2">算法类别</el-col>
                    <el-col :span="8">
                      <el-select
                        v-model="form.algorithm_type_id"
                        placeholder="请选择算法类别"
                        class="selectBox"
                        @focus="getAlgorithmType"
                      >
                        <el-option
                          v-for="item in algorithmType"
                          :key="item.algorithmTypeId"
                          :label="item.algorithmTypeName"
                          :value="item.algorithmTypeId"
                        />
                      </el-select>
                    </el-col>
                    <el-col :span="2" :offset="2">AI引擎</el-col>
                    <el-col :span="8">
                      <el-cascader
                        v-model="engineValue"
                        class="selectBox"
                        style="width: 350px"
                        placeholder="请选择AI引擎"
                        :options="engineList"
                        :props="{ expandTrigger: 'hover' }"
                        @focus="getEngines"
                        @change="setEngineId"
                      />
                    </el-col>
                  </el-row>
                </el-form-item>

                <el-form-item>
                  <el-row>
                    <el-col :span="2">运行规格</el-col>
                    <el-col :span="8">
                      <el-select
                        v-model="form.algorithm_instance_type_id"
                        placeholder="请选择运行规格"
                        class="selectBox"
                        @focus="getInstanceType"
                      >
                        <el-option
                          v-for="item in instanceType"
                          :key="item.instanceTypeId"
                          :label="item.instanceTypeDescription"
                          :value="item.instanceTypeId"
                        />
                      </el-select>
                    </el-col>
                    <el-col :span="3" :offset="1">启动文件相对路径</el-col>
                    <el-col :span="8">
                      <el-input v-model="form.algorithm_starter_URL" placeholder="启动文件相对路径" />
                    </el-col>
                  </el-row>
                </el-form-item>

                <el-form-item>
                  <el-row>
                    <el-col :span="2">输入路径映射</el-col>
                    <el-col :span="8">
                      <el-input v-model="form.algorithm_input_reflect" placeholder="请输入输入路径映射" />
                    </el-col>
                    <el-col :span="2" :offset="2">输出路径映射</el-col>
                    <el-col :span="8">
                      <el-input v-model="form.algorithm_output_reflect" placeholder="请输入输出路径映射" />
                    </el-col>
                  </el-row>
                </el-form-item>

                <el-form-item label="是否支持自定义超参">
                  <el-switch v-model="form.algorithm_customize_hyper_para" @click="isCustomize" />
                </el-form-item>

                <el-form-item label="超参数列表">
                  <el-row>
                    <el-button type="primary" icon="el-icon-plus" circle @click="addHyperPara" />
                  </el-row>
                  <el-table
                    :data="hyperParameter"
                    class="tb-edit"
                    style="width: 100%"
                    highlight-current-row
                    @row-click="handleCurrentChange"
                  >
                    <el-table-column label="超参名称" width="180">
                      <template scope="scope">
                        <el-input
                          v-model="scope.row.hyper_para_name"
                          size="small"
                          placeholder="请输入内容"
                          @change="handleEdit(scope.$index, scope.row)"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column label="超参描述" width="180">
                      <template scope="scope">
                        <el-input
                          v-model="scope.row.hyper_para_description"
                          size="small"
                          placeholder="请输入内容"
                          @change="handleEdit(scope.$index, scope.row)"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="超参类型">
                      <template scope="scope">
                        <el-select v-model="scope.row.hyper_para_type" placeholder="请选择">
                          <el-option
                            v-for="item in dataTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </template>
                    </el-table-column>

                    <el-table-column prop="address" label="超参范围">
                      <template scope="scope">
                        <el-input
                          v-model="scope.row.hyper_para_range"
                          size="small"
                          placeholder="请输入内容"
                          @change="handleEdit(scope.$index, scope.row)"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="超参默认值">
                      <template scope="scope">
                        <el-input
                          v-model="scope.row.hyper_para_default_value"
                          size="small"
                          placeholder="请输入内容"
                          @change="handleEdit(scope.$index, scope.row)"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="是否必需">
                      <template scope="scope">
                        <el-switch
                          v-model="scope.row.hyper_para_is_needed"
                          active-text="是"
                          inactive-text="否"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="是否可调整">
                      <template scope="scope">
                        <el-switch
                          v-model="scope.row.hyper_para_allow_adjust"
                          active-text="是"
                          inactive-text="否"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column label="操作">
                      <template scope="scope">
                        <el-button
                          size="small"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <br />
                  <el-button
                    v-loading.fullscreen.lock="fullscreenLoading"
                    type="primary"
                    @click="formSubmit"
                  >立即创建</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </div>
            </el-form>
          </el-card>
        </el-col>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Sticky from "@/components/Sticky/index";
import Warning from "@/views/algorithm/components/warning";
import MdInput from "@/components/MDinput/index";
import axios from "axios";

export default {
  name: "Detail",
  components: { MdInput, Warning, Sticky },
  props: {
    isEdit: Boolean,
  },
  data() {
    return {
      fullscreenLoading: false,
      engineValue: null,
      instanceType: [],
      algorithmType: [],
      engines: [],
      engineList: [],
       fileList: [],
      form: {
        algorithm_name: "",
        algorithm_version: "",
        algorithm_type_id: null,
        algorithm_engine_id: null,
        algorithm_description: "",
        algorithm_instance_type_id: null,
        algorithm_input_reflect: "",
        algorithm_output_reflect: "",
        algorithm_starter_URL: "",
        algorithm_customize_hyper_para: true,
      },
      hyperParameter: [],
      createForm: {
        algorithm_name: "",
        algorithm_version: "",
        algorithm_type_id: null,
        algorithm_engine_id: null,
        algorithm_description: "",
        algorithm_instance_type_id: null,
        algorithm_input_reflect: "",
        algorithm_output_reflect: "",
        algorithm_starter_URL: "",
        algorithm_customize_hyper_para: true,
      },
      dataTypes: [
        {
          value: 0,
          label: "int",
        },
        {
          value: 1,
          label: "double",
        },
        {
          value: 2,
          label: "boolean",
        },
        {
          value: 3,
          label: "string",
        },
      ],
    };
  },
  methods: {
    showGuide() {},
     addFile(file, fileList) {
      this.formData.append("myfile", file.raw);
      console.log(file.file);
      console.log(fileList);
    },
    onSubmit() {
      console.log("ready to submit!");
      this.fullscreenLoading = true;
      this.form.hyperParameters = this.hyperParameter;
      var data = new FormData();
      var files = document.getElementById("filesInput").files;
      for (var i = 0; i < files.length; i++) {
        data.append("myfile", files[i]);
      }
      // data.append('myfile', document.getElementById('filesInput').files[0])
      data.append("data", JSON.stringify(this.form));
      console.log(files);
      console.log(JSON.stringify(this.form));

      axios.post("/algorithm/frontstage/algorithm", data).then((response) => {
        console.log(response);
        this.fullscreenLoading = false;
        if (response.data.code == "00000") {
          axios.get(
            "/train/frontstage/image/" +
              response.data.extend.algorithmId.toString()
          );
          alert("算法上传成功！");
        } else {
          alert("上传失败，请重试！");
        }
        location.reload();
      });
    },
    formSubmit() {
      this.$router.push({
        path: "./list",
        query: {
          newData: this.form,
        },
      });
    },
    isCustomize() {
      this.form.algorithm_customize_hyper_para = !this.form
        .algorithm_customize_hyper_para;
    },
    fileonchange() {
      console.log("on change!");
    },
    getEngines() {
      console.log("trying get engines!");
      axios.get("/algorithm/frontstage/engines").then((response) => {
        console.log(response.data["extend"]);
        var engines = response.data["extend"].engines;
        console.log(engines);
        var engineList = [];
        for (var i = 0; i < engines.length; i++) {
          var engine = engines[i];
          var flag = true;
          // 先根据引擎名查找
          engineList.forEach((value) => {
            if (engine.algorithmEngineName == value.value) {
              console.log("find!");
              // 找到后查看children节点
              var innerFlag = true;
              value.children.forEach((childValue) => {
                if (childValue.value == engine.algorithmEngineVersion) {
                  innerFlag = false;
                  childValue.children.push({
                    value: engine.pythonVersionName,
                    label: engine.pythonVersionName,
                  });
                }
              });
              if (innerFlag) {
                value.children.push({
                  value: engine.algorithmEngineVersion,
                  label:
                    engine.algorithmEngineName + engine.algorithmEngineVersion,
                  children: [
                    {
                      value: engine.pythonVersionName,
                      label: engine.pythonVersionName,
                    },
                  ],
                });
              }
              flag = false;
            }
          });
          if (flag) {
            engineList.push({
              value: engine.algorithmEngineName,
              label: engine.algorithmEngineName,
              children: [
                {
                  value: engine.algorithmEngineVersion,
                  label:
                    engine.algorithmEngineName + engine.algorithmEngineVersion,
                  children: [
                    {
                      value: engine.pythonVersionName,
                      label: engine.pythonVersionName,
                    },
                  ],
                },
              ],
            });
          }
        }
        console.log(engineList);
        this.engineList = engineList;
        this.engines = engines;
      });
    },
    getInstanceType() {
      console.log("trying get instance type!");
      axios.get("/algorithm/frontstage/instanceType").then((response) => {
        this.instanceType = response.data.extend.instanceType;
        console.log(response);
        console.log(this.instanceType);
      });
    },
    getAlgorithmType() {
      axios.get("/algorithm/frontstage/algorithmType").then((response) => {
        this.algorithmType = response.data.extend.algorithmType;
        console.log(response);
        console.log(this.algorithmType);
      });
    },
    setEngineId() {
      if (this.engineValue.length != 3) {
        return;
      }
      this.engines.forEach((engine) => {
        if (
          engine.algorithmEngineName == this.engineValue[0] &&
          engine.algorithmEngineVersion == this.engineValue[1] &&
          engine.pythonVersionName == this.engineValue[2]
        ) {
          this.form.algorithm_engine_id = engine.algorithmEngineId;
        }
      });
      console.log(this.form.algorithm_engine_id);
    },
    handleCurrentChange(row, event, column) {
      console.log(row, event, column, event.currentTarget);
    },
    handleEdit(index, row) {
      console.log(this.hyperParameter[index]);
    },
    handleDelete(index, row) {
      this.hyperParameter.splice(index, 1);
    },
    addHyperPara() {
      this.hyperParameter.push({
        hyper_para_name: "",
        hyper_para_description: "",
        hyper_para_type: null,
        hyper_para_allow_adjust: false,
        hyper_para_range: "",
        hyper_para_default_value: null,
        hyper_para_is_needed: false,
      });
    },
    submitForm(){
      
    }
  },
};
</script>
<style lang="scss" scoped>
.detail-container {
  padding: 40px 50px 20px;
}
.file {
  position: relative;
  display: inline-block;
  background: #d0eeff;
  border: 1px solid #99d3f5;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  color: #1e88c7;
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
  background: #aadffd;
  border-color: #78c3f3;
  color: #004974;
  text-decoration: none;
}
.selectBox {
  width: 390px !important;
}
</style>
