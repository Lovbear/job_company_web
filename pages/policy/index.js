
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    noCard:false,
    hasMoreData:false,
    videoContext:'',
    isShow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.videoContext = wx.createVideoContext('myVideo')
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
      wx.stopPullDownRefresh()
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

  toDetail(e){
    wx.navigateTo({
      url: '/pages/jopDetail/index?id' + e.currentTarget.dataset.id
    })
  },
  bindplay(e) {
    this.setData({
      isShow: false
    })
    console.log(e.currentTarget.dataset.id)
    wx.createVideoContext(e.currentTarget.dataset.id).play()
    
    console.log('play')
  },
  // 监听播放到末尾时触发
  bindended() {
    console.log('bindended')
    this.setData({
      isShow: true
    })
  },
  // 监听暂停播放时触发
  bindpause() {
    console.log('pause')
  }

})