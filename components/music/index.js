// components/music/index.js

Component({

  /**
   * 组件的初始数据
   */
  data: {
    musicData: '',
    select: false,
    liked: false,
    nextMusic: false,
    yesSrc: '/assets/images/love.png',
    noSrc: '/assets/images/dislove.png'
  },

  ready: function() { //组件加载完毕
    this.loadPage(1);
  },

  onLoad: function(page) {
    this.loadPage(page);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点赞
    onLike: function(e) {
      console.log(e)
      let music_id = e.currentTarget.dataset.id;
      wx.request({
        url: 'http://localhost:3000/api/likes',
        header: {
          'Authorization': wx.getStorageSync('token')
        },
        method: "POST",
        data: {
          music_id: music_id,
        },
        success: res => {
          console.log(res.data.msg)
          this.setData({
            // number: res.data.data.number,
            liked: !this.data.liked
          })
        }
      })
      this.loadPage()
    },

    // 获取歌曲
    loadPage(page) {
      //console.log(page)
      wx.request({
        url: `http://localhost:3000/api/musics?currentPage=` + page + '&pageSize=1',
        header: {
          'Authorization': wx.getStorageSync('token')
        },
        success: res => {
          console.log(res)
          this.setData({
            musicData: res.data.music,
            nextMusic: res.data.nextMusic,
            liked: res.data.liked,
            current: parseInt(res.data.pagination.current)
          })
          if (this.data.select)
            this.play()
        }
      })
    },

    // 图片旋转
    openTab(e) {
      console.log(!this.data.select)
      this.setData({
        select: !this.data.select
      })
      console.log(this.data.select)

      if (this.data.select)
        this.play();
      else
        wx.getBackgroundAudioManager().pause();
    },
    // 音乐切换
    playNext() {
      console.log(this.data.nextMusic);
      if (this.data.nextMusic){
        let page = ++ this.data.current ;
        console.log(page)
        this.loadPage(page);
      } else {
         return false
      }

      // if (this.data.current < this.data.total) {
      //   this.loadPage(this.data.current + 1);
      // }
    },

    playPrev() {
      console.log(this.data);
      if (!this.data.nextMusic) {
        let page = -- this.data.current;
        console.log(page)
        this.loadPage(page);
      } else {
        let page = --this.data.current;
        console.log(page)
        this.loadPage(page);
      }
      // if (this.data.current > 1)
      //   this.loadPage(this.data.current - 1);
    },

    // 播放音乐
    play() {
      const back = wx.getBackgroundAudioManager();
      back.src = this.data.musicData.url;
      back.title = this.data.musicData.title;
      back.coverImgUrl = this.data.musicData.Photo.image;
      back.play();
      back.onPlay(() => {
        console.log("音乐播放开始");
      })
      back.onEnded(() => {
        console.log("音乐播放结束");
      })
    },


  }
})