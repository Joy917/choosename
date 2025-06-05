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
    const nameItem = this.data.results[idx];
    let favorites = wx.getStorageSync('favorites') || [];
    // 判断是否已收藏
    if (favorites.find(item => item.name === nameItem.name)) {
      wx.showToast({ title: '已收藏', icon: 'none' });
      return;
    }
    // 限制最多10个
    if (favorites.length >= 10) {
      wx.showToast({ title: '最多收藏10个', icon: 'none' });
      return;
    }
    favorites.push(nameItem);
    wx.setStorageSync('favorites', favorites);
    wx.showToast({ title: '已收藏：' + nameItem.name, icon: 'success' });
  }
}); 