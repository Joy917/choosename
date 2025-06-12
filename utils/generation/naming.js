/**
 * 辈分起名类
 */
export class GenerationNaming {  // 常用名字字库，按五行和性别分类
    static NAME_CHARS = {
        '男': {
            '木': ['林', '森', '柏', '松', '杨', '桦', '槐', '梓', '栋', '楠', '榆', '桂', '梧', '枫', '柳', '杰', '权', '棋', '栩', '梦', '楷', '竹', '筱', '箫', '策'],
            '火': ['炎', '焱', '炳', '烈', '煜', '炜', '昊', '旭', '辉', '晖', '晨', '曦', '阳', '明', '亮', '照', '耀', '晔', '晗', '晞', '晟', '景', '智', '思', '志'],
            '土': ['坤', '垚', '培', '城', '堂', '基', '坚', '均', '坦', '境', '域', '增', '墨', '圭', '佳', '山', '岩', '峰', '岭', '崇', '峦', '巍', '屹', '厚', '重'],
            '金': ['钧', '锐', '锋', '钊', '铭', '锦', '镇', '鑫', '钰', '钟', '铃', '镜', '刚', '列', '利', '强', '健', '壮', '勇', '威', '武', '力', '劲', '精', '钢'],
            '水': ['江', '河', '湖', '海', '波', '涛', '潮', '流', '溪', '泉', '润', '源', '澎', '瀚', '灏', '智', '慧', '聪', '敏', '颖', '悟', '洋', '洪', '洲', '清']
        },
        '女': {
            '木': ['林', '梅', '桃', '李', '花', '芳', '芝', '芬', '苑', '苗', '茂', '荣', '华', '菊', '萍', '蓝', '蕾', '薇', '萱', '莲', '荷', '蒙', '蓉', '莹', '菲'],
            '火': ['晶', '晴', '晓', '曙', '朝', '丹', '彤', '焕', '煜', '灿', '烨', '炫', '晖', '辉', '暖', '照', '耀', '慧', '智', '思', '恩', '慈', '怡', '悦', '愉'],
            '土': ['培', '佳', '圆', '园', '均', '坦', '境', '墨', '坚', '城', '域', '增', '堂', '塘', '嘉', '玉', '玮', '璋', '瑜', '瑶', '琪', '琳', '珍', '珠', '安'],
            '金': ['钰', '锦', '镇', '鑫', '铃', '镜', '锡', '银', '钱', '钟', '玉', '珠', '珍', '瑶', '琳', '贝', '财', '贵', '贤', '珠', '宝', '锌', '铂', '精', '纯'],
            '水': ['雨', '雪', '霞', '露', '润', '波', '澜', '潭', '湘', '溪', '泉', '沁', '沐', '汇', '清', '雯', '霏', '霓', '柔', '洁', '净', '慧', '聪', '颖', '敏']
        }
    }

    // 第二字常用字，按寓意分类
    static SECOND_CHARS = {
        '品德': ['德', '善', '仁', '义', '礼', '智', '信', '忠', '孝', '廉', '贞', '正', '直', '诚', '实'],
        '才华': ['才', '华', '文', '武', '艺', '博', '学', '智', '慧', '敏', '思', '研', '创', '新', '颖'],
        '前程': ['达', '成', '功', '业', '进', '升', '兴', '旺', '发', '展', '腾', '飞', '越', '超', '胜'],
        '品格': ['雅', '静', '淑', '贤', '端', '庄', '秀', '美', '丽', '娴', '温', '柔', '和', '顺', '宁'],
        '志向': ['志', '远', '宏', '伟', '大', '高', '深', '广', '博', '宇', '天', '星', '月', '辰', '宸'],
        '福气': ['福', '禄', '寿', '喜', '财', '富', '贵', '荣', '华', '安', '康', '健', '乐', '欢', '悦']
    }

    /**
     * 根据辈分字生成名字
     * @param {string} generationChar 辈分字
     * @param {string} gender 性别
     * @param {number} wordCount 总字数
     * @returns {Array} 推荐名字列表
     */
    static generateNames(generationChar, gender, wordCount) {
        const recommendations = []

        if (wordCount === 2) {
            // 单字名：辈分字 + 一个字
            const secondChars = this.getSecondChars(gender)

            secondChars.forEach(char => {
                const name = generationChar + char.char
                recommendations.push({
                    name,
                    meaning: `${generationChar}(辈分传承) + ${char.char}(${char.meaning})`,
                    category: char.category,
                    score: this.calculateGenerationScore(name, generationChar, char)
                })
            })
        } else {
            // 双字名：辈分字 + 两个字
            const firstChars = this.getFirstChars(gender)
            const secondChars = this.getSecondChars(gender)

            firstChars.forEach(firstChar => {
                secondChars.slice(0, 3).forEach(secondChar => {
                    const name = generationChar + firstChar.char + secondChar.char
                    recommendations.push({
                        name,
                        meaning: `${generationChar}(辈分传承) + ${firstChar.char}(${firstChar.meaning}) + ${secondChar.char}(${secondChar.meaning})`,
                        category: `${firstChar.category}+${secondChar.category}`,
                        score: this.calculateGenerationScore(name, generationChar, firstChar, secondChar)
                    })
                })
            })
        }

        // 排序并返回前20个
        return recommendations
            .sort((a, b) => b.score - a.score)
            .slice(0, 20)
    }

    /**
     * 获取适合做第一个配字的字
     * @param {string} gender 性别
     * @returns {Array} 字符列表
     */
    static getFirstChars(gender) {
        const chars = []

        // 从五行字库中选择
        Object.entries(this.NAME_CHARS[gender]).forEach(([wuxing, charList]) => {
            charList.slice(0, 5).forEach(char => {
                chars.push({
                    char,
                    category: `五行${wuxing}`,
                    meaning: this.getCharMeaning(char, wuxing),
                    wuxing
                })
            })
        })

        return chars
    }

    /**
     * 获取适合做第二个配字的字
     * @param {string} gender 性别
     * @returns {Array} 字符列表
     */
    static getSecondChars(gender) {
        const chars = []

        // 从寓意字库中选择
        Object.entries(this.SECOND_CHARS).forEach(([category, charList]) => {
            const filteredChars = this.filterCharsByGender(charList, gender)
            filteredChars.slice(0, 4).forEach(char => {
                chars.push({
                    char,
                    category,
                    meaning: this.getCategoryMeaning(char, category)
                })
            })
        })

        return chars
    }

    /**
     * 根据性别过滤字符
     * @param {Array} chars 字符数组
     * @param {string} gender 性别
     * @returns {Array} 过滤后的字符
     */
    static filterCharsByGender(chars, gender) {
        // 女性不适合的字
        const femaleAvoid = ['武', '刚', '猛', '烈', '雄', '威', '霸', '强', '硬', '勇']

        // 男性不适合的字
        const maleAvoid = ['娴', '淑', '婉', '柔', '娇', '媚', '秀', '丽', '美', '娟']

        if (gender === '女') {
            return chars.filter(char => !femaleAvoid.includes(char))
        } else {
            return chars.filter(char => !maleAvoid.includes(char))
        }
    }

    /**
     * 获取字的五行寓意
     * @param {string} char 汉字
     * @param {string} wuxing 五行
     * @returns {string} 寓意
     */
    static getCharMeaning(char, wuxing) {
        const meanings = {
            '木': {
                '林': '森林茂密，生机盎然',
                '松': '松柏长青，坚贞不屈',
                '梅': '梅花傲雪，品格高洁',
                '华': '才华横溢，光彩夺目',
                '芳': '芳香怡人，品德高尚'
            },
            '火': {
                '辉': '光辉灿烂，前程似锦',
                '明': '聪明睿智，前途光明',
                '旭': '旭日东升，朝气蓬勃',
                '晨': '晨光初现，希望无限',
                '阳': '阳光温暖，积极向上'
            },
            '土': {
                '坤': '大地宽厚，德行深重',
                '培': '培育栽培，厚德载物',
                '城': '城池坚固，稳重可靠',
                '基': '基础扎实，根基深厚',
                '佳': '佳人佳景，美好如意'
            },
            '金': {
                '锐': '锐意进取，勇往直前',
                '铭': '铭记于心，永不忘怀',
                '钧': '重量单位，品格厚重',
                '锦': '锦绣前程，美好未来',
                '钰': '珍宝美玉，品格珍贵'
            },
            '水': {
                '润': '润泽万物，德行深厚',
                '源': '源远流长，根基深厚',
                '波': '波澜壮阔，气势磅礴',
                '流': '流水淙淙，生生不息',
                '海': '海纳百川，胸怀宽广'
            }
        }

        return meanings[wuxing]?.[char] || `${wuxing}行字，寓意美好`
    }

    /**
     * 获取分类字的寓意
     * @param {string} char 汉字
     * @param {string} category 分类
     * @returns {string} 寓意
     */
    static getCategoryMeaning(char, category) {
        const categoryMeanings = {
            '品德': '品德高尚，德行深厚',
            '才华': '才华横溢，学识渊博',
            '前程': '前程似锦，事业有成',
            '品格': '品格优雅，气质非凡',
            '志向': '志向远大，抱负不凡',
            '福气': '福气满满，人生美满'
        }

        return categoryMeanings[category] || '寓意美好，品格优秀'
    }

    /**
     * 计算辈分名字评分
     * @param {string} name 名字
     * @param {string} generationChar 辈分字
     * @param {Object} firstChar 第一个配字信息
     * @param {Object} secondChar 第二个配字信息
     * @returns {number} 评分
     */
    static calculateGenerationScore(name, generationChar, firstChar, secondChar = null) {
        let score = 70 // 基础分

        // 辈分传承加分
        score += 15

        // 寓意优美加分
        if (firstChar?.category?.includes('品德') || firstChar?.category?.includes('才华')) {
            score += 10
        }

        if (secondChar?.category?.includes('前程') || secondChar?.category?.includes('福气')) {
            score += 10
        }

        // 五行平衡加分
        if (firstChar?.wuxing) {
            score += 8
        }

        // 读音和谐加分
        score += this.getPronunciationScore(name)

        return Math.min(score, 100)
    }

    /**
     * 计算读音和谐度评分
     * @param {string} name 名字
     * @returns {number} 评分
     */
    static getPronunciationScore(name) {
        // 简化处理，根据名字长度和常见读音给分
        if (name.length === 2) {
            return 5
        } else if (name.length === 3) {
            return 8
        }
        return 3
    }

    /**
     * 验证辈分字
     * @param {string} generationChar 辈分字
     * @returns {boolean} 是否有效
     */
    static validateGenerationChar(generationChar) {
        if (!generationChar || generationChar.length !== 1) {
            return false
        }

        // 检查是否为常见汉字
        const commonChars = /^[\u4e00-\u9fa5]$/
        return commonChars.test(generationChar)
    }

    /**
     * 获取辈分字的建议
     * @param {string} surname 姓氏
     * @returns {Array} 建议的辈分字
     */
    static suggestGenerationChars(surname) {
        // 常见辈分字
        const commonGeneration = [
            '文', '武', '明', '德', '仁', '义', '礼', '智', '信',
            '忠', '孝', '廉', '贞', '正', '直', '诚', '实', '善',
            '良', '和', '平', '安', '康', '健', '福', '禄', '寿'
        ]

        return commonGeneration.slice(0, 10).map(char => ({
            char,
            meaning: this.getCategoryMeaning(char, '品德'),
            recommendation: `${surname}${char}X 的辈分起名格式`
        }))
    }
}
