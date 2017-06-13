<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul class="menu-list">
        <li v-for="good in goods">
          <div class="text border-1px">
            <span v-if="good.type > 0" class="icon" :class="classMap[good.type]"></span>
            <span v-text="good.name"></span>
          </div>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li class="items items-hook" v-for="item in goods">
          <div class="item-name" v-text="item.name"></div>
          <div class="foods border-1px" v-if="item.foods" v-for="good in item.foods">
            <div class="foods-img">
              <img width="57" height="57" :src="good.icon" alt="">
            </div>
            <div class="descrip">
              <p class="foods-name" v-text="good.name"></p>
              <p class="description" v-if="good.description" v-text="good.description"></p>
              <p class="description"><span>月售{{good.sellCount}}份</span>好评率{{good.rating}}%</p>
              <p class="price">￥<span v-text="good.price"></span><span v-if="good.oldPrice" class="oldprice">￥{{good.oldPrice}}</span></p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';

  const ERRO_NO = 0;
  export default {
    name: 'goods',
    data () {
      return {
        goods: {},
        listHeight: []
      };
    },
    mounted () {
      this.$http.get('/api/goods').then(response => {
        if (response.body.errno === ERRO_NO) {
          console.log(response.body.data);
          this.goods = response.body.data;
          this.$nextTick(function () {
            this._initScroll();
            this.calculateHeight();
          });
        }
      });
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {});
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {});
      },
      calculateHeight () {
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

@import "../../common/stylus/mixin.styl"
.goods
  width: 100%
  display: flex
  position: absolute
  top: 174px
  bottom:48px
  font-size 11px
  background: #f3f5f7
  .menu-wrapper
    width:80px
    flex:0 0 80px
    font-size 12px
    overflow: auto
    .menu-list
      li
        display: table
        width: 56px
        height:54px
        padding:0 12px
        line-height:14px
        .text
          display: table-cell
          vertical-align: middle
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            border-none()
          .icon
            display: inline-block
            width: 12px
            height:12px
            vertical-align: top
            margin-right 2px
            &.decrease
              bg-image("decrease_3")
            &.discount
              bg-image("discount_3")
            &.guarantee
              bg-image("guarantee_3")
            &.invoice
              bg-image("invoice_3")
            &.special
              bg-image("special_3")
  .foods-wrapper
    flex:1
    overflow: auto
    background: #fff
    .item-name
      font-size 12px
      line-height: 26px
      color: rgb(147,153,159)
      border-left 2px solid #d9dde1
      padding-left 14px
      background: #f3f5f7;
    .foods
      background: #fff
      display flex
      padding 18px 0
      margin 0 18px
      border-1px(rgba(7,17,27,0.1))
      &:last-child
        border-none()
      .foods-img
        margin-right 10px
      .descrip
        flex: 1
        margin-top 2px
        overflow: hidden
        .foods-name
          font-size 14px
          line-height:14px
          color: rgb(7,17,27)
        .description
          margin:8px 0
          color: rgb(147,153,159)
          overflow: hidden
          text-overflow ellipsis
          white-space: nowrap
          span
            margin-right 12px
        .price
          color: #f01414
          span:first-child
            font-size: 14px
            font-weight 700
            margin-right 8px
          .oldprice
            color: rgb(147,153,159)
            text-decoration line-through

</style>
