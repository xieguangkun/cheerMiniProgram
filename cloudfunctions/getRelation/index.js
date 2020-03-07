const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

/**
 * 获取文章列表（各种顺序）
 */
getArticles = async (event, context) => {
  let articles = []
  let message = 'success'
  let openid = 
  await db.collection('userShare').get().then(({ data }) => {
    articles = data
  }).catch(err => {
    message = err.errMsg || err
  })
  for (let i = 0, length = articles.length; i < length; ++i) {
    let favNum = 0
    await db.collection('Like').where({
      likeId: articles[i]._id,
    }).get().then(({ data }) => {
      articles[i].favNum = data.length
    }).catch(err => {
      message = err.errMsg || err
    })
    const { userInfo: { openId } } = event
    await db.collection('Like').where({
      _openid: openId,
      likeId: articles[i]._id
    }).get().then(({ data }) => {
      articles[i].isFav = data.length==1?true:false
    }).catch(err => {
      message = err.errMsg || JSON.stringify(err)
    })
  }

  return {
    data: articles,
    message,
  }
}

// 云函数入口函数
exports.main = async (event, context) => {
  return await getArticles(event, context)
}