//app.js
import { request } from "./utils/request.js";

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    this.login(2)
  },
  onHide(){
    request.auth("/bms/loginOut","","GET").then(res=>{

    })
  },
  getTime(){
      console.log(new Date())
  },
  add() {
    
  },
  login(type){
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        request("/wechat/authcode", "POST", { appId: "wxcf5a4df7ba19fc5d", authCode: res.code, userType:3 }).then(res => {
          console.log(res)
          if (res.data.code=="0"){
              wx.setStorage({
                key: "token",
                data: res.data.data.token
              })
              wx.setStorage({
                key: "accountId",
                data: res.data.data.accountId
              })
              wx.setStorage({
                key: "getInfo",
                data: {
                  "appid": res.data.data.openid,
                  "session_key": res.data.data.session_key
                }
              })
              this.globalData.getInfo={
                "appid": res.data.data.openid,
                "session_key": res.data.data.session_key
              }
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {

        }
      }
    })
  },
  globalData:{
    userInfo:'',
    getInfo:''
  }
})