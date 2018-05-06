const app=getApp()
var proData=require('../../data/indexData.js')
Page({
  data:{

  },
  onLoad(){
    this.setData({
      notice: proData.proList.data.notice
    })
  }
})