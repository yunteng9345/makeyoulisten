// pages/comment/comment.js
const app = getApp()
var proData = require('../../data/indexData.js')
var tid
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
var tempFilePath;
Page({
  data: {
    isLike: [],
    len:0,
    recordtxt: "点击录音",
  },

  onLoad(option) {
    var that = this;  
    tid = option.tid;
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        wx.request({
          method: 'GET',
          url: 'https://www.yunteng0923.cn/MakeYouListen/voice/allMessage',
          header: {
            'content-type': 'application/json' // 默认值
          },
          data: {
            tid: tid
          },
          success: function (res) {

            console.log(res.data.theme.tcontent)
            that.setData({
              //Atopic: proData.proList.data.topic[option.tid],
              voice: res.data.allVoice,
              len:res.data.allVoice.length,
              theme: res.data.theme
            })

          }

        })


      },
    })



  },

  /*点击录音*/
  press() {

    this.setData({
      recordtxt:"正在录音......",
     
    })

    const options = {
      duration: 60000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 320000,
      format: 'mp3',
      frameSize: 50
    }
    wx.getRecorderManager().start(options)
    recorderManager.onStart(() => {
      console.log('recorder start')
    });
  },

  /*发送保存录音*/
  submit() {

    this.setData({
      recordtxt: "点击录音"
    })


    // var that = this;
    //var tid = option.tid;
    console.log(tid)
    recorderManager.stop();
    recorderManager.onStop((res) => {
      var tempFilePath = res.tempFilePath;// 文件临时路径
      console.log('停止录音', res.tempFilePath)
      //const { tempFilePath } = res
      wx.getStorage({
        key: 'openId',
        success: function (res) {
          console.log(res.data)
          wx.uploadFile({
            url: 'https://www.yunteng0923.cn/MakeYouListen/voice/addVoice',
            filePath: tempFilePath,
            name: 'file',
            header: {
              'content-type': 'multipart/form-data'
            },

            formData: {
              'openId': res.data,
              'tid': tid
            },
            success: function (res) {

              //var data = res.data
              console.log('文件上传成功')

              //跳转后显示录音
              wx.redirectTo({
                url: '../comment/comment?tid='+tid,
              })    
            }
          })

        },
      })
    
        
    })

    console.log("提交录音")
  },



  //播放录音
  playvoice(e) {
   
    var vid = e.currentTarget.id;
    console.log(vid)
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        wx.request({
          method: 'GET',
          url: 'https://www.yunteng0923.cn/MakeYouListen/voice/selectVoiceByVid',
          header: {
            'content-type': 'application/json' // 默认值
          },
          data: {
            vid: vid
          },
          success: function (res) {

            
            innerAudioContext.autoplay = true
            
            innerAudioContext.src = 'https://www.yunteng0923.cn/MakeYouListen/voices/'+res.data.voice.vaddr,
            
          //console.log(res.data.voice.vaddr)
            console.log(innerAudioContext.src)
              innerAudioContext.onPlay(() => {
                console.log('开始播放')
              })
            innerAudioContext.onError((res) => {
              console.log(res.errMsg)
              console.log(res.errCode)
            })

          }




        })

      },
    })
    
    


  },


  /*点赞*/
  clike(e) {
    var id = e.currentTarget.id
    var _this = this
    if (this.data.isLike[id])
      this.data.isLike[id] = !this.data.isLike[id]
    else
      this.data.isLike[id] = !this.data.isLike[id]
    // console.log(this.data.isLike[id])
    this.setData({
      isLike: _this.data.isLike
    })
  }

})
