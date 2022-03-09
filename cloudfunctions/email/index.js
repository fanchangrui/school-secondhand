// 创建一个SMTP客户端配置
let config = {
      host: 'smtp.qq.com', 
      port: 465, 
      auth: {
            user: '1293707902@qq.com', 
            pass: 'euwfcudagrgyigce' 
      }
};
const xcxname = '科院二手交易小程序'; 


const cloud = require('wx-server-sdk')
cloud.init({
      env: "cloud1-7gzzujgma68a1f08"
})
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport(config);
exports.main = async(event, context) => {
      if (event.type == 1) {
            var sub = '发货提醒';
            var con = '<div>亲爱的同学，您好！<br><br>您在【<font color="#ff0000">' + xcxname + '</font>】小程序内拍卖的物品 <strong>' + event.good + '</strong> 刚刚被人预定了<br><br>快去看看吧</div>'
      } else if (event.type == 2) {
            var sub = '收货提醒';
            var con = '亲爱的同学，您好！<br><br>您在【<font color="#ff0000">' + xcxname + '</font>】小程序内购买的物品 <strong>' + event.good + '</strong> 还没有确认收货哟~<br><br>如果您已经收货了，就赶快去确认一下吧';
      } else if (event.type == 3) {
            var sub = '交易取消提醒';
            var con = '亲爱的同学，您好！<br><br>您在【<font color="#ff0000">' + xcxname + '</font>】小程序内购买的物品 <strong>' + event.good + '</strong> 已经被卖家取消交易了<br><br>赶快去确认下吧';
      } else if (event.type == 4) {
            var sub = '订单取消提醒';
            var con = '亲爱的同学，您好！<br><br>您在【<font color="#ff0000">' + xcxname + '</font>】小程序内拍卖的物品 <strong>' + event.good + '</strong> 已经被买家取消订单了<br><br>目前已自动帮您恢复到发布状态了';
      } else {
            var con = '亲爱的同学，您好！<br><br>您在【<font color="#ff0000">' + xcxname + '</font>】小程序内拍卖的物品 <strong>' + event.good + '</strong> 买家已经确认收货<br><br>';
            var sub = '交易完成通知';
      }
      let mail = {
            from: '来自' + xcxname + ' <'+config.auth.user+'>',
            subject: sub,
            to: event.email,
            html: con 
      };

      let res = await transporter.sendMail(mail);
      return res;
}