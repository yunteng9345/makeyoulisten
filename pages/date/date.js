var app = getApp();
Page({
  data: {
    animationData: {},
    cardInfoList: [{
      cardUrl: 'http://dev.wemart.cn/console/images/card/card3.png',
      cardInfo: {
        cardTitle: '四级',
        cardInfoMes: '距离四级还有48天',
        cardTime: "2018.06.18"
      }
    }, {
      cardUrl: 'http://dev.wemart.cn/console/images/card/card2.png',
      cardInfo: {
        cardTitle: '六级',
        cardInfoMes: '距离四级还有38天',
        cardTime: "2018.06.18"
      }
    }, {
      cardUrl: 'http://dev.wemart.cn/console/images/card/card1.png',
      cardInfo: {
        cardTitle: '端午节',
        cardInfoMes: '距离四级还有28天',
        cardTime:"2018.06.18"
      }
    }]
  },
  //事件处理函数
  slidethis: function (e) {
    // console.log(e);
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'cubic-bezier(.8,.2,.1,0.8)',
    });
    var self = this;
    this.animation = animation;
    this.animation.translateY(-420).rotate(-5).translateX(0).step();
    this.animation.translateY(62).translateX(25).rotate(0).step();
    this.setData({
      animationData: this.animation.export()
    });
    setTimeout(function () {
      var cardInfoList = self.data.cardInfoList;
      var slidethis = self.data.cardInfoList.shift();
      self.data.cardInfoList.push(slidethis);
      self.setData({
        cardInfoList: self.data.cardInfoList,
        animationData: {}
      });
    }, 350);
  },
  buythis: function (e) {
    console.log(e);
    app.buyDetail = this.data.cardInfoList[e.target.id];
    wx.navigateTo({
      url: '../detail/detail'
    });
  },
  onLoad: function () {
    console.log('onLoad');
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getOpenId(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      });
    });
  }
})
