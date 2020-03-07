// miniprogram/pages/send/send.js

const app = getApp()
const db = wx.cloud.database()
const request = require('../../api/request.js')
Page({

  data: {
    texts: ""
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '联系我们',
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    })
    if (!app.globalData.userinfo.userInfo) {
      wx.redirectTo({
        url: '../../pages/authorization/authorization?type=mine',
      })

      return;
    }
  },

  setText: function (e) {
    this.setData({
      texts: e.detail.value
    });
  },


  searchBox: function (e) {
    // wx.showLoading({
    //   title: '上传中...',
    // })
    var that = this;
    var texts = that.data.texts;
    if (texts === "") {
      wx.hideLoading();
      wx.showToast({
        title: '输入框不能为空!',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.redirectTo({
      url: '../thanks/thanks',
    })
  }
  })