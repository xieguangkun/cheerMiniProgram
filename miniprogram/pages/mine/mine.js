// miniprogram/pages/mine/mine.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    naglist:[
      { imgurl:"../../images/icon_signal_fill.png",text:"我的发布"},
      {imgurl:"../../images/icon_likegood_fill.png",text:"点赞评论"},
      { imgurl: "../../images/icon_namecard_fill.png",text:"收藏的店"},
      { imgurl: "../../images/icon_dingtalk.png",text:"收藏的商品"},
      {imgurl:"../../images/icon_namecard_fill.png",text:"优惠券"},
      {imgurl:"../../images/icon_dmail_fill.png",text:"我的私信"}
    ],
    nag2list: [
      { imgurl: "../../images/icon_phone_fill.png", text: "寄信" },
      { imgurl: "../../images/icon_dingtalk.png", text: "调查问卷" },
      { imgurl: "../../images/icon_service_fill.png", text: "联系我们" },
    ],
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              var avatarUrl = 'userInfo.avatarUrl';
              var nickName = 'userInfo.nickName';
              that.setData({
                [avatarUrl]: res.userInfo.avatarUrl,
                [nickName]: res.userInfo.nickName,
              })
            }
          })
        }
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