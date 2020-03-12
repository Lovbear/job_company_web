import req from "../../utils/request.js";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    expressId:'',
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    isShow:false,
    company:{},
    videoContext:'',
    item:{
      label:'面试时间：每日10:00-17:00',
      iconPath:'../static/images/ic_clock.png'
    },
    datalist: [
      {
        postName: "Java开发工程师",
        label: ["经验3年以上", "本科", "杭州"],
        price: "15-25K"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.getFrimInfo();
    
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
  getFrimInfo() {
    let that = this;
    req.request.auth("/gms/govern/getGovernDetail", '', 'GET').then(res => {
      if (res.data.code == '0') {
        let company = res.data.data;
        company['infoVideo'] = res.data.data.video;
        company['permitImg'] = res.data.data.logo;
        
          that.setData({
            company
          },()=>{
            that.videoContext.play();
            console.log(that.data.company)
          })
      } else {

      }
    })
  },
  bindplay() {
    this.setData({
      isShow: false
    })
    this.videoContext.play();
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
  },
  toEdit(){
    wx.navigateTo({
      url: "/pages/editCompany/index"
    })
  },
  tohotPage() {
    wx.navigateTo({
      url: "/pages/hotPost/index"
    })
  },
})