/**
 * 古诗词起名类
 */
export class PoemNaming {
    // 经典诗词名句库
    static POEM_DATABASE = [
        // 唐诗
        { poem: '春江潮水连海平，海上明月共潮生', author: '张若虚', source: '春江花月夜', chars: ['春', '江', '潮', '海', '明', '月', '潮', '生'] },
        { poem: '海上生明月，天涯共此时', author: '张九龄', source: '望月怀远', chars: ['海', '生', '明', '月', '天', '涯', '共', '时'] },
        { poem: '大漠孤烟直，长河落日圆', author: '王维', source: '使至塞上', chars: ['大', '漠', '孤', '烟', '直', '长', '河', '落', '日', '圆'] },
        { poem: '明月松间照，清泉石上流', author: '王维', source: '山居秋暝', chars: ['明', '月', '松', '清', '泉', '石', '流'] },
        { poem: '野径云俱黑，江船火独明', author: '杜甫', source: '春夜喜雨', chars: ['野', '径', '云', '黑', '江', '船', '火', '明'] },
        { poem: '星垂平野阔，月涌大江流', author: '杜甫', source: '旅夜书怀', chars: ['星', '垂', '平', '野', '阔', '月', '涌', '江', '流'] },
        { poem: '会当凌绝顶，一览众山小', author: '杜甫', source: '望岳', chars: ['会', '凌', '绝', '顶', '览', '众', '山'] },
        { poem: '落红不是无情物，化作春泥更护花', author: '龚自珍', source: '己亥杂诗', chars: ['落', '红', '情', '化', '春', '泥', '护', '花'] },

        // 宋词  
        { poem: '云中谁寄锦书来，雁字回时，月满西楼', author: '李清照', source: '一剪梅', chars: ['云', '锦', '书', '雁', '字', '月', '满', '西', '楼'] },
        { poem: '无可奈何花落去，似曾相识燕归来', author: '晏殊', source: '浣溪沙', chars: ['花', '落', '似', '相', '识', '燕', '归'] },
        { poem: '山重水复疑无路，柳暗花明又一村', author: '陆游', source: '游山西村', chars: ['山', '重', '水', '复', '柳', '暗', '花', '明', '村'] },
        { poem: '小荷才露尖尖角，早有蜻蜓立上头', author: '杨万里', source: '小池', chars: ['小', '荷', '露', '尖', '角', '蜻', '蜓', '立'] },

        // 诗经
        { poem: '关关雎鸠，在河之洲', author: '佚名', source: '诗经·关雎', chars: ['关', '雎', '鸠', '河', '洲'] },
        { poem: '蒹葭苍苍，白露为霜', author: '佚名', source: '诗经·蒹葭', chars: ['蒹', '葭', '苍', '白', '露', '霜'] },
        { poem: '青青子衿，悠悠我心', author: '佚名', source: '诗经·子衿', chars: ['青', '子', '衿', '悠', '心'] },
        { poem: '静女其姝，俟我于城隅', author: '佚名', source: '诗经·静女', chars: ['静', '女', '姝', '俟', '城', '隅'] },

        // 楚辞
        { poem: '路漫漫其修远兮，吾将上下而求索', author: '屈原', source: '离骚', chars: ['路', '漫', '修', '远', '上', '下', '求', '索'] },
        { poem: '长太息以掩涕兮，哀民生之多艰', author: '屈原', source: '离骚', chars: ['长', '太', '息', '涕', '哀', '民', '生', '艰'] }
    ]

    // 韵母分组，用于押韵
    static RHYME_GROUPS = {
        'a': ['华', '霞', '嘉', '雅', '佳', '夏', '茶', '花'],
        'an': ['安', '然', '天', '山', '南', '兰', '丹', '晨'],
        'ang': ['良', '阳', '强', '光', '方', '芳', '望', '扬'],
        'ao': ['高', '豪', '涛', '澜', '超', '朝', '宝', '毛'],
        'e': ['乐', '德', '特', '科', '河', '贺', '得', '和'],
        'ei': ['美', '飞', '慧', '蕾', '瑞', '伟', '辉', '威'],
        'en': ['文', '云', '君', '春', '晨', '恩', '根', '本'],
        'eng': ['成', '明', '征', '城', '声', '生', '风', '龙'],
        'i': ['志', '智', '思', '诗', '驰', '知', '之', '治'],
        'ian': ['天', '年', '贤', '先', '连', '田', '彦', '言'],
        'iang': ['强', '亮', '良', '祥', '昌', '刚', '江', '王'],
        'iao': ['小', '鸟', '笑', '妙', '俏', '娇', '宝', '朝'],
        'ie': ['杰', '洁', '雪', '悦', '月', '烈', '列', '切'],
        'in': ['林', '心', '新', '金', '银', '音', '琴', '民'],
        'ing': ['晶', '丁', '宁', '青', '清', '星', '亭', '灵'],
        'iong': ['雄', '忠', '中', '龙', '宏', '冲', '众', '聪'],
        'iu': ['秋', '流', '优', '游', '修', '求', '柔', '悠'],
        'o': ['国', '说', '若', '火', '和', '课', '作', '落'],
        'ong': ['东', '丰', '中', '宗', '松', '风', '龙', '冬'],
        'ou': ['有', '厚', '后', '寿', '头', '候', '斗', '富'],
        'u': ['书', '树', '路', '度', '都', '图', '土', '布'],
        'ua': ['华', '画', '花', '化', '话', '瓜', '挂', '刷'],
        'uai': ['快', '外', '怀', '台', '来', '才', '开', '排'],
        'uan': ['环', '端', '万', '观', '关', '团', '完', '欢'],
        'uang': ['黄', '光', '广', '庄', '双', '霜', '创', '状'],
        'ue': ['学', '雪', '月', '决', '确', '绝', '说', '约'],
        'ui': ['水', '瑞', '惠', '慧', '蕙', '会', '贵', '归'],
        'un': ['春', '纯', '真', '伦', '论', '顺', '润', '尊'],
        'uo': ['国', '火', '若', '作', '和', '朵', '果', '说']
    }

    /**
     * 根据古诗词生成名字
     * @param {string} gender 性别
     * @param {number} wordCount 字数
     * @returns {Array} 推荐名字列表
     */
    static generateNames(gender, wordCount) {
        const recommendations = []

        // 从诗词中提取适合的字组合
        this.POEM_DATABASE.forEach(poemInfo => {
            const suitableChars = this.filterCharsByGender(poemInfo.chars, gender)

            if (wordCount === 2) {
                // 单字名
                suitableChars.slice(0, 3).forEach(char => {
                    recommendations.push({
                        name: char,
                        source: `${poemInfo.source}·${poemInfo.author}`,
                        poem: poemInfo.poem,
                        meaning: this.getCharMeaning(char),
                        score: this.calculatePoemScore(char, poemInfo)
                    })
                })
            } else {
                // 双字名
                for (let i = 0; i < Math.min(suitableChars.length, 3); i++) {
                    for (let j = i + 1; j < Math.min(suitableChars.length, 4); j++) {
                        const name = suitableChars[i] + suitableChars[j]
                        // 检查是否押韵
                        const rhyme = this.checkRhyme(suitableChars[i], suitableChars[j])

                        recommendations.push({
                            name,
                            source: `${poemInfo.source}·${poemInfo.author}`,
                            poem: poemInfo.poem,
                            meaning: this.getCharMeaning(suitableChars[i]) + '，' + this.getCharMeaning(suitableChars[j]),
                            score: this.calculatePoemScore(name, poemInfo) + (rhyme ? 10 : 0),
                            rhyme: rhyme
                        })
                    }
                }
            }
        })

        // 生成组合名字（不同诗句的字组合）
        if (wordCount === 3) {
            this.generateCombinationNames(gender).forEach(name => {
                recommendations.push(name)
            })
        }

        // 排序并返回前20个
        return recommendations
            .sort((a, b) => b.score - a.score)
            .slice(0, 20)
    }

    /**
     * 生成组合名字（来自不同诗句）
     * @param {string} gender 性别
     * @returns {Array} 组合名字
     */
    static generateCombinationNames(gender) {
        const combinations = []
        const poems = this.POEM_DATABASE.slice(0, 10) // 取前10首诗

        for (let i = 0; i < poems.length; i++) {
            for (let j = i + 1; j < poems.length; j++) {
                const chars1 = this.filterCharsByGender(poems[i].chars, gender)
                const chars2 = this.filterCharsByGender(poems[j].chars, gender)

                if (chars1.length > 0 && chars2.length > 0) {
                    const name = chars1[0] + chars2[0]
                    combinations.push({
                        name,
                        source: `${poems[i].source}+${poems[j].source}`,
                        poem: `${poems[i].poem}；${poems[j].poem}`,
                        meaning: this.getCharMeaning(chars1[0]) + '，' + this.getCharMeaning(chars2[0]),
                        score: 75 + (this.checkRhyme(chars1[0], chars2[0]) ? 10 : 0)
                    })
                }
            }
        }

        return combinations.slice(0, 5)
    }

    /**
     * 根据性别过滤汉字
     * @param {Array} chars 汉字数组
     * @param {string} gender 性别
     * @returns {Array} 过滤后的汉字
     */
    static filterCharsByGender(chars, gender) {
        // 女性偏好字
        const femalePreferred = ['月', '花', '雪', '云', '霞', '露', '蕾', '莲', '静', '雅', '美', '清', '悦', '慧', '婷', '娟', '秀', '芳', '琴', '瑶']

        // 男性偏好字
        const malePreferred = ['山', '河', '海', '阳', '明', '星', '龙', '虎', '鹰', '松', '强', '刚', '豪', '杰', '伟', '凯', '威', '雄', '昊', '宇']

        // 中性字
        const neutral = ['春', '秋', '天', '地', '心', '志', '思', '诗', '文', '华', '光', '辉', '安', '和', '平', '乐', '成', '达', '宏', '博']

        return chars.filter(char => {
            if (gender === '女') {
                return femalePreferred.includes(char) || neutral.includes(char)
            } else {
                return malePreferred.includes(char) || neutral.includes(char)
            }
        })
    }

    /**
     * 检查两个字是否押韵
     * @param {string} char1 第一个字
     * @param {string} char2 第二个字  
     * @returns {boolean} 是否押韵
     */
    static checkRhyme(char1, char2) {
        for (let rhyme of Object.values(this.RHYME_GROUPS)) {
            if (rhyme.includes(char1) && rhyme.includes(char2)) {
                return true
            }
        }
        return false
    }

    /**
     * 获取汉字诗意寓意
     * @param {string} char 汉字
     * @returns {string} 寓意
     */
    static getCharMeaning(char) {
        const poeticMeanings = {
            // 自然景物
            '春': '春意盎然，生机勃勃',
            '夏': '热情如火，活力四射',
            '秋': '秋高气爽，成熟稳重',
            '冬': '冬雪纯洁，坚韧不拔',
            '月': '皎洁如月，温婉如水',
            '星': '繁星点点，志向高远',
            '云': '白云悠悠，飘逸洒脱',
            '雪': '雪花纯洁，品格高尚',
            '花': '花开富贵，美丽动人',
            '草': '生命力强，朴实无华',
            '山': '稳如泰山，坚定不移',
            '海': '海纳百川，胸怀宽广',
            '河': '源远流长，生生不息',
            '江': '波澜壮阔，气势磅礴',

            // 品德修养
            '静': '宁静致远，心如止水',
            '雅': '高雅脱俗，品味不凡',
            '慧': '聪明智慧，博学多才',
            '贤': '德才兼备，品德高尚',
            '志': '志向远大，意志坚定',
            '诚': '诚实守信，品格纯正',
            '善': '心地善良，与人为善',
            '和': '和谐美满，温润如玉',
            '安': '平安如意，安居乐业',
            '乐': '快乐无忧，乐观向上',

            // 才华学识
            '文': '文采飞扬，学富五车',
            '书': '书香门第，知书达理',
            '诗': '诗情画意，才华横溢',
            '墨': '文墨之香，博古通今',
            '琴': '琴棋书画，多才多艺',
            '画': '妙笔丹青，艺术天赋',
            '歌': '歌声悦耳，音律天成',
            '舞': '翩翩起舞，优雅动人',

            // 光明前程  
            '明': '前程光明，智慧通达',
            '亮': '明亮透彻，光彩照人',
            '辉': '光辉灿烂，前程似锦',
            '光': '光芒万丈，才华出众',
            '晨': '晨光初现，希望无限',
            '曦': '晨曦微露，新生希望',
            '旭': '旭日东升，朝气蓬勃',
            '阳': '阳光温暖，积极向上'
        }

        return poeticMeanings[char] || '寓意深远，富有诗意'
    }

    /**
     * 计算诗词名字评分
     * @param {string} name 名字
     * @param {Object} poemInfo 诗词信息
     * @returns {number} 评分
     */
    static calculatePoemScore(name, poemInfo) {
        let score = 70 // 基础分

        // 诗词知名度加分
        const famousAuthors = ['李白', '杜甫', '王维', '李清照', '苏轼', '辛弃疾', '屈原']
        if (famousAuthors.includes(poemInfo.author)) {
            score += 15
        }

        // 字数适中加分
        if (name.length === 2) {
            score += 10
        }

        // 寓意优美加分
        const beautifulChars = ['月', '花', '雪', '云', '明', '清', '雅', '慧', '美', '静']
        for (let char of name) {
            if (beautifulChars.includes(char)) {
                score += 5
            }
        }

        return Math.min(score, 100)
    }

    /**
     * 搜索包含特定字的诗句
     * @param {string} char 汉字
     * @returns {Array} 相关诗句
     */
    static searchPoemsByChar(char) {
        return this.POEM_DATABASE.filter(poem =>
            poem.poem.includes(char) || poem.chars.includes(char)
        )
    }
}
