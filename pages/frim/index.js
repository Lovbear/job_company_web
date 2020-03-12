import req from "../../utils/request.js"
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1,
    pageNum:1,
    pageSize:10,
    noCard: false,
    hasMoreData: false,
    vedioContent: null,
    footIndex:0,
    listdata: {
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
    this.getFrimInfo();
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
    let that = this;
    this.setData({
      pageNum: that.data.pageNum++
    },()=>{
      that.getlist("pulldown");
    })
  
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

  getFrimInfo(){
    req.request.auth("/gms/govern/getGovernDetail",'','GET').then(res=>{
      if(res.data.code=='0'){

      }else{

      }
    })
  },

  getlist(type){
    let that =this;
    let data = {
      "pageNum": that.data.pageNum,
      "pageSize": 10
    }
    req.request.auth("/gms/govern/getCompanies", data).then(res=>{
        console.log(res)
        if(res.data.code=="0"){
          if(that.data.pageNum==1){
            that.setData({
              listdata: res.data.data.list
            })
          }else{
            that.listdata = that.listdata.concat(res.data.data.list)
            that.setData({
              listdata: res.data.data.list
            })
          }
        }
        if(type=="pulldown"){ 
           wx.stopPullDownRefresh()
        }
    })
  },

  toDetail(e) {
    wx.navigateTo({
      url: '/pages/jobhunter/index?id' + e.currentTarget.dataset.id
    })
  },
  bindplay() {
    let companyInfo = this.data.companyInfo;
    companyInfo.vedioInfo.isplay = true;
    this.setData({
      companyInfo
    })

    this.vedioContent.play();
  },
  bindended() {
    let companyInfo = this.data.companyInfo;
    companyInfo.vedioInfo.isplay = false;
    this.setData({
      companyInfo
    })
  },
  toCompany(e){
     wx.navigateTo({
       url: '/pages/company/index?id=' + e.currentTarget.dataset.item.id,
     })
  },
  jump(e){
    console.log(e)
    let index = e.currentTarget.dataset.index;
    if (index == this.data.footIndex){
      return;
    }
    let path = '';
    switch(index){
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
            url:"/pages/gmine/index"
          })
          break;
        default:
          break;     
    }
  }
})