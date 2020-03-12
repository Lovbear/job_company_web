

import req from "../../utils/request.js"
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    source:'wanted',
    noCard:false,
    hasMoreData:false,
    vedioContent:null,
    isplay:false,
    companyInfo:{
  
    },
    memberList:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo();
  },
  getInfo(){
    let that =this;
    req.request.auth('/bms/jobFair',"","GET").then(res => {   
        console.log(res.data.code,22)
          if(res.data.code=="0"){
            if (res.data.data && res.data.data.bmsCompanyInfoVO){
              that.setData({
                  companyInfo: res.data.data.bmsCompanyInfoVO,
                  memberList:res.data.data.cmsResumeExtVOList
              })
            }
          }else {
            wx.navigateTo({
              url: "/pages/editCompany/index"
            })
          }
    })
  },
  searchMember(e){
    let that = this;
    req.request.auth('/bms/jobList').then(res => {
      if (res.data.code == "0") {
        // that.setData({
        //   companyInfo: res.data.data.bmsCompanyInfoVO,
        //   isplay: true
        //   // memberList: res.data.data.bmsCompanyInfoVO.cmsResumeExtVOList
        // })
        // that.vedioContent.play();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.vedioContent = wx.createVideoContext('myVideo');
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
    this.getInfo();
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

  toCompany(e){
    wx.navigateTo({
      url: '/pages/company/index'
    })
  },
  bindplay(){
    this.setData({
      isplay:true
    })
   
    this.vedioContent.play();
  },
  bindended(){
    let companyInfo = this.data.companyInfo;
    this.setData({
      isplay:false
    })
  },
  toDetail(e){

      wx.navigateTo({
        url: '/pages/jobhunter/index?type=1&&id=' + e.currentTarget.dataset.item.id
      })
  }
})