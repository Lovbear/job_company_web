import req from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
      memberlist:[],
      member:''
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
      this.getList();
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
  getList(){
    let that = this;
    req.request.auth("/bms/list").then(res=>{
        if(res.data.code=="0"){
            that.setData({
              memberlist: res.data.data
            })
          }else{
            wx.showToast({
              title: res.data.message
            })
          }
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    let that=this;
    this.setData({
      member: that.data.memberlist[e.detail.value]
    })
  },
  submit(){
      let that = this;
      let data = {
        "adminId": that.data.member.id,
        "userId": wx.getStorageSync('currUser').userId
      }
    req.request.auth("/bms/continueSendUserInterview",data).then(res=>{
          if(res.data.code=='0'){
              wx.switchTab({
                url: '/pages/wanted/index'
              })
          }else{
              wx.showToast({
                title: res.data.message,
                icon:"warn",
                duration:2000
              })
          }
      })
  }

})