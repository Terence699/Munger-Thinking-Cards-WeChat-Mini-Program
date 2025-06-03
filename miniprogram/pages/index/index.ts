/**
 * 芒格思维卡片主页面
 * 负责协调卡片展示和用户交互
 */

import { cardManager, ThinkingCard, SwitchMode } from '../../utils/cardManager';

// 页面数据接口
interface PageData {
  currentCard: ThinkingCard | null;
  currentIndex: number;
  totalCards: number;
  switchMode: SwitchMode;
  showHint: boolean;
}

Page<PageData, {}>({
  /**
   * 页面的初始数据
   */
  data: {
    currentCard: null,
    currentIndex: 0,
    totalCards: 0,
    switchMode: SwitchMode.RANDOM,
    showHint: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    console.log('芒格思维卡片页面加载');
    this.initializePage();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log('芒格思维卡片页面渲染完成');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log('芒格思维卡片页面显示');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    console.log('芒格思维卡片页面隐藏');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    console.log('芒格思维卡片页面卸载');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    console.log('用户下拉刷新');
    this.randomCard();
    wx.stopPullDownRefresh();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    const currentCard = this.data.currentCard;
    return {
      title: `芒格思维卡片 - ${(currentCard && currentCard.name) || '智慧思维模型'}`,
      path: '/pages/index/index',
      imageUrl: '/images/share-cover.png' // 可选：添加分享封面图
    };
  },

  /**
   * 初始化页面
   */
  initializePage() {
    try {
      const currentCard = cardManager.getCurrentCard();
      const currentIndex = cardManager.getCurrentIndex();
      const totalCards = cardManager.getTotalCount();
      const switchMode = cardManager.getSwitchMode();

      this.setData({
        currentCard,
        currentIndex,
        totalCards,
        switchMode
      });

      console.log('页面初始化完成:', {
        currentCard: currentCard.name,
        currentIndex,
        totalCards,
        switchMode
      });

      // 显示欢迎提示
      this.showWelcomeMessage();

    } catch (error) {
      console.error('页面初始化失败:', error);
      wx.showToast({
        title: '初始化失败',
        icon: 'none',
        duration: 2000
      });
    }
  },

  /**
   * 显示欢迎消息
   */
  showWelcomeMessage() {
    wx.showToast({
      title: '欢迎使用芒格思维卡片',
      icon: 'success',
      duration: 2000
    });
  },

  /**
   * 左滑事件处理
   */
  onSwipeLeft() {
    console.log('左滑 - 下一张卡片');
    this.nextCard();
  },

  /**
   * 右滑事件处理
   */
  onSwipeRight() {
    console.log('右滑 - 上一张卡片');
    this.previousCard();
  },

  /**
   * 切换到下一张卡片
   */
  nextCard() {
    try {
      const nextCard = cardManager.nextCard();
      this.updateCardData(nextCard);
      
      console.log('切换到下一张卡片:', nextCard.name);
      this.showCardInfo(nextCard);
      
    } catch (error) {
      console.error('切换下一张卡片失败:', error);
      this.showError('切换失败');
    }
  },

  /**
   * 切换到上一张卡片
   */
  previousCard() {
    try {
      const previousCard = cardManager.previousCard();
      this.updateCardData(previousCard);
      
      console.log('切换到上一张卡片:', previousCard.name);
      this.showCardInfo(previousCard);
      
    } catch (error) {
      console.error('切换上一张卡片失败:', error);
      this.showError('切换失败');
    }
  },

  /**
   * 随机选择卡片
   */
  randomCard() {
    try {
      const randomCard = cardManager.randomCard();
      this.updateCardData(randomCard);
      
      console.log('随机选择卡片:', randomCard.name);
      this.showCardInfo(randomCard);
      
    } catch (error) {
      console.error('随机选择卡片失败:', error);
      this.showError('随机选择失败');
    }
  },

  /**
   * 更新卡片数据
   */
  updateCardData(card: any) {
    this.setData({
      currentCard: card,
      currentIndex: cardManager.getCurrentIndex()
    });
  },

  /**
   * 切换到随机模式
   */
  switchToRandomMode() {
    cardManager.setSwitchMode(SwitchMode.RANDOM);
    this.setData({
      switchMode: SwitchMode.RANDOM
    });
    
    console.log('切换到随机模式');
    wx.showToast({
      title: '已切换到随机模式',
      icon: 'success',
      duration: 1500
    });
  },

  /**
   * 切换到顺序模式
   */
  switchToSequenceMode() {
    cardManager.setSwitchMode(SwitchMode.SEQUENCE);
    this.setData({
      switchMode: SwitchMode.SEQUENCE
    });
    
    console.log('切换到顺序模式');
    wx.showToast({
      title: '已切换到顺序模式',
      icon: 'success',
      duration: 1500
    });
  },

  /**
   * 显示卡片信息
   */
  showCardInfo(card: ThinkingCard) {
    // 可以在这里添加卡片切换的反馈效果
    // 比如震动反馈
    wx.vibrateShort({
      type: 'light'
    });
  },

  /**
   * 显示错误信息
   */
  showError(message: string) {
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 2000
    });
  },

  /**
   * 搜索触发的卡片变更事件
   */
  onCardChanged(e: any) {
    const { card, index, total } = e.detail;
    this.setData({
      currentCard: card,
      currentIndex: index,
      totalCards: total
    });
  }
});
