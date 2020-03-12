import city from "../../utils/city.js"
import req from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinceArr:city,
    cityArr:[],
    areaArr:[],
    province:'',
    city:"",
    area:'',
    formats: {},
    readOnly: false,
    placeholder: '开始输入...',
    editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false,
    form:{
      number:'',
      title:'',
      context:""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(city)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({ isIOS })
    const that = this
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 0,
          success() {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          }
        })
      }, duration)

    })
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  updatePosition(keyboardHeight) {
    const toolbarHeight = 50
    const { windowHeight, platform } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({ editorHeight, keyboardHeight })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const { statusBarHeight, platform } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  blur() {
    this.editorCtx.blur()
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.editorCtx.insertImage({
          src: res.tempFilePaths[0],
          data: {
            id: 'abcd',
            role: 'god'
          },
          width: '80%',
          success: function () {
             console.log('insert image success')
          }
        })
      }
    })
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
  bindPickerChange(e){
    if (this.data.provinceArr[e.detail.value])
      console.log(this.data.provinceArr[e.detail.value])
      this.setData({
        province: this.data.provinceArr[e.detail.value],
        cityArr: this.data.provinceArr[e.detail.value].children
      })
  },
  bindCityChange(e){
    if (this.data.cityArr[e.detail.value])
      console.log(this.data.cityArr[e.detail.value])
    this.setData({
      city: this.data.cityArr[e.detail.value],
      areaArr: this.data.cityArr[e.detail.value].children.length > 0 ? this.data.cityArr[e.detail.value].children:[]
    })
  },
  bindAreaChange(e) {
    if (this.data.areaArr[e.detail.value])
        this.setData({
          area: this.data.areaArr[e.detail.value]
        })
  },
  getEditorValue(e){
    console.log(e.detail.html)
    this.data.form.context = e.detail.html;
      
  },
  bindinput(e){
      console.log(e)
    let item = e.currentTarget.dataset.item;
    this.data.form[item]=e.detail.value;
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
          url: 'http://47.114.5.246/job/upload/fileImage',
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
          }
        })
      }
    })
  },
  submit(){
    let that = this;
      let data = this.data.form;
    data['level'] = that.data.province.name + "/" + that.data.city.name +"/"+that.data.area.name;
      wx.setStorageSync("demandInfo", data)
      wx.navigateTo({
        url: "/pages/payAuth/index",
      })
        
      
  } 
})