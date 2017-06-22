<template>
  <transition name="foodShow">
    <div class="food" v-show="foodShow" ref="foodDetail">
      <div class="inner">
        <div class="pointimg">
          <img :src="food.image" alt="">
          <span class="icon-arrow_lift" @click="foodShow = false"></span>
        </div>
        <div class="foodmsg msg border-1px">
          <p class="foods-name" v-text="food.name"></p>
          <p class="description"><span>月售{{food.sellCount}}份</span>好评率{{food.rating}}%</p>
          <p class="price">￥<span v-text="food.price"></span><span v-if="food.oldPrice" class="oldprice">￥{{food.oldPrice}}</span></p>
          <div class="numControl" v-show="food.count && food.count > 0">
            <v-cartontrol :food="food" ref="cartCtro" @cartAdd="addFood"></v-cartontrol>
          </div>
          <transition name="fade">
            <div class="addToCart" v-show="!food.count" @click="addToCart">加入购物车</div>
          </transition>
        </div>
        <separation v-if="food.info"></separation>
        <div class="introduce msg" v-if="food.info">
          <div class="msgtitle">商品介绍</div>
          <div class="text" v-text="food.info"></div>
        </div>
        <separation></separation>
        <div class="foodrate msg">
          <div class="msgtitle">商品评价</div>
          <ratingselect @switch="switchBtn" @check="checkRatingType" :onlyContent="onlyContent" :selectType="selectType" :desc="desc" :rating="food.ratings"></ratingselect>
        </div>
        <div class="rating">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-for="rate in food.ratings" class="border-1px">
              <div class="ratemsg">
                <div class="date" v-text="rate.rateTime"></div>
                <div class="usermsg">
                  <span class="username" v-text="rate.username"></span>
                  <img class="avatar" :src="rate.avatar" alt="">
                </div>
              </div>
              <div class="content">
                <span :class="{'icon-thumb_down': rate.rateType === 1, 'icon-thumb_up': rate.rateType === 0}"></span>
                <span class="text" v-if="rate.text" v-text="rate.text"></span>
              </div>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import Vue from 'vue';
  import separation from 'components/separation/separation';
  import ratingselect from 'components/ratingselect/ratingselect';

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    name: 'food',
    data () {
      return {
        foodShow: false,
        onlyContent: false,
        selectType: ALL,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    props: {
      food: {
        type: Object
      }
    },
    computed: {

    },
    components: {
      'v-cartontrol': cartcontrol,
      'separation': separation,
      'ratingselect': ratingselect
    },
    methods: {
      show () {
        this.foodShow = true;
        this.onlyContent = false;
        this.selectType = ALL;
        this.$nextTick(() => {
          if (!this.detailScroll) {
            this.detailScroll = new BScroll(this.$refs.foodDetail, {
              click: true
            });
          } else {
            this.detailScroll.refresh();
          }
        });
      },
      addToCart (event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count ++;
        }
        this.$emit('cartAdd', event.target);
      },
      addFood (target) {
        this.$emit('cartAdd', target);
      },
      switchBtn () {
        this.onlyContent = !this.onlyContent;
      },
      checkRatingType (type) {
        if (type === ALL) {
          this.selectType = ALL;
        } else if (type === POSITIVE) {
          this.selectType = POSITIVE;
        } else if (type === NEGATIVE) {
          this.selectType = NEGATIVE;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

  @import "../../common/stylus/mixin.styl"
  .food
    position: fixed
    top 0
    left 0
    bottom 48px
    width:100%
    background-color: #fff
    color: rgb(7,17,27)
    .msg
      background: #fff
      padding: 18px
    .pointimg
      position: relative
      width:100%
      height:0
      /*padding根据width来确定，制作宽高相等的盒子*/
      padding-top:100%
      .icon-arrow_lift
        display: block
        position: absolute
        top: 10px
        left: 0
        color: #fff
        font-size 20px
        padding 10px
      img
        position: absolute
        top: 0
        left: 0
        width:100%
        height:100%

    .foodmsg
      position: relative
      top: 0
      left 0
      .foods-name
        font-size 14px
        line-height:14px
        font-weight 700
      .description
        font-size 10px
        margin:8px 0 18px
        color: rgb(147,153,159)
        span
          margin-right 12px
      .price
        color: #f01414
        font-size 10px
        line-height:24px;
        span:first-child
          font-size: 14px
          font-weight 700
          margin-right 8px
        .oldprice
          color: rgb(147,153,159)
          text-decoration line-through
          font-weight 700
      .numControl
        position: absolute
        right 12px
        bottom:12px
      .addToCart
        position: absolute
        right 18px
        bottom:18px
        height: 24px
        color: #fff
        padding 0 12px
        border-radius 12px
        font-size 12px
        line-height:24px
        background-color: rgb(0,160,220)
        text-align center
      .fade-enter,.fade-leave-active
        opacity:0
      .fade-enter-active,.fade-leave-active
        transition opacity .2s
    .introduce
      .msgtitle
        font-size:14px
        line-height: 14px
        margin-bottom 6px
      .text
        margin 0 8px
        color: rgb(77,85,93)
        font-size 12px
        line-height:24px
    .foodrate
      padding-bottom 0
      .msgtitle
        font-size:14px
        line-height: 14px
        margin-bottom 6px
    .rating
      border-top 1px solid rgba(7,17,27,0.1)
      padding:0 18px
      ul
        li
          padding:16px 0
          color rgb(147,153,159)
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            border-none()
          .ratemsg
            display: flex
            justify-content space-between
            font-size 10px
            line-height 12px
            margin-bottom 10px
            .usermsg
              .username
                vertical-align: top
              .avatar
                width: 12px
                height 12px
                border-radius 50%
                margin-left 6px
                vertical-align: top
          .content
            font-size:0
            span
              font-size:12px
              line-height 12px
              vertical-align: top
              margin-right 4px
              &.icon-thumb_up
                color: rgb(0,160,220)
            .text
              font-size:12px
              line-height 12px
              color: rgb(7,17,27)
              vertical-align: top

  .foodShow-enter,.foodShow-leave-active
    transform translate3d(100%,0,0)
  .foodShow-enter-active,.foodShow-leave-active
    transition transform .2s linear

</style>
