// miniprogram/pages/send/send.js

const app = getApp()
const db = wx.cloud.database()
const utils = require('../../utils/utils.js')
const request = require('../../api/request.js') 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: [],
    hidename: "",
    texts: "",
    type: ""
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '匿名墙发送',
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#663366',
    })

    if (!app.globalData.userinfo.userInfo) {
      wx.redirectTo({
        url: '../../pages/authorization/authorization?type=hide',
      })

      return;
    }

    var that = this;
    var type = options.type;
    
    that.setData({
      type:type,
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

  searchBox: function (e) {
    wx.showLoading({
      title: '上传中...',
    })
    var that = this;
    var texts = that.data.texts;
    var src = that.data.src;
    if (texts === "") {
      wx.hideLoading();
      wx.showToast({
        title: '输入框不能为空!',
        icon: 'none',
        duration: 2000
      })
      return
    }

    for (var i = 0; i < src.length; i++) {
      request.uploadFile(src[i], res => {
        console.log(res)
      })
    }
    var avatar = utils.getHideImg();
    var nickName = utils.getHideName();
    var type = that.data.type;    

    for (var i = 0; i < src.length; i++) {
      request.uploadFile(src[i], res => {
        console.log(res)
      })
    }

    var imgArr = "";
    src.forEach(r => {
      var length = r.length
      if (r.substr(0, 1) === "h")
        var imgUrl = r.substr(11, length)
      else
        var imgUrl = r.substr(9, length)
      imgArr += imgUrl + ","
    })

    
    
    request.insertHide(avatar, texts, nickName, wx.getStorageSync('openid'), type, imgArr, res => {
      // console.log(res)
      if(res.data.msg === "成功"){
        wx.hideLoading();
        wx.navigateBack();
      }else{
        wx.hideLoading();
        wx.showToast({
          title: '发表失败,请稍后再试',
        })
      }
    })
  }
})