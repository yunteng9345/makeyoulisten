const app = getApp()
var proData = require('../../data/indexData.js')
Page({
  data: {

  },
  onLoad() {
    var that =this;
    wx.request({
      method:'GET',
      url: 'https://www.yunteng0923.cn/MakeYouListen/notice/allNotices',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          notice:res.data.notices
        })
      
      }
    })
    
  }
})
  