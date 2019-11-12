// pages/books/books.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url:`http://localhost:3000/api/books`,
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      success: res =>{
        console.log(res)
        this.setData({
          books: res.data.books,
          page: res.data.pagination.current
        })
      }
    })
  },

  searchInput:function (e){
    console.log(e.detail.value)
    let keyword = e.detail.value;
    wx.request({
      url: 'http://localhost:3000/api/books?keyword=' + keyword ,
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      data:{
        title:keyword
      },
      success: res => {
        console.log(res)
        this.setData({
          books: res.data.books
        })
      }
    })
  },

  detail:function (e){
    console.log(e)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    
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
    console.log(this.data)
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 1000
    })
    let page = ++ this.data.page 
    console.log(page)
    wx.request({
      url: 'http://localhost:3000/api/books?currentPage=' + page ,
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      success:res =>{
        console.log(res)
        var books = this.data.books.concat(res.data.books)
        this.setData({
          books: books
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})