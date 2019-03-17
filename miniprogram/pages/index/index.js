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
   products:[],
   dates:[]
  }, 
  

  onLoad: function() {
    var that = this
    db.collection('userShare').get({
      success(res){
        let data = res.data, arr=[];
        for(let i=0;i<data.length;i++){
          let interval = that.getInterval(data[i].create_time || (new Date()).getTime());
          data[i].interval = interval;
          arr.push(data[i]);
        }      
        that.setData({
          products:arr
        })
      }
    })
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
  }

    

  
 
})
