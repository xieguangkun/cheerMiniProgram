//index.js

const app = getApp()
const db = wx.cloud.database()
const request = require('../../api/request.js')
const utils = require('../../utils/utils.js')
Page({
  data: {
    pagenum:0,
    showlist: [
      { imgurl: "../../images/dog.png", text: "开心", type: "happy" },
      { imgurl: "../../images/cat.png", text: "难过", type: "sad" },
      { imgurl: "../../images/bear.png", text: "丧了", type: "sang" },
      { imgurl: "../../images/chicken.png", text: "惊讶", type: "surprise" },
    ], 
    avatarUrl: "",//用户头像
    nickName: "",//用户昵称
    arr: [],
    comments: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    products: [],
    dates: [],
    flag:"happy",
    current: 'tab1'
  },


  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '匿名墙',
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#663366',
    })
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var pagenum = 0;
    var products = [];
    that.loaddata(products,"happy",pagenum);
    // wx.setStorageSync('like', that.data.arr);
    that.setData({
      current:"happy",
      pagenum:pagenum
    })
  },

  navigate: function () {
    wx.navigateTo({
      url: '../send/send',
    })
  },
  
  loaddata(products,e,pagenum) {
    var that = this;
    var openid = wx.getStorageSync('openid');
    request.getHideByEmotion(wx.getStorageSync('openid'), e,pagenum,res=>{
      var arr = res.data.data
      console.log(arr)
      arr.forEach(r => {
        r.date = utils.getInterval(r.millionSeconds)
        r.flag = utils.getIconImg(e)
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
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        wx.hideLoading();
      })
      that.setData({
        products: products.concat(arr)
      })
    })

  },
  
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    })
    var pagenum = 0;
    this.setData({
      pagenum:pagenum
    })
    var products = [];
    this.loaddata(products,detail.key,pagenum)
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
    wx.showNavigationBarLoading();
    let openid = getApp().openid;
    wx.showNavigationBarLoading();
    var that = this;
    var pagenum = 0;
    this.setData({
      pagenum: pagenum
    })
    var products = []
    that.loaddata(products,that.data.current,pagenum);
  },

  onReachBottom:function(){
    var that = this;
    var pagenum = that.data.pagenum + 1; //获取当前页数并+1
    that.setData({
      pagenum: pagenum, //更新当前页数
    })
    that.loaddata(that.data.products,that.data.current,pagenum);
  }





})
