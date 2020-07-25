<template>
  <section class="chart-container">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-row class="clusterTitle">
          <el-col :span="24">
            <label>集群节点状态</label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <cardPie2 :values="utilList1"></cardPie2>
          </el-col>
        </el-row>
        <el-row class="clusterTitle">
          <el-col :span="24">
            <label>集群计算资源利用率</label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <cardPie2 :values="utilList2"></cardPie2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <cardPie2 :values="utilList3"></cardPie2>
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="18">
        <el-dialog title="GPU信息" :visible.sync="dialogTableVisible" class="gpuInfoDialog">
          <!-- <el-divider></el-divider> -->
          <div>
            <el-row>
              <el-col :span="10" offset="1">
                <label class="infoLabel">GPU-Util</label>
              </el-col>
              <el-col :span="10">
                <span class="infoContent">GPU利用率</span>
                <span class="infoContentTitle">{{currentGPU.gpuUtil}} %</span>
                <span class="infoContent"></span>
              </el-col>
            </el-row>
            <el-row style="margin-top:12px">
              <el-col :span="10" offset="1">
                <label class="infoLabel">Memory-Util</label>
              </el-col>
              <el-col :span="13">
                <!-- <span class="infoContent">可分配</span>
                <span class="infoContentTitle">10.2</span>
                <span class="infoContent">GiB</span>
                <span class="infoContentTitle">/</span>
                <span class="infoContent">总量</span>
                <span class="infoContentTitle">10.2</span>
                <span class="infoContent">GiB</span>-->
                <span class="infoContent">显存利用率</span>
                <span class="infoContentTitle">{{currentGPU.memoryUtil}} %</span>
                <span class="infoContent"></span>
              </el-col>
            </el-row>
            <el-row style="margin-top:12px">
              <el-col :span="10" offset="1">
                <label class="infoLabel">GPU-Perf</label>
              </el-col>
              <el-col :span="10">
                <span class="infoContent">GPU当前性能</span>
                <span class="infoContentTitle">{{currentGPU.pref}}</span>
                <span class="infoContent"></span>
              </el-col>
            </el-row>
            <el-row style="margin-top:12px">
              <el-col :span="10" offset="1">
                <label class="infoLabel">GPU-Fan</label>
              </el-col>
              <el-col :span="10">
                <span class="infoContent">当前风扇转速</span>
                <span class="infoContentTitle">{{currentGPU.fan}} %</span>
                <span class="infoContent"></span>
              </el-col>
            </el-row>
            <el-row style="margin-top:12px">
              <el-col :span="10" offset="1">
                <label class="infoLabel">GPU-Temp</label>
              </el-col>
              <el-col :span="10">
                <span class="infoContent">当前温度</span>
                <span class="infoContentTitle">{{currentGPU.temp}} C</span>
                <span class="infoContent"></span>
              </el-col>
            </el-row>
          </div>
        </el-dialog>

        <el-row style="margin-top:30px">
          <el-col :span="6">
            <cardPie :values="GPUList[0]" ref="chart0" @click.native="clickCard(GPUList[0])"></cardPie>
          </el-col>

          <el-col :span="6">
            <cardPie :values="GPUList[1]" ref="chart1" @click.native="clickCard(GPUList[1])"></cardPie>
          </el-col>
          <el-col :span="6">
            <cardPie :values="GPUList[2]" ref="chart2" @click.native="clickCard(GPUList[2])"></cardPie>
          </el-col>
          <el-col :span="6">
            <cardPie :values="GPUList[3]" ref="chart3" @click.native="clickCard(GPUList[3])"></cardPie>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <cardPie :values="GPUList[4]" ref="chart4" @click.native="clickCard(GPUList[4])"></cardPie>
          </el-col>
          <!-- <el-col :span="6">
            <cardPie :values="list6" @click.native="clickCard"></cardPie>
          </el-col>-->
          <el-col :span="6">
            <cardPie :values="GPUList[5]" ref="chart5" @click.native="clickCard(GPUList[5])"></cardPie>
          </el-col>
          <el-col :span="6">
            <cardPie :values="GPUList[6]" ref="chart6" @click.native="clickCard(GPUList[6])"></cardPie>
          </el-col>
          <el-col :span="6">
            <cardPie :values="GPUList[7]" ref="chart7" @click.native="clickCard(GPUList[7])"></cardPie>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import echarts from "echarts";
import cardPie from "@/views/cluster/cardPie";
import cardPie2 from "@/views/cluster/cardPie2";
import axios from "axios";
export default {
  data() {
    return {
      chartPie: null,
      // GPUList: [
      //   {
      //     pref: "P2",
      //     temp: 73.0,
      //     fan: 65.0,
      //     gpuUtil: 65.0,
      //     memoryUtil: 0.9791159863471985,
      //   },
      //   {
      //     pref: "P2",
      //     temp: 73.0,
      //     fan: 65.0,
      //     gpuUtil: 65.0,
      //     memoryUtil: 0.9791159863471985,
      //   },
      //   {
      //     pref: "P2",
      //     temp: 73.0,
      //     fan: 65.0,
      //     gpuUtil: 65.0,
      //     memoryUtil: 0.9791159863471985,
      //   },
      //   {
      //     pref: "P2",
      //     temp: 73.0,
      //     fan: 65.0,
      //     gpuUtil: 35.0,
      //     memoryUtil: 0.7291159863471985,
      //   },
      //   {
      //     pref: "P2",
      //     temp: 73.0,
      //     fan: 65.0,
      //     gpuUtil: 68.0,
      //     memoryUtil: 0.5791159863471985,
      //   },
      //   {
      //     pref: "P2",
      //     temp: 73.0,
      //     fan: 65.0,
      //     gpuUtil: 65.0,
      //     memoryUtil: 0.8791159863471985,
      //   },
      //   {
      //     pref: "P2",
      //     temp: 73.0,
      //     fan: 65.0,
      //     gpuUtil: 65.0,
      //     memoryUtil: 0.9791159863471985,
      //   },
      //   {
      //     pref: "P2",
      //     temp: 73.0,
      //     fan: 65.0,
      //     gpuUtil: 65.0,
      //     memoryUtil: 0.9791159863471985,
      //   },
      // ],
      GPUList: [],
      list1: {
        cpuUtil: 2,
        cpuTotal: 4,
        gpuUtil: 3,
        gpuTotal: 4,
        index1: 1,
        index2: 2,
      },
      list2: {
        cpuUtil: 2,
        cpuTotal: 3,
        gpuUtil: 3,
        gpuTotal: 4,
        index1: 3,
        index2: 4,
      },
      list3: {
        cpuUtil: 2,
        cpuTotal: 4,
        gpuUtil: 3,
        gpuTotal: 6,
        index1: 5,
        index2: 6,
      },
      list4: {
        cpuUtil: 2,
        cpuTotal: 5,
        gpuUtil: 3,
        gpuTotal: 4,
        index1: 7,
        index2: 8,
      },
      list5: {
        cpuUtil: 2,
        cpuTotal: 4,
        gpuUtil: 1,
        gpuTotal: 3,
        index1: 9,
        index2: 10,
      },
      utilList1: { util: 2, total: 2, index1: 111, content: "就绪节点" },
      utilList2: { util: 3, total: 6, index1: 121, content: "CPU Core" },
      utilList3: { util: 8, total: 8, index1: 131, content: "GPU Core" },
      dialogTableVisible: false,
      currentGPU: {
        gpuUtil: 23,
        memoryUtil: "",
        perf: "P8",
        fan: 25,
        temp: 25,
      },
    };
  },
  components: {
    cardPie,
    cardPie2,
  },
  methods: {
    //点击卡片后的响应事件
    clickCard(currentClickCard) {
      console.log(currentClickCard);
      this.currentGPU = JSON.parse(JSON.stringify(currentClickCard)); //深拷贝
      console.log(this.currentGPU);
      console.log("click");
      this.dialogTableVisible = true;
    },
    //获取GPU数据
    getGpuData() {
      var url =
        "/train/frontstage/trainTask/workerStatus/1";
      axios
        .get(url)
        .then((response) => {
          //
          console.log("************************");

          this.GPUList = [];
          for (var i = 0; i < response.data.extend.GPUS.length; i++) {
            this.GPUList.push(response.data.extend.GPUS[i]);
            this.GPUList[i].index1 = 2 * i + 1;
            this.GPUList[i].index2 = 2 * i + 2;
            this.GPUList[i].memoryUtil =
              Math.round(this.GPUList[i].memoryUtil * 1000) / 10;
            this.GPUList[i].name='\tGPU'+i;
          }
          console.log("++++++++++++++++");
        })
        .catch((e) => self.$message.error(e.response.data));
    },
    //获取集群的数据
    getClusterData() {
      var url = "/test";
      axios
        .get(url)
        .then((response) => {
          self.$message({
            message: "申请已发送",
            type: "success",
          });
        })
        .catch((e) => self.$message.error(e.response.data));
    },
  },
  created() {
    // for (var i = 0; i < this.GPUList.length; i++) {
    //         this.GPUList[i].index1 = 2 * i + 1;
    //         this.GPUList[i].index2 = 2 * i + 2;
    //         // console.log(this.GPUList[i].memoryUtil);
    //         // console.log(Math.round(this.GPUList[i].memoryUtil*100*10) / 10)
    //         this.GPUList[i].memoryUtil = Math.round(this.GPUList[i].memoryUtil*100*10) / 10;
    //       }
    //       console.log(this.GPUList);

    //轮询请求后端
    var j = 0;
    // var interval=100;
    if(j==0){
        window.setInterval(() => {
      // interval=10000;
      this.getGpuData();
      for (var i = 0; i < this.GPUList.length; i++) {
        var item = "chart" + i;
        this.$refs[item].updateData(this.GPUList[i]);
      }
      j=j+1;
    }, 2000);

    }
    else{
        window.setInterval(() => {
      // interval=10000;
      this.getGpuData();
      for (var i = 0; i < this.GPUList.length; i++) {
        var item = "chart" + i;
        this.$refs[item].updateData(this.GPUList[i]);
      }
    }, 10000);
    }
   
  
  },
  mounted() {
    //获取数据
    this.getGpuData();
    for (var i = 0; i < this.GPUList.length; i++) {
      // this.GPUList[i].memoryUtil = Math.round((this.GPUList[i].memoryUtil+5)%100*10)/10;
      // this.GPUList[i].gpuUtil = (this.GPUList[i].gpuUtil+5)%100;
      var item = "chart" + i;
      this.$refs[item].updateData(this.GPUList[i]);
    }
    // this.getClusterData()
  },
};
</script>

<style scoped>
.chart-container {
  margin-top: 20px;
}
.gpuInfoDialog {
  left: 20%;
  width: 60%;
}
/* .el-row{
  margin-top: 10px;
} */
.infoPopover {
  background-color: bisque;
}
.infoLabel {
  font-size: 16px;
  color: rgb(100, 100, 100);
}
.infoContent {
  font-size: 12px;
}
.infoContentTitle {
  font-size: 16px;
}
/* 左侧的标题 */
.clusterTitle {
  margin-left: 40px;
  margin-top: 15px;
}
</style>
