/* eslint-disable */
<template>

  <el-container>

    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">

        <el-menu-item index="1">首页   </el-menu-item>
        <el-menu-item index="2">算法商城   </el-menu-item>

        <el-menu-item index="3" @click="gotoDashBard">控制台   </el-menu-item>
        <el-menu-item index="4">典型案例   </el-menu-item>
        <el-menu-item index="5">关于我们   </el-menu-item>

      </el-menu>
    </el-header>
    <el-main>

      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="item in imgList" :key="item.id" v-el-height-adaptive-table>
          <img ref="imgHeight" :src="item.idView" class="banner_img">
        </el-carousel-item>
      </el-carousel>
      <el-divider><i class="el-icon-switch-button" /></el-divider>
      <br>
      <br>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <img src="@/assets/img/m1.png" class="">
        </el-col>
      </el-row>
      <br>
      <br>

      <el-row><el-row :gutter="20">
        <el-col :span="6" />
        <el-col :span="6" offset="6"> <img src="@/assets/img/m2.png" class=""></el-col>
        <el-col :span="6" offset="1"> <img src="@/assets/img/m3.png" class=""></el-col>
        <el-col :span="6" />
      </el-row></el-row>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>

      <el-footer>
        <el-divider><i class="el-icon-switch-button" /></el-divider>
        <br>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>我们的团队</span>
                <el-button style="float: right; padding: 3px 0" type="text">显示</el-button>
              </div>
              <div v-for="o in 6" :key="o" class="text item">
                {{ '列表内容 ' + o }}
              </div>
            </el-card></el-col>

          <el-col :span="16">
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
        <el-divider><i class="el-icon-switch-button" /></el-divider>
        <br>
        <br>
        <br>
        <div class="footer">@2020 </div>
      </el-footer>
    </el-main>
  </el-container>

</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      imgList: [
        { id: 0, idView: require('@/assets/img/1.jpg') },
        { id: 1, idView: require('@/assets/img/2.jpg') },
        { id: 2, idView: require('@/assets/img/3.jpg') },
        { id: 3, idView: require('@/assets/img/4.jpg') }
      ]

    }
  },
  methods: {
    gotoDashBard() {
      this.$router.push({ path: '/App.vue' })
    }
  }
}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .el-menu{
    position:absolute;
    left:50%;
    transform:translateX(-50%)
  }
  .el-menu-item{
    font-size:20px
  }

  .footer{
    text-align:center
  }

</style>
