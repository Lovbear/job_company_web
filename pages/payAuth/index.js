import city from "../../utils/city.js"
import req from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      { name: '0', value: '微信', checked: 'true'  },
      { name: '1', value: '支付宝'},
    ],
    mgList:[],
    form:{
      payPic:'',
      price:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCodeImg();
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
    this.getCodeImg();
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
  getCodeImg(){
    let that = this;
    req.request.auth("/gms/notice/payimage","","GET").then(res=>{
        if(res.data.code=="0"){
            that.data.imgList=[
              res.data.data.alipay, res.data.data.weChatPay
            ]
        }
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  uploadPic() {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths)
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://www.haofanshop.com/job/upload/fileImage',
          header: {
            "token": wx.getStorageSync("token"),
            "accountId": wx.getStorageSync("accountId")
          },
          filePath: tempFilePaths[0],
          name: 'file',
          formData: null,
          success(res) {
            let data = JSON.parse(res.data);
            that.data.form.payPic = data.data;
            that.setData({
              form:that.data.form
            })
          }
        })
      }
    })
  },
  submit(){
    let that = this;
    let data = wx.getStorageSync("demandInfo");
    data = Object.assign(that.data.form,data);
    
    req.request.auth("/gms/notice/add",data).then(res=>{
        if(res.data.code=="0"){
            wx.showToast({
              title: '添加成功',
            })
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