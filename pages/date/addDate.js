const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
var util = require('../../utils/util.js')
var DateJs = require('../../utils/date.js')
var stage
var id
Page({
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    value: [9999, 1, 1],
    picaddr:[],
    imgList:[],
    bg:'',
    main:false,
    txt:""
  },
  bindDateChange(e) {
      this.setData({
        date: e.detail.value
      })
  },
  txtinput(e) {
    if (typeof (e.detail.value)!="undefined"){
      this.setData({
        txt: e.detail.value
      })
    }
    else{
      this.setData({
        txt: e.currentTarget.id
      })
    }
    console.log(this.data.txt)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.stage+"-----"+options.edit+"-----"+options.id)
    var that=this
    this.setData({
      edit: options.edit
    })
    stage = options.stage
    if (typeof (options.id)!="undefined"){
      id = options.id
    }
    
    wx.getStorage({
      key: options.stage,
      success: res => {
        this.setData({
          List: res.data
        })
        //处于修改状态
        if(this.data.edit==1){
          this.setData({
            ListItem: res.data[options.id - 1],
            txt: res.data[options.id - 1].name,
            date: res.data[options.id - 1].date
          })
        }
      }
    })
    
  },
  choose() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        var tempFilePaths = res.tempFilePaths[0]
        this.setData({
          picaddr: tempFilePaths
        })
      }
    })
  },
  preview(e) {
    var src = e.currentTarget.id;
    var _this = this
    _this.data.imgList.push(src)
    this.setData({
      imgList: _this.data.imgList
    })
    wx.previewImage({
      urls: _this.data.imgList,
    })
    this.setData({
      imgList: []
    })
  },
  isMain(){
    var that = this
    this.data.main=!this.data.main
    if (that.data.main == true) {
      for (let i = 0; i < this.data.List.length; i++) {
        this.data.List[i].main = false
      }
    }else{
      this.setData({
        main: that.data.main
      })
    }
    
  },
  create(){
    if (this.data.txt == ""){
      wx.showModal({
        title: '文本不能为空',
        content: '请在文本框中输入内容',
      })
      return ;
    }
    var res=-1
    if(stage=="pass")
       res = DateJs.DateTime(this.data.date, util.formatTime(new Date()))
    else
      res = DateJs.DateTime(util.formatTime(new Date()), this.data.date)
   
    if (res<0){
      wx.showModal({
        title: '请选择正确的时间',
        content: '请重新选择时间',
        success:res=>{
          this.setData({
            date:''
          })
        }
      })
      return;
    }
    var that = this
    var len = this.data.List.length
    var ran = (String)(parseInt(Math.random() * 17) + 1)
    if ((ran - '0') < 10) {
      this.data.bg = 'https://www.yunteng0923.cn/MakeYouListen/pic/time0' + ran + '.jpg'
    } else {
      this.data.bg = 'https://www.yunteng0923.cn/MakeYouListen/pic/time' + ran + '.jpg'
    }
    var item={
      "id":len+1,"name":this.data.txt,
      "bg": this.data.bg,"date": this.data.date,
      "sub":res,"main": this.data.main}
    this.data.List.push(item)
    this.setData({
      List:that.data.List
    })
    console.log(stage)

    wx.setStorage({
      key: stage,
      data: that.data.List,
      success: function (res) {
        // console.log("成功: "+that.data.List.length+"----阶段： "+stage)
        wx.reLaunch({
          url: './date?refurbish=true',
        })
      }
    })
    
  },
  cancel() {
    wx.reLaunch({
      url: './date?refurbish=true',
    })
  },
  save() {
    var that=this
    if (this.data.txt == "") {
      wx.showModal({
        title: '文本不能为空',
        content: '请在文本框中输入内容',
      })
      return;
    }
    var res=-1
    if (stage == "pass")
      res = DateJs.DateTime(this.data.date, util.formatTime(new Date()))
    else
      res = DateJs.DateTime(util.formatTime(new Date()), this.data.date)
    console.log(res)
    if (res < 0) {
      wx.showModal({
        title: '请选择正确的时间',
        content: '请重新选择时间',
        success: res => {
          this.setData({
            date: ''
          })
        }
      })
      return;
    }
    this.data.List[id-1].name=this.data.txt
    this.data.List[id-1].date = this.data.date
    this.data.List[id-1].main = this.data.main
    this.setData({
      List: that.data.List
    })
    // console.log(stage)
    
    wx.setStorage({
      key: stage,
      data: that.data.List,
      success:res=>{
        // console.log("txt:"+that.data.txt)
        wx.reLaunch({
          url: './date?refurbish=true',
        })
      }
    })
    
  },
  delet() {
    var that=this
    this.data.List.splice(id-1,1)
    this.setData({
      List: that.data.List
    })
    wx.setStorage({
      key: stage,
      data: that.data.List
    })
    console.log(this.data.List.length)
    wx.showModal({
      title: '删除',
      content: '成功！',
      success:res=>{
        wx.reLaunch({
          url: './date?refurbish=true',
        })
      }
    })
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})