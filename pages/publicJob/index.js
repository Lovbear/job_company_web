import req from "../../utils/request.js";
import city from "../../utils/city.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    job:{
      "jobAddressCity": "",
      "jobAddressProvince": "",
      "jobAddressRegion": "",
      "jobAge": "",
      "jobEducation": "",
      "jobInfo": "",
      "jobSalaryEnd":'',
      "jobSalaryStart": '',
      "jobTitle": ""
    },
    provinceArr: city,
    cityArr: [],
    areaArr: [],
    province: '',
    city:"",
    area:'',
    start:'',
    end:""
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
      let item = e.currentTarget.dataset.item;
      if(item == "start" || item == "end"){
        this.data[item] = e.detail.value;
      }else{
        this.data.job[item] = e.detail.value;
      }
  },
  submit(){
      let obj = {
        "jobAddressProvince":this.data.province,
        "jobAddressCity":this.data.city,
        "jobAddressRegion": this.data.area
      }
    let data = Object.assign(this.data.job,obj);
      req.request.auth("/bms/addJob", data).then(res=>{
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
          }
      })
  }
})