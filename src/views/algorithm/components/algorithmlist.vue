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
                <el-col :span="6" :offset="6">
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
          <br>
          <el-main>
            <div>
              <el-card shadow="hover">
                <el-table v-if="pageInfo!=null" :data="pageInfo.list" style="width: 100%">
                  <el-table-column prop="algorithmId" label="算法ID" style="font-size: large" />
                  <el-table-column prop="algorithmName" label="算法名称" />
                  <el-table-column prop="algorithmType.algorithmTypeName" label="算法类别" />
                  <el-table-column prop="algorithmVersion" label="算法版本" />
                  <el-table-column prop="algorithmCreateTime" label="创建时间" />
                  <el-table-column label="操作">
                    <template scope="scope">
                      <el-button
                        type="text"
                        size="small"
                        @click="showAlgorithmDetail(scope.$index)"
                      >查看</el-button>
                      <el-button type="text" size="small" @click="dialogFormVisible = true">编辑</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="algorithmDescription" label="启动训练" width="100px">
                    <template scope="scope" fixed="right">
                      <el-button
                        type="primary"
                        icon="el-icon-s-promotion"
                        size="mini"
                        circle
                        @click="createTrainTask(scope.$index, scope.row)"
                      />
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
              <el-dialog title="查看算法" :visible.sync="showAlgorithmDialog" :center="true">
                <el-container>
                  <el-header>
                    <div>
                      <el-row>
                        <el-col :span="8">算法名称：{{ algorithmDetail.algorithmName }}</el-col>
                        <el-col :span="8">算法状态：{{ algorithmDetail.algorithmStatus }}</el-col>
                      </el-row>
                      <br>
                      <el-row>
                        <el-col :span="8">算法版本：{{ algorithmDetail.algorithmVersion }}</el-col>
                        <el-col :span="16">创建时间：{{ algorithmDetail.algorithmCreateTime }}</el-col>
                      </el-row>
                      <br>
                      <el-row>
                        <el-col :span="8">算法描述：{{ algorithmDetail.algorithmDescription }}</el-col>
                      </el-row>
                      <br>
                    </div>
                  </el-header>
                  <el-main>
                    <br>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                      <el-tab-pane label="训练规范" name="train">
                        <h4>配置信息</h4>
                        <el-row>训练框架：{{ algorithmDetail.aiEngine.algorithmEngineName + algorithmDetail.aiEngine.algorithmEngineVersion + '-' + algorithmDetail.aiEngine.pythonVersionName }}</el-row>
                        <br>
                        <el-row>代码路径：{{ algorithmDetail.algorithmSaveUrl }}</el-row>
                        <br>
                        <el-row>启动文件：{{ algorithmDetail.algorithmStarterUrl }}</el-row>
                        <h4>推荐规格</h4>
                        <el-row>规格类型：{{ algorithmDetail.instanceType.instanceTypeDescription }}</el-row>
                      </el-tab-pane>
                      <el-tab-pane label="超参规范" name="hyperParameters">
                        <h4>超参列表</h4>
                        <el-table :data="hyperParameters" style="width: 100%">
                          <el-table-column prop="hyperParaName" label="名称" />
                          <el-table-column prop="hyperParaType" label="类型" />
                          <el-table-column prop="hyperParaDescription" label="描述" />
                          <el-table-column prop="hyperParaRange" label="范围" />
                          <el-table-column prop="hyperParaDefaultValue" label="默认值" />
                          <el-table-column prop="hyperParaIsNeeded" label="是否必需" />
                          <el-table-column prop="hyperParaAllowAdjust" label="是否可调整" />
                        </el-table>
                      </el-tab-pane>
                    </el-tabs>
                  </el-main>
                </el-container>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="closeShowAlgorithmDetail">确 定</el-button>
                </span>
              </el-dialog>
              <el-dialog title="编辑算法" :visible.sync="dialogFormVisible">
                <el-form>
                  <el-form-item labe="算法描述">
                    <el-input v-model="form.algorithm_description" type="textarea" />
                  </el-form-item>
                  <el-divider />
                  <div class="block">
                    <span class="demonstration">选择AI引擎</span>
                    <el-cascader
                      v-model="engineValue"
                      :options="engineList"
                      :props="{ expandTrigger: 'hover' }"
                      @focus="getEngines"
                    />
                  </div>
                  <el-divider />

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
                      v-show="form.algorithm_customize_hyper_para"
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
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
              </el-dialog>
            </div>
          </el-main>
          <el-footer>
            <div class="block">
              <el-pagination
                :current-page.sync="pageNum"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                v-if="pageInfo!=null"
                :total="pageInfo.total"
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
import axios from 'axios'
export default {
  name: 'Algorithmlist',
  data() {
    return {
      engineValue: null,
      showPage: false,
      dialogFormVisible: false,
      showAlgorithmDialog: false,
      activeName: 'train',
      pageNum: null,
      pageSize: 10,
      userId: null,
      keyWord: '',
      engineList: null,
      pageInfo: null,
      algorithmDetail: {
        algorithmId: 60,
        algorithmName: 'a s d',
        algorithmVersion: '阿法',
        algorithmTypeId: 1,
        algorithmType: {
          algorithmTypeId: 1,
          algorithmTypeName: '图像分类',
          algorithmTypeDescription: '暂时没有描述'
        },
        algorithmEngineId: 3,
        aiEngine: {
          algorithmEngineId: 3,
          algorithmEngineName: 'PyTorch',
          algorithmEngineVersion: '1.0.0',
          pythonVersionName: 'python2.7'
        },
        algorithmDescriptionId: 62,
        algorithmDescription: null,
        algorithmInstanceTypeId: 1,
        instanceType: {
          instanceTypeId: 1,
          instanceTypeDescription: '1核2G'
        },
        algorithmInputReflect: '',
        algorithmOutputReflect: '',
        algorithmStarterUrl: '/Users/thomas/Desktop/Data',
        algorithmSaveUrl: '/Users/thomas/Desktop/Data',
        algorithmCustomizeHyperPara: 1,
        algorithmStatus: 0,
        algorithmCreateTime: '2020-07-17T09:49:21',
        algorithmImageId: null
      },
      hyperParameters: [
        {
          hyperParaId: 11,
          hyperParaName: 'hyper parameters',
          hyperParaDescription: 'this is description',
          hyperParaType: 0,
          hyperParaAllowAdjust: true,
          hyperParaRange: '0-100',
          hyperParaDefaultValue: '10',
          hyperParaIsNeeded: false,
          algorithmId: 34
        },
        {
          hyperParaId: 12,
          hyperParaName: 'hyper parameters',
          hyperParaDescription: 'this is description',
          hyperParaType: 0,
          hyperParaAllowAdjust: true,
          hyperParaRange: '0-100',
          hyperParaDefaultValue: '10',
          hyperParaIsNeeded: true,
          algorithmId: 34
        }
      ],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      newData: {},
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getAlgorithmList()
    // this.getParams();
  },
  mounted() {
    this.getAlgorithmList()
  },
  methods: {
    isCustomize() {
      console.log('func is customize')
    },
    getParams() {
      console.log('getparams')
      // this.id = self.$route.query.id;
      console.log(this.$route.query.newData)
      this.newData.algorithmId = 9999
      //  this.newData.algorithmName=this.$route.query.newData.algorithm_name;
      this.newData.algorithmName = 'face'
      if (this.$route.query.newData.algorithm_type_id == 1) {
        this.newData.algorithmType = '图形分类'
      } else {
        this.newData.algorithmType = '物体检测'
      }

      //  this.newData.algorithmVersion=this.$route.query.newData.algorithm_version;
      this.newData.algorithmType = { algorithmTypeName: '物体检测' }
      this.newData.algorithmVersion = 'v1.0'
      this.newData.algorithmCreateTime = '2020-07-25T14:00:40'
      console.log('this.newData')
      console.log(this.newData)
      this.pageInfo.list.push(this.newData)
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    handleClick(row) {
      console.log(row)
    },
    searchWithKeyWord() {
      this.pageNum = 1
      this.getAlgorithmList()
    },
    handleCurrentChange() {
      this.getAlgorithmList()
    },
    getEngines() {
      console.log('trying get engines!')
      axios.get('/algorithm/frontstage/engines').then((response) => {
        console.log(response.data['extend'])
        var engines = response.data['extend'].engines
        console.log(engines)
        var engineList = []
        for (var i = 0; i < engines.length; i++) {
          var engine = engines[i]
          var flag = true
          // 先根据引擎名查找
          engineList.forEach((value) => {
            if (engine.algorithmEngineName == value.value) {
              console.log('find!')
              // 找到后查看children节点
              var innerFlag = true
              value.children.forEach((childValue) => {
                if (childValue.value == engine.algorithmEngineVersion) {
                  innerFlag = false
                  childValue.children.push({
                    value: engine.pythonVersionName,
                    label: engine.pythonVersionName
                  })
                }
              })
              if (innerFlag) {
                value.children.push({
                  value: engine.algorithmEngineVersion,
                  label:
                    engine.algorithmEngineName + engine.algorithmEngineVersion,
                  children: [
                    {
                      value: engine.pythonVersionName,
                      label: engine.pythonVersionName
                    }
                  ]
                })
              }
              flag = false
            }
          })
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
                      label: engine.pythonVersionName
                    }
                  ]
                }
              ]
            })
          }
        }
        console.log(engineList)
        this.engineList = engineList
        this.engines = engines
      })
    },
    getAlgorithmList() {
      console.log('trying get algorithms!')
      axios
        .get('/algorithm/backstage/algorithms', {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            keyWord: this.keyWord
          }
        })
        .then((responese) => {
          this.pageInfo = responese.data.extend.pageInfo
          if (this.pageNum == 11) {
            this.getParams()
          }
          console.log(responese)
        })
      this.showPage = true
    },
    closeShowAlgorithmDetail() {
      console.log('close dialog')
      this.showAlgorithmDialog = false
      console.log(this.showAlgorithmDialog)
    },
    createTrainTask(index, row) {
      console.log(row)
      this.$router.push({
        path: '../train/create',
        query: {
          data: row
        }
      })
    },
    showAlgorithmDetail(index) {
      console.log(index)
      console.log(this.pageInfo.list)
      axios
        .get(
          '/algorithm/frontstage/algorithm/' +
            this.pageInfo.list[index].algorithmId.toString()
        )
        .then((res) => {
          this.algorithmDetail = res.data.extend.algorithm
          switch (this.algorithmDetail.algorithmStatus) {
            case 0:
              this.algorithmDetail.algorithmStatus = '就绪'
              break
            case 1:
              this.algorithmDetail.algorithmStatus = '异常'
              break
          }
        })
      axios
        .get(
          '/algorithm/frontstage/algorithm/hyperPara/' +
            this.pageInfo.list[index].algorithmId.toString()
        )
        .then((res) => {
          this.hyperParameters = res.data.extend.hyperParameters
          console.log(this.hyperParameters)
          this.hyperParameters.forEach((value) => {
            console.log(value)
            switch (value.hyperParaType) {
              case 0:
                value.hyperParaType = 'Integer'
                break
              case 1:
                value.hyperParaType = 'Double'
                break
              case 2:
                value.hyperParaType = 'Boolean'
                break
              case 3:
                value.hyperParaType = 'String'
                break
            }
            value.hyperParaAllowAdjust = value.hyperParaAllowAdjust
              ? '是'
              : '否'
            value.hyperParaIsNeeded = value.hyperParaIsNeeded ? '是' : '否'
          })
        })
      this.showAlgorithmDialog = true
    }
  }
}
</script>

<style scoped>
</style>
