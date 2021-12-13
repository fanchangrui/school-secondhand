const cloud = require('wx-server-sdk')
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: "cloud1-7gzzujgma68a1f08"
})
exports.main = async(event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openid, //要推送给那个用户
      page: 'pages/index/index', //要跳转到那个小程序页面
      data: {//推送的内容
        thing1: {
          value: event.nickName
        },
        phrase2:{
          value: '申请聊天'
        },
        thing3:{
          value: event.tip
        }
      },
      templateId: 'XXmEjf37meLWQaEsOX6qkkufcVH-YKAL3cHyY9Lru0Q' //模板id
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}