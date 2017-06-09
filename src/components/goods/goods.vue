<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul class="menu-list">
        <li v-for="good in goods" v-text="good.name"></li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <div class="items">
        <div class="item-name">单人特色套餐</div>
        <div class="foods">
          <div class="foods-img">
            <img width="57" height="57" src="http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114" alt="">
          </div>
          <div class="describ">
            <p>皮蛋瘦肉粥</p>
            <p>咸粥</p>
            <p>月售1132份  好评率100%</p>
            <p>￥24</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  const ERRO_NO = 0;
  export default {
    name: 'goods',
    data () {
      return {
        goods: {}
      };
    },
    mounted () {
      this.$http.get('/api/goods').then(response => {
        if (response.body.errno === ERRO_NO) {
          console.log(response.body.data);
          this.goods = response.body.data;
        }
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.goods
  width: 100%
  display: flex
  position: absolute
  top: 174px
  bottom:48px
  font-size 12px
  background: #f3f5f7
  .menu-wrapper
    width:80px
    flex:0 0 80px
    .menu-list
      li
        height:54px
        padding:0 12px
        line-height:14px
        display: flex
        align-items center
  .foods-wrapper
    flex:1

</style>
