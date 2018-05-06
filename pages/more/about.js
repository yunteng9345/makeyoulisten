const app=getApp()
var proData=require('../../data/indexData.js')
Page({
  data:{

  },
  onLoad(){
    this.setData({
      about: proData.proList.data.about
    })
  }
})