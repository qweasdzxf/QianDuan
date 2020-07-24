<template>
  <div>
    <el-container>
      <el-main>
        <el-col span="22" offset="1">

          <el-card shadow="hover">
            <el-header><h2>查看已部署模型</h2></el-header>
          </el-card>
          <el-card shadow="hover">
            <el-container>

              <el-main>
                <el-container>
                  <el-header>
                    <el-col span="16" offset="4">
                      <el-steps :active="active" finish-status="success">
                        <el-step title="步骤 1" />
                        <el-step title="步骤 2" />
                        <el-step title="步骤 3" />
                      </el-steps>
                    </el-col>
                  </el-header>
                  <el-main>
                    <div v-if="active===1">
                      <el-row>
                        <el-col span="4" offset="11">
                          <span style="align-content: center"> <h2>请选择图片</h2></span>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col span="16" offset="4">
                          <el-upload
                            action="#"
                            list-type="picture-card"
                            :multiple="true"
                            :auto-upload="false"
                            :on-change="addFile"
                            :file-list="fileList"
                            @change="shhowFileList"
                          >
                            <i slot="default" class="el-icon-plus" />
                            <div slot="file" slot-scope="{file}">
                              <img
                                class="el-upload-list__item-thumbnail"
                                :src="file.url"
                                alt=""
                              >
                              <span class="el-upload-list__item-actions">
                                <span
                                  class="el-upload-list__item-preview"
                                  @click="handlePictureCardPreview(file)"
                                >
                                  <i class="el-icon-zoom-in" />
                                </span>
                                <span
                                  v-if="!disabled"
                                  class="el-upload-list__item-delete"
                                  @click="handleDownload(file)"
                                >
                                  <i class="el-icon-download" />
                                </span>
                                <span
                                  v-if="!disabled"
                                  class="el-upload-list__item-delete"
                                  @click="handleRemove(file)"
                                >
                                  <i class="el-icon-delete" />
                                </span>
                              </span>
                            </div>

                          </el-upload>
                          <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                          </el-dialog>
                        </el-col>
                        <!--                <el-image :src="url"></el-image><br>-->
                      </el-row>
                    </div>
                    <div v-if="active===2">
                      系统正在努力预测中，请耐心等待～
                    </div>
                    <div v-if="active===3">
                      <div class="block">
                        <h2>系统预测结果如下：</h2>
                        <el-col span="16" offset="8">
                          <div class="demo-image__lazy">
                            <el-image v-for="url in imageUrls" :key="url" :src="url" lazy />
                          </div>
                        </el-col>
                      </div>
                    </div>
                  </el-main>
                  <el-footer>
                    <el-col span="2" offset="11">
                      <el-button v-if="active===1" type="primary" plain @click="submitPic">提交</el-button>
                      <el-button v-if="checkResult&&active===2" type="primary" plain @click="active++">查看结果</el-button>
                    </el-col>
                  </el-footer>
                </el-container>
              </el-main>
            </el-container>
          </el-card>
        </el-col>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import ScrollPane from '../../layout/components/TagsView/ScrollPane'
import axios from 'axios'
export default {
  name: 'List',
  components: { ScrollPane },
  data() {
    return {
      active: 1,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      checkResult: false,
      formData: null,
      fileList: [],
      imageUrls: []
    }
  },
  created() {
    this.formData = new FormData()
  },
  methods: {
    shhowFileList() {
      console.log(this.fileList)
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
      console.log(file)
    },
    handleDownload(file) {
      console.log(file)
    },
    addFile(file, fileList) {
      this.formData.append('file', file.raw)
      console.log(file.file)
      console.log(fileList)
    },
    submitPic() {
      this.active++
      // var data = new FormData()
      // data.append('file', this.fileList)
      // for (var i = 0; i < this.fileList.length; i++) {
      //   data.append('file', this.fileList[i])
      // }
      console.log(this.formData.getAll('file'))
      console.log(this.fileList)
      axios.post('http://localhost:30003/model/demo', this.formData)
        .then(
          response => {
            console.log(response)
            this.imageUrls = response.data.extend.urls
            console.log(this.imageUrls)
            if (response.data.code == '00000') {
              alert('数据预测成功！')
            } else {
              alert('上传失败，请重试！')
            }
            this.checkResult = true
          }
        )
    }
  }

}
</script>

<style scoped>

</style>
