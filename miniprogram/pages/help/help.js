var app = getApp();
var db = wx.cloud.database();

Page({
      /**
       * 页面的初始数据
       */
      data: {
            list: [{
                        title: '该程序是做什么的？',
                        id: 0,
                        des: ['本程序是为了方便宁波大学科学技术学院的同学方便在学校内交易自己的二手物品而开发的'],
                        check: true,
                  }, {
                        title: '该程序收费吗？',
                        id: 1,
                        des: ['本程序是完全免费的，不收取任何费用，如果您觉得本程序不错欢迎打赏我们'],
                        check: false,
                  }, 
                  {
                        title: '如何进行买卖？',
                        id: 2,
                        des: ['本程序交易完全由交易双方私底下沟通，只提供发布和确认平台'],
                        check: false,
                  }, {
                        title: '如何进行反馈？',
                        id: 3,
                        des: ['点击联系客服，如果不能解决可以添加开发者微信或qq'],
                        check: false,
                  },
            ]
      },
      onReady() {},

      show(e) {
            var that = this;
            let ite = e.currentTarget.dataset.show;
            let list = that.data.list;
            if (!ite.check) {
                  list[ite.id].check = true;
            } else {
                  list[ite.id].check = false;
            }
            that.setData({
                  list: list
            })
      },
      //跳转页面
      go(e) {
            wx.navigateTo({
                  url: e.currentTarget.dataset.go
            })
      },
      onLoad() {

      },

})