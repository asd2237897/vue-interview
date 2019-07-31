import Vue from 'vue'
import Vuex from 'vuex'
import mockGenerator from './mock'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataList: []
  },
  mutations: {
    mockData (state, arr) {
      state.dataList = arr
    }
  },
  getters: {
    getAverage: state => {
      let num = 0
      let idx = 0
      state.dataList.forEach(v => {
        num += v.data
        idx++
      })
      num = num / idx
      return num.toFixed(2)
    },
    getData: state => state.dataList
  },
  actions: {
    getDataCall (context) {
      // TODO
      mockGenerator()
    }
  }
})
