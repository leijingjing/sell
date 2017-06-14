<template>
  <div class="goods">
    <div class="goods-list">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul class="menu-list">
          <li v-for="(good, index) in goods" :class="{'current': menuCurrentIndex === index}" @click="selectMenu(index,$event)">
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
              <div class="add-to-cart">
                <span class="icon-remove_circle_outline"></span>
                <span class="number">1</span>
                <span class="icon-add_circle"></span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <v-shopcart :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice"></v-shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopCart from '../shopcart/shopcart';
  const ERRO_NO = 0;
  export default {
    name: 'goods',
    data () {
      return {
        goods: {},
        listHeight: [],
        scrollIndex: 0
      };
    },
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      'v-shopcart': shopCart
    },
    computed: {
      menuCurrentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollIndex < height2 && this.scrollIndex >= height1)) {
            return i;
          }
        }
        return 0;
      }
    },
    mounted () {
      this.$http.get('/api/goods').then(response => {
        if (response.body.errno === ERRO_NO) {
          this.goods = response.body.data;
          this.$nextTick(function () {
            // 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
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
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          probeType: 3
        });
        this.foodScroll.on('scroll', (pos) => {
          this.scrollIndex = Math.abs(Math.round(pos.y));
        });
      },
      calculateHeight () {
        let foodList = this.$refs.foodWrapper.getElementsByClassName('items-hook');
        let listH = 0;
        this.listHeight[0] = listH;
        for (let i = 0; i < foodList.length; i++) {
          listH += foodList[i].offsetHeight;
          this.listHeight.push(listH);
        }
      },
      selectMenu (index, event) {
        if (!event._constructed) {
          return;
        }
        this.foodScroll.scrollTo(0, -this.listHeight[index], 300);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

@import "../../common/stylus/mixin.styl"
.goods
  .goods-list
    width: 100%
    display: flex
    position: absolute
    top: 174px
    bottom:48px
    font-size 11px
    overflow: hidden
    background: #f3f5f7
    .menu-wrapper
      width:80px
      flex:0 0 80px
      font-size 12px
      .menu-list
        li
          display: table
          width: 56px
          height:54px
          padding:0 12px
          line-height:14px
          &.current
            background-color: #fff
            font-weight 700
            position: relative;
            margin-top -1px
            z-index:10
            .text
              border-none()
          .text
            display: table-cell
            vertical-align: middle
            border-1px(rgba(7,17,27,0.1))
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
          &:last-child .text
            border-none()
    .foods-wrapper
      flex:1
      overflow: hidden
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

        .add-to-cart
          position: absolute
          right:0
          bottom:14px
          font-size 0
          span
            font-size 24px
            line-height: 24px
            color: rgb(0,160,220)
            vertical-align: top
            &.number
              color: rgb(147,153,159)
              font-size 12px
              line-height:24px
              margin: 0 6px
</style>
