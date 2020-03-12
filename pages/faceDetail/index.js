import req from "../../utils/request.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:3,
    source:'wanted',
    currInfo:'',
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    isShow:true,
    videoContext:'',
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
        jobstatus: '离职-随时到岗'
        
      }
    ],
    datalist: [
      {
        postName: "Java开发工程师",
        label: ["经验3年以上", "本科", "杭州"],
        price: "15-25K",
        order:1,
        islink:true
      }
    ],
    newsList:[
  
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let currInfo = wx.getStorageSync('currUser');
    let that =this;
    this.setData({
      currInfo
    },()=>{
      console.log(currInfo.cmsResumeVO)
      that.getInfo();
    })
    
  },

  getInfo(){
      let that =this;
      let url = '';
      let data={};
    if (this.data.currInfo.cmsResumeVO){
      data['userId'] = this.data.currInfo.cmsResumeVO.userId;
        url = "/bms/byUserIdFinishEntryCmsResumeInfo"
        this.setData({
          type:3
        })
      }else{
      data['userId'] = this.data.currInfo.userId;
        this.setData({
          type: 2
        })
      url ="/bms/userInterviewInfo"
      }
      req.request.auth(url, data,'GET').then(res=>{
        console.log(res)
        if (res.data.code=='0')
          if(that.data.type==3){
          that.setData({
            datalist: new Array(res.data.data.bmsJobVO),
            listDate: new Array(res.data.data.cmsResumeVO),
            newsList: new Array(res.data.data.entry)
          })
          }else{
            that.setData({
              datalist: new Array(res.data.data),
              listDate: new Array(res.data.data)
            },()=>{
              console.log(that.data.listDate)
            })
          }
      })
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

  formatNews(news) {
    return news.map(item => {
      var time = moment(item.postTime);
      var zero = moment().format('YYYY-MM-DD');
      var after = moment(time).isAfter(zero);
      if (after) {
        item.time = moment(item.postTime).format('HH:mm');
      } else {
        item.time = moment(item.postTime).format('YYYY-MM-DD HH:mm');
      }
      return item;
    });
  },
  toDetail(e) {
    wx.navigateTo({
      url: "/pages/jopDetail/index?id=" + e.currentTarget.dataset.item.id
    })
  },
  beginFace(e){
    console.log(e)
    let that = this;
    let data = {
      cId: that.data.currInfo.userId,
      status:e.currentTarget.dataset.item
    }
    req.request.auth("/bms/startInterview", data,"get").then(res=>{
        if(res.data.code="0"){
            that.getInfo();
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'warn',
            duration: 2000
          })
        }
    })
  },
  change(){
    wx.navigateTo({
      url: '/pages/faceChange/index',
    })
  },
  faceSucess(e){
    let that = this;
    let data = {
      "status": e.currentTarget.dataset.bid,
      "userId": wx.getStorageSync('currUser').userId
    }
    req.request.auth("/bms/byUserIdFinish").then(res=>{
        if(res.data.code=="0"){
          that.getInfo();
        }else{
            wx.showToast({
              title:res.data.message,
              icon:"warn",
              duration:2000
            })
        }
    })
  },
  sigin(e){
    let that = this;
    let data = {
      "status": e.currentTarget.dataset.status,
      "userId": that.data.listDate[0].id
    }
    req.request.auth("/bms/isByUserIdEntry",data,"GET").then(res => {
        if (res.data.code == "0") {
          that.getInfo();
        }else{
            wx.showToast({
              title: res.data.message,
              icon: "warn",
              duration: 2000
            })
        }
    })
  }
})