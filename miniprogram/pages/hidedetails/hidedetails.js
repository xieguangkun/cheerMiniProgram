// miniprogram/pages/details/details.js
const app = getApp(); 
const db = wx.cloud.database();
const request = require('../../api/request.js')
const utils = require('../../utils/utils.js')
Page({

  /** 
   * 页面的初始数据 
   */
  data: {
    isFav: false,
    date: "",
    _id: "",
    sh_id: "",
    favnum: 0,
    comments: [],
    inputBoxShow: false,
    isScroll: true,
    comment: ""
  },

  /** 
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '匿名详情',
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
    var id = options.id;
    request.getHideById(wx.getStorageSync('openid'), id, res => {
      console.log(res)
      var datum = res.data.data;
      var imgs = datum.hide.imgList;
      if (imgs.length > 0) {
        imgs.forEach(r => {
          var oldimg = r.imgUrl
          r.imgUrl = app.globalData.filePath + oldimg
        })
        datum.hide.imgList = imgs
      }
      that.setData({
        isFav: datum.isFav,
        date: utils.getInterval(datum.millionSeconds),
        _id: datum.hide.id,
        favnum: datum.hide.likeNum,
        imglist: datum.hide.imgList,
        looked: datum.hide.looked,
        text: datum.hide.text,
        username: datum.hide.userName,
        avatar: datum.hide.avatar
      })
    })

    request.getCommentById(id, res => {
      console.log("comments", res)
      var comments = res.data.data
      comments.forEach(c => {
        let newdate = c.createTime.split(".")
        let newdate2 = newdate[0].split("T")
        c.date = newdate2[0] + " " + newdate2[1]
      })
      this.setData({
        comments: res.data.data
      })
      wx.hideNavigationBarLoading();
      wx.hideLoading();
    })

    var userinfo = app.globalData.userinfo;
    that.setData({
      avatarUrl: userinfo.userInfo.avatarUrl,
      nickName: userinfo.userInfo.nickName
    })
    
  },
  imgYu: function (event) {
    var current = event.target.dataset.src;
    var imgArr = [];
    var imgList = this.data.imglist;
    imgList.forEach(r => {
      imgArr.push(r.imgUrl)
    })
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: imgArr // 需要预览的图片http链接列表  
    })
  },
  showInputBox: function () {
    if (!app.globalData.userinfo.userInfo) {
      wx.redirectTo({
        url: '../../pages/authorization/authorization?type=hideDetail',
      })

      return;
    }

    this.setData({ inputBoxShow: true });
    this.setData({ isScroll: false });
  },
  invisible: function () {
    this.setData({ inputBoxShow: false });
    this.setData({ isScroll: true });
  },
  change: function (e) {
    if (!app.globalData.userinfo.userInfo) {
      wx.redirectTo({
        url: '../../pages/authorization/authorization?type=hideDetail',
      })

      return;
    }

    var that = this;
    var newFav = that.data.isFav;
    if (newFav == 1) {
      newFav = 0;
    } else {
      newFav = 1;
    }

    that.setData({
      isFav: newFav
    })
    var num = that.data.favnum;
    var id = that.data._id;

    if (newFav == 1) {
      num++;
      request.like("share", wx.getStorageSync('openid'), that.properties._id, res => {
      })
    }
    else {
      num--;
      request.unlike("share", wx.getStorageSync('openid'), that.properties._id, res => {
      })
    }
    that.setData(
      {
        isFav: newFav,
        favnum: num
      }
    )
  },
  setText: function (e) {
    this.setData({
      comment: e.detail.value
    });
  },
  send: function () {
    const db = wx.cloud.database();
    var comment = this.data.comment;
    var that = this;


    if (comment == "") {
      wx.showToast({
        title: '输入框内容不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    var id = that.data._id;
    var commName = utils.getCommHideName();
    var commAvatar = "../../images/timg.jpg";
    request.insertCommentByHide(id,wx.getStorageSync('openid'),comment,commName,commAvatar,res=>{
      var newcomm = res.data.data
      var date = new Date()
      var newdate = utils.formatTime(date)
      newcomm.date = newdate
      var newcomments = that.data.comments
      newcomments.push(newcomm)
      that.setData({
        comments: newcomments
      })
      this.invisible()
    })
  },
  deleter: function (e) {
    var that = this;
    var openid = e.target.dataset.open;
    var id = e.target.dataset.id;
    // console.log(openid)
    var myopenid = wx.getStorageSync('openid');
    if (myopenid === openid) {
      wx.showModal({
        title: '删除',
        content: '你确定要删除该评论吗?',
        success: function (res) {
          if (res.confirm) {
            request.deleteCommentByHide(id, that.data._id, res => {
              if(res.data.msg === "成功"){
              var comments = that.data.comments
              for (var i = 0; i < comments.length; i++) {
                if (comments[i].id === id) {
                  comments.splice(i, 1)
                }
              }
              that.setData({
                comments: comments
              })
              }else{
                wx.showToast({
                  title: '删除失败,请稍后再试',
                })
              }
            })
          }
          else {

          }
        }
      })
    }
    
  }
})