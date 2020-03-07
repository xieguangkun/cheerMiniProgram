const db = wx.cloud.database()
const app = getApp()
const request = require('../../api/request.js')
const utils = require('../../utils/utils.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
    candele:{
      type:Boolean,
      value:false
    },
    commuser:{
      type:String,
      value:"匿名用户"
    },
    commavartal:{
      type:String,
      value:""
    },
    _id:{
      type:String,
      value:""
    },
    username:{
      type:String,
      value:"匿名用户"
    },
    avatar:{
      type:String,
      value: "../../pages/index/user-unlogin.png"
    },
    text:{
      type:String,
      value:" "
    },
    imglist:{
      type:Array,
      value:[]
    },
    looked:{
      type:Number,
      value:0
    },
    isFav:{
      type:Number,
      value:0
    },
    favnum:{
      type:Number,
      value:0
    },
    commNum:{
      type:Number,
      value:0
    },
    date:{
      type:String,
      value:""
    },
    flag:{
      type:String,
      value:""
    },
    sendtype:{
      type:String,
      value:""
    }
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    isFav:0,
    inputBoxShow: false,
    isScroll:true,
    comment:"",
    create_time: "1970-01-01",
    comments:[],
    
    // _id:""
  },
  attached: function () {
    
  },

  
  /**
   * 组件的方法列表
   */
  methods: {
      
    change:function(e){
      if(!app.globalData.userinfo.userInfo){
        if (this.properties.sendtype === "0") {
          wx.redirectTo({
            url: '../../pages/authorization/authorization?type=share',
          })
          return;
        }else{
          wx.redirectTo({
            url: '../../pages/authorization/authorization?type=hide',
          })
          return;
        }
        
      }
      var sendtype = this.properties.sendtype;
      var type = sendtype == 0 ? "share" : "hide";
      var that = this;
      var newFav = that.data.isFav;
      if(newFav == 1){
        newFav = 0;
      }else{
        newFav = 1;
      }
      that.setData({
        isFav:newFav
      })
      var num = that.properties.favnum;
      var id = that.properties._id;
      
      if(newFav == 1){
          num++;
        request.like(type,wx.getStorageSync('openid'),that.properties._id,res=>{
            console.log("like",res)
          })
      }
      else{
        num--;
        request.unlike(type, wx.getStorageSync('openid'), that.properties._id, res => {
          console.log("unlike", res)
        })
      }
      that.setData(
        {
          isFav:newFav,
          favnum:num
        }
      )

      
    },
    imgYu: function (event) {
      var current = event.target.dataset.src;
      var imgArr = [];
      var imgList = this.properties.imglist;
      imgList.forEach(r=>{
        imgArr.push(r.imgUrl)
      })
      wx.previewImage({
        current: current, // 当前显示图片的http链接  
        urls: imgArr // 需要预览的图片http链接列表  
      })
    },
    navigator: function () {
      var isFav = this.data.isFav;
      var id = this.properties._id;
      var date = this.properties.date;
      var favnum = this.properties.favnum;
      var sendtype = this.properties.sendtype;
      var type = sendtype == 0?"share":"hide";
      request.addLooked(wx.getStorageSync('openid'), this.properties._id, type,res=>{
        console.log("looked",res)
      })
      
      if(sendtype === "0"){
      wx.navigateTo({
        url: '../details/details?id='+id,
      })
      }

      if (sendtype === "1"){
        wx.navigateTo({
          url: '../hidedetails/hidedetails?isFav=' + isFav + '&id=' + id + '&date=' + date + '&favnum=' + favnum,
        })
      }
      
    },
    deleter:function(){
      var that = this;
      var sendtype = that.properties.sendtype;
      var id = that.properties._id;
      wx.showModal({
        title: '删除',
        content: '你确定要删除该消息吗?',
        success: function (res) {
          if (res.confirm) {
            if (sendtype === "0") {
              wx.showLoading({
                title: '正在删除请稍等...',
              })
              request.deleteShare(id,res=>{
                console.log(res)
                if(res.data.msg === "成功"){
                  wx.hideLoading();
                  that.triggerEvent("deleteid", id)
                }else{
                  wx.hideLoading();
                  wx.showToast({
                    title: '删除失败，请稍后再试',
                  })
                }
              })
            } else {
              wx.showLoading({
                title: '正在删除请稍等...',
              })
              request.deleteHide(id, res => {
                console.log(res)
                if (res.data.msg === "成功") {
                  wx.hideLoading();
                  that.triggerEvent("deleteid", id)
                } else {
                  wx.hideLoading();
                  wx.showToast({
                    title: '删除失败，请稍后再试',
                  })
                }
              })
            }
          }
          else {

          }
        }
      })
    }
  }, 
  
  
  
  
})