

const getInterval = (time) =>{
  var result;
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - time;
  if (diffValue < 0) {
     return ;
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

const formatTime = (date)=>{
  var year = date.getFullYear()+""
  var month = date.getMonth()+1+""
  if(parseInt(month) <10){
    month = "0"+month
  }

  var day = date.getDate()+""
  if(parseInt(day) < 10){
    day = "0"+day
  }

  var hour = date.getHours()+""
  if(parseInt(hour)<10){
    hour = "0"+hour
  }

  var minute = date.getMinutes() + ""
  if (parseInt(minute) < 10) {
    minute = "0" + minute
  }

  var second = date.getSeconds() + ""
  if (parseInt(second) < 10) {
    second = "0" + second
  }

  var newdate = year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second
  return newdate 
}

const getIconImg = (flag)=>{
  if(flag === "share"){
    return "../../images/aixin.png"
  }
  if(flag === "happy"){
    return "../../images/happy.png"
  }
  if(flag === "sad"){
    return "../../images/sad.png"
  }
  if(flag === "sang"){
    return "../../images/sang.png"
  }
  if(flag === "surprise"){
    return "../../images/surprise.png"
  }
}

const getHideName = ()=>{
  var hideNames = [
    "梦的追求",
    "快乐在这",
    "百日草的友谊",
    "清凉之紫罗兰",
    "世外桃源",
    "放飞梦想",
    "天使在身边",
    "美的发现",
    "梦想与爱",
    "梦天使",
    "善良小茉莉",
    "梦幻天使",
    "幸福天使爱微笑",
    "奋斗之塔",
    "清风笑，风未眠"
  ]
  var i = parseInt(Math.random()*hideNames.length);
  console.log("hideNames",i)
  return hideNames[i]
}

const getHideImg = ()=>{
  const hideImgs = [
    "../../images/selectimg1.png",
    "../../images/selectimg2.png",
    "../../images/selectimg3.png",
    "../../images/selectimg4.png",
    "../../images/selectimg5.png",
    "../../images/selectimg6.png",
    "../../images/selectimg7.png",
    "../../images/selectimg8.png",
    "../../images/selectimg9.png",
    "../../images/selectimg10.png"
  ]
  var i = parseInt(Math.random() * hideImgs.length);
  return hideImgs[i]
}

const getCommHideName = () => {
  var hideNames = [
    "此生不换",
    "和星星道个晚安",
    "凡夫俗子",
    "给你比个耶",
    "眉山央央",
    "独角兽",
    "偷看你一秒",
    "软兔酱xx",
    "黑马",
    "徒手摘星星",
    "即兴",
    "A 涉黑",
    "笙鹤",
    "Fluoxetine",
    "Queen",
    "暴躁网友胡汉三",
    "唱跳rap",
    "南风知我意",
    "伊洛ILO",
    "把热爱丢了",
    "黑崎绘海奈",
    "许仙",
    "二十来岁",
    "我爱你三千遍",
    "黑不溜秋",
    "锦中客",
    "suga",
    "万般皆是命",
    "以气质出名",
    "氟西汀"
  ]
  var i = parseInt(Math.random() * hideNames.length);
    return hideNames[i]
}






module.exports = {
  getInterval:getInterval,
  formatTime: formatTime,
  getIconImg:getIconImg,
  getHideImg:getHideImg,
  getHideName: getHideName,
  getCommHideName: getCommHideName
}