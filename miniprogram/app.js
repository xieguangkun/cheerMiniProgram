//app.js

App({
  
  onLaunch: function (options) {
    wx.login({
      success(res) {
        console.log(res)
        if (res.code) {
          // 发起网络请求
          
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('获取到的openid: ', res.result.openid)
        if (wx.getStorageSync("openid") != null) {
          wx.clearStorageSync("openid");
        }
        this.openid = res.result.openid;
        wx.setStorageSync('openid', res.result.openid);
        console.log('app.js加载', wx.getStorageSync('openid'));
      }
    })

    // 判断是否由分享进入小程序
    if (options.scene == 1007 || options.scene == 1008) {
      this.globalData.share = true
    } else {
      this.globalData.share = false
    };
    // 获取设备顶部窗口的高度（不同设备窗口高度不一样，根据这个来设置自定义导航栏的高度）
    this.globalData.height = wx.getSystemInfoSync()['statusBarHeight']
  
  },
  globalData: {
    userinfo: {},//存储用户信息
    filePath: "https://www.cheerhole.cn:8080/imgs/",//显示图片用的
    
  }
  
  
})
