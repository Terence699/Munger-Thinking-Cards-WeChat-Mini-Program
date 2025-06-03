import { cardManager, ThinkingCard } from '../../utils/cardManager';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String,
      value: '搜索思维模型...'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchValue: '',
    searchResults: [] as ThinkingCard[],
    showResults: false,
    isSearching: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 搜索输入处理
     */
    onSearchInput(e: any) {
      const value = e.detail.value;
      this.setData({
        searchValue: value
      });

      // 防抖搜索
      this.debounceSearch(value);
    },

    /**
     * 防抖搜索函数
     */
    debounceSearch: (() => {
      let timer: NodeJS.Timeout | null = null;
      return function(this: any, keyword: string) {
        if (timer) {
          clearTimeout(timer);
        }
        
        timer = setTimeout(() => {
          this.performSearch(keyword);
        }, 300); // 300ms 防抖
      }
    })(),

    /**
     * 执行搜索
     */
    performSearch(keyword: string) {
      if (!keyword || keyword.trim() === '') {
        this.setData({
          searchResults: [],
          showResults: false,
          isSearching: false
        });
        return;
      }

      this.setData({
        isSearching: true,
        showResults: true
      });

      // 搜索卡片
      const results = cardManager.searchCards(keyword);
      
      // 限制搜索结果数量（最多显示10个）
      const limitedResults = results.slice(0, 10);

      this.setData({
        searchResults: limitedResults,
        isSearching: false
      });
    },

    /**
     * 搜索确认（回车）
     */
    onSearchConfirm(e: any) {
      const value = e.detail.value;
      if (value.trim()) {
        this.performSearch(value);
        
        // 如果只有一个结果，直接跳转
        if (this.data.searchResults.length === 1) {
          this.selectCard(this.data.searchResults[0]);
        }
      }
    },

    /**
     * 搜索框获得焦点
     */
    onSearchFocus() {
      if (this.data.searchValue.trim()) {
        this.setData({
          showResults: true
        });
      }
    },

    /**
     * 搜索框失去焦点
     */
    onSearchBlur() {
      // 延迟隐藏结果，给用户点击结果项的时间
      setTimeout(() => {
        this.setData({
          showResults: false
        });
      }, 200);
    },

    /**
     * 清除搜索
     */
    onClearSearch() {
      this.setData({
        searchValue: '',
        searchResults: [],
        showResults: false
      });
    },

    /**
     * 选择搜索结果
     */
    onSelectResult(e: any) {
      const card = e.currentTarget.dataset.card;
      this.selectCard(card);
    },

    /**
     * 选择卡片并跳转
     */
    selectCard(card: ThinkingCard) {
      // 跳转到选中的卡片
      const success = cardManager.jumpToCard(card.id);
      
      if (success) {
        // 触发父组件事件
        this.triggerEvent('cardChanged', {
          card: cardManager.getCurrentCard(),
          index: cardManager.getCurrentIndex(),
          total: cardManager.getTotalCount()
        });

        // 清除搜索状态
        this.setData({
          searchValue: '',
          searchResults: [],
          showResults: false
        });

        // 显示成功提示
        wx.showToast({
          title: `已跳转到：${card.name}`,
          icon: 'success',
          duration: 1500
        });
      } else {
        wx.showToast({
          title: '跳转失败',
          icon: 'error',
          duration: 1500
        });
      }
    },

    /**
     * 关闭遮罩
     */
    onCloseMask() {
      this.setData({
        showResults: false
      });
    },

    /**
     * 获取搜索建议（可选功能）
     */
    getSearchSuggestions() {
      // 这里可以实现搜索建议功能
      // 比如显示热门搜索词、最近搜索等
      return [
        '复利', '概率', '决策', '心理', '经济',
        '生物', '物理', '哲学', '历史', '军事'
      ];
    }
  }
}); 