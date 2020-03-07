Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '1', value: '通过', checked: 'true'},
      { name: '0', value: '不通过' }
    ],
    facelist: [
      { name: '1', value: '高级主管', checked: 'true' },
      { name: '0', value: '总经理' }
    ],
    money:[
      { name: '1', value: '50 ¥', checked: 'true' },
      { name: '0', value: '100 ¥' },
      { name: '1', value: '150 ¥' },
      { name: '0', value: '200 ¥' }
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
  radioChange(e){
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  }
})