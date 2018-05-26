Page({
  data: {
  
  },
  onLoad: function (options) {
     // console.log(options.id+" "+options.stage)
      wx.getSystemInfo({
        success:res=> {
          this.setData({
            allHeight: res.screenHeight,
            stage: options.stage
          })
        }
      })
  
      wx.getStorage({
        key: options.stage,
        success: res=> {
          this.setData({
            List: res.data,
            ListItem: res.data[options.id - 1]
          })
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})