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

        <el-row>
           <el-col :span="7">
        <cardPie :values="list1"></cardPie>
      </el-col>

      <el-col :span="7">
        <cardPie :values="list2"></cardPie>
      </el-col>
      <el-col :span="7">
        <cardPie :values="list3"></cardPie>
      </el-col>
     
         
        </el-row>

        <el-row>
          <el-col :span="7">
        <cardPie :values="list4"></cardPie>
      </el-col>
      <el-col :span="8">
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
      list1: { cpuUtil: 2,cpuTotal:4, gpuUtil:3, gpuTotal:4,index1:1,index2:2 },
      list2: {cpuUtil: 2,cpuTotal:3, gpuUtil:3, gpuTotal:4,index1:3,index2:4 },
       list3: {cpuUtil: 2,cpuTotal:4, gpuUtil:3, gpuTotal:6,index1:5,index2:6 },
      list4: { cpuUtil: 2,cpuTotal:5, gpuUtil:3, gpuTotal:4,index1:7,index2:8 },
       list5: {  cpuUtil: 2,cpuTotal:4, gpuUtil:1, gpuTotal:3,index1:9,index2:10 },
       utilList1:{util:2,total:6,index1:11},
       utilList2:{util:3,total:6,index1:12},
       utilList3:{util:4,total:6,index1:13}
    };
  },
  components: {
    cardPie,cardPie2
  }
};
</script>

<style scoped>
.chart-container{
  margin-top: 20px;
}
</style>
