import req from '../../utils/request'
const app = getApp()

Page({
  data: {
    arr: [],
    triggered: false,
    datalist:[
      {
        postName:"Java开发工程师",
        label:["经验3年以上","本科","杭州"],
        price:"15-25K"
      }
    ],
    hasMoreData:false
  },
  onReady: function () {
    this.getInfo();
    const arr = []
    for (let i = 0; i < 100; i++) arr.push(i)
    this.setData({
      arr
    })

    setTimeout(() => {
      this.setData({
        triggered: true,
      })
    }, 1000)
  },

  onPulling(e) {
    console.log('onPulling:', e)
  },

  onRefresh() {
    if (this._freshing) return
    this._freshing = true
    setTimeout(() => {
      this.setData({
        triggered: false,
      })
      this._freshing = false
    }, 3000)
  },

  onRestore(e) {
    console.log('onRestore:', e)
  },

  onAbort(e) {
    console.log('onAbort', e)
  },


  /**
* 页面相关事件处理函数--监听用户下拉动作
*/
  onPullDownRefresh: function () {
    // 处理完成后，终止下拉刷新
    wx.stopPullDownRefresh()
  },

  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    
  },
  getInfo(){
    let that=this;
    req.request.auth("/bms/list").then(res=>{
        if(res.data.code=="0"){
            that.setData({
              datalist:res.data.data
            })
        }
    })
  },
  toDetail(e){
    return;
    wx.navigateTo({
      url: 'test?id=1',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          console.log(data)
        },
        someEvent: function (data) {
          console.log(data)
        }
  },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('mamberPage', { data: e.currentTarget.item})
      }
    })
  },
  addMember(){
    wx.navigateTo({
      url: '/pages/addmember/index',
    })
  }
})