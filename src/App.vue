<template>
  <div id="app">
    <v-header :seller='seller'></v-header>
    <div class="tab border-1px">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评价</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link>
    </div>
    <div class="content">
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import header from 'components/header/header';
  import {urlParse} from 'common/js/util';

  const ERRO_NO = 0;
  export default {
    data () {
      return {
        seller: {
          id: (() => {
            // 立即执行函数
            let parameter = urlParse();
            return parameter.id;
          })()
        }
      };
    },
    components: {
      'v-header': header
    },
    created () {
      this.$http.get('/api/seller?id=' + this.seller.id).then(response => {
        if (response.body.errno === ERRO_NO) {
          this.seller = Object.assign({}, this.seller, response.body.data);
        }
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/mixin.styl";
  #app
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    color: #4d555d
    font-weight normal
    .tab
      height: 40px
      line-height: 40px
      display: flex
      text-align: center
      border-1px(rgba(7, 17, 27, 0.1))
      & a
        flex: 1
        font-size: 14px
        &.router-link-active
          color: #f01414
</style>
