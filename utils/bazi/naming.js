/**
 * 生辰八字起名类
 */
import { BaziCalculator } from './calculator.js'
import { WuxingAnalyzer } from '../wuxing/analyzer.js'

export class BaziNaming {
    /**
     * 根据生辰八字生成推荐名字
     * @param {string} date 出生日期 YYYY-MM-DD
     * @param {string} time 出生时间 HH:MM  
     * @param {string} gender 性别
     * @param {number} wordCount 字数
     * @returns {Object} 起名结果
     */
    static generateNames(date, time, gender, wordCount) {
        try {
            // 计算八字
            const baziInfo = BaziCalculator.calculate(date, time)

            // 分析需要补充的五行
            const needWuxing = this.analyzeNeedWuxing(baziInfo)

            // 生成推荐名字
            const recommendations = WuxingAnalyzer.recommendChars(needWuxing, gender, wordCount)

            return {
                success: true,
                baziInfo,
                needWuxing,
                recommendations,
                analysis: this.generateAnalysis(baziInfo, needWuxing)
            }
        } catch (error) {
            return {
                success: false,
                error: error.message,
                recommendations: []
            }
        }
    }

    /**
     * 分析需要补充的五行
     * @param {Object} baziInfo 八字信息
     * @returns {Array} 需要补充的五行
     */
    static analyzeNeedWuxing(baziInfo) {
        const { wuxingCount, lackingWuxing } = baziInfo
        const needWuxing = []

        // 优先补充完全缺失的五行
        if (lackingWuxing.length > 0) {
            needWuxing.push(...lackingWuxing)
        }

        // 补充偏弱的五行
        const weakWuxing = BaziCalculator.getWeakWuxing(wuxingCount)
        weakWuxing.forEach(wuxing => {
            if (!needWuxing.includes(wuxing)) {
                needWuxing.push(wuxing)
            }
        })

        // 如果没有明显缺失，按日主分析
        if (needWuxing.length === 0) {
            const dayMaster = baziInfo.dayMaster
            const supportiveWuxing = this.getSupportiveWuxing(dayMaster)
            needWuxing.push(supportiveWuxing)
        }

        return needWuxing.slice(0, 3) // 最多返回3个五行
    }

    /**
     * 获取对日主有益的五行
     * @param {string} dayMaster 日主天干
     * @returns {string} 有益五行
     */
    static getSupportiveWuxing(dayMaster) {
        const dayMasterWuxing = {
            '甲': '木', '乙': '木',
            '丙': '火', '丁': '火',
            '戊': '土', '己': '土',
            '庚': '金', '辛': '金',
            '壬': '水', '癸': '水'
        }[dayMaster]

        // 生我者为印，我生者为食伤，一般补印比较安全
        const shengWoMap = {
            '木': '水', // 水生木
            '火': '木', // 木生火
            '土': '火', // 火生土
            '金': '土', // 土生金
            '水': '金'  // 金生水
        }

        return shengWoMap[dayMasterWuxing] || '木'
    }

    /**
     * 生成详细分析
     * @param {Object} baziInfo 八字信息
     * @param {Array} needWuxing 需要补充的五行
     * @returns {string} 分析文本
     */
    static generateAnalysis(baziInfo, needWuxing) {
        const { yearPillar, monthPillar, dayPillar, hourPillar, dayMaster, analysis } = baziInfo

        let result = `您的生辰八字为：${yearPillar} ${monthPillar} ${dayPillar} ${hourPillar}\n\n`
        result += `日主为${dayMaster}，${analysis}\n\n`

        if (needWuxing.length > 0) {
            result += `建议在起名时重点考虑${needWuxing.join('、')}五行的字，`
            result += `以达到五行平衡，助运势发展。\n\n`
        }

        result += `以下推荐的名字均结合了您的八字特点，寓意美好，有助于人生发展。`

        return result
    }

    /**
     * 验证日期时间格式
     * @param {string} date 日期
     * @param {string} time 时间
     * @returns {boolean} 是否有效
     */
    static validateDateTime(date, time) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/
        const timeRegex = /^\d{2}:\d{2}$/

        if (!dateRegex.test(date) || !timeRegex.test(time)) {
            return false
        }

        const [year, month, day] = date.split('-').map(Number)
        const [hour, minute] = time.split(':').map(Number)

        if (year < 1900 || year > 2100) return false
        if (month < 1 || month > 12) return false
        if (day < 1 || day > 31) return false
        if (hour < 0 || hour > 23) return false
        if (minute < 0 || minute > 59) return false

        return true
    }
}
