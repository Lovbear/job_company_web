

import req from "../../utils/request.js";
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum:1,
    noCard: false,
    hasMoreData: false,
    vedioContent: null,
    navlist:["未通过","待审核","已发布"],
    curIndex:0,
    footIndex:1,
    companyInfo: {
      name: '杭州白鸟科技有限公司',
      sucessRate: '36/100',
      peopleNum: 12,
      status: 1,
      pic: '',
      vedioShow:false
    },
    datalist: [
      {
        postName: "吴南",
        label: ["男", "25岁", "3年经验"],
        status: "在线",
        jobstatus: '离职-随时到岗'
      }
    ],
    listDate: [
      {
        pic: "",
        postName: "吴南",
        label: ["男", "25岁", "3年经验"],
        status: "在线",
        jobstatus: '离职-随时到岗',
        faceTime: 23,
        qzyx: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlist();
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
  getlist(){
    let that = this;
    let data = {
      "condition": {
        "source": "",
        "state": that.data.curIndex
      },
      "pageNum": that.data.pageNum,
      "pageSize": 10
    }
    req.request.auth("/gms/notice/getlist",data).then(res=>{

    })
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

  toDetail(e) {
    wx.navigateTo({
      url: '/pages/jobhunter/index?id' + e.currentTarget.dataset.id
    })
  },
  tabchange(e){
      this.setData({
        curIndex:e.currentTarget.dataset.index
      })
  },
  jump(e) {
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