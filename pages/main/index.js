
import req from "../../utils/request.js";
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(app)
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
  toExpress(){
    
  },
  tofirm(){
  
  },
  getPhoneNumber(e){
    var that = this;
    let type = e.currentTarget.dataset.type;
    if (e.detail.errMsg == "getPhoneNumber:ok") {
         let obj = {
           encryptedData: e.detail.encryptedData,
           iv: e.detail.iv,
           sessionKey: app.globalData.getInfo.session_key
         }
      that.decrypt(obj, type);
    }
  },
  decrypt(data, type) {
    req.request.auth("/wechat/decrypt", data).then(res => {
      console.log(res)
      if(type==1){
        wx.switchTab({
          url: '/pages/wanted/index',
        })
        wx.setStorageSync("userType", 1)
      }else{
        wx.reLaunch({
          url: '/pages/frim/index'
        })
        wx.setStorageSync("userType", 2)
      }
    })
  },
})