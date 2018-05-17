const app=getApp()
Page({
  data:{
    imgList:[]
   // imgUrls:[],
    //damoHeight: '100',//demo高度
    //arry: [false],//图片数组是否显示
  },
  /***下拉刷新 */
  onPullDownRefresh: function () {

    wx.reLaunch({
      url: './story',
    })
  }, 

  //滚动页面实行懒加载
  /*
  onPageScroll: function (res) {
    var _this = this;
    //console.log(res.scrollTop);
    var str = parseInt(res.scrollTop / _this.data.damoHeight);
    _this.data.arry[str] = true;
    _this.setData({
      arry: _this.data.arry
    })
  },
  */


  onLoad(options){
  
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
        /*
        for (let i = 0; i < this.data.professList.length;i++){
          this.data.imgUrls[i] = 'https://www.yunteng0923.cn/MakeYouListen/pic/'+this.data.professList[i].picaddr
        }
        this.setData({
          imgUrls: that.data.imgUrls
        })

        */
        //console.log(this.data.imgUrls.length)

      }
  })
    app.getOpenId();
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
      path: 'page/story/story',
      // success: function (res) {

      // }
    }
  }
})