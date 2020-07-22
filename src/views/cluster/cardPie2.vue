<template>
  <div class="page">
    <el-card class="box-card card">
      <div>
        <el-row>
          <el-col :span="8">
            <div :id="'pie'+values.index1" style="height:90px;"></div>
          </el-col>
          <el-col :span="12" offset="2">
            <el-row style="margin-top:12px">
              <el-col :span="24">
                <span class="content">就绪节点</span>
              </el-col>
            </el-row>
            <el-row style="margin-top:12px">
              <el-col :span="24">
                  <span class="titleBold">{{values.util}}</span> /
              <span class="title">{{values.total}}</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <!-- </section> -->
    </el-card>
  </div>
</template>
 
<script>
import echarts from "echarts";
export default {
  props: {
    values: {
      type: Object,
      default() {
        return {
          util: 2,
          total:6,
          index1: 0
        };
      }
    }
  },
  data() {
    return {
      // 数据
      data1: [],
      CPUInfo: [
        {
          use: 1,
          total: 2
        }
      ]
    };
  },
  methods: {
    drawPieChart(item) {
      this.chartPie = echarts.init(document.getElementById(item.id));
      var pieLeft = "40%";
      var pieTop = "60%";
      this.chartPie.setOption({
        series: [
          {
            name: "访问来源",
            type: "pie",
            clockWise: false,
            radius: [30, 35],
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
                      return params.value + "%";
                    },
                    position: "center",
                    show: true,
                    textStyle: {
                      fontSize: "18",
                      fontWeight: "bold",
                      color:item.color1
                    }
                  }
                }
              },
              {
                value: 100 - item.value,
                name: "invisible",
                itemStyle: {
                  normal: {
                    color:item.color2
                  },
                  emphasis: {
                    color: item.color2
                  }
                }
              }
            ]
          }
        ]
      });
    },
    drawCharts(item) {
      this.drawPieChart(item);
    }
  },
  mounted: function() {
    var item = {
      id: "pie" + this.values.index1,
      title: "pie",
      value: Math.round((this.values.util)/(this.values.total)*100*10)/10,
      color1: '#a181fc',
      color2:'#e3d9fe'
    };
    this.drawCharts(item);
  }
};
</script>

<style scoped>
.box-card {
  margin-left: 40px;
  margin-top: 15px;
  height: 150px;
  width: 300px;
  /* border-radius: 20px; */
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
.chart-container {
  margin: 5px;
}
.titleBold {
  font-size: 30px;
}
</style>
 
 