// miniprogram/pages/authorization/authorization.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '信息授权',
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    })
    console.log("传递的type:",options.type)
    this.setData({
      type:options.type
    })
  },

  bindGetUserInfo: function (res) {
    if (res.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(res.detail);
      app.globalData.userinfo = res.detail
      var type = that.data.type;
      that.naviback(type)
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
    } else {
      //用户按了拒绝按钮
     console.log("用户拒绝了")
    }
   },

  naviback:function(e){
    if(e.target == undefined)
      var type = e
    else
      var type = e.target.dataset.type
    if(type === "share"){
      wx.switchTab({
        url: '../index/index',
      })
    }
    if(type === "hide"){
      wx.switchTab({
        url: '../hide/hide',
      })
    }
    if(type === "detail"){
      wx.switchTab({
        url: '../index/index',
      })
    }
    if(type === "hideDetail"){
      wx.switchTab({
        url: '../index/index',
      })
    }
    if(type === "mine"){
      wx.switchTab({
        url: '../mine/mine',
      })
    }
  }
})