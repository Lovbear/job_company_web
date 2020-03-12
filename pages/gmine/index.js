import req from "../../utils/request.js";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:'',
      hasUserInfo:false,
      menuList:[
        {
          label:"发布需求单",
          iconPath: "../static/images/mine/ic_demand.png",
          link:'/pages/pubilcDemand/index'
        },
        {
          label: "单位账号",
          iconPath: "../static/images/mine/ic_express.png",
          link: '/pages/companyMember/index'
        },
        {
          label: "推广链接",
          iconPath: "../static/images/mine/ic_tg.png",
          link: '/pages/companyMember/index'
        },
        {
          label: "单位信息",
          iconPath: "../static/images/mine/ic_msg.png",
          link: '/pages/dwxx/index'
        },
        {
          label: "系统认证",
          iconPath: "../static/images/ic_auth.png",
          link: '/pages/frimAuth/index'
        }
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  getInfo(){
    let that = this;
    req.request.auth("/gms/user/getUserInfo",'',"GET").then(res => {
        if(res.data.code=="0"){
          wx.setStorageSync("userInfo", res.data.data)
          that.setData({
            userInfo: res.data.data
          })
        }
    })
  },


  toDetail(){
    wx.navigateTo({
      url: "/pages/perDetail/index"
    })
  },
  bindGetUserInfo: function (e) {
    let that= this;
    if (e.detail.userInfo) {
      console.log(e.detail.userInfo)
      let data = {
        "nickname": e.detail.userInfo.nickName,
        "avatarUrl": e.detail.userInfo.avatarUrl
      }
      req.request.auth("/wechat/saveWechatUser", data).then(res => {
        if (res.data.code == "0") {
          that.getInfo();
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'warn',
            duration: 2000
          })
        }
      })
    }
  },
  jump(e){
    console.log(e)
    if(e.currentTarget.dataset.index){
    let index = e.currentTarget.dataset.index;
    if(index == this.data.footIndex) {
      return;
    }
    let path = '';
    switch (index) {
      case '0':
        wx.reLaunch({
          url: "/pages/frim/index"
        })
        break;
      case '1':
        wx.reLaunch({
          url: "/pages/demand/index"
        })
        break;
      case '2':
        wx.reLaunch({
          url: "/pages/gmine/index"
        })
        break;
      default:
        break;
    }
    }else{
      wx.navigateTo({
        url: e.currentTarget.dataset.link
      })
    }

  }
})