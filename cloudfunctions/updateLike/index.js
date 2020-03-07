// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var open = event.openid;
  var arr = event.arr;
  console.log("获取到的数组",arr);
  console.log("获取到的openid",open);
  return await db.collection('Like').where({
    _openid:open
  }).update({
    data:{
      like_arr:arr
    },
    success(res){
      console.log("成功更新数据库");
    }
  })
}