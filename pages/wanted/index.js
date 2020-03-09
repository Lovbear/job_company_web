
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    noCard:false,
    hasMoreData:false,
    vedioContent:null,
    companyInfo:{
      name:'杭州白鸟科技有限公司',
      sucessRate:'36/100',
      peopleNum:12,
      status:1,
      pic:'',
      vedioShow:true,
      vedioInfo:{
        bgPic:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583392211457&di=0c92a1e1e46de3e2e6dbaf3ed5e1042a&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F0dd7912397dda144dac4acc9b2b7d0a20df486f8.jpg",       path:"http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        isplay:false

      }
    },
    datalist: [
      {
        postName: "吴南",
        label: ["男", "25岁", "3年经验"],
        status: "在线",
        jobstatus:'离职-随时到岗'
      }
    ],
    listDate: [
      {
        pic: "",
        postName: "吴南",
        label: ["男", "25岁", "3年经验"],
        status: "在线",
        jobstatus: '离职-随时到岗',
        faceTime:23,
        qzyx:false
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
    console.log(121)
    wx.navigateTo({
      url: '/pages/jobhunter/index?id' + e.currentTarget.dataset.id
    })
  },
  bindplay(){
    let companyInfo = this.data.companyInfo;
    companyInfo.vedioInfo.isplay=true;
    this.setData({
      companyInfo
    })
   
    this.vedioContent.play();
  },
  bindended(){
    let companyInfo = this.data.companyInfo;
    companyInfo.vedioInfo.isplay = false;
    this.setData({
      companyInfo
    })
  }
})