import req from "../../utils/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    type:1,
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    isShow:true,
    videoContext:'',
    pageSouce:'hunter',
    item:{
      label:'面试时间：每日10:00-17:00',
      iconPath:'../static/images/ic_clock.png'
    },
    listDate: [
      {
        pic: "",
        postName: "吴南",
        label: ["男", "25岁", "3年经验"],
        status: "在线",
        jobstatus: '离职-随时到岗',
        tel:"187********"
        
      }
    ],
    datalist: [
      {
        postName: "Java开发工程师",
        label: '',
        area:'杭州',
        price: "15-25K"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
      let that = this;
      this.setData({
        userId: options.id,
        type: options.type
      },()=>{
        that.getInfo()
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      wx.stopPullDownRefresh();
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
    let data = {
      cId:that.data.userId
    }
    req.request.auth("/bms/alreadyInterviewByCidInfo",data,'get').then(res=>  {
        if(res.data.code=='0'){
          that.setData({
            listDate: new Array(res.data.data)
          })
        }
     })
  },
  bindplay() {
    this.setData({
      isShow: false
    })
    this.videoContext.play();
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
  },
  sendInvite(){
    let that =this;
    let data = {
      userId: that.data.userId
    }
    req.request.auth("/bms/sendUserInterview",data,"GET").then(res=>{
        if(res.data.code=="0"){
          var pages = getCurrentPages(); // 当前页面
          var beforePage = pages[pages.length - 2]; // 前一个页面
          // console.log("beforePage");
          // console.log(beforePage);
          wx.navigateBack({
            success: function () {
              beforePage.onLoad(); // 执行前一个页面的onLoad方法
            }
          });
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'warn',
            duration: 2000
          })
       
        }
    })
  }
})