// pages/lovecomment/lovecomment.js
var lno
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    lno = options.lno;
    console.log(lno)
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        
        /*
        wx.request({
          method: 'GET',
          url: 'http://localhost:8080/MakeYouListen/voice/allMessage',
          header: {
            'content-type': 'application/json' // 默认值
          },
          data: {
            tid: tid
          },
          success: function (res) {

            console.log(res.data.theme.tcontent)
            that.setData({
              //Atopic: proData.proList.data.topic[option.tid],
              voice: res.data.allVoice,
              len: res.data.allVoice.length,
              theme: res.data.theme
            })

          }

        })
        */


      },
    })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})