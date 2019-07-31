<template>
  <div class="test">
    <div>平均值: {{$store.getters.getAverage}}</div>
    <button @click="update">加载更多</button>
    <!-- <div class="list" v-for="item in dataList" :key="item.id">
      <div>{{item.id}}</div>
      <div>{{item.data}}</div>
      <div>{{item.time}}</div>
    </div>-->
    <el-table v-loading="loading" :data="dataList" height="400" border style="width: 100%;">
      <el-table-column prop="id" align="center" label="id" width="100"></el-table-column>
      <el-table-column prop="data" align="center" label="data" width="100"></el-table-column>
      <el-table-column prop="time" label="time" :formatter="formatter"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import mock from '../mock'
import moment from 'moment'
export default {
  name: 'test',
  data () {
    return {
      dataList: [],
      average: '',
      loading: false
    }
  },
  created () {
    this.getdata()
  },
  computed: {},
  methods: {
    getdata () {
      this.loading = true
      mock().then(res => {
        this.loading = false
        this.dataList.push(...res)
        this.$store.commit('mockData', this.dataList)
      })
    },
    update () {
      this.loading = true
      const idx = this.dataList.length
      const newIdx = Math.random() * 10
      mock(idx, newIdx + idx).then(res => {
        this.loading = false
        this.dataList.push(...res)
        console.log(this.dataList)
        this.$store.commit('mockData', this.dataList)
      })
    },
    formatter (row, column) {
      console.log(row)
      return moment(row.time).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style scoped lang="less">
.test {
  .list {
    display: flex;
    flex-direction: row;
  }
  button {
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: blue;
    padding: 10px;
    font-size: 15px;
    color: white;
    width: 100%;
  }
}
</style>
