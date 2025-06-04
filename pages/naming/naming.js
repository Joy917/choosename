Page({
  data: {
    modes: ['生辰八字取名', '古诗词取名'],
    modeIndex: 0,
    genders: ['男', '女'],
    genderIndex: 0,
    wordCounts: ['单字', '双字'],
    wordCountIndex: 1,
    results: []
  },
  onModeChange(e) {
    this.setData({ modeIndex: e.detail.value })
  },
  onGenderChange(e) {
    this.setData({ genderIndex: e.detail.value })
  },
  onWordCountChange(e) {
    this.setData({ wordCountIndex: e.detail.value })
  },
  onGenerate() {
    // TODO: 调用起名算法或API
    this.setData({
      results: [
        { name: '梓涵', reason: '寓意美好，朗朗上口' },
        { name: '子墨', reason: '取自古诗，文雅大气' },
        { name: '思远', reason: '志向远大，易于记忆' },
        { name: '若溪', reason: '如溪水般温柔' },
        { name: '宇轩', reason: '气宇轩昂，阳光自信' }
      ]
    })
  },
  onCollect(e) {
    const idx = e.currentTarget.dataset.index
    wx.showToast({ title: '已收藏：' + this.data.results[idx].name, icon: 'success' })
  }
}) 