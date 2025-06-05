Page({
  data: {
    favorites: []
  },
  onShow() {
    const favorites = wx.getStorageSync('favorites') || [];
    this.setData({ favorites });
  }
}); 