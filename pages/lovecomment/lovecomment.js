// pages/lovecomment/lovecomment.js
var lno
//var txt
Page({

  /**
   * 页面的初始数据
   */
  data: {
    txt: ''
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
          url: 'https://www.yunteng0923.cn/MakeYouListen/loveComment/allLoveComment',
          header: {
            'content-type': 'application/json' // 默认值
          },
          data: {
            lno: lno
          },
          success: function (res) {

            //console.log(res.data.allLoveComment)
            that.setData({
              //Atopic: proData.proList.data.topic[option.tid],
              loveWallTheme: res.data.loveWallTheme,
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
  
  },
  txtinput(e) {
   this.setData({
      txt: e.detail.value
    })
  },
  submit(option) {
    var _this = this
    
    
      console.log("最后:" + this.data.txt)

      //console.log(option.currentTarget.id)
      wx.getStorage({
        key: 'openId',
        success: function (res) {
         // console.log("baibaiid"+lno)
         // console.log(_this.data.txt)
          wx.request({
            method: 'GET',
            url: 'https://www.yunteng0923.cn/MakeYouListen/loveComment/addLoveComment',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              'lno': lno,
              'openId': res.data,
              'lccontent': _this.data.txt
            },
            success(res){
              console.log("success")

            }

          })
         
        }
      })
      //跳转后显示录音
      wx.redirectTo({
        url: '../lovecomment/lovecomment?lno=' + lno,
      })
  },

})