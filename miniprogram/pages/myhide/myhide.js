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
      title: '我的匿名',
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
    request.getMyHide(wx.getStorageSync('openid'), res => {
      var arr = res.data.data
      arr.forEach(r => {
        r.date = utils.getInterval(r.millionSeconds)
        r.flag = utils.getIconImg(r.hide.type)
        if (r.hide.openId === openid) {
          r.candele = true
        } else {
          r.candele = false
        }
        var imgs = r.hide.imgList
        if (imgs.length > 0) {
          imgs.forEach(r => {
            var oldimg = r.imgUrl
            r.imgUrl = app.globalData.filePath + oldimg
          })
          r.hide.imgList = imgs
        }
        console.log(arr)
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
      if (products[i].hide.id === e.detail) {
        products.splice(i, 1)
      }
    }
    that.setData({
      products: products
    })
  },

  onPullDownRefresh: function () {
    var that = this;
    that.loaddata();
  }
})
