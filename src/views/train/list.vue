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
                  <el-input v-model=keyWord placeholder="请输入内容">
                    <el-button slot="append" icon="el-icon-search" type="primary" @click='searchWithKeyWord'/>
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
                        <el-button type="text" size="small" @click="showAlgorithmDetail(scope.$index)">
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
                  <el-dialog title="查看算法" :visible.sync="showAlgorithmDialog" center="true">
                    <el-container>
                      <el-header>
                        <div>
                          <el-row>
                            <el-col span="8">算法名称：{{  }}</el-col>
                            <el-col span="16">算法状态：{{  }}</el-col>
                          </el-row><br>
                          <el-row>
                            <el-col span="8">算法版本：{{  }}</el-col>
                            <el-col span="16">创建时间：{{  }}</el-col>
                          </el-row><br>
                          <el-row>
                            <el-col span="8">算法描述：{{  }}</el-col>
                          </el-row><br>
                        </div>
                      </el-header>
                      <el-main>
                        <br>
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                          <el-tab-pane label="训练规范" name="train">
                            <h4>配置信息</h4>
                            <el-row>
                              训练框架：{{  }}
                            </el-row><br>
                            <el-row>
                              代码路径：{{  }}
                            </el-row><br>
                            <el-row>
                              启动文件：{{  }}
                            </el-row>
                            <h4>推荐规格</h4>
                            <el-row>
                              规格类型：{{  }}
                            </el-row>
                          </el-tab-pane>
                          <el-tab-pane label="超参规范" name="hyperParameters">
                            <h4>超参列表</h4>
                          </el-tab-pane>
                        </el-tabs>
                      </el-main>

                    </el-container>
                    <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="closeShowAlgorithmDetail">确 定</el-button>
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
  name: 'index',
  components: { MdInput, Warning, Sticky },
  props: {
    isEdit: Boolean
  },
  created() {
    this.getTrainTasks()
    this.showPage = true
  },
  mounted() {
    this.getTrainTasks()
    this.showPage = true
  },
  data() {
    return {
      showPage: false,
      dialogFormVisible: false,
      showAlgorithmDialog: false,
      activeName: 'train',
      pageNum: null,
      pageSize: 10,
      userId: null,
      keyWord: '',
      pageInfo: null,
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
  methods: {
    handleCurrentChange() {
      this.getTrainTasks()
    },
    getTrainTasks() {
      axios.get(
        'http://localhost:20003/frontstage/trainTasks',
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
    }
  }
}
</script>

<style scoped>

</style>
