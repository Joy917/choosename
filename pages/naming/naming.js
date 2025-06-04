Page({
  data: {
    mode: 'bazi',
    gender: '男',
    date: '',
    time: '',
    wordCount: 2,
    results: []
  },
  onModeSelect(e) {
    this.setData({ mode: e.currentTarget.dataset.mode });
  },
  onGenderSelect(e) {
    this.setData({ gender: e.currentTarget.dataset.gender });
  },
  onDateChange(e) {
    this.setData({ date: e.detail.value });
  },
  onTimeChange(e) {
    this.setData({ time: e.detail.value });
  },
  onCountSelect(e) {
    this.setData({ wordCount: Number(e.currentTarget.dataset.count) });
  },
  onGenerate() {
    // 这里可接入真实算法或API
    wx.showLoading({ title: '生成中...' });
    setTimeout(() => {
      wx.hideLoading();
      const results = [
        { name: '梓涵', reason: '寓意美好，朗朗上口' },
        { name: '子墨', reason: '取自古诗，文雅大气' },
        { name: '思远', reason: '志向远大，易于记忆' },
        { name: '若溪', reason: '如溪水般温柔' },
        { name: '宇轩', reason: '气宇轩昂，阳光自信' }
      ];
      wx.navigateTo({
        url: '/pages/naming/result?results=' + encodeURIComponent(JSON.stringify(results))
      });
    }, 800);
  },
  onCollect(e) {
    const idx = e.currentTarget.dataset.index;
    wx.showToast({ title: '已收藏：' + this.data.results[idx].name, icon: 'success' });
  }
}); 