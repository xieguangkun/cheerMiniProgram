//index.js

const app = getApp()
const utils = require("../../utils/utils.js")
const request = require("../../api/request.js")
const regeneratorRuntime = require('../../miniprogram_npm/miniprogram_npm/regenerator-runtime/index.js')
Page({
  data: {
    avatarUrl: "",//用户头像
    nickName: "",//用户昵称
    arr: [],
    comments: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    products: [],
    dates: [],
    flag: ""
  },


  onLoad: function () {
    if (!app.globalData.userinfo.userInfo) {
      wx.redirectTo({
        url: '../../pages/authorization/authorization?type=mine',
      })

      return;
    }
    wx.setNavigationBarTitle({
      title: '我的杂话',
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#FF6666',
    })
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    that.loaddata();
  },

  loaddata() {
    var that = this;
    var openid = wx.getStorageSync('openid')
    request.getMyShare(wx.getStorageSync('openid'), res => {
      var arr = res.data.data
      arr.forEach(r => {
        r.date = utils.getInterval(r.millionSeconds)
        r.flag = utils.getIconImg("share")
        if (r.share.openId === openid) {
          r.candele = true
        } else {
          r.candele = false
        }
        var imgs = r.share.imgList
        if (imgs.length > 0) {
          imgs.forEach(r => {
            var oldimg = r.imgUrl
            r.imgUrl = app.globalData.filePath + oldimg
          })
          r.share.imgList = imgs
        }
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        wx.hideLoading();
      })
      that.setData({
        products: arr
      })
    })
  },

  deleteid: function (e) {
    console.log(e.detail)
    var that = this;
    var products = that.data.products;
    for (var i = 0; i < products.length; i++) {
      if (products[i].share.id === e.detail) {
        products.splice(i, 1)
      }
    }
    that.setData({
      products: products
    })
  },

  loaduserInfo() {
    // 获取用户信息
  },

  onPullDownRefresh: function () {
    let openid = wx.getStorageSync('openid');
    var that = this;
    that.loaddata();
  }
})
