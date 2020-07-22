<template>
  <div class="page">
    <el-card class="box-card card">
      <div slot="header">
        <el-row type="flex">
          <el-col :span="4" offset="2">
            <i class="el-icon-info el-icon"></i>
          </el-col>
          <el-col :span="12">
            <span class="title">
              <b>Default</b>
            </span>
          </el-col>
        </el-row>
      </div>
      <!-- <el-row>
        <el-col :span="20" offset="2">
          <el-progress type="circle" :percentage="45" class="progress"></el-progress>

        </el-col>
      </el-row>
      -->

      <el-row>
        <el-col :span="20" offset="2">
          <span class="content">2020-07-21 17:00</span>
        </el-col>
      </el-row>

      <el-row style="margin-top:12px">
        <el-col :span="12" offset="2">
          <span class="content">Active</span>
        </el-col>

        <el-col :span="6" offset="4">
          <span class="content">一个月</span>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      // 数据
      data1: []
    };
  }
};
</script>

<style scoped>
.box-card {
  margin: 40px;
  height: 200px;
  width: 350px;
  border-radius: 20px;
}
/* .el-row {
  margin: 5px;
} */
.el-icon {
  font-size: 35px;
}
.title {
  font-size: 25px;
  padding-top: 10px;
}
.content {
  color: rgb(152, 154, 158);
  font-size: 20px;
}
.el-row {
  display: flex;
  /* 主轴上居中 */
  /* justify-content: center; */
  /* 侧轴上居中 */
  align-items: center;
}
/* .progress{
  width: 100px;
} */
</style>
 
 