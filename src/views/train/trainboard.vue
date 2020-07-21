<template>
  <div>
    <el-row>
      <el-col :span="12">
        <ve-line :data="accChartData" :settings="accChartSettings" />
      </el-col>
      <el-col :span="12">
        <ve-line :data="lossChartData" :settings="lossChartSettings" />
      </el-col>
    </el-row>
    <el-col :span="5" :offset="1">
      <ve-histogram :data="speedChartData" />
    </el-col>
    <el-col :span="6">
      <ve-histogram :data="taskLoadChartData" />
    </el-col>
    <el-col :span="10" :offset="1">
      <el-card class="box-card" style="height: 320px">
        <div slot="header" class="clearfix">
          <span>训练日志</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div class="text item">
          日志内容
        </div>
      </el-card>
    </el-col>
  </div>
</template>
<script>
export default {
  data() {
    this.lossChartSettings = {
      stack: { 'loss': ['train loss', 'test loss'] },
      area: true
    },
    this.accChartSettings = {
      step: 'end'
    }
    return {
      accChartData: {
        columns: ['step', 'acc'],
        rows: [
          { 'step': '1/4', 'acc': 123 },
          { 'step': '2/4', 'acc': 1223 },
          { 'step': '3/4', 'acc': 2123 },
          { 'step': '4/4', 'acc': 4123 },
          { 'step': '5/4', 'acc': 3123 },
          { 'step': '6/4', 'acc': 7123 }
        ]
      },
      lossChartData: {
        columns: ['step', 'train loss', 'test loss', 'match rate'],
        rows: [
          { 'step': '1/1', 'train loss': 1393, 'test loss': 1093, 'match rate': 0.32 },
          { 'step': '1/2', 'train loss': 3530, 'test loss': 3230, 'match rate': 0.26 },
          { 'step': '1/3', 'train loss': 2923, 'test loss': 2623, 'match rate': 0.76 },
          { 'step': '1/4', 'train loss': 1723, 'test loss': 1423, 'match rate': 0.49 },
          { 'step': '1/5', 'train loss': 3792, 'test loss': 3492, 'match rate': 0.323 },
          { 'step': '1/6', 'train loss': 4593, 'test loss': 4293, 'match rate': 0.78 }
        ]
      },
      speedChartData: {
        columns: ['iter', 'second'],
        rows: [
          { 'second': 1.2, 'iter': 1 },
          { 'second': 1.3, 'iter': 1 },
          { 'second': 0.4, 'iter': 1 },
          { 'second': 0.11, 'iter': 1 }
        ]
      },
      taskLoadChartData: {
        columns: ['iter', 'images'],
        rows: [
          { 'images': 1.2, 'iter': 1 },
          { 'images': 1.3, 'iter': 1 },
          { 'images': 0.4, 'iter': 1 },
          { 'images': 0.11, 'iter': 1 }
        ]
      }
    }
  }

}
</script>
