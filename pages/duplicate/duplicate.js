Page({
  data: {
    name: '',
    result: null
  },
  onInput(e) {
    this.setData({ name: e.detail.value })
  },
  onQuery() {
    // TODO: 调用重名查询API
    this.setData({
      result: {
        total: 1234,
        male: 700,
        female: 534,
        regionPie: {},
        ageBar: {}
      }
    })
    wx.showToast({ title: '查询成功', icon: 'success' })
  }
}) 