<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeline: [
        {
          timestamp: '2020/7/25',
          title: '验收...',
          content: 'front committed 2020/7/25 20:46'
        },
        {
          timestamp: '2020/7/20',
          title: '现在...',
          content: 'front committed 2020/7/20 20:46'
        },
        {
          timestamp: '2020/7/17',
          title: '跑通了一个demo',
         content: 'RD committed 2020/7/17 20:46'
        },
        {
          timestamp: '2020/7/12',
         title: '在服务器上创建了一个人脸识别的训练',
          content: 'RD committed 2020/7/12 20:46'
        },
        {
          timestamp: '2020/7/10',
          title: '在服务器上创建了一个Mnist数据集训练',
          content: 'RD committed 2020/7/10 20:46'
        }
      ]
    }
  }
}
</script>
