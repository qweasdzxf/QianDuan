<template>
  <div v-if="showPage">
    <el-container>
      <el-main>
        <el-container>
          <el-header>
            <el-card shadow="hover">
              <el-row>
                <el-col :span="6">
                  <el-button type="info">显示帮助</el-button>
                </el-col>
                <el-col :span="5" :offset="12">
                  <el-input v-model="keyWord" placeholder="请输入内容">
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                      type="primary"
                      @click="searchWithKeyWord"
                    />
                  </el-input>
                </el-col>
              </el-row>
            </el-card>
          </el-header>
          <br />
          <el-main>
            <div>
              <el-card shadow="hover">
                <el-table v-if="pageInfo2!=null" :data="pageInfo2.list" style="width: 100%">
                  <el-table-column prop="modelId" label="模型ID" style="font-size: large" />
                  <el-table-column prop="modelName" label="模型名称" />
                  <el-table-column prop="modelType.modelTypeName" label="模型类别" />
                  <el-table-column prop="modelPhotoUrl" label="模型图片URL" />
                  <el-table-column prop="modelUrl" label="模型URL" />
                  <el-table-column prop label="下载模型" width="100px">
                    <template scope="scope" fixed="center">
                      <el-button
                        type="success"
                        icon="el-icon-download"
                        size="mini"
                        circle
                        @click="downModel"
                        v-loading.fullscreen.lock="fullscreenLoading"
                      />
                    </template>
                  </el-table-column>

                  <el-table-column prop="algorithmDescription" label="启动模型" width="100px">
                    <template scope="scope" fixed="right">
                      <el-button
                        type="primary"
                        icon="el-icon-s-promotion"
                        size="mini"
                        circle
                        @click="releaseModel(scope.$index)"
                      />
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </div>
          </el-main>
          <el-footer>
            <div class="block">
              <el-pagination
                :current-page.sync="pageNum"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                v-if="pageInfo2!=null"
                :total="pageInfo2.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </el-footer>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Algorithmlist",
  data() {
    return {
      showPage: false,
      dialogFormVisible: false,
      showAlgorithmDialog: false,
       fullscreenLoading: false,
      activeName: "train",
      pageNum: null,
      pageSize: 9,
      userId: null,
      keyWord: "",
      pageInfo: null,
      pageInfo2: null,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getAlgorithmList();
    this.getModelList();
  },
  mounted() {},
  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleCurrentChange() {
      this.getAlgorithmList();
    },
    searchWithKeyWord() {
      this.pageNum = 1;
      this.getModelList();
    },
    downModel() {
      this.fullscreenLoading = true;
      
      setTimeout(() => {

        this.fullscreenLoading = false;
         this.$message({
          message: '下载成功',
          type: 'success'
        });
      }, 2000);

    },
    handleSizeChange(){

    },
    getAlgorithmList() {
      console.log("trying get algorithms!");
      axios
        .get("/algorithm/backstage/algorithms", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            keyWord: this.keyWord,
          },
        })
        .then((responese) => {
          this.pageInfo = responese.data.extend.pageInfo;
          console.log(responese);
        });
      this.showPage = true;
    },
    getModelList() {
      console.log("trying get models!");
      axios
        .get("/model/frontstage/models", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            keyWord: this.keyWord,
          },
        })
        .then((responese) => {
          this.pageInfo2 = responese.data.extend.pageInfo;
          console.log(responese);
          console.log(this.pageInfo2);
        });
    },
    releaseModel(index) {
      this.$router.push({
        path: "./list",
        query: { modelTypeId: 123 },
        
      });
    },
    handleCurrentChange() {
      this.getModelList();
    },
  },
};
</script>

<style scoped>
</style>
