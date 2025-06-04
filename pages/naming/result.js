Page({
  data: {
    results: []
  },
  onLoad(options) {
    if (options.results) {
      this.setData({ results: JSON.parse(decodeURIComponent(options.results)) });
    }
  },
  onCollect(e) {
    const idx = e.currentTarget.dataset.index;
    wx.showToast({ title: '已收藏：' + this.data.results[idx].name, icon: 'success' });
  }
}); 