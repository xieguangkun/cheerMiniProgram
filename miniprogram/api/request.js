//获取所有的杂话文章
const getAllShare = (openId,pageNum,callback)=>{
    wx.request({
      url: 'https://www.cheerhole.cn:8080/userShare/getAllShare/'+openId,
      data:{
        pageNum:pageNum
      },
      success(res){
        callback(res)
      },
      fail(res){
        callback(res)
      }
    })
}

//获取我发送的文章
const getMyShare = (openId,callback)=>{
  wx.request({
    url: 'https://www.cheerhole.cn:8080/userShare/getMyShare/'+openId,
    success(res){
      callback(res)
    },
    fail(res){
      callback(res)
    }
  })
}

//跟据id获取文章
const getShareById = (openId,id,callback) =>{
  wx.request({
    url: 'https://www.cheerhole.cn:8080/userShare/getShareById/'+openId+'/'+id,
  success(res){
    callback(res)
  },
  fail(res){
    callback(res)
  }
  })
}

//删除文章
const deleteShare = (id,callback)=>{
  wx.request({
    url: 'https://www.cheerhole.cn:8080/userShare/deleteShare/'+id,
    method:'POST',
    success(res){
      callback(res)
    },
    fail(res){
      callback(res)
    }
  })
}

//添加一条杂话
const insertShare = (avatar,text,userName,openId,imgList,callback)=>{
  wx.request({
    url: 'https://www.cheerhole.cn:8080/userShare/insertShare',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    data:{
      avatar: avatar,
      text:text,
      userName:userName,
      openId:openId,
      imgList:imgList
    },
    success(res){
      callback(res)
    },
    fail(res){
      callback(res)
    }
  })
}

//删除杂话的评论
const deleteCommentByShare = (id, commPostId,callback)=>{
  wx.request({
    url: 'https://www.cheerhole.cn:8080/userShare/deleteCommentByShare/'+id+'/'+commPostId,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    success(res){
      callback(res)
    },
    fail(res){
      callback(res)
    }
  })
}

//增加杂话的评论
const insertCommentByShare = (shareId,commUserId,comment,commName,commAvatar,callback)=>{
  wx.request({
    url: 'https://www.cheerhole.cn:8080/userShare/insertCommentByShare',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data:{
      shareId:shareId,
      commuserId:commUserId,
      comment:comment,
      commName:commName,
      commAvatar:commAvatar
    },
    success(res){
      callback(res)
    },
    fail(res){
      callback(res)
    }
  })
}

//增加一条匿名
const insertHide = (avatar,text,userName,openId,type,imgList,callback)=>{
  wx.request({
    url: 'https://www.cheerhole.cn:8080/userHide/insertHide',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    data:{
      avatar:avatar,
      text:text,
      userName:userName,
      openId:openId,
      type:type,
      imgList:imgList
    },
    success(res){
      callback(res)
    },
    fail(res){
      callback(res)
    }
  })
}

//跟据心情类型获得匿名
const getHideByEmotion = (openId,emotion,pageNum,callback)=>{
  wx.request({
    url: 'https://www.cheerhole.cn:8080/userHide/getHideByEmotion/'+openId+'/'+emotion,
    data:{
      pageNum:pageNum
    },
    success(res){
      callback(res)
    },
    fail(res){
      callback(res)
    }
  })
}

//获取我发送的匿名
const getMyHide = (openId,callback)=>{
  wx.request({
    url: 'https://www.cheerhole.cn:8080/userHide/getMyHide/'+openId,
    success(res){
      callback(res)
    },
    fail(res){
      callback(res)
    }
  })
}

//跟据id获取匿名文章
const getHideById = (openId,id,callback)=>{
  wx.request({
    url: 'https://www.cheerhole.cn:8080/userHide/getHideById/'+openId+'/'+id,
    success(res){
      callback(res)
    },
    fail(res){
      callback(res)
    }
})
}

//删除匿名文章
const deleteHide = (id,callback)=>{
  wx.request({
    url: 'https://www.cheerhole.cn:8080/userHide/deleteHide/'+id,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    success(res){
      callback(res)
    },
    fail(res){
      callback(res)
    }
  })
}

//删除匿名文章的评论
const deleteCommentByHide = (id,commPostId,callback)=>{
  wx.request({
    url: 'https://www.cheerhole.cn:8080/userHide/deleteCommentByHide/'+id+'/'+commPostId,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    success(res){
      callback(res)
    },
    fail(res){
      callback(res)
    }
  })
}

//添加匿名文章的评论
const insertCommentByHide = (shareId,commuserId,comment,commName,commAvatar,callback)=>{
  wx.request({
    url: 'https://www.cheerhole.cn:8080/userHide/insertCommentByHide',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    data:{
      shareId:shareId,
      commuserId:commuserId,
      comment:comment,
      commName:commName,
      commAvatar:commAvatar
    },
    success(res){
      callback(res)
    },
    fail(res){
      callback(res)
    }
  })
}

//浏览次数+1
const addLooked = (lookedUserId,lookedPostId,type,callback)=>{
  wx.request({
    url: 'https://www.cheerhole.cn:8080/looked/addLooked',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    data:{
      lookedUserId:lookedUserId,
      lookedPostId:lookedPostId,
      type:type
    },
    success(res){
      callback(res)
    },
    fail(res){
      callback(res)
    }
  })
}

//点赞
const like = (type,likedUserId,likedPostId,callback)=>{
  wx.request({
    url: 'https://www.cheerhole.cn:8080/liked/like/'+type+'/'+likedUserId+'/'+likedPostId,
    method: 'POST',
    success(res){
      callback(res)
    },
    fail(res){
      callback(res)
    }
  })
}

//取消点赞
const unlike = (type, likedUserId, likedPostId, callback)=>{
  wx.request({
    url: 'https://www.cheerhole.cn:8080/liked/unlike/'+type+'/' + likedUserId + '/' + likedPostId,
    method: 'POST',
    success(res){
      callback(res)
    },
    fail(res){
      callback(res)
    }
  })
}

//获取评论
const getCommentById = (shareId,callback)=>{
  wx.request({
    url: 'https://www.cheerhole.cn:8080/comment/getCommentById/'+shareId,
    success(res){
      callback(res)
    },
    fail(res){
      callback(res)
    }
  })
}

const uploadFile = (imgUrl,callback)=>{
  wx.uploadFile({
    url: 'https://www.cheerhole.cn:8080/upload',
    filePath: imgUrl,
    name: 'file',
    header: {
      "Content-Type": "multipart/form-data"//记得设置
    },
    formData:{
      'file':imgUrl
    },
    success: function (res) {
      callback(res)
    },
    fail:function(res){
      callback(res)
    }
  })
}

module.exports ={
  getAllShare:getAllShare,
  getMyShare: getMyShare,
  getShareById: getShareById,
  deleteShare: deleteShare,
  insertShare: insertShare,
  deleteCommentByShare: deleteCommentByShare,
  insertCommentByShare: insertCommentByShare,
  insertHide: insertHide,
  getHideByEmotion: getHideByEmotion,
  getMyHide: getMyHide,
  getHideById: getHideById,
  deleteHide: deleteHide,
  deleteCommentByHide: deleteCommentByHide,
  insertCommentByHide: insertCommentByHide,
  addLooked: addLooked,
  like:like,
  unlike:unlike,
  getCommentById: getCommentById,
  uploadFile:uploadFile
}