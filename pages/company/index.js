import req from "../../utils/request.js";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    expressId:'',
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    isShow:true,
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
   
        if(options.id){
            this.setData({
              expressId:options.id
            },()=>{
              this.getInfo();
            })
        }else{
            this.getInfo();
        }
    
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
  getInfo(){
    let that = this;
    let url="";
    let data={}
    let type = "POST"
    if (wx.getStorageSync("userType")==2){
      type = "GET"
      data["id"] = this.data.expressId
        url ="/gms/govern/getCompanyDetail";
    }else{
      url = "/bms/companyInfo";
    }
    req.request.auth(url, data, type).then(res=>{
        if(res.data.code=="0"){
          let listData = '';
          let joblist=[];
          if(wx.getStorageSync("userType")==2){
              listData = res.data.data.bmsCompany;
            joblist = res.data.data.jobList
          }else{
              listData = res.data.data
          } 
          that.setData({
            company: listData,
            datalist: joblist
          }, () => {
            that.videoContext.play();
            that.setData({
              isShow: false
            })
          })
    
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