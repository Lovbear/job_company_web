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
  }
})