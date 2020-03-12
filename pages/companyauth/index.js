import req from "../../utils/request.js"
import city from "../../utils/city.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyInfo:{
      name:'',
      linkman:'',
      tel:''
    },
    imgUrl:"",
    type:0,
    levelArr: [
      {
        name: '省',
        type: 1
      },
      {
        name: '市',
        type: 2
      },
      {
        name: '区',
        type: 3
      }
    ],
    level: '',
    provinceArr: city,
    cityArr: [],
    areaArr: [],
    province: '',
    city: "",
    area: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCompanyInfo();
  },
  getCompanyInfo(type){
    let that = this;
    req.request.auth("/bms/companyInfo").then(res => {

      if (type =='PullDown'){
        wx.stopPullDownRefresh();
      }
      if (res.data.code == "0") {
        if (res.data.data) {
          that.setData({
            companyInfo: res.data.data,
            province: res.data.data.addressRegion,
            city: res.data.data.addressProvince,
            area: res.data.data.addressCity,
            imgUrl: res.data.data.permitImg,
            type: res.data.data.status
          })
        }
      }
    })
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
    this.getCompanyInfo('PullDown');
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
  bindPickerChange(e) {
    if (this.data.provinceArr[e.detail.value])
      console.log(this.data.provinceArr[e.detail.value])
    this.setData({
      province: this.data.provinceArr[e.detail.value].name,
      cityArr: this.data.provinceArr[e.detail.value].children
    })
  },
  bindCityChange(e) {
    if (this.data.cityArr[e.detail.value])
      console.log(this.data.cityArr[e.detail.value])
    this.setData({
      city: this.data.cityArr[e.detail.value].name,
      areaArr: this.data.cityArr[e.detail.value].children.length > 0 ? this.data.cityArr[e.detail.value].children : []
    })
  },
  bindAreaChange(e) {
    if (this.data.areaArr[e.detail.value])
      this.setData({
        area: this.data.areaArr[e.detail.value].name
      })
  },
  bindinput(e){
    let item = e.target.dataset.item
    this.data.companyInfo[item] = e.detail.value;
    console.log(this.data.companyInfo)
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
          url: 'http://47.114.5.246/job/upload/fileImag',
          header: {
            "token": wx.getStorageSync("token"),
            "accountId": wx.getStorageSync("accountId")
          },
          filePath: tempFilePaths[0],
          name: 'file',
          formData: null,
          success(res) {
            let data = JSON.parse(res.data);
            that.setData({
              imgUrl: data.data
            })
          }
        })
      }
    })
  },
  submit(){

    let obj = {
      "addressCity": this.data.city.name,
      "addressProvince": this.data.province.name,
      "addressRegion": this.data.area.name,
      "permitImg": this.data.imgUrl
    }
    let data = Object.assign(obj, this.data.companyInfo, wx.getStorageSync('express'));

    console.log(data)
    let url = data.id?"/bms/updateCompany":"/bms/authCompany";
    req.request.auth(url,data).then(res=>{
        if(res.data.code=='0'){
          wx.switchTab({
            url:"/pages/wanted/index"
          })
        }
    })
  }
})