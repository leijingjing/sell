<template>
  <div class="shopcart">
    <div class="left-content">
      <div class="logo-wrapper">
        <div class="logo">
          <span class="icon-shopping_cart"></span>
        </div>
      </div>
      <div class="price">￥0</div>
      <div class="disc" v-if="deliveryPrice">另需配送给￥{{deliveryPrice}}元</div>
    </div>
    <div class="right-content">￥{{minPrice}}起送</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'shopcart',
  props: {
    deliveryPrice: {
      type: Number
    },
    minPrice: {
      type: Number,
      default: 0
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
  .right-content
    flex: 0 0 105px
    width: 105px
    background-color: #2b333b
    text-align: center
    font-size 12px
    line-height:48px;

</style>
