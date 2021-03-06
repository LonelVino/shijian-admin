/**
 * 挂靠单位
 * 该列表依赖顺序
 */
export const BELONGTO_LIST = [
  '无挂靠单位',
  '校团委',
  '大学生党委',
  '文治书院',
  '南洋书院',
  '宗濂书院',
  '彭康书院',
  '仲英书院',
  '启德书院',
  '励志书院',
  '崇实书院',
  '钱学森书院',
  '材料学院',
  '数学学院',
  '电信学部',
  '生命学院',
  '能动学院',
  '外国语学院',
  '理学院',
  '经金学院',
  '医学部',
  '电气学院',
  '人居学院',
  '人文学院',
  '化工学院',
  '机械学院',
  '软件学院',
  '航天学院',
  '公管学院',
  '马克思主义学院',
  '法学院',
  '新媒体学院',
  '金禾经济中心',
  '管理学院',
  '创新创业学院',
  '前沿院',
  '继续教育学院',
  '网络教育学院',
  '国际教育学院',
  '体育中心'
]

export const BELONGTOS = []

for (let i in BELONGTO_LIST) {
  i = parseInt(i)
  BELONGTOS.push({
    key: i,
    value: i,
    label: BELONGTO_LIST[i]
  })
}
BELONGTOS.shift()

/**
 * 学院
 * 该列表依赖顺序
 */
const INSTITUTE_LIST = [
  '其他',
  '钱学森学院',
  '材料学院',
  '数统学院',
  '电信学院',
  '生命学院',
  '能动学院',
  '外语学院',
  '理学院',
  '经金学院',
  '医学部',
  '电气学院',
  '人居学院',
  '人文学院',
  '化工学院',
  '机械学院',
  '软件学院',
  '航天学院',
  '公管学院',
  '马克思学院',
  '法学院',
  '管理学院',
  '金禾学院',
  '体育中心',
  '新媒体学院',
  '继续教育学院',
  '网络教育学院',
  '国际教育学院',
  '前沿院',
  '创新创业学院'

]

export const INSTITUTES = []

for (let i in INSTITUTE_LIST) {
  i = parseInt(i)
  INSTITUTES.push({
    key: i,
    value: INSTITUTE_LIST[i],
    label: INSTITUTE_LIST[i]
  })
}
INSTITUTES.shift()

/**
 * 籍贯省份以及城市
 */
export const PROVINCES = [{
  label: '北京',
  cities: ['东城区', '西城区', '海淀区', '朝阳区', '丰台区', '石景山区', '通州区', '顺义区', '房山区', '大兴区', '昌平区', '怀柔区', '平谷区', '门头沟区', '延庆区', '密云区']
}, {
  label: '上海',
  cities: ['浦东新区', '徐汇区', '长宁区', '普陀区', '闸北区', '虹口区', '杨浦区', '黄浦区', '卢湾区', '静安区', '宝山区', '闵行区', '嘉定区', '金山区', '松江区', '青浦区', '南汇区', '奉贤区', '崇明区']
}, {
  label: '天津',
  cities: ['河东', '南开', '河西', '河北', '和平', '红桥', '东丽', '津南', '西青', '北辰', '塘沽', '汉沽', '大港', '蓟县', '宝坻', '宁河', '静海', '武清', '滨海新区']
}, {
  label: '重庆',
  cities: ['渝中区', '大渡口区', '綦江区', '江北区', '沙坪坝区', '九龙坡区', '南岸区', '北碚区', '万盛区', '双桥区', '渝北区', '巴南区', '万州区', '涪陵区', '黔江区', '长寿区', '江津区', '合川区', '永川区', '南川区', '梁平县', '城口县', '丰都县', '垫江县', '武隆县', '忠县', '云阳县', '奉节县', '巫山县', '巫溪县', '石柱土家族自治县', '秀山土家族苗族自治县', '酉阳土家族苗族自治县', '彭水苗族土家族自治县']
}, {
  label: '浙江',
  cities: ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水']
}, {
  label: '江苏',
  cities: ['南京', '无锡', '常州', '徐州', '苏州', '南通', '连云港', '淮安', '扬州', '盐城', '镇江', '泰州', '宿迁']
}, {
  label: '广东',
  cities: ['广州', '韶关', '深圳', '珠海', '汕头', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮']
}, {
  label: '福建',
  cities: ['福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德']
}, {
  label: '湖南',
  cities: ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家苗族自治区']
}, {
  label: '湖北',
  cities: ['武汉', '襄阳', '黄石', '十堰', '宜昌', '鄂州', '荆门', '孝感', '荆州', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州', '仙桃市', '潜江市', '天门市', '神农架林区']
}, {
  label: '辽宁',
  cities: ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛']
}, {
  label: '吉林',
  cities: ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治区']
}, {
  label: '黑龙江',
  cities: ['哈尔滨', '齐齐哈尔', '鸡西', '牡丹江', '鹤岗', '绥化', '双鸭山', '佳木斯', '大庆', '伊春', '黑河', '七台河', '大兴安岭']
}, {
  label: '河北',
  cities: ['石家庄', '保定', '唐山', '邯郸', '承德', '廊坊', '衡水', '邢台', '沧州', '定州', '辛集', '秦皇岛', '张家口']
}, {
  label: '河南',
  cities: ['郑州', '洛阳', '商丘', '安阳', '南阳', '开封', '平顶山', '焦作', '新乡', '鹤壁', '许昌', '漯河', '三门峡', '信阳', '周口', '驻马店', '济源', '濮阳']
}, {
  label: '山东',
  cities: ['济南', '青岛', '菏泽', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '滨州', '德州', '聊城', '临沂']
}, {
  label: '陕西',
  cities: ['西安', '宝鸡', '咸阳', '渭南', '铜川', '延安', '榆林', '汉中', '安康', '商洛']
}, {
  label: '甘肃',
  cities: ['兰州', '嘉峪关', '金昌', '金川', '白银', '天水', '武威', '张掖', '酒泉', '平凉', '庆阳', '定西', '陇南', '临夏回族自治州', '甘南藏族自治州']
}, {
  label: '新疆',
  cities: ['乌鲁木齐', '奎屯', '石河子', '昌吉', '吐鲁番', '库尔勒', '阿克苏', '喀什', '伊宁', '克拉玛依', '塔城', '哈密', '和田', '阿勒泰', '阿图什', '博尔塔拉蒙古自治州', '巴音郭楞蒙古自治州', '克孜勒苏柯尔克孜自治州', '伊犁哈萨克自治州', '阿拉尔市', '图木舒克', '五家渠', '铁门关']
}, {
  label: '青海',
  cities: ['西宁', '海东地区', '海北藏族自治州', '黄南藏族自治州', '海南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州']
}, {
  label: '山西',
  cities: ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁']
}, {
  label: '四川',
  cities: ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州']
}, {
  label: '贵州',
  cities: ['贵阳', '六盘水', '遵义', '安顺', '黔南布依族苗族自治州', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '铜仁', '毕节']
}, {
  label: '安徽',
  cities: ['合肥', '芜湖', '安庆', '马鞍山', '阜阳', '六安', '滁州', '宿州', '蚌埠', '巢湖', '淮南', '宣城', '亳州', '淮北', '铜陵', '黄山', '池州']
}, {
  label: '江西',
  cities: ['南昌', '九江', '景德镇', '萍乡', '新余', '鹰潭', '赣州', '宜春', '上饶', '吉安', '抚州']
}, {
  label: '云南',
  cities: ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '楚雄彝族自治州', '大理白族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州']
}, {
  label: '内蒙古',
  cities: ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '兴安盟', '阿拉善盟', '锡林郭勒盟', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布']
}, {
  label: '西藏',
  cities: ['拉萨', '昌都地区', '林芝地区', '山南地区', '日喀则地区', '那曲地区', '阿里地区']
}, {
  label: '广西',
  cities: ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '来宾', '河池', '崇左']
}, {
  label: '宁夏',
  cities: ['银川', '石嘴山', '吴忠', '固原', '中卫']
}, {
  label: '海南',
  cities: ['海口', '三亚', '三沙', '儋州', '五指山', '琼海', '文昌', '万宁', '东方', '定安', '屯昌', '澄迈', '临高', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县']
}, {
  label: '香港',
  cities: ['香港岛', '九龙半岛', '新界']
}, {
  label: '澳门',
  cities: ['澳门半岛', '氹仔岛', '路环岛', '路氹城']
}, {
  label: '台湾',
  cities: ['台北', '高雄', '基隆', '台中', '台南', '新竹', '嘉义', '桃园']
}]

for (const i in PROVINCES) {
  const prov = PROVINCES[i]
  const cities = []
  for (const j in prov.cities) {
    cities.push({
      value: prov.cities[j],
      label: prov.cities[j]
    })
  }
  prov.cities = cities
}

/**
 * 本科生书院
 * 该列表依赖顺序
 */
const COLLEGE_LIST = [
  '文治书院',
  '南洋书院',
  '宗濂书院',
  '彭康书院',
  '仲英书院',
  '启德书院',
  '励志书院',
  '崇实书院',
  '钱学森书院',
  '其他'
]

export const COLLEGES = []

for (let i in COLLEGE_LIST) {
  i = parseInt(i)
  COLLEGES.push({
    key: i,
    value: COLLEGE_LIST[i],
    label: COLLEGE_LIST[i]
  })
}
COLLEGES.shift()

/**
 * 性别
 */
export const GENDERS = [{
  key: 1,
  value: 1,
  label: '男'
}, {
  key: 0,
  value: 0,
  label: '女'
}]

/**
 * 受教育水平
 * 该列表依赖顺序
 */
const GRADE_LIST = [
  '本科一年级',
  '本科二年级',
  '本科三年级',
  '本科四年级',
  '本科五年级',
  '研究生一年级',
  '研究生二年级',
  '研究生三年级'
]

export const GRADES = []

for (let i in GRADE_LIST) {
  i = parseInt(i)
  GRADES.push({
    key: i,
    value: GRADE_LIST[i],
    label: GRADE_LIST[i]
  })
}
GRADES.shift()

/**
 * 民族
 * 该列表依赖顺序
 */
const NATION_LIST = [
  '',
  '汉族',
  '蒙古族',
  '回族',
  '藏族',
  '维吾尔族',
  '苗族',
  '彝族',
  '壮族',
  '布依族',
  '朝鲜族',
  '满族',
  '侗族',
  '瑶族',
  '白族',
  '土家族',
  '哈尼族',
  '哈萨克族',
  '傣族',
  '黎族',
  '傈僳族',
  '佤族',
  '畲族',
  '高山族',
  '拉祜族',
  '水族',
  '东乡族',
  '纳西族',
  '景颇族',
  '柯尔克孜族',
  '土族',
  '达斡尔族',
  '仫佬族',
  '羌族',
  '布朗族',
  '撒拉族',
  '毛南族',
  '仡佬族',
  '锡伯族',
  '阿昌族',
  '普米族',
  '塔吉克族',
  '怒族',
  '乌孜别克族',
  '俄罗斯族',
  '鄂温克族',
  '德昂族',
  '保安族',
  '裕固族',
  '京族',
  '塔塔尔族',
  '独龙族',
  '鄂伦春族',
  '赫哲族',
  '门巴族',
  '珞巴族',
  '基诺族',
  '外国血统',
  '其他'
]

export const NATIONS = []

for (let i in NATION_LIST) {
  i = parseInt(i)
  NATIONS.push({
    key: i,
    value: NATION_LIST[i],
    label: NATION_LIST[i]
  })
}
NATIONS.shift()

/**
 * 政治面貌
 * 该列表依赖顺序
 */
const OUTLOOK_LIST = [
  '群众',
  '共青团员',
  '中共党员',
  '中共预备党员',
  '民盟盟员',
  '民革党员',
  '民建会员',
  '台盟盟员',
  '无党派人士'
]

export const OUTLOOKS = []

for (let i in OUTLOOK_LIST) {
  i = parseInt(i)
  OUTLOOKS.push({
    key: i,
    value: OUTLOOK_LIST[i],
    label: OUTLOOK_LIST[i]
  })
}
OUTLOOKS.shift()

/**
 * 证件类型
 * 该列表依赖顺序
 */
const CARD_TYPE_LIST = [
  '身份证',
  '其他'
]

export const CARD_TYPES = []

for (let i in CARD_TYPE_LIST) {
  i = parseInt(i)
  CARD_TYPES.push({
    key: i,
    value: CARD_TYPE_LIST[i],
    label: CARD_TYPE_LIST[i]
  })
}

/**
 * 教育程度列表
 * 该列表依赖顺序
 */
export const EDU_LEVELS = [{
  key: 0,
  value: 0,
  label: '本科生'
}, {
  key: 1,
  value: 1,
  label: '研究生'
}]

/**
 * 实践分类（交大）列表
 * 该列表依赖顺序
 */
export const PRACTICE_TYPE_LIST = [
  '其他',
  '自主立项',
  '专项实践'
]

export const PRACTICE_TYPES = []

for (let i in PRACTICE_TYPE_LIST) {
  i = parseInt(i)
  PRACTICE_TYPES.push({
    key: i,
    value: i,
    label: PRACTICE_TYPE_LIST[i]
  })
}

PRACTICE_TYPES.shift()

/**
 * 实践主题（交大）列表
 * 该列表依赖顺序
 */
export const PRACTICE_THEME_LIST = [
  '特色实践(其他)',
  '脱贫攻坚',
  '西迁精神',
  '政府见习',
  '一带一路',
  '红色寻访',
  '志愿服务'
]

export const PRACTICE_THEMES = []

for (let i in PRACTICE_THEME_LIST) {
  i = parseInt(i)
  PRACTICE_THEMES.push({
    key: i,
    value: i,
    label: PRACTICE_THEME_LIST[i]
  })
}

PRACTICE_THEMES.shift()

/**
 * 实践形式（交大）列表
 * 该列表依赖顺序
 */

export const PRACTICE_FORM_LIST = [
  '其他',
  '社会调查',
  '理论宣讲',
  '生产实习',
  '科技创新',
  '返乡实践',
  '网络线上'
]

export const PRACTICE_FORMS = []

for (let i in PRACTICE_FORM_LIST) {
  i = parseInt(i)
  PRACTICE_FORMS.push({
    key: i,
    value: i,
    label: PRACTICE_FORM_LIST[i]
  })
}

PRACTICE_FORMS.shift()

/**
 * 申报团中央专项行动类型
 * 该列表依赖顺序
 */
export const DECLARATION_TYPE_LIST = [
  '不定类型',
  '“习近平新时代中国特色社会主义思想”万场宣讲交流',
  '大学生政务实习专项',
  '“青年观察家”改革开放40周年专项调研',
  '“丝路新世界·青春中国梦”专项',
  '“追寻青春足迹·红色筑梦之旅”延安专项',
  '“健康扶贫青春行”专项',
  '“印象长白山·筑梦新时代” 百所高校进白山',
  '“筑梦新时代·奋斗新征程”百所高校上党行',
  '村土地利用规划编制志愿服务',
  '“知行促进计划”专项',
  '青少年禁毒防艾宣传',
  '“‘天翼’·互联网+教育”专项'
]

export const DECLARATION_TYPES = []

for (let i in DECLARATION_TYPE_LIST) {
  i = parseInt(i)
  DECLARATION_TYPES.push({
    key: i,
    value: i,
    label: DECLARATION_TYPE_LIST[i]
  })
}

DECLARATION_TYPES.shift()
