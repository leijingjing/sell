<template>
  <div class="rating" ref="wrap">
    <div class="wrapper">
      <div class="score">
        <div class="com-score">
          <p class="scorenum" v-text="seller.score"></p>
          <p class="scorename">综合评分</p>
          <p class="rank">高于周边商家{{seller.rankRate}}</p>
        </div>
        <div class="star-score">
          <p>
            <span class="itemname">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="starscore" v-text="seller.serviceScore"></span>
          </p>
          <p>
            <span class="itemname">商品评分</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="starscore" v-text="seller.serviceScore"></span>
          </p>
          <p>
            <span class="itemname">送达时间</span>
            <span class="deliverytime">{{seller.deliveryTime}}分钟</span>
          </p>
        </div>
      </div>
      <separation></separation>
      <div class="select">
        <ratingselect @switch="switchBtn" @check="checkRatingType" :onlyContent="onlyContent" :selectType="selectType" :desc="desc" :rating="ratings"></ratingselect>
      </div>
      <div class="ratinglist">
        <ul class="lists">
          <li v-for="item in ratings" v-if="ratingShowState(item.rateType, item.text)" class="border-1px">
            <div class="avator">
              <img width="28" height="28" :src="item.avatar" alt="">
            </div>
            <div class="listcontent">
              <div class="nameandtime">
                <span class="username" v-text="item.username"></span>
                <span class="date">{{item.rateTime | formatDate}}</span>
              </div>
              <div class="ratingstar">
                <div class="star">
                  <star :size="24" :score="item.score"></star>
                </div>
                <span v-show="item.deliveryTime" class="dtime">{{item.deliveryTime}}分钟送达</span>
              </div>
              <div class="text" v-text="item.text"></div>
              <div class="recommend">
                <span :class="{'icon-thumb_down': item.rateType === 1, 'icon-thumb_up': item.rateType === 0}"></span>
                <ul class="tag" v-show="item.recommend && item.recommend.length">
                  <li v-for="re in item.recommend" v-text="re"></li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import star from '../star/star';
  import separation from 'components/separation/separation';
  import ratingselect from 'components/ratingselect/ratingselect';
  import {formatDate} from 'common/js/date';

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  const ERRO_NO = 0;

  export default {
    data () {
      return {
        onlyContent: true,
        selectType: ALL,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        },
        ratings: []
      };
    },
    props: {
      seller: {
        type: Object
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    mounted () {
      this.onlyContent = true;
      this.selectType = ALL;
      this.$http.get('/api/ratings').then(response => {
        if (response.body.errno === ERRO_NO) {
          this.ratings = response.body.data;
            // 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
          this.$nextTick(() => {
            if (!this.scrollWrapper) {
              this.scrollWrapper = new BScroll(this.$refs.wrap, {
                click: true
              });
            } else {
              this.scrollWrapper.refresh();
            }
          });
        }
      });
    },
    components: {
      'star': star,
      'separation': separation,
      'ratingselect': ratingselect
    },
    methods: {
      switchBtn () {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scrollWrapper.refresh();
        });
      },
      checkRatingType (type) {
        if (type === ALL) {
          this.selectType = ALL;
        } else if (type === POSITIVE) {
          this.selectType = POSITIVE;
        } else if (type === NEGATIVE) {
          this.selectType = NEGATIVE;
        }
        this.$nextTick(() => {
          this.scrollWrapper.refresh();
        });
      },
      ratingShowState (type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return this.selectType === type;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .rating
    position: absolute
    top: 174px
    left 0
    bottom 0
    width:100%
    overflow: hidden
    color: rgb(7,17,27)
    .score
      display: flex
      padding 18px 0
      font-size 12px
      .com-score
        flex 0 0 137px
        width: 137px
        text-align center
        border-right 1px solid rgba(7,17,27,0.1)
        padding 6px 0
        @media only screen and (max-width: 320px)
          flex 0 0 115px
          width:115px
        .scorenum
          font-size 24px
          color: rgb(255,153,0)
          line-height 28px
        .scorename
          margin 6px 0 8px
        .rank
          color: rgb(147,153,159)
          font-size 10px
          line-height 10px
      .star-score
        flex 1
        padding 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left 10px
        p
          display: flex
          align-items center
          margin 8px 0
          line-height 18px
          &:first-child
            margin-top 0
          &:last-child
            margin-bottom 0
          .itemname
            margin-right 12px
            @media only screen and (max-width: 320px)
              margin-right 8px
          .starscore
            margin-left 12px
            color: rgb(255,153,0)
            @media only screen and (max-width: 320px)
              margin-right 8px
          .deliverytime
            color: rgb(147,153,159)
    .ratinglist
      padding 0 18px
      .lists>li
        padding 18px 0
        display: flex
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
        .avator
          flex 0 0 28px
          width 28px
          img
            border-radius 50%
        .listcontent
          flex 1
          margin-left 12px
          .nameandtime
            display: flex
            justify-content:space-between
            font-size 10px
            line-height 12px
            margin-bottom 6px
            .date
              color: rgb(147,153,159)
          .ratingstar
            display: flex
            align-items center
            .star
              line-height 12px
            .dtime
              color: rgb(147,153,159)
              font-size 10px
              line-height 12px
              margin-left 6px
          .recommend
            display: flex
            .tag
              margin-left 8px
              >li
                float: left
                font-size 10px
                line-height 16px
                color: rgb(147,153,159)
                border 1px solid rgba(7,17,27,0.1)
                padding 0 6px
                margin 0 8px 4px 0
            span
              line-height 18px
              &.icon-thumb_up
                color: rgb(0,160,220)
              &.icon-thumb_down
                color: rgb(147,153,159)
          .text
            font-size 12px
            line-height 18px
            margin 6px 0 8px
</style>
