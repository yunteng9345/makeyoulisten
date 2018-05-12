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
        
        
        wx.request({
          method: 'GET',
          url: 'http://localhost:8080/MakeYouListen/loveComment/allLoveComment',
          header: {
            'content-type': 'application/json' // 默认值
          },
          data: {
            lno: lno
          },
          success: function (res) {

            console.log(res.data.allLoveComment)
            that.setData({
              //Atopic: proData.proList.data.topic[option.tid],
              
              allloveComment: res.data.allLoveComment

            })

          }

        })
        


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