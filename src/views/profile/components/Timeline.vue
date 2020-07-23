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
          timestamp: '2020/7/20',
          title: 'Now...',
          content: 'front committed 2019/4/20 20:46'
        },
        {
          timestamp: '2020/7/17',
          title: 'Run a demo',
         content: 'RD committed 2020/7/17 20:46'
        },
        {
          timestamp: '2020/7/12',
         title: 'Create an face recognition trainTask on the server',
          content: 'RD committed 2020/7/12 20:46'
        },
        {
          timestamp: '2020/7/10',
          title: 'Create an mnist trainTask on the server',
          content: 'RD committed 2020/7/10 20:46'
        }
      ]
    }
  }
}
</script>
