Page({

  /**
   * 页面的初始数据
   */
  data: {
      navlist:[
        "待面试","已邀请","已结束"
      ],
      curIndex:0,
      listDate:[
        {
          pic:"",
          postName: "吴南",
          label: ["男", "25岁", "3年经验"],
          status: "在线",
          jobstatus: '离职-随时到岗',
          qzyx:true,
          faceTime:true,
          hasFace:{
            title:"面试java开发工程师*18K-20K",
            time:"2020.02.02 12：00：00 ",
            status:1,
            order:1
          }
        }
      ]
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

  toDetail(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/faceDetail/index?id' + e.target.id
    })
  },
  tabchange(e){
    this.setData({
      curIndex: e.currentTarget.dataset.index
    })
  }
})