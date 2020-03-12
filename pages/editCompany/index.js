import req from "../../utils/request.js";
const app = getApp();
const date = new Date();
const start = [];
const end = [];
const minutes=[];

//获取小时
for (let i = 0; i < 24; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  start.push(""+ i);
  end.push(""+i)
}
//获取分钟
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  minutes.push("" + i);
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    express:{
      "info": "",
      "infoVideo": "",
      "interviewTime": "",
      "logoImage": "",
      "label": "",
      "scale":'',
      "market":'',
      "interviewTime":''
    },
    "statusArr": [
      {
        oreder: 0,
        name: '以上市'
      },
      {
        oreder: 1,
        name: 'A轮'
      },
      {
        oreder: 2,
        name: 'B轮'
      },
      {
        oreder: 3,
        name: 'C轮'
      },
      {
        oreder: 4,
        name: 'D轮'
      },
      {
        oreder: 5,
        name: '不需要融资'
      },
      {
        oreder: 6,
        name: '未融资'
      }
    ],
    peopleArr:[
      {
        name:"0-20人",
        id:0
      },
      {
        name: "20-99人",
        id: 1
      },
      {
        name: "100-499人",
        id: 2
      },
      {
        name: "500-999人",
        id: 3
      },
      {
        name: "1000-9999人",
        id: 4
      },
      {
        name: "10000人以上",
        id: 5
      }
    ],
    formats: {},
    readOnly: false,
    placeholder: '开始输入...',
    editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false,
    time: '',
    multiArray: [start,minutes,["-"],end,minutes],
    multiIndex: [0, 9, 16, 10, 17],
    choose_year: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置默认的年份
  

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getCompanyInfo();
    console.log(222)
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },

  getCompanyInfo(type) {
    let that = this;
    req.request.auth("/bms/companyInfo").then(res => {

      if (type == 'PullDown') {
        wx.stopPullDownRefresh();
      }
      if (res.data.code == "0") {
        if (res.data.data) {
          that.setData({
            express: res.data.data,
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

  bindStatusChange(e){
    console.log(e)
    let express = this.data.express;
    express.market = this.data.statusArr[e.detail.value-0].name
     this.setData({
       express
     })
  },
  bindnumberChange(e){
    let express = this.data.express;
    express.scale = this.data.peopleArr[e.detail.value - 0].name
    this.setData({
      express
    })
  },
  bindInput(e){
      console.log(e)
      let item = e.target.dataset.item
      this.data.express[item] = e.detail.value;
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
  //获取时间日期
  bindMultiPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    console.log(e)
    let startTime = (e.detail.value[0] >=10 ? e.detail.value[0] : '0' + e.detail.value[0]) + ":" + (e.detail.value[1] >= 10 ? e.detail.value[1] : '0' + e.detail.value[1])
    let endTime = (e.detail.value[3] >= 10 ? e.detail.value[3] : '0' + e.detail.value[3]) + ":" + (e.detail.value[4] >= 10 ? e.detail.value[4] : '0' + e.detail.value[4])

    
    const express = this.data.express;
    express.interviewTime = ("每日 " + startTime + '-' + endTime);
    this.setData({
      express
    })
    
  },
  //监听picker的滚动事件
  bindMultiPickerColumnChange: function (e) {
  
  },
  uploadPic(){
    let that =this;
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
          header:{
            "token": wx.getStorageSync("token"),
            "accountId": wx.getStorageSync("accountId")
          },
          filePath: tempFilePaths[0],
          name: 'file',
          formData: null,
          success(res) {
            let data = JSON.parse(res.data);
            console.log(data)
            let express = that.data.express;
            express.logoImage=data.data;
            that.setData({
              express
            })
          }
        })
      }
    })
  },
  upVedio(){
    let that = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(res.tempFilePath)
        const tempFilePath = res.tempFilePath
        wx.uploadFile({
          url: 'http://47.114.5.246/job/upload/fileVideo',
          header: {
            "token": wx.getStorageSync("token"),
            "accountId": wx.getStorageSync("accountId")
          },
          filePath: tempFilePath,
          name: 'file',
          formData:{
            "file":null
          },
          success(res) {
            let data = JSON.parse(res.data);
            let express = that.data.express;
            express.infoVideo = data.data;
            that.setData({
                express
            })

          }
        })
      }
    })
  },
  saveCompany(){
      let that = this;
      wx.setStorage({
        key: "express",
        data: that.data.express
      })
      wx.navigateTo({
        url:"/pages/companyauth/index",
      })
  }

})