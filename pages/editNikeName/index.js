import req from "../../utils/request.js";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:{
        nickName:''
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo:wx.getStorageSync("userInfo")
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
  bindinput(e){
    const item = e.currentTarget.dataset.item;
    this.data.userInfo[item] = e.detail.value;
  },
  submit(){
    let that = this;
    let url = "/bms/updateMyInfo"
    if(wx.getStorageSync("userType")==2){
      url ="/gms/user/updateInfo"
      that.data.userInfo['nick'] = that.data.userInfo.nickName;
    }else{

    }
    req.request.auth("/bms/updateMyInfo",that.data.userInfo).then(res=>{
        if(res.data.code=='0'){
          wx.setStorageSync("userInfo",that.data.userInfo)
          var pages = getCurrentPages(); // 当前页面
          var beforePage = pages[pages.length - 2]; // 前一个页面
          // console.log("beforePage");
          // console.log(beforePage);
          wx.navigateBack({
            success: function () {
              beforePage.onLoad(); // 执行前一个页面的onLoad方法
            }
          });
        }
    })
  }
})