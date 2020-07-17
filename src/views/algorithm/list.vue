
<template>
<<<<<<< HEAD
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-button @click="showGuide">显示帮助</el-button>
        <el-button type="success" style="margin-left:15px" @click="editForm"> {{ '编辑算法' }}</el-button>
      </el-col>
      <el-col :span="8"> <el-input v-model="input" placeholder="请输入内容" />
      </el-col>
      <el-col :span="5"><el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-col>
    </el-row>
    <warning />

    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="algorithmId"
          label="算法ID"
          width="150"
        />
        <el-table-column
          prop="algorithm_name"
          label="算法名称"
          width="200"
        />
        <el-table-column
          prop="algorithmStatus"
          label="算法状态"
          width="150"
        />
        <el-table-column
          prop="algorithmVersion"
          label="算法版本"
          width="120"
        />
        <el-table-column
          prop="algorithmCreateTime"
          label="创建时间"
          width="350"
        />
        <el-table-column
          prop="algorithmDescription"
          label="算法描述"
          width="500"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click.native.prevent="deleteRow(scope.$index, tableData)"
            >
              移除
            </el-button>

            <el-button type="text" size="small" @click="dialogFormVisible = true">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="新增算法" :visible.sync="dialogFormVisible">

        <el-form :model="form">
          <el-form-item>
            <md-input v-model="form.algorithm_name" name="name">算法名称</md-input>
          </el-form-item>

          <el-form-item>
            <md-input v-model="form.algorithm_version" name="name">版本号</md-input>
          </el-form-item>

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
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
    />
  </div>

</template>

<script>
import Sticky from '@/components/Sticky/index'
import Warning from '@/views/algorithm/components/warning'
export default {
  components: { Warning },
  data() {
    return {
      dialogFormVisible: false,
      input: '',

      tableData: [{
        algorithmId: '01',
        algorithm_name: '算法一',
        algorithmStatus: '1',
        algorithmVersion: '1.0',
        algorithmCreateTime: '12',
        algorithmDescription: '123456'
      }
      ],
      form: {
        algorithm_name: '',
        algorithm_version: '',
        algorithm_type_id: 0,
        algorithm_engine_id: 0,
        algorithm_description: '',
        algorithm_instance_type_id: 0,
        algorithm_input_reflect: '',
        algorithm_output_reflect: '',
        algorithm_starter_URL: '',
        algorithm_customize_hyper_para: true,
        algorithm_python_version_id: 0,
        hyperParameter: [
          {
            hyper_para_name: 'hyper parameters',
            hyper_para_description: 'this is description',
            hyper_para_type: 0,
            hyper_para_allow_adjust: true,
            hyper_para_range: '0-100',
            hyper_para_default_value: 10,
            hyper_para_is_needed: false
          }
        ]
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    handleClick(row) {
      console.log(row)
    },
    editForm() {

    }
  }
}

</script>
<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-table{
    align-content: center;
  }
=======
  <el-table
    :data="tableData"
    border
    style="width: 100%"
  >
    <el-table-column
      fixed
      prop="date"
      label="日期"
      width="150"
    />
    <el-table-column
      prop="name"
      label="姓名"
      width="120"
    />
    <el-table-column
      prop="province"
      label="省份"
      width="120"
    />
    <el-table-column
      prop="city"
      label="市区"
      width="120"
    />
    <el-table-column
      prop="address"
      label="地址"
      width="300"
    />
    <el-table-column
      prop="zip"
      label="邮编"
      width="120"
    />
    <el-table-column
      fixed="right"
      label="操作"
      width="100"
    >
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {

  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
    }
  },
  methods: {
    handleClick(row) {
      console.log(row)
    }
  }
}
</script>
<style scoped>
>>>>>>> c57ea98d92e7119bcf0614b70955f8da2b891c67

</style>
