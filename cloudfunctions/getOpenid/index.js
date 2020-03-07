// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  console.log("传递的参数:", event);
  var open = event.openid;
  var arr = event.arr;
  db.collection('Like').where({
    _openid: open
  }).update({
    data: {
      like_arr: arr
    },
    success(res) {
      console.log('数据库内容已更新')
    }
  })
}