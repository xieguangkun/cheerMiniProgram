// miniprogram/pages/send/send.js

const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: [],
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    },
    title:"",
    texts:"",
    type:"",
    create_time:"1970-01-01"
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      type:options.type
    }),
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
    
    that.setData({
      create_time: new Date().getTime()
    })
  },

  gotoShow: function () {
    var _this = this
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        console.log(res)
        _this.setData({
          src: res.tempFilePaths
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  setTitle:function(e){
    this.setData({
      title:e.detail.value
    });
  },
  setText: function (e) {
    this.setData({
      texts: e.detail.value
    });
  },
 

  searchBox:function(e){
    wx.showToast({
      title: '上传中...',
      mask: true,
      icon: 'loading'
    })
    var that = this;
    var title = that.data.title;
    var texts = that.data.texts;
    if(title===""||texts===""){
      wx.showToast({
        title: '输入框不能为空!',
        icon: 'none',
        duration: 2000
      }) 
      return
    }
    
    db.collection('userShare').add({
      data:{
      username: that.data.userInfo.nickName,
      avatar: that.data.userInfo.avatarUrl,
      text:that.data.texts,
      imglist:that.data.src,
      type:that.data.type,
      looked:0,
      isfav:false,
      favnum:0,
      create_time:that.data.create_time
      },
      success(res){
        console.log(res);
        wx.hideLoading()
        wx.navigateBack()
      },
      fail(res){
        wx.showToast({
          title: '上传失败，请稍后再试',
        })
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