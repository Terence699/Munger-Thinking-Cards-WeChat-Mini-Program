/**
 * 卡片数据管理器
 * 负责管理芒格思维卡片的数据和切换逻辑
 */

// 卡片接口定义
export interface ThinkingCard {
  id: number;
  name: string;
  fileName: string;
  svgPath: string;
}

// 卡片切换模式
export enum SwitchMode {
  RANDOM = 'random',    // 随机模式
  SEQUENCE = 'sequence' // 顺序模式
}

class CardManager {
  private cards: ThinkingCard[];
  private currentIndex: number;
  private switchMode: SwitchMode;

  constructor() {
    this.cards = [];
    this.currentIndex = 0;
    this.switchMode = SwitchMode.RANDOM;
    this.initializeCards();
  }

  /**
   * 初始化卡片数据
   * 根据assets/v0目录中的SVG文件生成卡片列表
   */
  private initializeCards(): void {
    // 生成卡片数据（基于实际的SVG文件）
    const cardFiles = [
      'model1-复利模型.svg',
      'model2-排列组合原理.svg',
      'model3-概率论（贝叶斯推理）.svg',
      'model4-决策树分析.svg',
      'model5-博弈论（纳什均衡、囚徒困境）.svg',
      'model6-大数定律.svg',
      'model7-统计显著性.svg',
      'model8-均值回归.svg',
      'model9-算法思维.svg',
      'model10-线性代数（向量思维）.svg',
      'model11-临界点理论.svg',
      'model12-惯性定律（动量效应）.svg',
      'model13-均衡理论.svg',
      'model14-熵增定律.svg',
      'model15-相对论思维（视角依赖）.svg',
      'model16-断裂点理论.svg',
      'model17-反作用力原则.svg',
      'model18-杠杆原理.svg',
      'model19-锚定效应等.svg',
      'model20-社会认同理论.svg',
      'model21-激励效应.svg',
      'model22-损失厌恶.svg',
      'model23-双曲贴现（延迟满足）.svg',
      'model24-巴甫洛夫条件反射.svg',
      'model25-斯坦福监狱实验（权力影响）.svg',
      'model26-马斯洛需求层次.svg',
      'model27-邓宁-克鲁格效应（无知自信）.svg',
      'model28-自利性偏差.svg',
      'model29-框架效应.svg',
      'model30-幸存者偏差.svg',
      'model31-过度自信效应.svg',
      'model32-禀赋效应.svg',
      'model33-承诺一致性倾向.svg',
      'model34-光环效应.svg',
      'model35-逆向思维.svg',
      'model36-厌恶剥夺心理.svg',
      'model37-对比效应.svg',
      'model38-从众心理.svg',
      'model39-可得性偏差.svg',
      'model40-归因理论.svg',
      'model41-心流状态.svg',
      'model42-帕金森琐碎定理.svg',
      'model43-大脑误判心理学.svg',
      'model44-机会成本.svg',
      'model45-沉没成本谬误.svg',
      'model46-比较优势理论.svg',
      'model47-边际效用递减.svg',
      'model48-供需理论.svg',
      'model49-规模效应.svg',
      'model50-外部性.svg',
      'model51-信息不对称.svg',
      'model52-公共地悲剧.svg',
      'model53-价格弹性.svg',
      'model54-垄断竞争模型.svg',
      'model55-吉芬商品悖论.svg',
      'model56-进化论（适者生存）.svg',
      'model57-自然选择.svg',
      'model58-红皇后效应（持续适应）.svg',
      'model59-生态系统思维.svg',
      'model60-乌合之众.svg',
      'model61-亲缘选择理论.svg',
      'model62-共生关系.svg',
      'model63-病毒式传播模型.svg',
      'model64-适应性辐射.svg',
      'model65-生物冗余机制.svg',
      'model66-冗余备份系统.svg',
      'model67-断裂点测试.svg',
      'model68-反馈回路（正负反馈）.svg',
      'model69-安全边际.svg',
      'model70-系统动力学.svg',
      'model71-瓶颈分析.svg',
      'model72-质量控制（六西格玛）.svg',
      'model73-模块化设计.svg',
      'model74-催化作用.svg',
      'model75-自催化效应.svg',
      'model76-相变理论.svg',
      'model77-氧化还原反应（平衡思维）.svg',
      'model78-化学平衡（动态调整）.svg',
      'model79-奥卡姆剃刀（简约法则）.svg',
      'model80-实用主义.svg',
      'model81-辩证法（矛盾统一）.svg',
      'model82-第一性原理.svg',
      'model83-休谟的怀疑论.svg',
      'model84-斯多葛学派（控制二分法）.svg',
      'model85-不可知论（概率化思维）.svg',
      'model86-路径依赖.svg',
      'model87-技术周期（如康波周期）.svg',
      'model88-帝国兴衰规律.svg',
      'model89-大数定律.svg',
      'model90-辛普森悖论.svg',
      'model91-孙子兵法（不战而胜）.svg',
      'model92-不对称战争.svg',
      'model93-汉德公式（风险责任）.svg',
      'model94-责任分散效应.svg',
      'model95-生态位理论.svg',
      'model96-哥白尼原则（平凡原理）.svg',
      'model97-文化相对主义.svg',
      'model98-萨丕尔-沃夫假说（语言影响思维）.svg',
      'model99-汉隆剃刀（勿以恶意揣测他人）.svg',
      'model100-多学科思维模型（芒格核心方法论）.svg'
    ];

    this.cards = cardFiles.map((fileName, index) => {
      const name = fileName.replace('.svg', '').replace(/^model\d+-/, '');
      return {
        id: index + 1,
        name,
        fileName,
        svgPath: `/images/v0/${fileName}`
      };
    });

    // 初始化时随机选择一张卡片
    this.currentIndex = this.getRandomIndex();
  }

  /**
   * 获取随机索引
   */
  private getRandomIndex(): number {
    return Math.floor(Math.random() * this.cards.length);
  }

  /**
   * 获取当前卡片
   */
  getCurrentCard(): ThinkingCard {
    return this.cards[this.currentIndex];
  }

  /**
   * 获取所有卡片
   */
  getAllCards(): ThinkingCard[] {
    return [...this.cards];
  }

  /**
   * 设置切换模式
   */
  setSwitchMode(mode: SwitchMode): void {
    this.switchMode = mode;
  }

  /**
   * 获取当前切换模式
   */
  getSwitchMode(): SwitchMode {
    return this.switchMode;
  }

  /**
   * 切换到下一张卡片
   */
  nextCard(): ThinkingCard {
    if (this.switchMode === SwitchMode.RANDOM) {
      // 随机模式：随机选择下一张卡片
      let newIndex;
      do {
        newIndex = this.getRandomIndex();
      } while (newIndex === this.currentIndex && this.cards.length > 1);
      this.currentIndex = newIndex;
    } else {
      // 顺序模式：按顺序切换
      this.currentIndex = (this.currentIndex + 1) % this.cards.length;
    }
    return this.getCurrentCard();
  }

  /**
   * 切换到上一张卡片
   */
  previousCard(): ThinkingCard {
    if (this.switchMode === SwitchMode.RANDOM) {
      // 随机模式：随机选择上一张卡片
      let newIndex;
      do {
        newIndex = this.getRandomIndex();
      } while (newIndex === this.currentIndex && this.cards.length > 1);
      this.currentIndex = newIndex;
    } else {
      // 顺序模式：按顺序切换
      this.currentIndex = this.currentIndex === 0 ? this.cards.length - 1 : this.currentIndex - 1;
    }
    return this.getCurrentCard();
  }

  /**
   * 随机选择一张卡片
   */
  randomCard(): ThinkingCard {
    this.currentIndex = this.getRandomIndex();
    return this.getCurrentCard();
  }

  /**
   * 获取当前卡片索引
   */
  getCurrentIndex(): number {
    return this.currentIndex;
  }

  /**
   * 获取卡片总数
   */
  getTotalCount(): number {
    return this.cards.length;
  }

  /**
   * 搜索卡片
   * @param keyword 搜索关键词
   * @returns 匹配的卡片列表
   */
  searchCards(keyword: string): ThinkingCard[] {
    if (!keyword || keyword.trim() === '') {
      return [];
    }

    const searchTerm = keyword.toLowerCase().trim();
    return this.cards.filter(card => {
      // 搜索卡片名称
      const nameMatches = card.name.toLowerCase().includes(searchTerm);
      // 搜索文件名（去掉model数字前缀）
      const fileNameMatches = card.fileName.toLowerCase().includes(searchTerm);
      // 搜索ID号
      const idMatches = card.id.toString().includes(searchTerm);
      
      return nameMatches || fileNameMatches || idMatches;
    });
  }

  /**
   * 跳转到指定卡片
   * @param cardId 卡片ID
   * @returns 跳转是否成功
   */
  jumpToCard(cardId: number): boolean {
    const targetIndex = this.cards.findIndex(card => card.id === cardId);
    if (targetIndex !== -1) {
      this.currentIndex = targetIndex;
      return true;
    }
    return false;
  }

  /**
   * 跳转到指定索引的卡片
   * @param index 卡片索引
   * @returns 跳转是否成功
   */
  jumpToIndex(index: number): boolean {
    if (index >= 0 && index < this.cards.length) {
      this.currentIndex = index;
      return true;
    }
    return false;
  }

  /**
   * 根据名称查找卡片
   * @param name 卡片名称
   * @returns 找到的卡片，如果没找到返回null
   */
  findCardByName(name: string): ThinkingCard | null {
    const card = this.cards.find(card => 
      card.name.toLowerCase() === name.toLowerCase().trim()
    );
    return card || null;
  }

  /**
   * 跳转到指定名称的卡片
   * @param name 卡片名称
   * @returns 跳转是否成功
   */
  jumpToCardByName(name: string): boolean {
    const card = this.findCardByName(name);
    if (card) {
      return this.jumpToCard(card.id);
    }
    return false;
  }
}

// 导出单例实例
export const cardManager = new CardManager(); 