var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util=require('../../utils/util.js')
var DateJs = require('../../utils/date.js')
var commonFunction=require('../index/common.js')
var refurbish
Page({
  data: {
    tabs: ["过去", "未来"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    nowTime: '',
    pass:[
      {
        "id": "1",
        "name": "让你听",
        "sub": -1,
        "date": "2018-04-10",
        "bg": "https://www.yunteng0923.cn/MakeYouListen/pic/time08.jpg",
        "main": true
      }
    ],
    future:[
      {
        "id":"1",
        "name": "四六级",
        "sub": -1,
        "date": "2018-06-16",
        "bg": "https://www.yunteng0923.cn/MakeYouListen/pic/time02.jpg",
        "main": true
      }
    ]
  },
  onLoad: function (options) {
    console.log("onLoad")
    var that = this;
    refurbish = options.refurbish
    wx.getSystemInfo({
      success: res=>{
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  //查看是否有用户缓存信息
      wx.getStorageInfo({
        success: res=> {
          console.log(res.keys)
          if (res.keys.length!=0){//如果有缓存
              console.log("有缓存")
              wx.getStorage({
                key: 'pass',
                success: res => {
                  for (let i = 0; i < res.data.length; i++) {
                    res.data[i].sub = DateJs.DateTime(res.data[i].date, util.formatTime(new Date()))
                  }
                  that.setData({
                    pass: res.data
                  })
                },
              })
              wx.getStorage({
                key: 'future',
                success: res => {
                  for (let i = 0; i < res.data.length; i++) {
                    res.data[i].sub = DateJs.DateTime(util.formatTime(new Date()), res.data[i].date)
                    if (res.data[i].sub < 0) res.data[i].sub = 0
                  }
                  that.setData({
                    future: res.data
                  })
                }
              })
          }//如果有缓存
          else{//没有缓存
            console.log("没有缓存")
            wx.setStorage({
              key: 'pass',
              data: that.data.pass,
            })

            wx.setStorage({
              key: 'future',
              data: that.data.future,
            })

            wx.getStorage({
              key: 'pass',
              success: res => {
                for (let i = 0; i < res.data.length; i++) {
                  res.data[i].sub = DateJs.DateTime(res.data[i].date, util.formatTime(new Date()))
                }
                that.setData({
                  pass: res.data
                })
              },
            })
            wx.getStorage({
              key: 'future',
              success: res => {
                for (let i = 0; i < res.data.length; i++) {
                  res.data[i].sub = DateJs.DateTime(util.formatTime(new Date()), res.data[i].date)
                  if (res.data[i].sub < 0) res.data[i].sub = 0
                }
                that.setData({
                  future: res.data
                })
              }
            })
          }
        }
    })// wx.getStorageInfo


    // if (typeof(refurbish)=="undefined"){
    //   wx.setStorage({
    //     key: 'pass',
    //     data: that.data.pass,
    //   })

    //   wx.setStorage({
    //     key: 'future',
    //     data: that.data.future,
    //   })

    //   wx.getStorage({
    //     key: 'pass',
    //     success: res => {
    //       for (let i = 0; i < res.data.length; i++) {
    //         res.data[i].sub = DateJs.DateTime(res.data[i].date, util.formatTime(new Date()))
    //       }
    //       this.setData({
    //         pass: res.data
    //       })
    //     },
    //   })
    //   wx.getStorage({
    //     key: 'future',
    //     success: res => {
    //       for (let i = 0; i < res.data.length; i++) {
    //         res.data[i].sub = DateJs.DateTime(util.formatTime(new Date()), res.data[i].date)
    //         if (res.data[i].sub<0)  res.data[i].sub=0
    //       }
    //       this.setData({
    //         future: res.data
    //       })
    //     },
    //   })
    // }
    
    // else{
    //   wx.getStorage({
    //     key: 'pass',
    //     success: res => {
    //       for(let i=0;i<res.data.length;i++){
    //         res.data[i].sub = DateJs.DateTime(res.data[i].date, util.formatTime(new Date()))
    //       }
    //       this.setData({
    //         pass: res.data
    //       })
    //     },
    //   })
    //   wx.getStorage({
    //     key: 'future',
    //     success: res => {
    //       for (let i = 0; i < res.data.length; i++) {
    //         res.data[i].sub = DateJs.DateTime(util.formatTime(new Date()),res.data[i].date)
    //         if (res.data[i].sub < 0) res.data[i].sub = 0
    //       }
    //       this.setData({
    //         future: res.data
    //       })
    //     },
    //   })
    // }
  },
  onShow() {
    console.log("onShow")
    console.log(refurbish)
      var that = this;

      //查看是否有用户缓存信息
      wx.getStorageInfo({
        success: res => {
          console.log(res.keys)
          if (res.keys.length != 0) {//如果有缓存
            console.log("有缓存")
            wx.getStorage({
              key: 'pass',
              success: res => {
                for (let i = 0; i < res.data.length; i++) {
                  res.data[i].sub = DateJs.DateTime(res.data[i].date, util.formatTime(new Date()))
                }
                that.setData({
                  pass: res.data
                })
              },
            })
            wx.getStorage({
              key: 'future',
              success: res => {
                for (let i = 0; i < res.data.length; i++) {
                  res.data[i].sub = DateJs.DateTime(util.formatTime(new Date()), res.data[i].date)
                  if (res.data[i].sub < 0) res.data[i].sub = 0
                }
                that.setData({
                  future: res.data
                })
              }
            })
          }//如果有缓存
          else {//没有缓存
            console.log("没有缓存")
            wx.setStorage({
              key: 'pass',
              data: that.data.pass,
            })

            wx.setStorage({
              key: 'future',
              data: that.data.future,
            })
          }
        }
      })// wx.getStorageInfo
      
      // if (typeof (refurbish) == "undefined") {
      //   wx.setStorage({
      //     key: 'pass',
      //     data: that.data.pass,
      //   })

      //   wx.setStorage({
      //     key: 'future',
      //     data: that.data.future,
      //   })

      //   wx.getStorage({
      //     key: 'pass',
      //     success: res => {
      //       for (let i = 0; i < res.data.length; i++) {
      //         res.data[i].sub = DateJs.DateTime(res.data[i].date, util.formatTime(new Date()))
      //       }
      //       this.setData({
      //         pass: res.data
      //       })
      //     },
      //   })
      //   wx.getStorage({
      //     key: 'future',
      //     success: res => {
      //       for (let i = 0; i < res.data.length; i++) {
      //         res.data[i].sub = DateJs.DateTime(util.formatTime(new Date()), res.data[i].date) 
      //         if (res.data[i].sub < 0) res.data[i].sub = 0
      //       }
      //       this.setData({
      //         future: res.data
      //       })
      //     },
      //   })
      // }

      // else {
      //   wx.getStorage({
      //     key: 'pass',
      //     success: res => {
      //       for (let i = 0; i < res.data.length; i++) {
      //         res.data[i].sub = DateJs.DateTime(res.data[i].date, util.formatTime(new Date()))
      //       }
      //       this.setData({
      //         pass: res.data
      //       })
      //     },
      //   })
      //   wx.getStorage({
      //     key: 'future',
      //     success: res => {
      //       console.log(util.formatTime(new Date()));
      //       for (let i = 0; i < res.data.length; i++) {
      //         res.data[i].sub = DateJs.DateTime(util.formatTime(new Date()), res.data[i].date)
      //         if (res.data[i].sub < 0) res.data[i].sub = 0

      //       }
      //       this.setData({
      //         future: res.data
      //       })
      //     },
      //   })
      // }
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  showPass(e){
    wx.navigateTo({
      url: './showDate?id=' + e.currentTarget.id + '&stage=pass',
    })
  },
  showFuture(e){
    wx.navigateTo({
      url: './showDate?id=' + e.currentTarget.id + '&stage=future',
    })
  },
  addDate(e){
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: './addDate?stage='+e.currentTarget.id+'&edit=0',
    })
  }
});