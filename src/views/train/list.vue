<template>
  <div v-if="showPage">
    <el-container>
      <el-main>
        <el-card shadow="hover">
          <el-container>
            <el-header>
              <el-row>
                <el-col :span="6">
                  <el-button type="info" @click="">显示帮助</el-button>
                </el-col>
                <el-col :span="5" offset="12">
                  <el-input v-model="keyWord" placeholder="请输入内容">
                    <el-button slot="append" icon="el-icon-search" type="primary" @click="searchWithKeyWord" />
                  </el-input>
                </el-col>
              </el-row>
            </el-header>
            <el-main>
              <div>
                <warning />

                <template>
                  <el-table :data="pageInfo.list" style="width: 100%">
                    <el-table-column prop="trainTaskId" label="训练作业ID" style="font-size: large" />
                    <el-table-column prop="trainTaskName" label="训练名称" />
                    <el-table-column prop="trainTaskStatus" label="训练状态" />
                    <el-table-column prop="trainTaskCreateTime" label="创建时间" />
                    <el-table-column label="操作">
                      <template scope="scope">
                        <el-button type="text" size="small" @click="showTrainTaskDetail(scope.$index)">
                          查看
                        </el-button>
                        <el-button type="text" size="small" @click="dialogFormVisible = true">编辑</el-button>
                      </template>
                    </el-table-column>
                    <el-table-column label="" width="100px">
                      <template scope="scope" fixed="right">
                        <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="deleteRow(scope.$index, algorithms)" />
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-dialog v-if="renderDialog" title="查看算法" :visible.sync="showTrainTaskDialog" center="true">
                    <el-container>
                      <el-header>
                        <div>
                          <el-row>
                            <el-col span="8">任务ID：{{ trainTaskDetail.trainTaskId }}</el-col>
                            <el-col span="16">任务名称：{{ trainTaskDetail.trainTaskName }}</el-col>
                          </el-row><br>
                          <el-row>
                            <el-col span="8">任务版本号：{{ trainTaskDetail.trainTaskVersion }}</el-col>
                            <el-col span="16">任务运行时间：{{ trainTaskDetail.trainTaskRunningTime }}</el-col>
                          </el-row><br>
                          <el-row>
                            <el-col span="8">任务状态：{{ trainTaskDetail.trainTaskStatus }}</el-col>
                          </el-row><br>
                          <el-row>
                            <el-col span="8">创建时间：{{ trainTaskDetail.trainTaskCreateTime }}</el-col>
                          </el-row><br>
                          <el-row>
                            <el-col span="8">更新时间：{{ trainTaskDetail.trainTaskUpdateTime }}</el-col>
                          </el-row><br>
                        </div>
                      </el-header>
                      <el-main>
                        <br>
                      </el-main>

                    </el-container>
                    <span slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="closeTrianTaskDetail">确 定</el-button>
                    </span>
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
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import Sticky from '@/components/Sticky/index'
import Warning from '@/views/algorithm/components/warning'
import MdInput from '@/components/MDinput/index'
import axios from 'axios'

export default {
  name: 'Index',
  components: { MdInput, Warning, Sticky },
  props: {
    isEdit: Boolean
  },
  data() {
    return {
      renderDialog: false,
      showPage: false,
      dialogFormVisible: false,
      showTrainTaskDialog: false,
      activeName: 'train',
      pageNum: null,
      pageSize: 10,
      userId: null,
      keyWord: '',
      pageInfo: null,
      trainTaskDetail: null,
      dataTypes: [
        {
          value: 0,
          label: 'int'
        },
        {
          value: 1,
          label: 'double'
        },
        {
          value: 2,
          label: 'boolean'
        },
        {
          value: 3,
          label: 'string'
        }
      ]
    }
  },
  created() {
    this.getTrainTasks()
    this.showPage = true
  },
  mounted() {
    this.getTrainTasks()
    this.showPage = true
  },
  methods: {
    handleCurrentChange() {
      this.getTrainTasks()
    },
    searchWithKeyWord() {
      this.pageNum = 1
      this.getTrainTasks()
    },
    getTrainTasks() {
      axios.get(
        'http://localhost:9527/train/frontstage/trainTasks',
        {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            keyWord: this.keyWord
          }
        }
      )
        .then(
          res => {
            this.pageInfo = res.data.extend.pageInfo
            console.log(this.pageInfo)
          }
        )
    },
    showTrainTaskDetail(index) {
      axios.get('http://localhost:9527/train/frontstage/trainTask/' + index.toString())
        .then(
          res => {
            this.trainTaskDetail = res.data.extend.trainTaskAndTrainTaskConfig.trainTask
            console.log(res.data.extend)
            console.log(this.trainTaskDetail)
          }
        )
      this.renderDialog = true;
      this.showTrainTaskDialog = true
    },
    closeTrianTaskDetail() {
      this.showTrainTaskDialog = false
    }
  }
}
</script>

<style scoped>

</style>
