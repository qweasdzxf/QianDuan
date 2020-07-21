<template>
  <section class="chart-container">
    <el-row>
      <el-col :span="12">
        <div id="chartPie" style="width:100%; height:500px;"></div>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import echarts from "echarts";

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
  methods: {
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
    var item={
        id:'chartPie',
        title:'1',
        value:'50'
    }
      this.drawPieChart(item);
    }
  },

  mounted: function() {
    this.drawCharts("chartPie","test1",50);
  }
  // updated: function () {
  //     this.drawCharts()
  // }
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