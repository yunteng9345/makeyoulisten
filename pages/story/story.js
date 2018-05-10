const app=getApp()
var proData=require('../../data/indexData.js')
Page({
  data:{
    imgList:[]
  },
  onLoad(options){
   var that = this;
    wx.request({
      method: "GET",
      url: 'http://localhost:8080/MakeYouListen/lovewall/showAllLove',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          professList: res.data.allLoves
        })
      }
    })
  },

//表白跳转
biaobai(){
  wx.navigateTo({
    url: '../publish/publish',
  })
}
,
//跳转到表白评论页面
lovecomment(e) {
  var lno = e.currentTarget.id
  wx.navigateTo({
    url: "../lovecomment/lovecomment?lno=" + lno
  })
  console.log("跳转页面id"+lno)
},
  preview(e){
    var src = e.currentTarget.dataset.src;
    var _this=this
    _this.data.imgList.push(src)
    this.setData({
      imgList:_this.data.imgList
    })
    wx.previewImage({
      // current: src, 可左右滑动
      urls: _this.data.imgList,
    })
    this.setData({
      imgList: []
    })
  }
})