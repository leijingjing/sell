<template>
  <div class="ratingselect">
    <div class="selectbtn border-1px">
      <div class="all" @click="checkRatingType(2, $event)" :class="{'checked':selectType === 2}">{{desc.all}}<span v-text="rating.length"></span></div>
      <div class="positive" @click="checkRatingType(0, $event)" :class="{'checked':selectType === 0}">{{desc.positive}}<span v-text="positive.length"></span></div>
      <div class="negative" @click="checkRatingType(1, $event)" :class="{'checked':selectType === 1}">{{desc.negative}}<span v-text="negative.length"></span></div>
    </div>
    <div class="checkbox" @click="switchBtn">
      <span class="icon-check_circle" :class="{'onlyContent':onlyContent}"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

export default {
  props: {
    onlyContent: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Array,
      default () {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        };
      }
    }
  },
  computed: {
    positive () {
      // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
      return this.rating.filter((item) => {
        return item.rateType === POSITIVE;
      });
    },
    negative () {
      return this.rating.filter((item) => {
        return item.rateType === NEGATIVE;
      });
    }
  },
  methods: {
    switchBtn (event) {
      if (!event._constructed) {
        return;
      }
      this.$emit('switch');
    },
    checkRatingType (type, event) {
      if (!event._constructed) {
        return;
      }
      this.$emit('check', type);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

@import "../../common/stylus/mixin.styl"

.ratingselect
  margin-top 18px
  overflow: hidden
  .selectbtn
    display: flex
    border-1px(rgba(7,17,27,0.1))
    padding-bottom 18px
    div
      font-size 12px
      line-height:16px
      border-radius 1px
      padding:8px 12px
      span
        font-size 10px
        margin-left 2px
      &.all
        background: rgba(0,160,220,0.2)
      &.positive
        background: rgba(0,160,220,0.2)
        margin 0 8px
      &.negative
        background: rgba(77,85,93,0.2)
        &.checked
          background: #4d555d
      &.checked
        background: rgb(0,160,220)
        color: #fff
  .checkbox
    color: rgb(147,153,159)
    margin 12px 0
    font-size:0
    .icon-check_circle
      font-size 24px
      line-height: 24px
      vertical-align: top
      padding-right 4px
      &.onlyContent
        color: #00c850
    .text
      font-size 12px
      line-height:24px
      vertical-align: top


</style>
