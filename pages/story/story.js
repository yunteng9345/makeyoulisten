const app=getApp()
var proData=require('../../data/indexData.js')
Page({
  data:{
    imgList:[]
  },
  onLoad(options){
    this.setData({
      professList: proData.proList.data.profess
    })
  },

//表白跳转
biaobai(){
  wx.navigateTo({
    url: '../publish/publish',
  })
}
,
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