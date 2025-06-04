Page({
  data: {
    hanzi: '',
    result: null
  },
  onInput(e) {
    this.setData({ hanzi: e.detail.value })
  },
  onQuery() {
    // TODO: 调用汉字解析API
    this.setData({
      result: {
        hanzi: this.data.hanzi,
        pinyin: 'hàn',
        bushou: '氵',
        wuxing: '水',
        meaning: '汉，中华民族的主体民族。'
      }
    })
    wx.showToast({ title: '查询成功', icon: 'success' })
  }
}) 