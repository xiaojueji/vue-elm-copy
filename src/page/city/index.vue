<template>
  <div class="city_container">
    <head-top :head-title="cityname" go-back="true">
      <router-link to="/home" slot="changecity" class="change_city">切换城市</router-link>
    </head-top>
    <form class="city_form" v-on:submit.prevent>
      <div>
        <input
          type="text"
          name="search"
          placeholder="输入学习、商务楼、地址"
          class="city_input input_style"
          v-model="inputValue"
          required
        >
      </div>
      <div>
        <input type="submit" name="submit" class="city_submit input_style" @click="postpois">
      </div>
    </form>
    <div>
      <header v-if="historytitle" class="pois_search_history">搜索历史</header>
    </div>
    <ul class="getpois_ul">
      <li v-for="(item, index) in placelist" @click="nextpage(index, item.geohash)" :key="index">
        <h4 class="pois_name ellipsis">{{ item.name }}</h4>
        <p class="pois_address ellipsis">{{ item.address }}</p>
      </li>
    </ul>
    <div class="search_none_place" v-if="placeNone">很抱歉！无搜结果</div>
  </div>
</template>

<script>
import headTop from '../../components/header/head'
import { currentcity, searchplace } from '../../service/getData'
import * as Tool from '../../config/mUtils'

export default {
  data () {
    return {
      inputValue: '',
      cityid: '',
      cityname: '',
      placelist: [],
      placeHistory: [],
      historytitle: true,
      placeNone: false
    }
  },
  created () {
    this.cityid = this.$route.params.cityid
    currentcity(this.cityid).then(res => {
      this.cityname = res.name
    })

    if (Tool.getStore('placeHistory')) {
      this.placelist = JSON.parse(Tool.getStore('placeHistory'))
    }
  },
  components: {
    headTop
  },
  computed: {},
  methods: {
    postpois () {
      if (this.inputValue) {
        searchplace(this.cityid, this.inputValue).then(res => {
          this.historytitle = false
          this.placelist = res
          this.placeNone = res.length ? false : true
        })
      }
    },
    nextpage (index, geohash) {
      let history = Tool.getStore('placeHistory')
      let choosePlace = this.placelist[index]
      if (history) {
        let checkrepeat = false
        this.placeHistory = JSON.parse(history)
        this.placeHistory.forEach(item => {
          if (item.geohash === geohash) {
            checkrepeat = true
          }
        })
        if (!checkrepeat) {
          this.placeHistory.push(choosePlace)
        }
      } else {
        this.placeHistory.push(choosePlace)
      }
      Tool.setStore('placeHistory', this.placeHistory)
      this.$router.push({ path: '/msite', query: {geohash} })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';

  .city_container {
    padding-top: 2.35rem;
  }
  .change_city {
    right: .4rem;
    @include sizecolor(0.6rem, #fff);
    @include center-top;
  }
  .city_form {
    background-color: #fff;
    border-top: 1px solid $bordercolor;
    border-bottom: 1px solid $bordercolor;
    padding-top: .4rem;
    div {
      width: 90%;
      margin: 0 auto;
      text-align: center;
      .input_style {
        border-radius: .1rem;
        margin-bottom: .4rem;
        @include wh(100%, 1.4rem)
      }
      .city_input {
        border: 1px solid $bordercolor;
        padding: 0 .3rem;
        @include sizecolor(.65rem, #333);
      }
      .city_submit {
        background-color: $blue;
        @include sizecolor(.65rem, #fff)
      }
    }
  }
  .pois_search_history {
    border-top: 1px solid $bordercolor;
    border-bottom: 1px solid $bordercolor;
    padding-left: .5rem;
    @include font(.475rem, .8rem);
  }
  .getpois_ul {
    background-color: #fff;
    border-top: 1px solid $bordercolor;
    li {
      margin: 0 auto;
      padding-top: .65rem;
      border-bottom: 1px solid $bordercolor;
      .pois_name {
        margin: 0 auto .35rem;
        width: 90%;
        @include sizecolor(.65rem, #333);
      }
      .pois_address {
        width: 90%;
        margin: 0 auto .55rem;
        @include sizecolor(.45rem, #999);
      }
    }
  }
  .search_none_place {
    margin: 0 auto;
    @include font(.65rem, 1.75rem);
    color: #333;
    background-color: #fff;
    text-indent: .5rem;
  }
</style>