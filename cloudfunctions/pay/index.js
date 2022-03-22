const config = {
      envName: 'cloud1-7gzzujgma68a1f08', // 小程序云开发环境ID
      notify_url: 'https://mp.weixin.qq.com', 
      spbill_create_ip: '127.0.0.1'
};



const cloud = require('wx-server-sdk');
cloud.init({
      env: config.envName
})
const db = cloud.database();
const TcbRouter = require('tcb-router'); //云函数路由
const rq = require('request');

exports.main = async (event, context) => {
      const app = new TcbRouter({
            event
      });
   
   
      //修改卖家在售状态
      app.router('changeP', async (ctx) => {
            try {
                  return await db.collection('publish').doc(event._id).update({
                        data: {
                              status:event.status
                        }
                  })
            } catch (e) {
                  console.error(e)
            }
      });
      //修改订单状态
      app.router('changeO', async (ctx) => {
            try {
                  return await db.collection('order').doc(event._id).update({
                        data: {
                              status: event.status
                        }
                  })
            } catch (e) {
                  console.error(e)
            }
      });
      return app.serve();
}