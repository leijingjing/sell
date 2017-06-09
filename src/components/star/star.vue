<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in starItem" :class="itemClass" class="star-iten"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const starLength = 5;
  const CLASS_ON = 'on';
  const CLASS_OFF = 'off';
  const CLASS_HALF = 'half';

  export default {
    name: 'star',
    data () {
      return {
        starScore: [],
        itemClass: ''
      };
    },
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star_' + this.size;
      },
      starItem () {
        let starScore = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let interger = Math.floor(score);
        for (let i = 0; i < interger; i++) {
          starScore.push(CLASS_ON);
        }
        if (hasDecimal) {
          starScore.push(CLASS_HALF);
        }
        while (starScore.length < starLength) {
          starScore.push(CLASS_OFF);
        }
        return starScore;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

.star
  & .star-iten
    display: inline-block
    vertical-align: top
    &:last-child
      margin-right 0!important
  &.star_24
    .star-iten
      width: 10px
      height: 10px
      margin-right 10px
      &.on
        bg-image('star24_on')
      &.half
        bg-image('star24_half')
      &.off
        bg-image('star24_off')
  &.star_36
    .star-iten
      width: 15px
      height: 15px
      margin-right 15px
      &.on
        bg-image('star36_on')
      &.half
        bg-image('star36_half')
      &.off
        bg-image('star36_off')
  &.star_48
    .star-iten
      width: 20px
      height: 20px
      margin-right 20px
      &.on
        bg-image('star48_on')
      &.half
        bg-image('star48_half')
      &.off
        bg-image('star48_off')

</style>
