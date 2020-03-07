// miniprogram/pages/thanks/thanks.js
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
      title: '提交成功',
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    })
  },
  navigator:function(){
    wx.switchTab({
      url: '../mine/mine',
    })
  }
})