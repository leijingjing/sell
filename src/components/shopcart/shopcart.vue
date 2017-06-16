<template>
  <div class="shopcart">
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
    <div class="right-content" :class="{'checkout': totalPrice >= minPrice}" v-text="payDisc"></div>
    <div class="ball-container">
      <div class="ball" v-for="ball in balls" v-show="ball.show">
        <transition name="drop" @before-enter="beforeEnterDrop" @enter="enterDrop" @after-enter="afterEnterDrop">
          <span></span>
        </transition>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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
          show: true
        }
      ],
      dropballs: []
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
    }
  },
  methods: {
    cartAdd (el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls;
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
      let ball = this.balls;
      while (count--) {
        if (ball.show) {
          let rect = el.getBoundingClientRect();
          let x = rect.left - 40;
          let y = -(window.innerHeight - rect.top - 24);
          el.style.display = 'block';
          el.style.transform = `translate3d(${x},${y},0)`;
          el.style.webkitTransform = `translate3d(${x},${y},0)`;
        }
      }
    },
    enterDrop (el) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight;
    },
    afterEnterDrop (el) {

    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.shopcart
  position: fixed
  left:0
  bottom:0
  width: 100%
  height:48px
  display: flex
  background-color: #141d27
  color: rgba(255,255,255,0.4)
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
    position: fixed;
    left: 40px
    bottom:24px
    z-index:200
    .ball
      span
        display: inline-block
        width:16px
        height: 16px
        border-radius 50%
        background-color: rgb(0,160,220)


</style>
