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
          iconPath: "../static/images/mine/ic_parse.png",
          link:'/pages/myParse/index'
        },
        {
          label: "单位账号",
          iconPath: "../static/images/mine/ic_msg.png",
          link: '/pages/company/index'
        },
        {
          label: "推广链接",
          iconPath: "../static/images/mine/ic_company.png",
          link: '/pages/companyMember/index'
        },
        {
          label: "单位信息",
          iconPath: "../static/images/mine/ic_list.png",
          link: '/pages/hotPost/index'
        },
        {
          label: "系统认证",
          iconPath: "../static/images/ic_public.png",
          link: '/pages/publicJob/index'
        }
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo();
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
    req.request.auth("/bms/myInfo").then(res => {
        if(res.data.code=="0"){
          wx.setStorageSync("userInfo", res.data.data)
          that.setData({
            userInfo: res.data.data
          })
        }
    })
  },

  jump(e){
      console.log(e)
      wx.navigateTo({
        url: e.currentTarget.dataset.link
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
        that.setData({
          userInfo: e.detail.userInfo
        })
      //  that.getInfo();
    }
  },
  jump(e){
    console.log(e)
    let index = e.currentTarget.dataset.index;
    if (index == this.data.footIndex) {
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
  }
})