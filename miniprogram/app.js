//app.js

App({
  onLaunch: function () {
    
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
    
    this.globalData = {}
  }
  
  
})
