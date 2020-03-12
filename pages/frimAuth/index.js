import req from "../../utils/request.js";
import city from "../../utils/city.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:"",
    type:0,
    levelArr:[
      {
        name:'省',
        type:1
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
    level:'',
    provinceArr: city,
    cityArr: [],
    areaArr: [],
    province: '',
    city: "",
    area: '',
    form:{
      name:'',
      linkman:"",
      tel:''
    }
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
      province: this.data.provinceArr[e.detail.value],
      cityArr: this.data.provinceArr[e.detail.value].children
    })
  },
  bindCityChange(e) {
    if (this.data.cityArr[e.detail.value])
      console.log(this.data.cityArr[e.detail.value])
    this.setData({
      city: this.data.cityArr[e.detail.value],
      areaArr: this.data.cityArr[e.detail.value].children.length > 0 ? this.data.cityArr[e.detail.value].children : []
    })
  },
  bindAreaChange(e) {
    if (this.data.areaArr[e.detail.value])
      this.setData({
        area: this.data.areaArr[e.detail.value]
      })
  },
  bindLevelChange(e){
    this.setData({
      level: this.data.levelArr[e.detail.value]
    })
  },
  bindinput(e) {
    const item = e.currentTarget.dataset.item;
    this.data.form[item] = e.detail.value;
  },
  submit() {
    let that = this;
    let url = "/gms/govern/updateInfo";
    let data = {
      "addressCity":that.data.city,
      "addressProvince":that.data.province,
      "addressRegion": that.data.area,
      "level": that.data.province + "/" + that.data.city + "/" + that.data.area
    };
    data=Object.assign(data,that.data.form)
    req.request.auth("/gms/govern/add", data).then(res => {
      if (res.data.code == '0') {
        wx.setStorageSync("userInfo", that.data.userInfo)
        var pages = getCurrentPages(); // 当前页面
        var beforePage = pages[pages.length - 2]; // 前一个页面
        // console.log("beforePage");
        // console.log(beforePage);
        wx.navigateBack({
          success: function () {
            beforePage.onReady(); // 执行前一个页面的onLoad方法
          }
        });
      }
    })
  }
})