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
  },
   //多张图片上传
   /*
    uploadimg(data){
    var that= this,
    i=data.i ? data.i : 0,//当前上传的哪张图片
    success=data.success ? data.success : 0,//上传成功的个数
    fail=data.fail ? data.fail : 0;//上传失败的个数
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'file',//这里根据自己的实际情况改
      formData: null,//这里是上传图片时一起上传的数据
      success: (resp) => {
        success++;//图片上传成功，图片上传成功的变量+1
        console.log(resp)
        console.log(i);
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;//图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        console.log(i);
        i++;//这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) {   //当图片传完时，停止调用          
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }

      }
    });
  }
  */

})