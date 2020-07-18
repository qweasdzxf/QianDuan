<template>
  <div>
    <sticky :class-name="'sub-navbar'">
      <el-button @click="showGuide">显示帮助</el-button>
      <el-button type="success" style="margin-left:15px" @click="submitForm"> {{ '创建训练' }}</el-button>
    </sticky>
    <br>
    <h2>创建训练</h2>
    <br>
    <el-form>
      <el-form-item>
        <md-input v-model="form.train_task_user_id" name="name">用户ID</md-input>
      </el-form-item>

      <el-form-item>
        <md-input v-model="form.train_task_name" name="name">训练作业名称</md-input>
      </el-form-item>

      <el-form-item>
        <md-input v-model="form.train_task_name" name="name">训练作业名称</md-input>
      </el-form-item>

      <el-form-item>
        <md-input v-model="form.train_task_version" name="name">训练版本号</md-input>
      </el-form-item>

      <div class="block1">
        <br>
        <el-row>
          <span class="demonstration">选择算法</span>
        </el-row>
        <br>
        <el-cascader
          v-model="engineValue"
          style="width: 350px"
          placeholder="请选择"
          :options="algorithmList"
          :props="{ expandTrigger: 'hover' }"
          @focus="getAlgorithm"
          @change="setAlgorithmId"
        />
      </div>
      <br>
      <div class="block2">
        <br>
        <el-row>
          <span class="demonstration">选择数据集</span>
        </el-row>
        <br>
        <el-cascader
          v-model="engineValue"
          style="width: 350px"
          placeholder="请选择"
          :options="algorithmList"
          :props="{ expandTrigger: 'hover' }"
          @focus="getAlgorithm"
          @change="setAlgorithmId"
        />
      </div>
      <br>
      <br>
      <el-label>训练作业描述</el-label>
      <br>
      <br>
      <el-input
        v-model="form.train_task_description"
        type="textarea"
        :rows="2"
        placeholder="训练作业描述"
      />
      <br>
      <br>
      <br>
      <el-label>训练作业时间</el-label>
      <br>
      <br>
      <el-time-select
        v-model="form.train_task_start_time"
        placeholder="训练作业起始时间"
        :picker-options="{
          start: '00:00',
          step: '00:30',
          end: '24:00'
        }"
      />
      <el-time-select
        v-model="form.train_task_finish_time"
        placeholder="训练作业结束时间"
        :picker-options="{
          start: '00:00',
          step: '00:30',
          end: '24:00',
          minTime:form.train_task_start_time,
        }"
      />

    </el-form>
  </div>
</template>

<script>

import Sticky from '@/components/Sticky/index'
import MdInput from '@/components/MDinput/index'

export default {
  name: 'Create',
  components: { MdInput, Sticky },
  data() {
    return {
      algorithm: [],
      algorithmList: [],
      form: {
        train_task_user_id: '',
        train_task_name: '',
        train_task_status: '',
        train_task_version: '',
        train_task_create_time: '',
        train_task_update_time: '',
        train_task_running_time: '',
        train_task_algorithm_id: '',
        train_task_dataset_id: '',
        train_task_description: '',
        train_task_start_time: '',
        train_task_finish_time: '',
        train_task_params: '',
        train_task_specification: '',
        train_task_Ai_engine: '',
        train_task_log_out_path: '',
        train_task_model_out_path: ''
      }}
  },
  methods: {
    getAlgorithm() {

    }

  }

}
</script>

<style scoped>

</style>
