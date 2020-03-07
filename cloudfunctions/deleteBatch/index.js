// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { userInfo: { openId } } = event
  try {
    return await db.collection('Like').where({
      _openid: openId
    }).remove({
      success(res){
        console.log("成功删除了")
      }
    })
  } catch (e) {
    console.error(e)
  }
  
}