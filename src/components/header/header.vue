<template>
  <div class="header">
    <img class="bgimg" :src="seller.avatar" alt="">
    <div class="detail">
      <div class="inner">
        <img class="sellerimg" :src="seller.avatar" alt="">
        <div class="sellertext">
          <div class="title">
            <span class="brand"></span>
            <span class="name" v-text="seller.name"></span>
          </div>
          <div class="subtitle"><span v-text="seller.description"></span>&nbsp;/&nbsp;<span v-text="seller.deliveryTime"></span>分钟送达</div>
          <div v-if="seller.supports" class="discount">
            <span class="icon" :class="classMap[seller.supports[0].type]"></span>
            <span v-text="seller.supports[0].description"></span>
          </div>
        </div>
        <div class="supports-count" v-if="seller.supports" @click="showFloating">
          <span class="count">{{seller.supports.length}}个</span>
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
      <div class="notice" @click="showFloating">
        <span class="notice-icon">公告</span>
        <span class="notice-text" v-text="seller.bulletin"></span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <transition name="fade">
      <div class="seller-details" v-show="floatingShow">
        <div class="wrapper clearfix">
          <div class="main">
            <div class="title">
              <div v-text="seller.name" class="name"></div>
              <star :score="seller.score" :size="48"></star>
            </div>
            <div class="seller-msg">
              <div class="msg-header">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <div class="cont">
                <div v-if="seller.supports" class="discount" v-for="item in seller.supports">
                  <span class="icon" :class="classMap[item.type]"></span>
                  <span v-text="item.description"></span>
                </div>
              </div>
            </div>
            <div class="seller-msg">
              <div class="msg-header">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="cont">
                <div class="introduce" v-text="seller.bulletin"></div>
                <!--<div class="introduce" v-text="seller.bulletin"></div>-->
                <!--<div class="introduce" v-text="seller.bulletin"></div>-->
                <!--<div class="introduce" v-text="seller.bulletin"></div>-->
              </div>
            </div>
          </div>
        </div>
        <div class="footer-close">
          <span class="icon-close" @click="closeFloating"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star.vue';

export default {
  name: 'header',
  data () {
    return {
      floatingShow: false
    };
  },
  props: {
    seller: {
      type: Object
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
  },
  methods: {
    showFloating () {
      this.floatingShow = true;
    },
    closeFloating () {
      this.floatingShow = false;
    }
  },
  components: { star }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.header
  position relative
  top: 0
  left:0
  overflow hidden
  color #fff
  .bgimg
    position absolute
    top 0
    left 0
    width:100%
    filter: blur(10px)
    z-index:-1
  .detail
    background: rgba(7,17,27,0.5)
    overflow: hidden
    .inner
      margin:24px 12px 18px 24px
      position: relative
      top:0
      left:0
      .supports-count
        height: 24px
        padding: 0 8px 0 10px
        line-height: 24px
        position: absolute
        right:0
        bottom:-6px
        background-color: rgba(0,0,0,0.2)
        font-size 12px
        border-radius 14px
        .count
          vertical-align: top
        .icon-keyboard_arrow_right
          font-size 14px
          line-height:24px

      .sellerimg
        width: 64px
        height: 64px
        float: left
        border-radius 2px
      .sellertext
        margin-left 80px
        padding-top: 2px
        .title
          margin-bottom 8px
          .brand
            display: inline-block
            width: 30px
            height:18px
            margin-right 6px
            bg-image("brand")
          .name
            font-size 16px
            font-weight bold
            line-height:18px
            vertical-align: top
        .subtitle
          font-size 12px
          margin-bottom 10px

    .notice
      display: flex
      align-items center
      clear: both
      background: rgba(7,17,27,0.2)
      height:28px
      font-size 12px
      padding:0 12px
      position: relative
      top 0
      left: 0
      span
        display: block
        &.notice-text
          width:83%
          margin 0 6px
          text-overflow ellipsis
          white-space nowrap
          overflow: hidden
          line-height:28px
        &.notice-icon
          background-color: #fff
          color: #4d555d
          padding 1px 2px
          font-weight bold
        &.icon-keyboard_arrow_right
          position: absolute
          top: 0
          right: 12px
          font-size 14px
          line-height: 28px

  .seller-details
    position: fixed
    top:0
    left:0
    z-index: 100
    width:100%;
    height: 100%
    background: rgba(7,17,27,0.8)
    overflow: auto
    .wrapper
      width: 100%
      height:auto
      min-height:100%
      .main
        width 80%
        margin 64px auto 0
        padding-bottom 96px
        & .msg-header
          display: flex
          flex-direction row
          flex-flow nowrap
          margin-bottom 24px
          .text
            padding: 0 12px
            font-size 14px
            line-height 14px
            font-weight 700
          .line
            position: relative
            top: -8px
            flex 1
            border-bottom 1px solid rgba(255,255,255,0.2)
        .title
          text-align center
          .name
            font-size 16px
            line-height:16px
            font-weight 700
            margin-bottom 16px
        .seller-msg
          margin 28px 0
          .cont
            margin 0 12px
            &>.discount
              margin-bottom 12px
              line-height:16px
              &:last-child
                margin-bottom 0
              .icon
                margin-right 6px
                width: 16px
                height:16px
                &.decrease
                  bg-image("decrease_2")
                &.discount
                  bg-image("discount_2")
                &.guarantee
                  bg-image("guarantee_2")
                &.invoice
                  bg-image("invoice_2")
                &.special
                  bg-image("special_2")

            .introduce
              font-size 12px
              line-height:24px

    .footer-close
      position: relative
      clear: both
      height: 96px
      margin-top -96px
      display: flex
      justify-content center
      align-items center
      .icon-close
        font-size 32px
        color: rgba(255,255,255,0.5)

  & .discount
    font-size 12px
    .icon
      display: inline-block
      width: 12px
      height:12px
      vertical-align: top
      margin-right 4px
      &.decrease
        bg-image("decrease_1")
      &.discount
        bg-image("discount_1")
      &.guarantee
        bg-image("guarantee_1")
      &.invoice
        bg-image("invoice_1")
      &.special
        bg-image("special_1")

.fade-enter-active,.fade-leave-active
  transition: opacity .5s
.fade-enter,.fade-leave-active
  opacity 0
</style>
