const app=getApp()
Page({
  data:{
    imgList:[],
   //判断小程序的API，回调，参数，组件等是否在当前版本可用。
   // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
/****用户授权*** */


  /***下拉刷新 */
  onPullDownRefresh: function () {

    wx.reLaunch({
      url: './story',
    })
  }, 

  onLoad(options){
    //显示表白列表
    var that = this;

  
    wx.request({
      method: "GET",
      url: 'https://www.yunteng0923.cn/MakeYouListen/lovewall/showAllLove',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:  res=> {
        
        this.setData({
          professList: res.data.allLoves
        })
      }
  })
   // app.getOpenId();
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
//图片预览
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
  },
  onShareAppMessage() {
    return {
      title: '给你爱的他/她',
      imageUrl: 'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=4189426594,1205851465&fm=202&mola=new&crop=v1',
      path: '/pages/story/story',
      // success: function (res) {

      // }
    }
  }
})