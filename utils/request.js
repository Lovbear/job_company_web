// 封装Promise用来请求wx.request
// url 请求地址

function request(url, methods = "GET", data = {}, header = {}) {
  /* 显示加载 */
  wx.showLoading({
    title: '加载中',
    mask: true
  });

  return new Promise((resolve, rejects) => {
    wx.request({
      url:"http://47.114.5.246/job"+url,
      data,
      method: methods,
      header,
      success: (res) => {
        resolve(res)
        /* 隐藏加载 */
        wx.hideLoading();
      }
    })
  })
}
/* get的请求 */
request.get = function(url,data){
  return request(url,"get",data)
}
/* post的请求 */
request.post = function(url,data){
  return request(url,"post",data)
}
/* 需要授权的接口调用 */
request.auth = function(url,data,method="POST"){
  if(!wx.getStorageSync('token')){
    wx.wx.navigateTo({
      url: '',
    });
    return new Promise(() => {})
  }
  return request(url,method,data, {
    "token": wx.getStorageSync("token"),
    "accountId": wx.getStorageSync("accountId")
  })
}

module.exports={
  request
}