Page({
  data: {
    pic:"https://www.yunteng0923.cn/MakeYouListen/pic/1.png",
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              wx.reLaunch({
                url: '../date/date',
              })
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    // console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      var that = this;
      // 登录
      wx.login({
        success: res => {
          if (res.code) {
            var code = res.code
            var userInfo = e.detail.userInfo
            var nickName = userInfo.nickName
            var gender  //性别 0：未知、1：男、2：女
            if (userInfo.gender == 0) gender = "未知"
            if (userInfo.gender == 1) gender = "男"
            if (userInfo.gender == 2) gender = "女"
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
                //that.wx.openid = res.data.openId;
                //存储sessionID
                wx.setStorage({
                  key: "openId",
                  data: res.data.openId
                })
                //登录成功跳转
                wx.reLaunch({
                  url: '../date/date',
                })
              },

              fail: function (res) {
                console.log('换取openid失败')
              }
            })
            /*
                        },
                        fail: function (res) {
                          console.log("获取用户信息失败！")
                        }
                      })
            */

          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })

    } else {
      console.log('用户按了拒绝按钮');
      //用户按了拒绝按钮
    }
  }
})