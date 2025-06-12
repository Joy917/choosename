/**
 * 工具类入口文件
 * 统一导出所有工具类模块
 */

// 农历和干支计算
import { LunarCalendar } from './lunar/calendar.js'

// 八字计算和分析
import { BaziCalculator } from './bazi/calculator.js'
import { BaziNaming } from './bazi/naming.js'

// 五行分析
import { WuxingAnalyzer } from './wuxing/analyzer.js'

// 古诗词起名
import { PoemNaming } from './poem/naming.js'

// 辈分起名
import { GenerationNaming } from './generation/naming.js'

// 通用工具
import { CommonUtils } from './common/utils.js'

export {
    LunarCalendar,
    BaziCalculator,
    BaziNaming,
    WuxingAnalyzer,
    PoemNaming,
    GenerationNaming,
    CommonUtils
}
