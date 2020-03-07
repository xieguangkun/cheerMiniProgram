//index.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
   showlist:[
     { imgurl: "../../images/send1.png", text: "开心",type:"happy"},
     { imgurl: "../../images/send2.png" ,text: "难过",type:"sad"},
     { imgurl: "../../images/send3.png", text: "郁闷", type:"depressed"},
     { imgurl: "../../images/send4.png" ,text: "酸了",type:"lemon"},
    ], 
    avatarUrl: "",//用户头像
    nickName: "",//用户昵称
    arr:[],
    comments:[],
    observer:0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    products:[],
    dates:[],
    inputBoxShow: false,
    isScroll: true,
  }, 
  

  onLoad: function() {
    wx.showToast({
      title: '加载中...',
      mask: true,
      icon: 'loading'
    })
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)

              wx.getSetting({
                success(res) {
                  if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                    success(res) {
                      console.log(res.userInfo)
                      that.setData({
                        avatarUrl:res.userInfo.avatarUrl,
                        nickName:res.userInfo.nickName
                      })
                      wx.setStorage({
                        key: 'userinfo',
                        data: res,
                      })
                      }
                    })
        }
      }
    })
             

            }
          })
        }
      }
    })
    var that = this;
    that.loaddata();
    
    var openid = getApp().openid;
    db.collection('Like').where({
      _openid: openid
    }).get({
      success(res) {
        console.log("获取点赞数据", res.data[0].like_arr);
        var arr = [];
        var like_arr = res.data[0].like_arr;
        for (var j in res.data[0].like_arr) {
          var id = like_arr[j];
          arr.push({ id });
        }
        console.log("启动获得的缓存数据", arr)
        that.setData({
          arr:arr
        })
      }
    })

    
    // wx.setStorageSync('like', that.data.arr);
  },
  loaddata(){
    var that = this;
    //监听数据变化的，这是小程序留下来的坑，所以只能这么弄
    var observer = new Date().getTime();
    that.setData({
      observer: observer
    })
    //从数据库获取用户发送
    db.collection('userShare').orderBy('create_time', 'desc').get({
      success(res) {
        let data = res.data, arr = [];
        //改变时间戳的方法，getInterval是计算与当前时间差进行渲染的
        for (let i = 0; i < data.length; i++) {
          let interval = that.getInterval(data[i].create_time || (new Date()).getTime());
          let shortid = "_"+data[i]._id.substring(0, 10);
          data[i].interval = interval;
          data[i].shortid = shortid;
          arr.push(data[i]);
        }
        
        that.setData({
          products: arr,
        })
      }
    })
    
    
    // var commarr = [];
    // var favs = [];
    // var products = that.data.products;
    // console.log("这就是products", that.data.products);
    // // for(var i = 0;i<products.length;i++){
    // db.collection('Comment').where({
    //   shareid: products._id,
    // }).limit(6)
    //   .get({
    //     success(res) {
    //       console.log(res.data)
    //       that.setData({
    //         comments: res.data
    //       })
    //     }
    //   })
    // }
    // var arr = that.properties.arr;
    // var id = that.properties._id;
    // for (var i = 0; i < arr.length; i++) {
    //   if (arr[i].id === id) {
    //     that.setData({
    //       isFav: true
    //     })
    //   }
    // }
    
    
  },
  onShow(){
      
  },
  // 获取time距当前时间的天数或周数
  getInterval(time){
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
  },
  onPullDownRefresh:function(){
    wx.showNavigationBarLoading();
    var that = this;
    var openid = getApp().openid;
    var datas = wx.getStorageSync('like');
    var arr = [];
    for (var i in datas) {
      arr.push(datas[i].id);
    }
    db.collection('Like').where({ _openid: openid }).get({
      success(res) {
        // console.log("获得内容:", res);
        if (res.data.length == 0) {
          db.collection('Like').add({
            data: {
              like_arr: arr
            },
            success(res) {
              console.log("缓存添加到数据库成功");
            }
          })
        }
        if (res.data.length > 0) {
          if(arr.length>0){
          wx.cloud.callFunction({
            name: 'updateLike',
            data: {
              openid: openid,
              arr: arr
            },
            success(res) {
              console.log("成功取值", res)
            }
          })
          }
        }
      }
    })
    
    that.loaddata();
    // console.log("监听observer",that.data.observer);
    // var products = that.data.products;
    // console.log("打印一下products",products);
    // for(var i = 0;i<products.length;i++){
    //   that.selectComponent("#" + products[i].shortid).onfresh();
    // }
  }

    

  
 
})
