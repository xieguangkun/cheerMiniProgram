// component/navlist/navlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    iconurl:{
      type:String,
      value:"../../pages/index/user-unlogin.png"
    },
    navtext:{
      type:String,
      value:"无"
    },
    page:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigator:function(){
      wx.navigateTo({
        url: this.properties.page,
      })
    }
  }
})
