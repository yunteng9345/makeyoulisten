const app = getApp()
var proData = require('../../data/indexData.js')
Page({
  data: {

  },
  onLoad() {
    this.setData({
      msgList: proData.proList.data.replay,
      notice: proData.proList.data.notice
    })
  }
})
  