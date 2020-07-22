<template>
  <section class="chart-container">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-row>
          <el-col :span="24">
            <cardPie2 :values="utilList1"></cardPie2>
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

      <el-col :span="18" offset="1">
        <el-dialog title="GPU信息" :visible.sync="dialogTableVisible" class="gpuInfoDialog">
          <!-- <el-divider></el-divider> -->
         
            <div>
            <el-row>
              <el-col :span="10" offset="1">
                <label class="infoLabel">GPU-Util</label>
              </el-col>
              <el-col :span="10">
                <span class="infoContent">GPU利用率</span>
                 <span class="infoContentTitle"> 23% </span>
                 <span class="infoContent"></span>
              </el-col>
            </el-row >
            <el-row style="margin-top:12px">
              <el-col :span="10" offset="1">
                <label class="infoLabel"> Memory-Usage </label>
              </el-col>
              <el-col :span="13">
                <span class="infoContent">可分配</span>
                 <span class="infoContentTitle"> 10.2 </span>
                 <span class="infoContent">GiB</span>
                  <span class="infoContentTitle"> / </span>
                 <span class="infoContent">总量</span>
                 <span class="infoContentTitle"> 10.2 </span>
                 <span class="infoContent">GiB</span>
              </el-col>
            </el-row>
            <el-row style="margin-top:12px">
              <el-col :span="10" offset="1">
                <label class="infoLabel"> GPU-Perf </label>
              </el-col>
              <el-col :span="10">
                <span class="infoContent">GPU当前性能</span>
                 <span class="infoContentTitle"> P8 </span>
                 <span class="infoContent"></span>
              </el-col>
            </el-row>
            <el-row style="margin-top:12px">
              <el-col :span="10" offset="1">
                <label class="infoLabel"> GPU-Fan </label>
              </el-col>
              <el-col :span="10" >
                <span class="infoContent">当前风扇转速</span>
                 <span class="infoContentTitle"> 23% </span>
                 <span class="infoContent"></span>
              </el-col>
            </el-row>
            <el-row style="margin-top:12px">
              <el-col :span="10" offset="1">
                <label class="infoLabel"> GPU-Temp </label>
              </el-col>
              <el-col :span="10">
               <span class="infoContent">当前温度</span>
                 <span class="infoContentTitle"> 25C </span>
                 <span class="infoContent"></span>
              </el-col>
            </el-row>
            
          </div>

          
        </el-dialog>

        <el-row>
          <el-col :span="7">
            <cardPie :values="list1" @click.native="clickCard"></cardPie>
          </el-col>

          <el-col :span="7">
            <cardPie :values="list2"></cardPie>
          </el-col>
          <el-col :span="7">
            <cardPie :values="list3"></cardPie>
          </el-col>
        </el-row>

        <el-row>
          <!-- <el-popover placement="right" width="300" trigger="click" title="详细信息">
            <div>
              <el-row>
              <el-col :span="8">
                <label>GPU利用率</label>
              </el-col>
              <el-col :span="16">
                <span>20%</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <label>GPU利用率</label>
              </el-col>
              <el-col :span="16">
                <span>20%</span>
              </el-col>
            </el-row>
            </div>
            
            <cardPie :values="list4"  @click.native="alert1()" slot="reference"></cardPie>
          </el-popover> -->
          <el-col :span="7">
            <cardPie :values="list4"></cardPie>
          </el-col>
          <el-col :span="7">
            <cardPie :values="list5"></cardPie>
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
export default {
  data() {
    return {
      chartPie: null,
      list1: {
        cpuUtil: 2,
        cpuTotal: 4,
        gpuUtil: 3,
        gpuTotal: 4,
        index1: 1,
        index2: 2
      },
      list2: {
        cpuUtil: 2,
        cpuTotal: 3,
        gpuUtil: 3,
        gpuTotal: 4,
        index1: 3,
        index2: 4
      },
      list3: {
        cpuUtil: 2,
        cpuTotal: 4,
        gpuUtil: 3,
        gpuTotal: 6,
        index1: 5,
        index2: 6
      },
      list4: {
        cpuUtil: 2,
        cpuTotal: 5,
        gpuUtil: 3,
        gpuTotal: 4,
        index1: 7,
        index2: 8
      },
      list5: {
        cpuUtil: 2,
        cpuTotal: 4,
        gpuUtil: 1,
        gpuTotal: 3,
        index1: 9,
        index2: 10
      },
      utilList1: { util: 2, total: 6, index1: 11 },
      utilList2: { util: 3, total: 6, index1: 12 },
      utilList3: { util: 4, total: 6, index1: 13 },
      dialogTableVisible: false
    };
  },
  components: {
    cardPie,
    cardPie2
  },
  methods: {
    clickCard() {
      console.log("click");
      this.dialogTableVisible = true;
    },
    
  }
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
.infoPopover{
  background-color: bisque;
}
.infoLabel{
  font-size: 16px;
  color: rgb(100, 100, 100); ;
}
.infoContent{
font-size: 12px;
}
.infoContentTitle{
  font-size: 16px;
}
</style>
