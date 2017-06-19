<template>
  <div class="cartcontrol">
    <transition name="move">
      <span class="icon-remove_circle_outline" v-show="food.count > 0" @click="countDecrease"></span>
    </transition>
    <span class="number" v-show="food.count > 0" v-text="food.count"></span>
    <span class="icon-add_circle" @click="countAdd"></span>
  </div>
</template>

<script type="text/ecmascript-6">

import Vue from 'vue';

export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    countAdd (event) {
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
    countDecrease (event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count --;
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0
    .move-enter,.move-leave-active
      opacity:0
      transform translate3d(24px,0,0) rotate(180deg)
    .move-enter-active,.move-leave-active
      transition all 0.4s linear

    span
      display: inline-block
      font-size 24px
      line-height: 24px
      color: rgb(0,160,220)
      vertical-align: top
      padding:6px
      &.number
        color: rgb(147,153,159)
        font-size 12px
        line-height:24px
        padding:0
        margin-top 6px
</style>
