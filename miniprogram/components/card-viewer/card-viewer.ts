/**
 * 卡片查看器组件
 * 负责显示SVG卡片并处理滑动手势
 */

import { ThinkingCard } from '../../utils/cardManager';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 当前卡片数据
    cardData: {
      type: Object,
      value: null
    },
    // 卡片总数
    totalCards: {
      type: Number,
      value: 0
    },
    // 是否显示滑动提示
    showSwipeHint: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // X轴偏移量（用于滑动动画）
    translateX: 0,
    // 动画持续时间
    transitionDuration: 0.3,
    // 触摸相关数据
    touchStartX: 0,
    touchStartY: 0,
    isSwiping: false,
    // 滑动阈值
    swipeThreshold: 50
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 搜索卡片变更事件
     */
    onSearchCardChanged(e: any) {
      // 将搜索触发的卡片变更事件传递给父组件
      this.triggerEvent('cardChanged', e.detail);
    },

    /**
     * 触摸开始事件处理
     */
    handleTouchStart(e: WechatMiniprogram.TouchEvent) {
      const touch = e.touches[0];
      this.setData({
        touchStartX: touch.clientX,
        touchStartY: touch.clientY,
        isSwiping: false,
        transitionDuration: 0
      });
    },

    /**
     * 触摸移动事件处理
     */
    handleTouchMove(e: WechatMiniprogram.TouchEvent) {
      if (this.data.isSwiping) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - this.data.touchStartX;
      const deltaY = touch.clientY - this.data.touchStartY;

      // 判断是否为水平滑动
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        this.setData({
          isSwiping: true
        });
      }
    },

    /**
     * 触摸结束事件处理
     */
    handleTouchEnd(e: WechatMiniprogram.TouchEvent) {
      if (!this.data.isSwiping) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - this.data.touchStartX;
      const minSwipeDistance = 50; // 最小滑动距离

      if (Math.abs(deltaX) >= minSwipeDistance) {
        if (deltaX > 0) {
          // 向右滑动，切换到上一张
          this.triggerEvent('swiperight');
        } else {
          // 向左滑动，切换到下一张
          this.triggerEvent('swipeleft');
        }
      }

      // 重置状态
      this.setData({
        touchStartX: 0,
        touchStartY: 0,
        isSwiping: false
      });
    },

    /**
     * 图片加载成功回调
     */
    onImageLoad(e: WechatMiniprogram.ImageLoad) {
      console.log('SVG图片加载成功:', e.detail);
    },

    /**
     * 图片加载失败回调
     */
    onImageError(e: WechatMiniprogram.ImageError) {
      console.error('SVG图片加载失败:', e.detail);
      wx.showToast({
        title: '图片加载失败',
        icon: 'error',
        duration: 1500
      });
    },

    /**
     * 显示切换动画
     */
    showSwitchAnimation(direction: 'left' | 'right') {
      const screenWidth = wx.getSystemInfoSync().windowWidth;
      const targetX = direction === 'left' ? -screenWidth : screenWidth;

      this.setData({
        translateX: targetX,
        transitionDuration: 0.3
      });

      // 动画结束后重置位置
      setTimeout(() => {
        this.setData({
          translateX: 0,
          transitionDuration: 0
        });
      }, 300);
    }
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    /**
     * 组件初始化完成
     */
    ready() {
      console.log('卡片查看器组件初始化完成');
      
      // 3秒后隐藏滑动提示
      if (this.properties.showSwipeHint) {
        setTimeout(() => {
          this.setData({
            showSwipeHint: false
          });
        }, 3000);
      }
    },

    /**
     * 组件被销毁
     */
    detached() {
      console.log('卡片查看器组件被销毁');
    }
  },

  /**
   * 组件所在页面的生命周期
   */
  pageLifetimes: {
    /**
     * 页面显示时
     */
    show() {
      // 页面显示时可以重新显示滑动提示
      if (this.properties.showSwipeHint) {
        this.setData({
          showSwipeHint: true
        });
      }
    }
  }
}); 