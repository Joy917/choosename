/**
 * 生辰八字计算器
 */
import { LunarCalendar } from '../lunar/calendar.js'

export class BaziCalculator {
    /**
     * 根据出生时间计算生辰八字
     * @param {string} date 出生日期 YYYY-MM-DD
     * @param {string} time 出生时间 HH:MM
     * @returns {Object} 八字信息
     */
    static calculate(date, time) {
        const [year, month, day] = date.split('-').map(Number)
        const [hour, minute] = time.split(':').map(Number)

        // 计算四柱
        const yearGanZhi = LunarCalendar.getYearGanZhi(year)
        const monthGanZhi = LunarCalendar.getMonthGanZhi(year, month, day)
        const dayGanZhi = LunarCalendar.getDayGanZhi(year, month, day)
        const hourGanZhi = LunarCalendar.getHourGanZhi(dayGanZhi[0], hour)

        // 分析五行
        const wuxingCount = this.analyzeWuxing([yearGanZhi, monthGanZhi, dayGanZhi, hourGanZhi])

        // 分析缺失的五行
        const lackingWuxing = this.getLackingWuxing(wuxingCount)

        return {
            yearPillar: yearGanZhi,
            monthPillar: monthGanZhi,
            dayPillar: dayGanZhi,
            hourPillar: hourGanZhi,
            wuxingCount,
            lackingWuxing,
            dayMaster: dayGanZhi[0], // 日主
            analysis: this.getBasicAnalysis(wuxingCount, lackingWuxing)
        }
    }

    /**
     * 分析八字中的五行分布
     * @param {Array} pillars 四柱数组
     * @returns {Object} 五行统计
     */
    static analyzeWuxing(pillars) {
        const wuxingCount = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 }

        pillars.forEach(pillar => {
            const gan = pillar[0]
            const zhi = pillar[1]

            const ganWuxing = LunarCalendar.getWuxing(gan)
            const zhiWuxing = LunarCalendar.getWuxing(zhi)

            if (ganWuxing) wuxingCount[ganWuxing]++
            if (zhiWuxing) wuxingCount[zhiWuxing]++
        })

        return wuxingCount
    }

    /**
     * 获取缺失的五行
     * @param {Object} wuxingCount 五行统计
     * @returns {Array} 缺失的五行
     */
    static getLackingWuxing(wuxingCount) {
        const lacking = []
        const wuxingNames = ['木', '火', '土', '金', '水']

        wuxingNames.forEach(wuxing => {
            if (wuxingCount[wuxing] === 0) {
                lacking.push(wuxing)
            }
        })

        return lacking
    }

    /**
     * 获取需要补强的五行
     * @param {Object} wuxingCount 五行统计
     * @returns {Array} 需要补强的五行
     */
    static getWeakWuxing(wuxingCount) {
        const weak = []
        const total = Object.values(wuxingCount).reduce((sum, count) => sum + count, 0)
        const average = total / 5

        Object.entries(wuxingCount).forEach(([wuxing, count]) => {
            if (count < average * 0.7) { // 低于平均值70%认为偏弱
                weak.push(wuxing)
            }
        })

        return weak
    }

    /**
     * 基本命理分析
     * @param {Object} wuxingCount 五行统计
     * @param {Array} lackingWuxing 缺失五行
     * @returns {String} 分析结果
     */
    static getBasicAnalysis(wuxingCount, lackingWuxing) {
        let analysis = ''

        if (lackingWuxing.length > 0) {
            analysis += `八字五行缺${lackingWuxing.join('、')}，`
        }

        // 找出最强和最弱的五行
        const entries = Object.entries(wuxingCount)
        const strongest = entries.reduce((max, curr) => curr[1] > max[1] ? curr : max)
        const weakest = entries.filter(([_, count]) => count > 0).reduce((min, curr) => curr[1] < min[1] ? curr : min, ['', Infinity])

        if (strongest[1] > 3) {
            analysis += `${strongest[0]}过旺，`
        }

        if (weakest[1] < 2 && weakest[1] > 0) {
            analysis += `${weakest[0]}偏弱，`
        }

        analysis += '建议在起名时考虑五行平衡。'

        return analysis
    }
}
