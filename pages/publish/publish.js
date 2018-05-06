// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text1:"",
    pics: []
  },
  //上传图片按钮事件跳转
  upload_pic:function(){
    var that = this,
    pics = this.data.pics;

    wx.chooseImage({
      count: 9 - pics.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        　　　　pics = pics.concat(imgsrc);
        that.setData({
          pics: pics
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

  },
  uploadimg: function () {//这里触发图片上传的方法
    var pics = this.data.pics;
    app.uploadimg({
      url: 'http://127.0.0.1:8080/message_board/user/uploadpic',//这里是你图片上传的接口
      path: pics//这里是选取的图片的地址数组
    });
  },



  //滑块是否匿名事件
  switch1Change: function (e) {
    if(e.detail.value==true){
      this.setData({
        text1: "提示：此贴将以墙君的名义发表。"
      })
    }
    else {
      this.setData({
        text1: ""
      })
    }
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },

  
  //提交表单数据
  formSubmit: function (e) {
    var that=this;
    var textarea = e.detail.value.textarea;
    var switch1;
    if (e.detail.value.switch==true)switch1="1";
    else switch1 = "0";
    console.log('textarea携带带数据为：',textarea)
    console.log('switch携带带数据为：',switch1)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      method: 'GET',
      url: 'http://127.0.0.1:8080/message_board/message/publish',
      data: {
        'textarea': textarea,
        'switch1': switch1
      },
      header: { 'content-type': 'application/json' },
      
      success: function (res) {
        //发布内容后跳转到首页
        wx.reLaunch({
          url: '../index/index',
        })
        console.log('提交表单 成功'+res)
      },
      fail: function (res) {
        console.log('提交表单 失败'+res )
      }
      
    })


  },
  formReset: function () {
    console.log('form发生了reset事件')
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