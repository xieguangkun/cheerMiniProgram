// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let openid = event.openid;
  let arr = event.arr;
  let sendtype = 0;
  if(event.sendtype){
    sendtype = event.sendtype;
  }
  
  for (var i = 0; i < arr.length; i++) {
    await db.collection('Like').add({
      data: {
        likeId: arr[i],
        _openid: openid,
        sendtype:sendtype
      },
      success(res) {
        console.log("缓存添加到数据库成功");
      }
    })
  }
}