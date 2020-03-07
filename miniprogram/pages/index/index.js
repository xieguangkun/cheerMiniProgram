//index.js

const app = getApp()
const db = wx.cloud.database()
const utils = require("../../utils/utils.js")
const request = require("../../api/request.js")
const regeneratorRuntime = require('../../miniprogram_npm/miniprogram_npm/regenerator-runtime/index.js')
Page({
  data: {
    // 组件所需的参数
   pagenum:0,
   showlist:[
     { imgurl: '../../images/swiper01.jpg', word: "你要珍惜那个没有安全感但勇敢爱的我", url:"https://mp.weixin.qq.com/s/ZKHScNcuDtyVtaoLMIjgXg"},
     { imgurl: '../../images/swiper02.jpg', word: "你所不知道的焦虑症", url:"https://mp.weixin.qq.com/s/8PYj6kUzEZdW50eD5K5beA"},
     { imgurl: '../../images/swiper03.jpg', word: "你眼中的忧郁症世界", url:"https://mp.weixin.qq.com/s/SV1XiAwqnjHxa_8qQpBzSA"}
    ], 
    isdelete: true,
    avatarUrl: "",//用户头像
    nickName: "",//用户昵称
    arr:[],
    comments:[],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    products:[],
    dates:[],
    flag:""
  }, 
  

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '杂话墙',
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
    var pagenum = 0;
    var products = [];
    this.setData({
      pagenum:pagenum
    })
    that.loaddata(products,pagenum);
    that.loaduserInfo();
  },

  navigate:function(){
    wx.navigateTo({
      url: '../send/send',
    })
  },
  loaddata(products,pagenum){
    var that = this;
    var openid = wx.getStorageSync('openid')
    request.getAllShare(wx.getStorageSync('openid'), pagenum, res => {
      var arr = res.data.data
      arr.forEach(r=>{
        r.date = utils.getInterval(r.millionSeconds)
        r.flag = utils.getIconImg("share")
        if (r.share.openId === openid) {
          r.candele = true
        } else {
          r.candele = false
        }
        var imgs = r.share.imgList
        if(imgs.length>0){
        imgs.forEach(r=>{
          var oldimg = r.imgUrl
          r.imgUrl = app.globalData.filePath+oldimg
        })
        r.share.imgList = imgs
        }
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        wx.hideLoading();
      })
      that.setData({
        products:products.concat(arr)
      })
    })
  },

  loaduserInfo(){
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              wx.setStorageSync('userinfo', res)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              console.log(res)
              app.globalData.userinfo = res;
            }
          })
        }
      }
    })
  },

  onShow(){
      
  },

  deleteid:function(e){
    console.log(e.detail)
    var that = this;
    var products = that.data.products;
    for(var i = 0;i<products.length;i++){
      if (products[i].share.id === e.detail) {
        products.splice(i,1)
      }
    }
    that.setData({
      products:products
    })
  },
  
  onPullDownRefresh:function(){
    let openid = getApp().openid;
    var that = this;
    var pagenum = 0;
    var products = [];
    that.setData({
      pagenum:0
    })
    that.loaddata(products,pagenum);
  },

  gotofficalcount:function(e){
    wx.navigateTo({
      url: '../web/web?url=' + e.target.dataset.url,
    })
  },

  onReachBottom:function(){
    var that = this;
    var pagenum = that.data.pagenum + 1; //获取当前页数并+1
    that.setData({
      pagenum: pagenum, //更新当前页数
    })
    that.loaddata(that.data.products,pagenum);
  }
  
    

  
 
})
