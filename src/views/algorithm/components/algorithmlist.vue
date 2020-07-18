<template>
  <el-container>
    <el-main>
      <el-container>
        <el-header>
          <el-row>
            <el-col :span="6">
              <el-button type="info" @click="getAlgorithmList">显示帮助</el-button>
            </el-col>
            <el-col :span="5" offset="12">
              <el-input v-model="input" placeholder="请输入内容">
                <el-button slot="append" icon="el-icon-search" type="primary" />
              </el-input>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <div>
            <warning />

            <template>
              <el-table :data="pageInfo.list" style="width: 100%">
                <el-table-column prop="algorithmId" label="算法ID" style="font-size: large" />
                <el-table-column prop="algorithmName" label="算法名称" />
                <el-table-column prop="algorithmType.algorithmTypeName" label="算法类别" />
                <el-table-column prop="algorithmVersion" label="算法版本" />
                <el-table-column prop="algorithmCreateTime" label="创建时间" />
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="showAlgorithmDetail = true">
                      查看
                    </el-button>
                    <el-button type="text" size="small" @click="dialogFormVisible = true">编辑</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="algorithmDescription" label="" width="100px">
                  <template scope="scope" fixed="right">
                    <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="deleteRow(scope.$index, algorithms)" />
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog title="查看算法" :visible.sync="showAlgorithmDetail">
                <el-container>
                  <el-header>
                    <div>
                      <el-row>
                        <el-col span="8">算法名称：test</el-col>
                        <el-col span="8">算法状态：就绪</el-col>
                      </el-row><br>
                      <el-row>
                        <el-col span="8">算法版本：test</el-col>
                        <el-col span="8">创建时间：就绪</el-col>
                      </el-row><br>
                      <el-row>
                        <el-col span="8">算法描述：test</el-col>
                      </el-row><br>
                    </div>
                  </el-header>
                  <el-main>
                    <br>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                      <el-tab-pane label="训练规范" name="train">训练规范</el-tab-pane>
                      <el-tab-pane label="超参规范" name="hyperParameters">超参规范</el-tab-pane>
                    </el-tabs>
                  </el-main>
                </el-container>
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
                      v-model="value"
                      :options="engineList"
                      :props="{ expandTrigger: 'hover' }"
                      @focus="getEngines"
                      @change="handleChange"
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

            </template>

          </div>
        </el-main>
        <el-footer>
          <div class="block">
            <el-pagination
              :current-page.sync="pageNum"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="pageInfo.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-footer>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Algorithmlist',
  data() {
    return {
      dialogFormVisible: false,
      showAlgorithmDetail: false,
      input: '',
      activeName: 'train',
      pageNum: 1,
      pageSize: 10,
      userId: 1,
      keyWord: '',
      pageInfo: null,
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
      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.getAlgorithmList()
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    handleClick(row) {
      console.log(row)
    },
    handleCurrentChange() {
      this.getAlgorithmList()
    },
    getAlgorithmList() {
      console.log('trying get algorithms!')
      axios.get(
        'http://localhost:10001/algorithms',
        {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            keyWord: this.keyWord
          }
        }
      )
        .then(
          responese => {
            this.pageInfo = responese.data.extend.pageInfo
            console.log(responese)
          }
        )
    }

  }
}
</script>

<style scoped>

</style>
