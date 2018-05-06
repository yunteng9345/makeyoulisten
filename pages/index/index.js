//index.js
//获取应用实例
const app = getApp()
var proData=require('../../data/indexData.js')
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperList: [
      
      {
        "url": "https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=a8ce266cb151f819e5280b18bbdd2188/0bd162d9f2d3572c80033c9b8b13632763d0c390.jpg",
        
        "title": "吉首大学1"
      },
      {
        "url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525271415784&di=785e831556747eff673ac8d2d9882493&imgtype=0&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20131113%2F20131113105559-663255273.jpg",
        "title": "吉首大学2"
      },
      {
        "url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525271435266&di=42ee65565ebbf6a85aa3ac2a96db7853&imgtype=0&src=http%3A%2F%2Fs15.sinaimg.cn%2Fbmiddle%2F4a6a305cg59dc55cc5e5e",
        "title": "吉首大学3"
      }
    ],
    isLike: [],
    len:0,
    comment_count:[]
  },
  /***下拉刷新 */
  onPullDownRefresh: function () {
    wx.startPullDownRefresh()
  },  
  onLoad: function () {

    var that =this;
    wx.request({
      method: "GET",
      url: 'https://www.yunteng0923.cn/MakeYouListen/theme/showAllTheme',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          dataList: res.data.themes
        })
      }
    })
    //app.getOpenId();
    console.log('onLoad')
    app.getOpenId();
    /*wx.getStorage({
      key: 'openId',
      success: function(res) {
      wx.request({
        method:"GET",
        url: 'https://www.yunteng0923.cn/MakeYouListen/theme/showAllTheme',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success :function(res) {
          that.setData({

            dataList: res.data.themes
          })
          
        }
        
      })
      },
    })*/
    
  },
  comment(e){
    var tid = e.currentTarget.id
    wx.navigateTo({
      url: "../comment/comment?tid=" + tid
    })
  },
  like: function (e) {
    var id = e.currentTarget.id
    
    if (this.data.isLike[id])
      this.data.isLike[id] =!this.data.isLike[id]
    else
      this.data.isLike[id] = !this.data.isLike[id]
    
    // console.log(this.data.isLike[id])
    this.setData({
      isLike: this.data.isLike
    })
  }
})
