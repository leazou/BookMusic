// pages/detail/detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: '',
    comments:[],
    liked: false,
    yesSrc: '/assets/images/love.png',
    noSrc: '/assets/images/dislove.png',
    inputBoxShow: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let id = this.options.id;
    wx.request({
      url: `http://localhost:3000/api/books/${id}`,
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      success: res => {
        console.log(res)
        this.setData({
          book: res.data.book,
          comments: res.data.book.Comments
        })
      }
    })
  },

  //监听input获得焦点

  bindfocus: function(e) {
    let that = this;
    let height = 0;
    let height_02 = 0;
    wx.getSystemInfo({
      success: function(res) {
        height_02 = res.windowHeight;
      }
    })

    height = e.detail.height - (app.globalData.height_01 - height_02);
    console.log('app is', app.globalData.height_01);
    that.setData({
      height: height,
    })
    console.log('获得焦点的 e is', e);
  },

  //监听input失去焦点
  bindblur: function(e) {
    this.setData({
      height: 0,
      inputShow: false,
    });
    console.log('失去焦点的 e is', e);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})