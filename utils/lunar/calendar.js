/**
 * 农历转换和天干地支计算工具
 */
export class LunarCalendar {
    // 天干
    static TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']

    // 地支
    static DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

    // 五行对应关系
    static WUXING_MAP = {
        '甲': '木', '乙': '木',
        '丙': '火', '丁': '火',
        '戊': '土', '己': '土',
        '庚': '金', '辛': '金',
        '壬': '水', '癸': '水',
        '子': '水', '亥': '水',
        '寅': '木', '卯': '木',
        '巳': '火', '午': '火',
        '申': '金', '酉': '金',
        '辰': '土', '戌': '土', '丑': '土', '未': '土'
    }

    /**
     * 计算年柱 - 根据公元年份计算天干地支
     * @param {number} year 公元年份
     * @returns {string} 年柱
     */
    static getYearGanZhi(year) {
        // 公元4年为甲子年，以此为基准计算
        const tianganIndex = (year - 4) % 10
        const dizhiIndex = (year - 4) % 12
        return this.TIANGAN[tianganIndex] + this.DIZHI[dizhiIndex]
    }

    /**
     * 计算月柱 - 根据年干和月份计算
     * @param {number} year 年份
     * @param {number} month 月份 (1-12)
     * @param {number} day 日期
     * @returns {string} 月柱
     */
    static getMonthGanZhi(year, month, day) {
        // 节气修正，简化处理
        const yearGan = this.getYearGanZhi(year)[0]

        // 月地支固定对应
        const monthDizhiMap = [
            '寅', '卯', '辰', '巳', '午', '未',
            '申', '酉', '戌', '亥', '子', '丑'
        ]

        // 年干起月表
        const monthGanTable = {
            '甲': ['丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'],
            '乙': ['戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
            '丙': ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'],
            '丁': ['壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
            '戊': ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙'],
            '己': ['丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'],
            '庚': ['戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
            '辛': ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'],
            '壬': ['壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
            '癸': ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙']
        }

        const monthGan = monthGanTable[yearGan][month - 1]
        const monthZhi = monthDizhiMap[month - 1]

        return monthGan + monthZhi
    }

    /**
     * 计算日柱 - 根据日期计算天干地支
     * @param {number} year 年份
     * @param {number} month 月份
     * @param {number} day 日期
     * @returns {string} 日柱
     */
    static getDayGanZhi(year, month, day) {
        // 使用公历计算公式
        const date = new Date(year, month - 1, day)
        const baseDate = new Date(1900, 0, 31) // 1900年1月31日为甲子日
        const diffDays = Math.floor((date - baseDate) / (24 * 60 * 60 * 1000))

        const tianganIndex = diffDays % 10
        const dizhiIndex = diffDays % 12

        return this.TIANGAN[tianganIndex] + this.DIZHI[dizhiIndex]
    }

    /**
     * 计算时柱 - 根据日干和时辰计算
     * @param {string} dayGan 日干
     * @param {number} hour 小时 (0-23)
     * @returns {string} 时柱
     */
    static getHourGanZhi(dayGan, hour) {
        // 时辰对应表
        const hourZhiMap = [
            '子', '丑', '丑', '寅', '寅', '卯', '卯', '辰', '辰', '巳', '巳', '午',
            '午', '未', '未', '申', '申', '酉', '酉', '戌', '戌', '亥', '亥', '子'
        ]

        // 日干起时表
        const hourGanTable = {
            '甲': ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙'],
            '乙': ['丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'],
            '丙': ['戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
            '丁': ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'],
            '戊': ['壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
            '己': ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙'],
            '庚': ['丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'],
            '辛': ['戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
            '壬': ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'],
            '癸': ['壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
        }

        const hourZhi = hourZhiMap[hour]
        const hourZhiIndex = this.DIZHI.indexOf(hourZhi)
        const hourGan = hourGanTable[dayGan][hourZhiIndex]

        return hourGan + hourZhi
    }

    /**
     * 获取干支对应的五行
     * @param {string} ganZhi 干支
     * @returns {string} 五行
     */
    static getWuxing(ganZhi) {
        const gan = ganZhi[0]
        const zhi = ganZhi[1]
        return this.WUXING_MAP[gan] || this.WUXING_MAP[zhi]
    }
}
