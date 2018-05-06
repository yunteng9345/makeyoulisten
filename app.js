//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    //var logs = wx.getStorageSync('logs') || []
   // logs.unshift(Date.now())
   // wx.setStorageSync('logs', logs)
    
  },
  getOpenId: function () {
    var that=this;
    // 登录
    wx.login({
      success: res => {
        if (res.code) {
          var code = res.code
          /***获取用户身份信息 */
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var gender  //性别 0：未知、1：男、2：女
              if (userInfo.gender == 0) gender = "未知"
              if (userInfo.gender == 1) gender = "男"
              if (userInfo.gender == 2) gender = "女"
              console.log(nickName);
              console.log(gender);
              //向服务器发起登录请求
              wx.request({
                method: 'GET',
                url: 'https://www.yunteng0923.cn/MakeYouListen/user/login',
                data: {
                  codes: code,
                  encryptedDatas: res.encryptedData,
                  ivs: res.iv,
                  username: nickName,
                  usersex: gender,
                  uicon: userInfo.avatarUrl

                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {

                  console.log('换取openid成功:' + res.data.openId)
                  that.wx.openid = res.data.openId;
                  //存储sessionID
                  wx.setStorage({
                    key: "openId",
                    data: res.data.openId
                  })

                },
                fail: function (res) {
                  console.log('换取openid失败')
                }

              })


            },
            fail: function (res) {
              console.log("获取用户信息失败！")
            }
          })


        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  wx:{
    openid:''
  }
})