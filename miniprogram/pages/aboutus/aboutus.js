// miniprogram/pages/aboutus/aboutus.js
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
      title: '关于我们',
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#FF6666',
    })
  }
})