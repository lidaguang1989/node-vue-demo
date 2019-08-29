<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/swipe1.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/swipe2.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/swipe3.jpeg" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right mt-3 pb-2" slot="pagination"></div>
    </swiper>

    <div class="nav-icons text-dark bg-white text-center pt-3 mt-3">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-story"></i>
          <div class="pt-1">爆料站</div>
        </div>
      </div>
      <div class="py-2">
        <i class="sprite sprite-arrow mx-1"></i>
        <span class="fs-sm">收起</span>
      </div>
    </div>
    <!-- nav icons end -->
    <m-list-card title="新闻资讯" iconleft="cc-menu-circle" iconright="menu" :datas="newsData">
      <template #items="{data}">
        <router-link
          tag="div"
          :to="`/articles/${list._id}`"
          class="py-2 fs-lg d-flex ai-center"
          v-for="(list, i) in data.newsList"
          :key="i"
        >
          <span class="text-dark-3">[{{list.categoryName}}]</span>
          <span class="mx-1">|</span>
          <span class="flex-1 text-ellipsis pr-2">{{list.title}}</span>
          <span class="text-grey-1 fs-sm">{{list.createdAt | dateFormat('MM/DD')}}</span>
        </router-link>
      </template>
    </m-list-card>
    <m-list-card title="英雄列表" iconleft="card-hero" iconright="menu" :datas="heroesData">
      <template #items="{data}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link
            :to="`/heroes/${hero._id}`"
            tag="div"
            style="width: 20%;"
            class="text-center p-2"
            v-for="(hero, i) in data.heroesList"
            :key="i"
          >
            <img :src="hero.icon" style="width: 100%;" />
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
// @ is an alias to /src
import MListCard from "../components/ListCard";
export default {
  data() {
    return {
      newsData: [],
      heroesData: [],
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        }
      }
    };
  },
  components: {
    MListCard
  },
  methods: {
    async fetchNews() {
      const res = await this.$http.get("news/list");
      this.newsData = res.data;
    },
    async fetchHeroes() {
      const res = await this.$http.get("heroes/list");
      this.heroesData = res.data;
    }
  },
  created() {
    this.fetchHeroes();
    this.fetchNews();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.pagination-home {
  .swiper-pagination-bullet {
    background-color: map-get($colors, "white");
    border-radius: 0.1538rem;
    opacity: 1;
  }
  & .swiper-pagination-bullet-active {
    background-color: map-get($colors, "info");
  }
}

.nav-icons {
  .nav-item {
    width: 25%;
    border-right: 1px solid $borderColor;

    &:nth-child(4n) {
      border: none;
    }
  }
}
</style>