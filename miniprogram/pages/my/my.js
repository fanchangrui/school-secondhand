const app = getApp();
const db = wx.cloud.database();
const config = require("../../config.js");
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({

      /**
       * 页面的初始数据
       */
      data: {
            showShare: false,
            poster: JSON.parse(config.data).share_poster,
            username: '',
            openid: '',
            roomlist: [],
            avatarUrl: defaultAvatarUrl,
            avatarurl:''
            
      },
      onShow() {
            this.setData({
                  userinfo: app.userinfo,
                  
            })
            console.log(app)
      },
      onLoad: function (options) {
            this.setData({
                  openid: app.openid,
                  avatarUrl:app.userinfo.avatarurl
            })
            this.getdetail()
        
      },
      goo() {
            console.log(app.roomlist);
            if (!app.openid) {
                  wx.showModal({
                        title: '温馨提示',
                        content: '该功能需要注册方可使用，是否马上去注册',
                        success(res) {
                              if (res.confirm) {
                                    wx.navigateTo({
                                          url: '/pages/login/login',
                                    })
                              }
                        }
                  })
                  return false
            }else{
                  wx.navigateTo({
                        url: '../message/message',
                  })
            }

      },
      go(e) {
            if (e.currentTarget.dataset.status == '1') {
                  if (!app.openid) {
                        wx.showModal({
                              title: '温馨提示',
                              content: '该功能需要注册方可使用，是否马上去注册',
                              success(res) {
                                    if (res.confirm) {
                                          wx.navigateTo({
                                                url: '/pages/login/login',
                                          })
                                    }
                              }
                        })
                        return false
                  }
            }
            wx.navigateTo({
                  url: e.currentTarget.dataset.go
            })
      },
      //展示分享弹窗
      showShare() {
            this.setData({
                  showShare: true
            });
      },
      //关闭弹窗
      closePop() {
            this.setData({
                  showShare: false,
            });
      },
      //预览图片
      preview(e) {
            
            wx.previewImage({
                  urls: e.currentTarget.dataset.link.split(",")
            });
      },
      onShareAppMessage() {
            return {
                  title: JSON.parse(config.data).share_title,
                  imageUrl: JSON.parse(config.data).share_img,
                  path: '/pages/start/start'
            }

      },
      // 用户点击右上角分享给好友,要先在分享好友这里设置menus的两个参数,才可以分享朋友圈
	onShareAppMessage: function() {
		wx.showShareMenu({
	      withShareTicket: true,
	      menus: ['shareAppMessage', 'shareTimeline']
	    })
	},
	//用户点击右上角分享朋友圈
	onShareTimeline: function () {
		return {
	      title: '',
	      query: {
	        key: value
	      },
	      imageUrl: ''
	    }
	},
      //获取授权的点击事件
      shouquan() {
            wx.requestSubscribeMessage({
                  tmplIds: ['6DGzsKqipoPxClnbkvwnxY9GqdXoLordLRdWTjJN1F0'], //这里填入我们生成的模板id
                  success(res) {          
                        console.log('授权成功', res)
                  },
                  fail(res) {
                        console.log('授权失败', res)
                  }
            })
      },
      onChooseAvatar(e) {
            const { avatarUrl } = e.detail 
            let that = this
            this.setData({
              avatarUrl,
            })
            const cloudPath = 'avatar-pic/' + app.openid + '/' + Math.floor(Math.random() * 10000 + 10000) + '.png';
            wx.cloud.uploadFile({
                  cloudPath:cloudPath,
                  filePath:avatarUrl,
                  success:res =>{
                        that.setData({
                              avatarUrl:avatarUrl,
                              avatarurl:res.fileID
                        })
                        console.log('上传成功',res);
                  }
            })
           setTimeout(() => {
            db.collection('user').doc(that.data._id).update({
                  // data 传入需要局部更新的数据
                  data: {
                    // 表示将 done 字段置为 true
                    avatarurl:that.data.avatarurl
                   
                  },
                  success: function(res) {
                    console.log(res)
                  },
                  fail() {
                        wx.hideLoading();
                        wx.showToast({
                              title: '修改失败',
                              icon: 'none',
                        })
                  }
                })
           }, 1000);
          },
      uploadName(e){
            let that = this
            console.log(e.detail.value);
            db.collection('user').doc(that.data._id).update({
                  // data 传入需要局部更新的数据
                  data: {
                    // 表示将 done 字段置为 true
                    nickname:e.detail.value
                   
                  },
                  success: function(res) {
                    console.log(res)
                  },
                  fail() {
                        wx.hideLoading();
                        wx.showToast({
                              title: '修改失败',
                              icon: 'none',
                        })
                  }
                })
      },
      getdetail() {
            let that = this;
            db.collection('user').where({
                  _openid: app.openid
            }).get({
                  success: function(res) {
                        let info = res.data[0];
                        that.setData({                            
                              _id: info._id
                        })
                  },
                  fail() {
                        wx.showToast({
                              title: '获取失败',
                              icon: 'none'
                        })
                        let e = setTimeout(
                              wx.navigateBack({}), 2000
                        )
                  }
            })
      },
})