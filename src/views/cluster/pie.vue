<template>
  <section class="chart-container">
    <el-row>
      <el-col :span="12">
        <div id="chartPie" style="width:100%; height:500px;" />
      </el-col>
      <el-col :span="12">
       
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
         <el-button type="primary" @click="buttonClick">测试</el-button>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import echarts from "echarts";
import axios from "axios";
export default {
  data() {
    return {
      chartPie: null,
      item: {
        name: "装备制造",
        value: 20
      }
    };
  },

  mounted: function() {
    this.drawCharts();
  },
  methods: {
    buttonClick() {
      var url = "http://47.113.97.26:20003/frontstage/trainTask/";
      axios
        .post(url, {
          trainTask: {
            trainTaskCreateTime: "2020-07-21T02:37:59.733Z",
            trainTaskId: 0,
            trainTaskName: "string",
            trainTaskRunningTime: "test",
            trainTaskStatus: 0,
            trainTaskUpdateTime: "2020-07-21T02:37:59.734Z",
            trainTaskUserId: 0,
            trainTaskVersion: 0
          },
          trainTaskConf: {
            trainTaskAiEngine: "string",
            trainTaskAlgorithmId: 0,
            trainTaskConfId: 0,
            trainTaskDatasetId: 0,
            trainTaskDescription: "string",
            trainTaskFinishTime: "2020-07-21T02:37:59.734Z",
            trainTaskId: 0,
            trainTaskLogOutPath: "string",
            trainTaskModelOutPath: "string",
            trainTaskName: "string",
            trainTaskParams: "string",
            trainTaskRunningTime: "string",
            trainTaskSpecification: "string",
            trainTaskStartTime: "2020-07-21T02:37:59.734Z",
            trainTaskStatus: 0,
            trainTaskVersion: 0
          }
        })
        .then(response => {
          self.$message({
            message: "申请已发送",
            type: "success"
          });
        })
        .catch(e => self.$message.error(e.response.data));
    },
    drawPieChart(item) {
      this.chartPie = echarts.init(document.getElementById(item.id));
      this.chartPie.setOption({
        title: {
          text: item.title,
          left: 1 * 20 + 10 + "%",
          top: "65%",
          textAlign: "center",
          textStyle: {
            fontWeight: "normal",
            fontSize: "16",
            color: "#389af4",
            textAlign: "center"
          }
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            clockWise: false,
            radius: [60, 70],
            // center: ["50%", "60%"],

            itemStyle: {
              normal: {
                color: "#389af4",
                shadowColor: "#389af4",
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
            center: [1 * 20 + 10 + "%", "50%"],
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
                      fontSize: "20",
                      fontWeight: "bold",
                      color: "#389af4"
                    }
                  }
                }
              },
              {
                value: 100 - item.value,
                name: "invisible",
                itemStyle: {
                  normal: {
                    color: "#dfeaff"
                  },
                  emphasis: {
                    color: "#dfeaff"
                  }
                }
              }
            ]
          }
        ]
      });
    },
    drawCharts() {
      var item = {
        id: "chartPie",
        title: "1",
        value: "50"
      };
      this.drawPieChart(item);
    }
  }
};
</script>

<style scoped>
/* .chart-container {
  width: 100%;
  float: left;
} */
/* .el-col {
  padding: 30px 20px;
} */
</style>
