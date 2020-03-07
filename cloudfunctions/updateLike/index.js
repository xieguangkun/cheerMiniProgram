// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var open = event.openid;
  var arr = event.arr;
  var sendtype = 0;
  if(event.sendtype){
    sendtype = event.sendtype;
  }
  console.log("获取到的数组",arr);
  console.log("获取到的openid",open);
  await db.collection('Like').where({
    _openid:open
  }).remove({
    success(res){
      console.log("成功先删除");
    }
  })

  for (var i = 0; i < arr.length; i++) {
    await db.collection('Like').add({
      data: {
        likeId: arr[i],
        _openid: open,
        sendtype:sendtype
      },
      success(res) {
        console.log("缓存添加到数据库成功");
      }
    })
  }
}