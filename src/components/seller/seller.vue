<template>
  <div class="seller" ref="sellerwrapper">
    <div class="sellerwrapper">
      <div class="main">
        <div class="sellermsg border-1px">
          <div class="nameandscore">
            <div class="name" v-text="seller.name"></div>
            <div class="score">
              <star :size="36" :score="seller.score"></star>
              <span class="ratingcount">（{{seller.ratingCount}}）</span>
              <span class="sellcount">月售{{seller.sellCount}}单</span>
            </div>
          </div>
          <div class="collect">
            <span class="icon-favorite" :class="{'collected': collected}" @click="toggleSellect"></span>
            <p class="collecttext" v-text="isCollected"></p>
          </div>
        </div>
        <div class="deliverymsg">
          <div class="msgs">
            <p class="msgname">起送价</p>
            <p class="num"><span v-text="seller.minPrice"></span>元</p>
          </div>
          <div class="msgs">
            <p class="msgname">商家配送</p>
            <p class="num"><span v-text="seller.deliveryPrice"></span>元</p>
          </div>
          <div class="msgs">
            <p class="msgname">平均配送时间</p>
            <p class="num"><span v-text="seller.deliveryTime"></span>分钟</p>
          </div>
        </div>
      </div>
      <separation></separation>
      <div class="notice">
        <div class="title">公告与活动</div>
        <div class="bulletin" v-text="seller.bulletin"></div>
        <div v-for="item in seller.supports" class="activity-list" v-if="seller.supports">
          <div class="line border-1px"></div>
          <div class="activity">
            <span class="icon" :class="classMap[item.type]"></span>
            <span v-text="item.description"></span>
          </div>
        </div>
      </div>
      <separation></separation>
      <div class="real">
        <div class="title">商家实景</div>
        <div ref="imgwrap" class="imgwrapper">
          <ul class="seller-img" ref="imgul">
            <li v-for="img in seller.pics">
              <img width="120" height="90" :src="img" alt="">
            </li>
          </ul>
        </div>
      </div>
      <separation></separation>
      <div class="seller-info">
        <div class="title">商家信息</div>
        <div v-for="info in seller.infos" class="info">
          <div class="line border-1px"></div>
          <div class="infotext" v-text="info"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import separation from 'components/separation/separation';
  import star from 'components/star/star';
  import {setStorage, getStorage} from 'common/js/store';

  export default {
    data () {
      return {
        collected: (() => {
          return getStorage(this.seller.id, 'collextedState', false);
        })()
      };
    },
    components: {
      'separation': separation,
      'star': star
    },
    props: {
      seller: {
        type: Object
      }
    },
    computed: {
      isCollected () {
        return this.collected ? '已收藏' : '收藏';
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    watch: {
      seller: {
        handler () {
          // seller变化完成之后初始化BScroll
          this._initScroll();
          this._initPicScroll();
        },
        deep: true
      }
    },
    mounted () {
      // 切换是初始化BScroll
      this._initScroll();
      this._initPicScroll();
    },
    methods: {
      _initScroll () {
        this.$nextTick(() => {
          if (!this.scroll) {
            // BScroll初始化的时机是非常重要的
            this.scroll = new BScroll(this.$refs.sellerwrapper, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      _initPicScroll () {
        if (this.seller.pics) {
          let imgwidth = 120;
          let marwidth = 6;
          let w = (imgwidth + marwidth) * this.seller.pics.length - marwidth;
          this.$refs.imgul.style.width = w + 'px';
          this.$nextTick(() => {
            if (!this.imgScroll) {
              this.imgScroll = new BScroll(this.$refs.imgwrap, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.imgScroll.refresh();
            }
          });
        }
      },
      toggleSellect () {
        if (!event._constructed) {
          return;
        }
        this.collected = !this.collected;
        setStorage(this.seller.id, 'collextedState', this.collected);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position: absolute
    top: 174px
    left 0
    bottom 0
    width:100%
    overflow: hidden
    .sellerwrapper
      color: rgb(7,17,27)
      .main
        padding 18px
        font-size 10px
        .sellermsg
          display: flex
          justify-content space-between
          padding-bottom 18px
          border-1px(rgba(7.17.27.0.1))
          .nameandscore
            .name
              font-size 14px
              line-height 14px
              margin-bottom 8px
            .score
              display: flex
              color: rgb(77,85,93)
              font-size 10px
              line-height 18px
              .ratingcount
                margin 0 12px 0 6px
          .collect
             width 36px
             text-align center
            .icon-favorite
              font-size 24px
              line-height 24px
              color #d4d6d9
              &.collected
                color: rgb(240,20,20)
            .collecttext
              margin-top 4px
              color: rgb(77,85,93)
        .deliverymsg
          display: flex
          margin-top 18px
          .msgs
            flex 1
            text-align center
            border-right 1px solid rgba(7.17.27.0.1)
            &:last-child
              border none
            p
              &.msgname
                color: rgb(147,153,159)
                margin-bottom 4px
              .num
                line-height 24px
              span
                font-size 24px
      .notice
        padding 18px 18px 0
        .title
          font-size 14px
          line-height 14px
          margin-bottom 8px
        .bulletin
          color: rgb(240,20,20)
          font-size 12px
          line-height 24px
          margin 0 12px 16px
        .activity-list
          overflow: hidden
          .line
            height 1px
            width:100%
            border-1px(rgba(7.17.27.0.1))
          .activity
            margin 16px 0
            padding 0 12px
            font-size 12px
            line-height 16px
            .icon
              display: inline-block
              width: 16px
              height:16px
              vertical-align: top
              margin-right 6px
              &.decrease
                bg-image("decrease_4")
              &.discount
                bg-image("discount_4")
              &.guarantee
                bg-image("guarantee_4")
              &.invoice
                bg-image("invoice_4")
              &.special
                bg-image("special_4")
      .real
        padding 18px
        .title
          font-size 14px
          line-height 14px
          margin-bottom 12px
        .imgwrapper
          overflow: hidden
          width:100%
          white-space nowrap
          .seller-img
            li
              margin-right 6px
              display: inline-block
              &:last-child
                margin 0
              img
                vertical-align: top
      .seller-info
        padding 18px 18px 0
        .title
          font-size 14px
          line-height 14px
          margin-bottom 12px
        .info
          .line
            height 1px
            width:100%
            border-1px(rgba(7.17.27.0.1))
          .infotext
            padding 16px 12px
            font-size 12px
            line-height 16px

</style>
