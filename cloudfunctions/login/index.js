
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({

  env: "cloud1-7gzzujgma68a1f08"
})


exports.main = (event, context) => {
  console.log(event)
  console.log(context)


  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.appid,
    unionid: wxContext.UNIONID,
    env: wxContext.ENV,
  }
}

