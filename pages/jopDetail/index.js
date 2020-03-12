import req from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobId:'',
    show:true,
    joblist:[
      {
        postName:"JAVA开发工程师",
        label:["杭州","本科","3年以上"],
        price:"15-25K",
        area:false
      }
    ],
    company:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this;
    this.setData({
      "jobId":options.id
    },()=>{
      that.getInfo(options.id);
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
  getInfo(id){
    let that =this;
    req.request.auth("/bms/jobInfo", {'jobId': id},"GET").then(res=>{
        that.setData({
          joblist: new Array(res.data.data),
          company: res.data.data.bmsCompany
        },()=>{
          console.log(this.data.joblist)
        })
    })
  },
  toCompany(){
    wx.navigateTo({
      url:'/pages/company/index'
    })
  }
})