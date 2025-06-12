/**
 * 通用工具类
 */
export class CommonUtils {
    /**
     * 验证姓名格式
     * @param {string} name 姓名
     * @returns {boolean} 是否有效
     */
    static validateName(name) {
        if (!name || typeof name !== 'string') {
            return false
        }

        // 检查长度（1-4个字符）
        if (name.length < 1 || name.length > 4) {
            return false
        }

        // 检查是否为中文字符
        const chineseRegex = /^[\u4e00-\u9fa5]+$/
        return chineseRegex.test(name)
    }

    /**
     * 计算名字笔画数
     * @param {string} name 名字
     * @returns {number} 笔画数
     */
    static calculateStrokes(name) {
        // 简化的笔画数据，实际应用中需要完整的汉字笔画数据库
        const strokesMap = {
            '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9, '十': 2,
            '王': 4, '李': 7, '张': 7, '刘': 6, '陈': 7, '杨': 7, '赵': 9, '黄': 11, '周': 8, '吴': 7,
            '徐': 10, '孙': 6, '胡': 9, '朱': 6, '高': 10, '林': 8, '何': 7, '郭': 10, '马': 3, '罗': 8,

            // 常用名字
            '明': 8, '华': 6, '强': 9, '伟': 6, '磊': 15, '军': 6, '杰': 8, '涛': 10, '超': 9, '辉': 12,
            '鹏': 13, '飞': 3, '宇': 6, '志': 7, '勇': 9, '峰': 10, '雷': 13, '刚': 6, '星': 9, '宏': 7,
            '静': 14, '丽': 7, '娟': 10, '敏': 11, '艳': 10, '燕': 16, '红': 6, '霞': 17, '梅': 7, '玲': 9,
            '莉': 10, '兰': 5, '凤': 4, '洁': 9, '秀': 7, '英': 8, '萍': 11, '雯': 12, '琳': 12, '晶': 12
        }

        let totalStrokes = 0
        for (let char of name) {
            totalStrokes += strokesMap[char] || 10 // 默认10画
        }

        return totalStrokes
    }

    /**
     * 生成随机推荐
     * @param {Array} items 选项数组
     * @param {number} count 需要的数量
     * @returns {Array} 随机选择的项目
     */
    static getRandomRecommendations(items, count = 5) {
        const shuffled = [...items].sort(() => Math.random() - 0.5)
        return shuffled.slice(0, count)
    }

    /**
     * 格式化评分
     * @param {number} score 原始评分
     * @returns {string} 格式化的评分
     */
    static formatScore(score) {
        if (score >= 90) return '优秀'
        if (score >= 80) return '良好'
        if (score >= 70) return '中等'
        if (score >= 60) return '及格'
        return '需要改进'
    }

    /**
     * 计算字符串相似度
     * @param {string} str1 字符串1
     * @param {string} str2 字符串2
     * @returns {number} 相似度 (0-1)
     */
    static calculateSimilarity(str1, str2) {
        if (str1 === str2) return 1
        if (str1.length === 0 || str2.length === 0) return 0

        const matrix = []
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i]
        }
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j
        }

        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1]
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    )
                }
            }
        }

        const maxLength = Math.max(str1.length, str2.length)
        return (maxLength - matrix[str2.length][str1.length]) / maxLength
    }

    /**
     * 深拷贝对象
     * @param {Object} obj 要拷贝的对象
     * @returns {Object} 拷贝后的对象
     */
    static deepClone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj
        }

        if (obj instanceof Date) {
            return new Date(obj.getTime())
        }

        if (obj instanceof Array) {
            return obj.map(item => this.deepClone(item))
        }

        if (typeof obj === 'object') {
            const clonedObj = {}
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = this.deepClone(obj[key])
                }
            }
            return clonedObj
        }
    }

    /**
     * 防抖函数
     * @param {Function} func 要防抖的函数
     * @param {number} delay 延迟时间
     * @returns {Function} 防抖后的函数
     */
    static debounce(func, delay) {
        let timeoutId
        return function (...args) {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => func.apply(this, args), delay)
        }
    }

    /**
     * 节流函数
     * @param {Function} func 要节流的函数
     * @param {number} delay 节流间隔
     * @returns {Function} 节流后的函数
     */
    static throttle(func, delay) {
        let lastCall = 0
        return function (...args) {
            const now = Date.now()
            if (now - lastCall >= delay) {
                lastCall = now
                return func.apply(this, args)
            }
        }
    }

    /**
     * 存储到本地存储
     * @param {string} key 键名
     * @param {*} value 值
     */
    static setStorage(key, value) {
        try {
            wx.setStorageSync(key, value)
        } catch (error) {
            console.error('存储失败:', error)
        }
    }

    /**
     * 从本地存储获取
     * @param {string} key 键名
     * @param {*} defaultValue 默认值
     * @returns {*} 存储的值
     */
    static getStorage(key, defaultValue = null) {
        try {
            return wx.getStorageSync(key) || defaultValue
        } catch (error) {
            console.error('获取存储失败:', error)
            return defaultValue
        }
    }

    /**
     * 清除本地存储
     * @param {string} key 键名
     */
    static removeStorage(key) {
        try {
            wx.removeStorageSync(key)
        } catch (error) {
            console.error('清除存储失败:', error)
        }
    }

    /**
     * 显示提示信息
     * @param {string} title 提示内容
     * @param {string} icon 图标类型
     */
    static showToast(title, icon = 'none') {
        wx.showToast({
            title,
            icon,
            duration: 2000
        })
    }

    /**
     * 显示加载中
     * @param {string} title 加载提示
     */
    static showLoading(title = '加载中...') {
        wx.showLoading({
            title,
            mask: true
        })
    }

    /**
     * 隐藏加载中
     */
    static hideLoading() {
        wx.hideLoading()
    }

    /**
     * 格式化日期
     * @param {Date|string} date 日期
     * @param {string} format 格式字符串
     * @returns {string} 格式化后的日期
     */
    static formatDate(date, format = 'YYYY-MM-DD') {
        const d = new Date(date)
        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        const hour = String(d.getHours()).padStart(2, '0')
        const minute = String(d.getMinutes()).padStart(2, '0')
        const second = String(d.getSeconds()).padStart(2, '0')

        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hour)
            .replace('mm', minute)
            .replace('ss', second)
    }
}
