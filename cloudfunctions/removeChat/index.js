// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: "cloud1-7gzzujgma68a1f08"
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    await db.collection('rooms').doc(event.id).update({
      data: {
        deleted: 1
      }
    })
    .then(console.log)
    .catch(console.error)
    
  } catch(e) {
    console.error(e)
  }
}