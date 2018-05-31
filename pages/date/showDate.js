var util = require('../../utils/util.js')
var DateJs = require('../../utils/date.js')
var id
var stage

Page({

  data: {
    
  },
  onLoad: function (options) {
     // console.log(options.id+" "+options.stage)
     //var that=this;
      id = options.id 
      stage = options.stage
    
      wx.getSystemInfo({
        success:res=> {
          this.setData({
            allHeight: res.screenHeight,
            stage: options.stage,
           
          })
         console.log(stage)
        }
      })
  
      wx.getStorage({
        key: options.stage,
        success: res=> {
          if(this.data.stage=="pass"){
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].sub = DateJs.DateTime(res.data[i].date, util.formatTime(new Date()))
            } 
            this.setData({
              List: res.data,
              ListItem: res.data[options.id - 1]
            })
          }
          else{
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].sub = DateJs.DateTime(util.formatTime(new Date()), res.data[i].date)
              if (res.data[i].sub < 0) res.data[i].sub=0;
            }
            this.setData({
                List: res.data,
                ListItem: res.data[options.id - 1]
              })
          }
        }
      })
  },
  change(e){
    var that=this
    var ran = (String)(parseInt(Math.random() *17)+1)
    if((ran-'0')<10){
      this.data.ListItem.bg = 'https://www.yunteng0923.cn/MakeYouListen/pic/time0' + ran + '.jpg'
    }else{
      this.data.ListItem.bg = 'https://www.yunteng0923.cn/MakeYouListen/pic/time' + ran + '.jpg'
    }
    this.setData({
      ListItem: that.data.ListItem
    })
  },
  edit(e){
    wx.navigateTo({
      url: './addDate?id=' + e.currentTarget.id + "&stage=" + this.data.stage + "&edit=1" ,
    })
  },
  delet() {
    var that = this
    this.data.List.splice(id - 1, 1)
    this.setData({
      List: that.data.List
    })
    wx.setStorage({
      key: stage,
      data: that.data.List
    })
    console.log(this.data.List.length)
    wx.showModal({
      title: '删除',
      content: '成功！',
      success: res => {
        wx.reLaunch({
          url: './date?refurbish=true',
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})