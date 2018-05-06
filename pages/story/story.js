const app=getApp()
var proData=require('../../data/indexData.js')
Page({
  data:{

  },
  onLoad(options){
    this.setData({
      storyList: proData.proList.data.story
    })
  }
})