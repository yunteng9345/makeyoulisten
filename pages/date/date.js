//const app = getApp()
//var proData = require('../../data/indexData.js')
Page({
  data: {

  },

  onLoad() {
    /**用户授权* */
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              //用户已经授权过
            }
          })
        }
      }
    })
    //
    var that=this;
    wx.request({
      method:"GET",
      url: 'https://www.yunteng0923.cn/MakeYouListen/notice/allNotices',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        that.setData({
          notice: res.data.notices
        })


      }
    })
    
  },
  onPullDownRefresh: function () {

    wx.reLaunch({
      url: './date',
    })
  }
})