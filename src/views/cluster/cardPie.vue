<template>
  <div class="page">
    <el-card class="box-card card">
      <div slot="header">
        <el-row type="flex">
          <el-col :span="4" offset="2">
            <i class="el-icon-info el-icon" />
          </el-col>
          <el-col :span="12" offset="4">
            <span class="title">
              <b>Default</b>
            </span>
          </el-col>
        </el-row>
      </div>

      <!-- <section class="chart-container"> -->
        <div>
        <el-row>
          <el-col :span="6">
            <div :id="'pie'+values.index1" style="height:36px;"></div>
          </el-col>
          <el-col :span="14" offset="4">
            <span class="content">
              CPU&nbsp;&#12288;
              <span class="titleBold">{{values.cpuUtil}}</span> /
              <span class="title">{{values.cpuTotal}}</span>
            </span>
          </el-col>
        </el-row>
        </div>
      <!-- </section> -->
      
      <!-- <section class="chart-container"> -->
        <div>
        <el-row  style="margin-top:12px">
          <el-col :span="6">
            <div :id="'pie'+values.index2" style="height:36px;"></div>
          </el-col>
          <el-col :span="14" offset="4">
            <span class="content">
              GPU&nbsp;&#12288;
              <b class="titleBold">{{values.gpuUtil}}</b> /
              <b class="title">{{values.gpuTotal}}</b>
            </span>
          </el-col>
        </el-row>
        </div>
      <!-- </section> -->
      <!-- <el-row tyle="margin-top:12px">
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
      </el-row>-->
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
          cpuUtil:2,
          cpuTotal:6,
          gpuUtil:1,
          gpuTotal:4,
          index1:0,
          index2:0
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
      var pieLeft = '60%'
      var pieTop = '50%'
      this.chartPie.setOption({
        // title: {
        //   text: item.title,
        //   left: titleLeft,
        //   top: titleTop,
        //   textAlign: "center",
        //   textStyle: {
        //     fontWeight: "normal",
        //     fontSize: "16",
        //     color: "#389af4",
        //     textAlign: "center"
        //   }
        // },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            clockWise: false,
            radius: [15, 18],
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
    drawCharts(item) {
      this.drawPieChart(item);
    },

  },
  mounted: function() {
    var item = {
      id:'pie'+this.values.index1,
      title: "pie",
      value: Math.round((this.values.cpuUtil)/(this.values.cpuTotal)*100*10)/10,
      color1:'#389af4',
      color2:'#dfeaff'
    };
    this.drawCharts(item);
    var item2 = {
      id:'pie'+this.values.index2,
      title: "pie",
      value:  Math.round((this.values.gpuUtil)/(this.values.gpuTotal)*100*10)/10,
       color1:'#fd6f97',
      color2: '#fed4e0'
    };
    this.drawCharts(item2);
  }
}
</script>

<style scoped>
.box-card {
  margin-left: 40px;
  margin-top: 15px;
  height: 170px;
  width: 250px;
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
.content {
  color: rgb(152, 154, 158);
  font-size: 18px;
  

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
  font-size: 20px;
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

