<template>
  <div class="shopcart">
    <div class="wrapper" @click="showCartList">
      <div class="left-content">
        <div class="logo-wrapper" :class="{'logo-heightlight': totalCount > 0}">
          <div class="logo">
            <span class="icon-shopping_cart"></span>
          </div>
          <div class="count" v-show="totalCount > 0" v-text="totalCount"></div>
        </div>
        <div class="price">￥{{totalPrice}}</div>
        <div class="disc" v-if="deliveryPrice">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="right-content" :class="{'checkout': totalPrice >= minPrice}" v-text="payDisc" @click.stop="pay"></div>
    </div>
    <div class="ball-container">
      <transition-group name="drop" @before-enter="beforeEnterDrop" @enter="enterDrop" @after-enter="afterEnterDrop" tag="ul">
        <li class="ball" v-for="ball in balls" v-show="ball.show" :key="ball">
          <span></span>
        </li>
      </transition-group>
    </div>
    <div class="shopcart-list">
      <transition name="fade">
        <div class="listbg" @click="fold=true" v-show="cartlistShow"></div>
      </transition>
      <transition name="list-up">
        <div class="list-content" v-show="cartlistShow">
          <div class="list-title">
            <div>购物车</div>
            <div class="clear" @click="empty">清空</div>
          </div>
          <div ref="list" class="list-wrapper">
            <ul class="food-list">
              <li v-for="item in selectedFoods" class="border-1px">
                <div class="foodname" v-text="item.name"></div>
                <div class="cartControl">
                  <div class="price">￥<strong v-text="item.price*item.count"></strong></div>
                  <v-cartcontrol :food="item" @cartAdd="cartAdd"></v-cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol';

export default {
  name: 'shopcart',
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropballs: [],
      fold: true
    };
  },
  props: {
    selectedFoods: {
      type: Array
    },
    deliveryPrice: {
      type: Number
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  components: {
    'v-cartcontrol': cartcontrol
  },
  computed: {
    totalPrice () {
      let totalPrice = 0;
      this.selectedFoods.forEach((option) => {
        totalPrice += option.price * option.count;
      });
      return totalPrice;
    },
    totalCount () {
      let totalCount = 0;
      this.selectedFoods.forEach((option) => {
        totalCount += option.count;
      });
      return totalCount;
    },
    payDisc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`;
      } else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
        return `还差￥${this.minPrice - this.totalPrice}起送`;
      } else {
        return '去结算';
      }
    },
    cartlistShow () {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.list) {
            this.list = new BScroll(this.$refs.list, {
              click: true
            });
          } else {
            // 重新渲染视口和内容的高度，决定是否滚动
            this.list.refresh();
          }
        });
      }
      return show;
    }
  },
  methods: {
    cartAdd (el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropballs.push(ball);
          return;
        }
      }
    },
    beforeEnterDrop (el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show && ball.el) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 38;
          let y = -(window.innerHeight - rect.top - 44);
          el.style.display = 'block';
          el.style.transform = `translate3d(0,${y}px,0)`;
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          let innerSpan = el.getElementsByTagName('span')[0];
          innerSpan.style.transform = `translate3d(${x}px,0,0)`;
          innerSpan.style.webkitTransform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    enterDrop (el) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight;   /* 手动触发浏览器重绘 */
      this.$nextTick(() => {
        el.style.transform = 'translate3d(0,0,0)';
        el.style.webkitTransform = 'translate3d(0,0,0)';
        let inner = el.getElementsByTagName('span')[0];
        inner.style.transform = 'translate3d(0,0,0)';
        inner.style.webkitTransform = 'translate3d(0,0,0)';
      });
    },
    afterEnterDrop (el) {
      let ball = this.dropballs.shift();
      if (ball.show) {
        ball.show = false;
        el.style.display = 'none';
      }
    },
    showCartList () {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    empty () {
      this.selectedFoods.forEach((item) => {
        item.count = 0;
      });
    },
    pay () {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      alert(`支付${this.totalPrice}元`);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

@import "../../common/stylus/mixin.styl"

.shopcart
  .wrapper
    position: fixed
    left:0
    bottom:0
    width: 100%
    height:48px
    display: flex
    background-color: #141d27
    color: rgba(255,255,255,0.4)
    z-index:999
    .left-content
      flex:1
      font-size 0
      display: flex
      flex-wrap: nowrap
      .logo-wrapper
        display: inline-block
        background: #141d27
        padding: 6px
        width: 56px
        height:56px
        box-sizing border-box
        border-radius 50%
        position: relative
        top: -10px
        margin-left 18px
        vertical-align: top
        z-index:999
        .logo
          width:100%
          height: 100%
          background: rgba(255,255,255,0.1)
          justify-content: center
          border-radius 50%
          display: flex
          align-items center
          .icon-shopping_cart
            display: inline-block
            font-size 24px
            line-height:24px
        &.logo-heightlight
          .logo
            background-color: rgb(0,160,220)
            .icon-shopping_cart
              color: #fff
          .count
            position: absolute
            right: 0px
            top: 0px
            width: 24px
            height: 16px
            line-height: 16px
            background-color: #f01414
            color: #fff
            font-size 12px
            font-weight 700
            border-radius 16px
            text-align: center
            box-shadow 0 2px 4px 0 rgba(0,0,0,0.4)
          &+.price
            color: #fff
      .price
        display: inline-block
        font-size 16px
        font-weight: 700
        line-height: 24px
        margin: 12px 12px 0 18px
        padding-right: 12px
        border-right 1px solid rgba(255,255,255,0.1)
        vertical-align: top
      .disc
        display: inline-block
        font-size 12px
        font-weight: 700
        line-height:48px
        overflow: hidden
        text-overflow ellipsis
        white-space:nowrap
        padding-right 12px
    .right-content
      flex: 0 1 105px
      width: 105px
      background-color: #2b333b
      text-align: center
      font-size 12px
      font-weight 700
      line-height:48px
      &.checkout
        color: #fff
        background: #00b43c

  .ball-container
    .ball
      position: fixed;
      left: 38px
      bottom:28px
      z-index:200
      span
        display: inline-block
        width:16px
        height: 16px
        border-radius 50%
        background-color: rgb(0,160,220)
        transition: all .4s linear
      &.drop-enter-active,& .drop-leave-active
        transition: all .4s cubic-bezier(.37,-0.45,.83,.67)
  .shopcart-list
    color: rgb(7,17,27)
    font-size:14px
    .fade-enter,.fade-leave-active
      opacity:0
    .fade-enter-active,.fade-leave-active
      transition opacity .4s ease
    .list-up-enter,.list-up-leave-active
      transform translate3d(0,100%,0)
    .list-up-enter-active,.list-up-leave-active
      transition transform .4s ease
    .listbg
      position: fixed
      bottom:48px
      left:0
      width:100%
      height:100%
      background: rgba(7,17,27,0.6)
    .list-content
      position: fixed
      left: 0
      bottom: 48px
      width 100%
      background-color: #fff
      .list-title
        background #f3f5f7
        line-height:40px;
        display: flex
        justify-content space-between
        padding:0 18px
        border-bottom 1px solid rgba(7,17,27,0.1)
        .clear
          color: rgb(0,160,220)
          font-size 12px
      .list-wrapper
        max-height 217px
        overflow: hidden
        .food-list
          margin:0 18px
          box-sizing border-box
          li
            border-1px(rgba(7,17,27,0.1))
            display: flex
            justify-content:space-between
            align-items center
            .foodname
              line-height:48px
            &:last-child
              border-none()
            .cartControl
              display: flex
              align-items center
              .price
                color: rgb(240,20,20)
                margin-right 12px
                font-size 10px
                strong
                  font-size 14px
</style>
