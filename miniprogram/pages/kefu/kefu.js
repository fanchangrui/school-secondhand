var app = getApp();
const config = require("../../config.js");

Page({

      /**
       * 页面的初始数据
       */
      data: {
            weixin: JSON.parse(config.data).kefu.weixin,
            qq: JSON.parse(config.data).kefu.qq,
            gzh: JSON.parse(config.data).kefu.gzh,
            phone: JSON.parse(config.data).kefu.phone,
            banner: "/images/kefu.jpg",
           img:['images/fcr.png',]
      },
      onLoad() {

      },

      //复制
      copy(e) {
            wx.setClipboardData({
                  data: e.currentTarget.dataset.copy,
                  success: res => {
                        wx.showToast({
                              title: '复制' + e.currentTarget.dataset.name+'成功',
                              icon: 'success',
                              duration: 1000,
                        })
                  }
            })
      },
      //预览图片
      preview(e) {
            wx.previewImage({
                  current: 'current', // 当前显示图片的http链接
                  urls:this.data.img// 需要预览的图片http链接列表
                })
      },
})