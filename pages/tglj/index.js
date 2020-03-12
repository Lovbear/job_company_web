// pages/responsive/responsive.js
import req from "../../utils/request.js"
var QRCode = require('../../utils/weapp-qrcode.js')
var qrcode;

const W = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / W;

// 300rpx 在6s上为 150px
const code_w = 300 / rate;
const app =getApp();
Page({
  data: {
    text: 'https://github.com/tomfriwel/weapp-qrcode',
    image: '',
    code_w: code_w
  },
  onLoad: function (options) {
    qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: "https://github.com/tomfriwel/weapp-qrcode",
      image: '',
      width: code_w,
      height: code_w,
      colorDark: "#333",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
  },
  onReady(){
     this.getLink();
  },
  confirmHandler: function (e) {
    var value = e.detail.value
    qrcode.makeCode(value)
  },
  inputHandler: function (e) {
    var value = e.detail.value
    this.setData({
      text: value
    })
  },
  tapHandler: function () {
    // 传入字符串生成qrcode
    qrcode.makeCode(this.data.text)
  },
  // 长按保存
  save: function () {
    console.log('save')
    wx.showActionSheet({
      itemList: ['保存图片'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          qrcode.exportImage(function (path) {
            wx.saveImageToPhotosAlbum({
              filePath: path,
            })
          })
        }
      }
    })
  },
  getLink(){
    let data = wx.getStorageSync("getInfo");
    console.log(app.globalData,1)
    req.request.auth("/wechat/generateMa",data).then(res=>{

    })
  }
})