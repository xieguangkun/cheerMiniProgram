// miniprogram/pages/details/details.js 
const db = wx.cloud.database();
Page({

  /** 
   * 页面的初始数据 
   */
  data: {
    isFav: false,
    date: "",
    _id: "",
    sh_id:"",
    favnum:0,
    comments: [],
    inputBoxShow: false,
    isScroll: true,
    comment:"",
    avatarUrl:"",
    nickName:""
  },

  /** 
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    wx.showToast({
      title: '加载中...',
      mask: true,
      icon: 'loading'
    });
    var that = this;
    console.log("被赞了吗?",options.isFav);
    console.log("赞的人数",options.favnum);
    that.setData({
      isFav: options.isFav === 'false'?false:true,
      date: options.date,
      sh_id: options.id,
      favnum:options.favnum
    });
    console.log(this.data.isFav)
    var sh_id = that.data.sh_id;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        console.log("用户详情界面获得的用户信息缓存：", res)
        that.setData({
          avatarUrl: res.data.userInfo.avatarUrl,
          nickName: res.data.userInfo.nickName
        })
      },
    })
    db.collection('userShare').doc(sh_id).get({
      success(res) {
        console.log(res);
        that.setData({
          username: res.data.username,
          avatar: res.data.avatar,
          text: res.data.text,
          imglist: res.data.imglist,
          looked: res.data.looked,
          
        })
      }
    })
    db.collection('Comment').where({
      shareid: that.data.sh_id,
    })
      .get({
        success(res) {
          console.log(res)
          let data = res.data, arr = [];
          for (let i = 0; i < data.length; i++) {
            let interval = that.getInterval(data[i].create_time || (new Date()).getTime());
            data[i].interval = interval;
            arr.push(data[i]);
          }
          that.setData({
            comments: arr
          })
        }
      })
  },
  imgYu: function (event) {
    var current = event.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接   
      urls: this.data.imglist // 需要预览的图片http链接列表   
    })
  },
  showInputBox: function () {
    this.setData({ inputBoxShow: true });
    this.setData({ isScroll: false });
  },
  invisible: function () {
    this.setData({ inputBoxShow: false });
    this.setData({ isScroll: true });
  },
  change:function(e){
    var newFav = !this.data.isFav;
    this.setData({
      isFav: newFav
    })
    var num = this.data.favnum;
    var id = this.data._id;
    var openid = getApp().openid;
    if (newFav) {
      num++;
      var datas = wx.getStorageSync('like');
      var arr = [];
      for (var i in datas) {
        arr.push(datas[i]);
      }
      var like_item = {id};
      arr.push(like_item);
      wx.setStorageSync('like', arr);
      console.log("赞了后的缓存", wx.getStorageSync('like'));
    }
    else {
      num--;
      var datas = wx.getStorageSync('like');
      var arr = [];
      for (var i in datas) {
        arr.push(datas[i]);
      }
      console.log(arr);
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
          arr.splice(i, 1);
        }
      }
      wx.setStorageSync('like', arr);
    }
    this.setData(
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
    var that = this;
    db.collection('Comment').add({

      data: {
        comment: that.data.comment,
        shareid: that.data.sh_id,
        commuser: that.data.nickName,
        commavatar: that.data.avatarUrl,
        create_time: that.data.date
      },
      success(res) {
        console.log(res);
        that.setData({
          inputBoxShow: false,
          _id:res._id
        });
        var arr = that.data.comments;
        var commuser = that.data.nickName;
        var commavatar = that.data.avatarUrl;
        var comment = that.data.comment;
        var _openid = getApp().openid;
        var _id = that.data._id;
        if (arr.length < 6) {
          arr.push({ commuser, commavatar,comment, _openid,_id });
          that.setData({
            comments: arr
          })
        }
      }
    })
  },
  deleter: function (e) {
    var that = this;
    var openid = e.target.dataset.open;
    var id = e.target.dataset.id;
    console.log(openid);
    console.log('组件内', getApp().openid);
    var myopenid = getApp().openid;
    if (myopenid === openid) {
      wx.showModal({
        title: '删除',
        content: '你确定要删除该评论吗?',
        success: function (res) {
          if (res.confirm) {
            console.log("删除前置");
            db.collection('Comment').doc(e.target.dataset.id)
              .remove({
                success(res) {
                  console.log("删除成功", res);
                  var arr = that.data.comments;

                  for (let i = 0; i < arr.length; i++) {
                    if (arr[i]._id === id) {
                      console.log("要删除的是", arr[i])
                      // var index = arr.indexOf(arr[i]);
                      arr.splice(i, 1);
                    }
                  }
                  that.setData({
                    comments: arr
                  })
                }
              })
          }
          else {

          }
        }
      })
    }
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

  },
  getInterval(time) {
    var result;
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - time;
    if (diffValue < 0) {
      return;
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if (monthC >= 1) {
      if (monthC <= 12)
        result = "" + parseInt(monthC) + "月前";
      else {
        result = "" + parseInt(monthC / 12) + "年前";
      }
    }
    else if (weekC >= 1) {
      result = "" + parseInt(weekC) + "周前";
    }
    else if (dayC >= 1) {
      result = "" + parseInt(dayC) + "天前";
    }
    else if (hourC >= 1) {
      result = "" + parseInt(hourC) + "小时前";
    }
    else if (minC >= 1) {
      result = "" + parseInt(minC) + "分钟前";
    } else {
      result = "刚刚";
    }

    return result;
  }
})