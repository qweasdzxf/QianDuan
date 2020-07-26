<template>
  <div class="page">
    <el-card class="box-card card">
      <div slot="header">
        <el-row type="flex">
          <el-col :span="4" :offset=2>
            <i class="el-icon-postcard el-icon" />
          </el-col>
          <el-col :span="12" :offset=6>
            <span class="title">
              <b>{{values.name}}</b>
            </span>
          </el-col>
        </el-row>
      </div>

      <!-- <section class="chart-container"> -->
        <div>
        <el-row>
          <el-col :span="6">
            <div :id="'pie'+values.index1" style="height:40px;"></div>
          </el-col>
          <el-col :span="16" :offset=1>
            <span class="content">
              GPU-Util
              <b class="titleBold"> {{values.gpuUtil}}</b> %
              <!-- <b class="title">{{values.cpuTotal}}</b> -->
            </span>
          </el-col>
        </el-row>
        </div>
      <!-- </section> -->
      
      <!-- <section class="chart-container"> -->
        <div>
        <el-row  style="margin-top:12px">
          <el-col :span="6">
            <div :id="'pie'+values.index2" style="height:40px;"></div>
          </el-col>
          <el-col :span="17" :offset=1>
            <span class="content">
              Meme-Util
              <b class="titleBold">{{values.memoryUtil}}</b> %
              <!-- <b class="title">{{values.gpuTotal}}</b> -->
            </span>
          </el-col>
        </el-row>
        </div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  props:{
    values:{
      type:Object,
      default(){
        return{
          gpuUtil:0,
          memoryUtil:0,
          // gpuTotal:4,
          index1:0,
          index2:1,
          name:'GPU'
        }
      }
    }

  }, 
  data() {
    return {
      // 数据
      data1: [],
    };
  },
  methods: {
    drawPieChart(item) {
      this.chartPie = echarts.init(document.getElementById(item.id))
      //   var titleLeft="30%"
      //   var titleTop="60%"
      var pieLeft = '50%'
      var pieTop = '50%'
      this.chartPie.setOption({
        series: [
          {
            name: '访问来源',
            type: 'pie',
            clockWise: false,
            radius: [17, 19],
            // center: ["50%", "60%"],
            itemStyle: {
              normal: {
                color: item.color1,
                shadowColor: item.color1,
                shadowBlur: 0,
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            center: [pieLeft, pieTop],
            data: [
              {
                value: item.value,
                label: {
                  normal: {
                    formatter: function(params) {
                      return params.value + '%'
                    },
                    position: 'center',
                    show: true,
                    textStyle: {
                      fontSize: "10",
                      fontWeight: "bold",
                      color: item.color1
                    }
                  }
                }
              },
              {
                value: 100 - item.value,
                name: 'invisible',
                itemStyle: {
                  normal: {
                    color: item.color2
                  },
                  emphasis: {
                    color:item.color2
                  }
                }
              }
            ]
          }
        ]
      })
    },
    initChart(values){
      var item = {
      id:'pie'+values.index1,
      title: "pie",
      // value: Math.round((this.values.cpuUtil)/(this.values.cpuTotal)*100*10)/10,
      value:values.gpuUtil,
      color1:'#389af4',
      color2:'#dfeaff'
    };
    this.drawPieChart(item);
    var item2 = {
      id:'pie'+values.index2,
      title: "pie",
      // value:  Math.round((this.values.gpuUtil)/(this.values.gpuTotal)*100*10)/10,
      value:values.memoryUtil,
       color1:'#fd6f97',
      color2: '#fed4e0'
    };
    this.drawPieChart(item2);
    },
    updateData(newData){
      this.values=newData;
      this.initChart(this.values);
    },

  },
  mounted(){
    this.initChart(this.values);
  }
}
</script>

<style scoped>
.box-card {
  margin-left: 40px;
  margin-top: 15px;
  height: 170px;
  width: 230px;
  border-radius: 20px;
}
/* .el-row {
  margin: 5px;
} */
.el-icon {
  font-size: 25px;
}
.title {
  font-size: 18px;
  /* padding-top: 10px; */
}
/* .firstTitle{
  font-size: 18px;
 
} */
.content {
  color: rgb(152, 154, 158);
  font-size: 14px;
  

}
.el-row {
  display: flex;
  /* 主轴上居中 */
  /* justify-content: center; */
  /* 侧轴上居中 */
  align-items: center;
}
.chart-container {
  margin: 5px;
}
.titleBold {
  font-size: 22px;
  color: rgb(44, 62, 80);
}
.el-card:hover{
  background-color:rgb(254, 240, 240) !important; 
  border: 1px solid rgb(245, 108, 108)!important
}
  .el-card /deep/ .el-card__header{
    display: flex;
  height: 45px !important;
  align-items: center;
}

</style>

