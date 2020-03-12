import req from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
      navlist:[
        "已邀请","待面试","已结束"
      ],
      curIndex:0,
      listDate:[
        {
          "age": 0,
          "cashDeposit": 0,
          "entryTime": "2020-03-11T09:50:30.495Z",
          "expectBase": "string",
          "expectPost": "string",
          "expectSalary": "string",
          "gander": 0,
          "image": "string",
          "interviewNumber": 0,
          "interviewTime": "2020-03-11T09:50:30.495Z",
          "inviteStatus": 12,
          "name": "string",
          "online": 0,
          "status": 0,
          "userId": 0
        }
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
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

  getList(){
    let that =this;
    let url ='';
    switch(this.data.curIndex){
      case 0:
        url = '/bms/alreadyInterviewInfo';
        break;
      case 1:
        url = '/bms/waitInterviewInfoList';
        break;  
      case 2:
        url='/bms/finishEntryCmsResumeInfo';
        break;
      default:
        break;      

    }
      req.request.auth(url,"","GET").then(res=>{
        if (res.data.code=='0'){
              that.setData({
                listDate: res.data.data
              })
        }
     })
  },

  toDetail(e){
    console.log(e)
    wx.setStorageSync('currUser', e.currentTarget.dataset.item);
    if(this.data.curIndex==0){
      wx.navigateTo({
        url: '/pages/jobhunter/index?type=2&&id=' + e.currentTarget.dataset.item.userId
      })
    }else{
      wx.navigateTo({
        url:'/pages/faceDetail/index'
      })
    }
  },
  tabchange(e){
    let that=this;
    this.setData({
      curIndex: e.currentTarget.dataset.index
    },()=>{
        that.getList();
    })
  }
})