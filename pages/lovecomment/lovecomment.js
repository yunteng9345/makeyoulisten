// pages/lovecomment/lovecomment.js

var lno
Page({
  data: {
    txt: '',
    uicon: '',
    uname: '',
    imgList:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    lno = options.lno;
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        wx.request({
          method: 'GET',
          url: 'https://www.yunteng0923.cn/MakeYouListen/loveComment/allLoveComment',
          header: { 'content-type': 'application/json' },
          data: { lno: lno },
          success: res => {
            that.setData({
              loveWallTheme: res.data.loveWallTheme,
              allLoveComment: res.data.allLoveComment
            })
            var thats = that
            wx.request({
              url: 'https://www.yunteng0923.cn/MakeYouListen/user/showUserDetail',
              header: { 'content-type': 'application/json' },
              data: { openId: that.data.loveWallTheme.openid },
              success: res => {
                thats.setData({
                  uicon: res.data.userDetail.uicon,
                  uname: res.data.userDetail.uname
                })
                // console.log(res.data.userDetail.uicon)
              }
            })
            that.setData({
              uicon: thats.data.uicon,
              uname: thats.data.uname
            })
          }
        })
        

      },
    })
    this.setData({
      uicon: that.data.uicon,
      uname: that.data.uname
    })
  },
  txtinput(e) {
    this.setData({
      txt: e.detail.value
    })
  },
  submit(option) {
    var _this = this
    var lno = option.currentTarget.id

    console.log("最后:" + this.data.txt + "---" + option.currentTarget.id)
    if (this.data.txt!=""){
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        wx.request({
          method: 'GET',
          url: 'https://www.yunteng0923.cn/MakeYouListen/loveComment/addLoveComment',
          header: { 'content-type': 'application/json' },
          data: {
            'lccontent': _this.data.txt,
            'openId': res.data,
            'lno': lno
          }
        })
      }
    })
    //跳转后显示录音
    wx.redirectTo({
      url: './lovecomment?lno=' + lno,
    })
    }
    else {
      wx.showModal({
        title: '文本不能为空',
        content: '请在文本框中输入内容',
      })
    }
  },
  preview(e) {
    var src = e.currentTarget.dataset.src;
    var _this = this
    _this.data.imgList.push(src)
    this.setData({
      imgList: _this.data.imgList
    })
    wx.previewImage({
      // current: src, 可左右滑动
      urls: _this.data.imgList,
    })
    this.setData({
      imgList: []
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
  /*
  onPullDownRefresh: function () {
    wx.reLaunch({
      url: "../lovecomment/lovecomment?lno=" + lno
    })
  },
  */

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