Component({
  /**
   * 组件的属性列表
   */
  
  properties: {
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
    isfav:{
      type:Boolean,
      value:false
    },
    favnum:{
      type:Number,
      value:0
    },
    commentlist:{
      type:Array,
      value:[]
    },
    morecomm:{
      type:Number,
      value:0
    },
    date:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isFav:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    change:function(){
      var newFav = !this.data.isFav;
      var num = this.properties.favnum;
      if(newFav){
        num++;
      }else{
        num--;
      }
      this.setData(
        {
          isFav:newFav,
          favnum:num
        }
      )
    },
    imgYu: function (event) {
      var current = event.target.dataset.src;
      wx.previewImage({
        current: current, // 当前显示图片的http链接  
        urls: this.properties.imglist // 需要预览的图片http链接列表  
      })
    }
  },
  
})