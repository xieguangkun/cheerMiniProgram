// miniprogram/pages/send/send.js

const app = getApp()
const db = wx.cloud.database()
const request = require('../../api/request.js')
Page({

  data: {
    src: [],
    avatarUrl: "",//用户头像
    nickName: "",//用户昵称
    texts:"",
    type:"",
    create_time:"1970-01-01"
  },
  
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '杂话墙发送',
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#FF6666',
    })
    if (!app.globalData.userinfo.userInfo) {
      wx.redirectTo({
        url: '../../pages/authorization/authorization?type=share',
      })

      return;
    }

    var that = this;
    var userinfo = app.globalData.userinfo;
    that.setData({
      avatarUrl: userinfo.userInfo.avatarUrl,
      nickName: userinfo.userInfo.nickName
    })
    
  },
    
    

  gotoShow: function () {
    var _this = this
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        console.log(res)
        _this.setData({
          src: res.tempFilePaths
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  
  setText: function (e) {
    this.setData({
      texts: e.detail.value
    });
  },
 

  searchBox:function(e){
    wx.showLoading({
      title: '上传中...',
    })
    var that = this;
    var texts = that.data.texts;
    var avatar = that.data.avatarUrl;
    var nickName = that.data.nickName;
    var src = that.data.src;
    var imgArr = "";
    src.forEach(r=>{
      var length = r.length
      if(r.substr(0,1)==="h")
      var imgUrl = r.substr(11,length)
      else
      var imgUrl = r.substr(9,length)
      imgArr += imgUrl+","
    })
    console.log("imgArr",imgArr)
    if(texts===""){
      wx.hideLoading();
      wx.showToast({
        title: '输入框不能为空!',
        icon: 'none',
        duration: 2000
      }) 
      return
    }
    for (var i = 0;i<src.length;i++){
      request.uploadFile(src[i],res=>{
        console.log(res)
      })
    }
    request.insertShare(avatar, texts,nickName, wx.getStorageSync('openid'), imgArr,res=>{
      console.log(res)
      if(res.data.msg === "成功"){
        wx.hideLoading();
        wx.navigateBack()
      }else{
        wx.hideLoading();
        wx.showToast({
          title: '发表失败，请稍后再试',
        })
      }
  })
  }
})