const db = wx.cloud.database();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
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
    },
    arr:{
      type:Array,
      value:[]
    },
    observer:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isFav:false,
    inputBoxShow: false,
    isScroll:true,
    comment:"",
    create_time: "1970-01-01",
    comments:[],
    // _id:""
  },
  attached: function () { 
    this.onfresh();
    console.log("传递进来的observer:",this.properties.observer);
  },
  observers: {
    'observer': function (observer) {
      // 每次 setData 都触发
      console.log("observers监听函数调用!!");
      this.onfresh();
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    change:function(e){
      var that = this;
      var newFav = !that.data.isFav;
      that.setData({
        isFav:newFav
      })
      var num = that.properties.favnum;
      var id = that.properties._id;
      
      if(newFav){
          num++;
          //这个getarr和cularr全是因为垃圾微信的缓存有问题，才这么写，即使
          //缓存为空，照样显示不是空的，非要用数目判断
          var getarr = wx.getStorageSync('like');
          var cularr = [];
          for(var i in getarr)
            cularr.push(getarr[i]);
          if(cularr.length== 0){
            var datas = that.properties.arr;
            // console.log("传递过来的arr:",datas);
          }
          if(cularr.length>0){
            var datas = wx.getStorageSync('like');
            // console.log("缓存不为空,且获取的arr为:", that.properties.arr);
          }
          var arr = [];
          for(var i in datas){
            arr.push(datas[i]);
          }
          var like_item = {id};
          arr.push(like_item);
          wx.setStorageSync('like', arr);
          
          console.log("赞了后的缓存", wx.getStorageSync('like'));  
      }
      else{
        num--;
        var getarr = wx.getStorageSync('like');
        var cularr = [];
        for (var i in getarr)
          cularr.push(getarr[i]);
        if(cularr.length == 0){
          var datas = that.properties.arr;
        }
        if(cularr.length>0){
          var datas = wx.getStorageSync('like');
        }
        var arr = [];
        for (var i in datas) {
          arr.push(datas[i]);
        }
        // console.log(arr);
        for(var i = 0;i<arr.length;i++){
          if(arr[i].id===id){
            arr.splice(i,1);
          }
        }
        wx.setStorageSync('like', arr);
        
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
      wx.previewImage({
        current: current, // 当前显示图片的http链接  
        urls: this.properties.imglist // 需要预览的图片http链接列表  
      })
    },
    showInputBox: function () {
      this.setData({ inputBoxShow: true });
      this.setData({ isScroll: false });
      this.setData({
        create_time: new Date().getTime()
      })
    },
    invisible: function () {
      this.setData({ inputBoxShow: false });
      this.setData({ isScroll: true });
    },
    send:function(){
      const db = wx.cloud.database();
      var comment = this.data.comment;
      var that = this;
      
      if(comment == ""){
        wx.showToast({
          title: '输入框内容不能为空',
          icon: 'none',
          duration: 2000
        });
        return ;
      }
      
      var that = this;
      db.collection('Comment').add({
        
        data:{
          comment:that.data.comment,
          shareid:that.properties._id,
          commuser:that.properties.commuser,
          commavatar:that.properties.commavartal,
          create_time:that.data.create_time
        },
        success(res){
          console.log(res);
          that.setData({
            inputBoxShow: false,
            // _id:res._id
          });
          var arr = that.data.comments;
          var commuser = that.properties.commuser;
          var comment = that.data.comment;
          var _openid = getApp().openid;
          var _id = that.data._id;
          if(arr.length<6){
            arr.push({ commuser, comment, _openid, _id});
          that.setData({
            comments:arr
          })
        }
        }
      })
    },
    setText:function(e){
      this.setData({
        comment: e.detail.value
      });
    },
    deleter:function(e){
      var that = this;
      var openid = e.target.dataset.open;
      var id= e.target.dataset.id;
      // console.log(openid);
      // console.log('组件内',getApp().openid);
      var myopenid = getApp().openid;
      if(myopenid === openid){
        wx.showModal({
          title: '删除',
          content: '你确定要删除该评论吗?',
          success: function (res) {
            if(res.confirm) {
              console.log("删除前置");
              console.log(id);
              db.collection('Comment').doc(e.target.dataset.id)
                .remove({
                  success(res) {
                    console.log("删除成功",res);
                    var arr = that.data.comments;
                    for (let i = 0; i < arr.length; i++) {
                      if (arr[i]._id === id) {
                        console.log("要删除的是", arr[i])
                        // var index = arr.indexOf(arr[i]);
                        arr.splice(i, 1);
                      }
                      that.setData({
                        comments:arr
                      })
                    }
                  }
                }) 
          }
            else {
               
            } 
          }
        })
      }
    },
    navigator: function () {
      // let data = {
      //   isFav: this.data.isFav,
      //   id: this.properties._id,
      //   date: this.properties.date
      // };
      // data = JSON.stringify(data);
      var isFav = this.data.isFav;
      var id = this.properties._id;
      var date = this.properties.date;
      var favnum = this.properties.favnum;
      wx.navigateTo({
        url: '../details/details?isFav='+isFav+'&id='+id+'&date='+date+'&favnum='+favnum,
      })
    },
    onfresh:function(){
      var that = this;
      db.collection('Comment').where({
        shareid: that.properties._id,
      }).limit(6)
        .get({
          success(res) {
            // console.log(res.data)
            that.setData({
              comments: res.data
            })
          }
        })

      var arr = that.properties.arr;
      var id = that.properties._id;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
          that.setData({
            isFav: true
          })
        }
      }
      // console.log("传递过来的arr:", arr);
    }
  }, 
  
  
  
  
})