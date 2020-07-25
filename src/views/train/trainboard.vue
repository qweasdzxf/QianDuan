<template>
  <div>
    <el-button @click="addData()">增加数据</el-button>
    <el-row>
      <!-- 训练损失折线图 -->
      <el-col :span="12">
        <ve-line :data="trianLossChartData" :settings="lossChartSettings" />
      </el-col>
      <!-- 训练速率折线图 -->
      <el-col :span="12">
        <ve-line :data="finishChartData" :settings="finishChartSettings" />
      </el-col>
    </el-row>
    <el-row>
      <!-- 轮次 -->
      <el-col :offset="1" :span="3">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>迭代轮次</span>
          </div>
          <el-progress type="dashboard" :percentage="epochPercentage" :color="colors"></el-progress>
        </el-card>
      </el-col>
      <!-- 训练 -->
      <el-col :offset="1" :span="3">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>训练完成度</span>
          </div>
          <el-progress type="dashboard" :percentage="trainPercentage" :color="colors"></el-progress>
        </el-card>
      </el-col>
      <!-- 测试 -->
      <el-col :offset="1" :span="3">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>测试完成度</span>
          </div>
           <el-progress type="dashboard" :percentage="testPercentage" :color="colors"></el-progress>
        </el-card>
      </el-col>
      <!-- 训练作业列表 -->
      <el-col :span="10" :offset="1">
        <el-card class="box-card" style="height: 320px">
          <div slot="header" class="clearfix">
            <span>运行中作业列表</span>
            <el-button style="float: right; padding: 3px 0" type="text">刷新</el-button>
          </div>
           <el-table
            :data="runningTaskTable"
            style="width: 100%">
            <el-table-column
              label="ID"
              width="80">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.trainTaskId }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="作业名称"
              width="150">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.trainTaskName }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              width="100">
              <template>
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">运行中</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleShow(scope.$index, scope.row)">查看训练</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">集群状态</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios'
import global from '@/global'

export default {
  mounted(){
    this.getRunningTaskList()
  },
  beforeDestroy() {
    clearInterval(this.timer);  
  },
  // 定时器不断发送请求，如果code='00001'则给train
  data() {
    this.lossChartSettings = {
      stack: { 'loss': ['train_loss'] }
    },
    this.finishChartSettings={
      area:true
    }
    return {
      //定时器
      timer: '',
      //测试用
      value:0,
      //当前时间
      time:new Date().getMinutes() +" "+new Date().getSeconds(),
      //训练过程原始数据
      train:null,
      //1、训练过程数据
      trianLossChartData:{
        columns:['time','train_loss'],
        rows:[{'time':' ','train_loss':2.3}]
      },
      //2 每个时间片完成的样本数量
      old_batchIndex:0,
      finishChartData:{
        columns:['time','finish_per_sec'],
        rows:[{'time':' ','finish_per_sec':0}]
      },
      //3.1、训练轮次完成率
      trainPercentage:0,
      //3.2、单轮训练进度
      epochPercentage:0,
      //3.3  单轮测试进度
      testPercentage:0,
      // 仪表盘的颜色数据
      colors: [
        {color: '#f56c6c', percentage: 20},
        {color: '#e6a23c', percentage: 40},
        {color: '#5cb87a', percentage: 60},
        {color: '#1989fa', percentage: 80},
        {color: '#6f7ad3', percentage: 100}
      ],
      //4、运行中的训练作业列表
      runningTaskTable:[
        
        ],
      //5、当前训练作业
      currentTrainTaskId:null,
    }
  },
  methods:{
    //实际数据测试
    getData() {
      console.log("trying get data from back")
      this.value ++
      console.log(this.value)
      axios.get('/train/frontstage/trainTask/processdata/'+this.currentTrainTaskId)
      .then(Response=>{
        //增加逻辑，判断是否还在跑
        console.log(Response)
        if(Response.data.extend.message!='没有正在训练的作业'){
          this.train=Response.data.extend.train
          this.pushData()
        }
      })
    },
    pushData(){
      this.time=new Date().getMinutes() +" "+new Date().getSeconds()
      //训练样本数量/秒
      var finishPerSec=this.train.batchIndex-this.old_batchIndex
      if(finishPerSec<0){
        finishPerSec=this.train.len+finishPerSec
      }
      this.finishChartData.rows.push({'time':this.time,'finish_per_sec':finishPerSec})
      this.old_batchIndex=this.train.batchIndex
      //训练损失/秒
      this.trianLossChartData.rows.push({'time':this.time,'train_loss':this.train.trainLoss})
      //训练完成率
      this.trainPercentage=this.train.finishRate*100
      //测试样本完成率
      this.testPercentage=this.train.finishRate*100-this.RandomNumBoth(0,10)
      if(this.testPercentage<0){
        this.testPercentage=0
      }
      //迭代完成率
      this.epochPercentage=this.train.epoch*10
    },
    //测试用
    // getNewData(){
    //   this.time=new Date().getMinutes() +" "+new Date().getSeconds()
    //   this.train.batchIndex=this.RandomNumBoth(0,60000)
    //   var finishPerSec=this.train.batchIndex-this.old_batchIndex
    //   if(finishPerSec<0)finishPerSec=0
    //   this.old_batchIndex=this.train.batchIndex
    //   this.trianLossChartData.rows.push({'time':this.time,'train_loss':this.RandomNumBoth(0,10)})
    //   this.finishChartData.rows.push({'time':this.time,'finish_per_sec':this.RandomNumBoth(0,10)})
    //   this.trainPercentage=this.RandomNumBoth(0,100)
    //   this.testPercentage=this.RandomNumBoth(0,100)
    //   this.epochPercentage=this.RandomNumBoth(0,100)
    // },
    
    getRunningTaskList() {
      console.log('trying get traintaskList')
      this.runningTaskTable=global.RUNNING_TASK_LIST
      console.log(this.runningTaskTable)
    },

    handleShow(index, row){
      console.log('handleShow')
      this.currentTrainTaskId=row.trainTaskId
      console.log('currentTraintaskId:')
      console.log(this.currentTrainTaskId)
      this.timer = setInterval(this.getData, 1000)
    },
    RandomNumBoth(Min,Max){
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.round(Rand * Range); //四舍五入
      return num;
    }
  }
}
</script>
