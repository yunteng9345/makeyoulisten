// pages/publish/publish.js
var tempFilePaths;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text1: "",
    picaddr:[],
    imgList:[]

  },

  //滑块是否匿名事件
  switch1Change: function (e) {
    if (e.detail.value == true) {
      this.setData({
        text1: "提示：此贴将以匿名发表。"
      })
    }
    else {
      this.setData({
        text1: ""
      })
    }
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },
  choose() {
    var that =this;

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        tempFilePaths = res.tempFilePaths[0]
      that.setData({
        picaddr:tempFilePaths
      })
      }
    })
    /*
    if (tempFilePaths[0] == '0') {
      wx.showModal({
        title: '温馨提示',
        content: '为了页面的美观，必须放一张图片！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            //修改内容后跳转到首页
            wx.reLaunch({
              url: '../publish/publish',
            })
          }
        }
      })
    }
    */

  },

  //提交表单数据
  formSubmit: function (e) {
    var that = this;
    if (this.data.picaddr.length==0){
      wx.showModal({
        title: '温馨提示',
        content: '为了页面的美观，必须放一张图片！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            //修改内容后跳转到首页
            wx.reLaunch({
              url: '../publish/publish',
            })
          }
        }
      })
    }
    
    var textarea = e.detail.value.textarea;
    var switch1;
    if (e.detail.value.switch == true) switch1 = "1";
    else switch1 = "0";
    console.log('textarea携带带数据为：', textarea)
    console.log('switch携带带数据为：', switch1)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        wx.uploadFile({
           
          url: 'http://localhost:8080/MakeYouListen/lovewall/publish',
          filePath: tempFilePaths,
          name: 'picfile',
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'

          },
          method: "POST", 
          formData: {
            'openId': res.data,
            'textarea': textarea, 
            'switch1': switch1,
          },
          success: function (res) {
            console.log('文件上传成功')
            wx.reLaunch({
              url: '../story/story',
            })
          }
        })


      },
    })
    
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },

  preview(e) {
    var src = e.currentTarget.id;
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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