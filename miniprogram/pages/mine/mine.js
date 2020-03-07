// miniprogram/pages/mine/mine.js 
const app = getApp()
Page({

  /** 
   * 页面的初始数据 
   */
  data: {
    isHide:true,
    avatarUrl: "",//用户头像 
    nickName: "",//用户昵称 
    naglist: [
      { imgurl: "../../images/icon_signal_fill.png", text: "我的发布",page:"../myshare/myshare" },
      { imgurl: "../../images/icon_likegood_fill.png", text: "点赞评论", page: "../likeandfav/likeandfav" },
      { imgurl: "../../images/icon_namecard_fill.png", text: "我的匿名", page: "../myhide/myhide" }
    ],
    nag2list: [
      { imgurl: "../../images/icon_dmail_fill.png", text: "私信我们", page: "../sendform/sendform" },
      { imgurl: "../../images/icon_dingtalk.png", text: "建议箱", page: "../sendform/sendform"},
      { imgurl: "../../images/icon_service_fill.png", text: "关于我们", page: "../aboutus/aboutus" },
    ]
    
    

  },

  /** 
   * 生命周期函数--监听页面加载 
   */
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '我的',
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#FF6666',
    })
    var that = this;
    var userinfo = app.globalData.userinfo;
    // console.log("userinfo",userinfo)
    if (!userinfo.userInfo){
      that.setData({
        isHide:true,
        avatarUrl: "",
        nickName: ""
      })
    }else{
      that.setData({
        isHide: false,
        avatarUrl: userinfo.userInfo.avatarUrl,
        nickName: userinfo.userInfo.nickName
      })
    }
  },

  bindGetUserInfo: function (res) {
    if (res.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(res.detail);
      app.globalData.userinfo = res.detail
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide:false,
        avatarUrl: app.globalData.userinfo.userInfo.avatarUrl,
        nickName: app.globalData.userinfo.userInfo.nickName
      })
    } else {
      //用户按了拒绝按钮
      console.log("用户拒绝了")
      that.setData({
        isHide: true
      })
    }
  }
})