// pages/userInfo/userInfo.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    array: ['吉首大学新校区', '吉首大学老校区', '吉首大学张家界校区'],
    age: ['17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'],
    sex: [ '男' ,'女'],
    academy: ['信息科学与工程学院', '物理与机电工程学院', '商学院', '法学与公共管理学院', '体育科学学院', '文学与新闻传播学院', '外国语学院', '国际教育学院', '历史与文化学院', '数学与统计学院', '化学化工学院', '生物资源与环境科学学院', '软件学院', '土木工程与建筑学院','马克思主义学院', '医学院', '国防教育学院', '音乐舞蹈学院', '美术学院', '旅游与管理工程学院', '民族预科与教育学院', '继续教育学院', '师范学院','张家界学院'],
    school_index:0,
    age_index:0,
    sex_index: 0,
    ac_index:0,
    
    

  },
  //性别选择器
  bindPickerChange3: function (e) {

    console.log('picker发送选择改变sex_index，携带年龄值为', e.detail.value)
    this.setData({
      sex_index: e.detail.value
    })
  },
  //普通年龄选择器
  bindPickerChange1: function (e) {
    
    console.log('picker发送选择改变age_index，携带年龄值为', e.detail.value)
    this.setData({
      age_index: e.detail.value
    })
  },
    //普通校区选择器
  bindPickerChange: function (e) {
    console.log('picker发送选择改变school_index，携带校区值为', e.detail.value)
    this.setData({
      school_index: e.detail.value
    })
  },
  //普通学院选择器
  bindPickerChange4: function (e) {
    console.log('picker发送选择改变school_index，携带校区值为', e.detail.value)
    this.setData({
      ac_index: e.detail.value
    })
  },
  

  //用户信息表单提交
  userInfoSubmit: function (e) {
    var that = this;
    console.log("sex的携带值为 "+ e.detail.value.sex_index)  
    
    var username = e.detail.value.username;
    var usersex = this.data.sex[e.detail.value.sex];
    var userage = this.data.age[e.detail.value.age];
    var userschool = this.data.array[e.detail.value.school];
    var useracademy = this.data.academy[e.detail.value.academy];
    console.log('username携带带数据为：', username)
    console.log('sex携带数据为', usersex)
    console.log('userage携带数据为：', userage)
    console.log('school携带数据为：', userschool)
    console.log('academy携带数据为：', useracademy)
    wx.getStorage({
      key: 'openId',
      success: function(res) {
        wx.request({
          method: 'GET',
          url: 'https://www.yunteng0923.cn/MakeYouListen/user/login/alterUserInfo',
          data: {
            'username': username,
            'usersex': usersex,
            'userage': userage,
            'userschool': userschool,
            'useracademy': useracademy,
            'openId':res.data

          },
          header: { 'content-type': 'application/json' },

          success: function (res) {

            wx.showModal({
              title: '提示',
              content: '用户信息修改成功！',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  //修改内容后跳转到首页
                  wx.reLaunch({
                    url: '../index/index',
                  })
                }
              }
            })
            
            console.log('提交表单 成功' + res)
          },

          fail: function (res) {
            console.log('提交表单 失败' + res)
          }

        })



      },
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