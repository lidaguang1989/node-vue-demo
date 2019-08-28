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
    <m-list-card title="新闻资讯" icon="card-hero" :datas="newsData">
      <template #items={data}>
        <div class="py-2 fs-lg d-flex ai-center" v-for="(list, i) in data.newsList" :key="i">
          <span class="text-dark-3">[{{list.categoryName}}]</span>
          <span class="mx-1">|</span>
          <span class="flex-1 text-ellipsis pr-2">{{list.title}}</span>
          <span class="text-grey-1 fs-sm">{{list.createdAt | date}}</span>
        </div>
      </template>
    </m-list-card>

    <p>dsfsd</p>
    <p>dsfsd</p>
    <p>dsfsd</p>
    <p>dsfsd</p>
    <p>dsfsd</p>
    <p>dsfsd</p>
    <p>dsfsd</p>
    <p>dsfsd</p>
    <p>dsfsd</p>
    <p>dsfsd</p>
    <p>dsfsd</p>
    <p>dsfsd</p>
    <p>dsfsd</p>
    <p>dsfsd</p>
    <p>dsfsd</p>
  </div>
</template>

<script>
// @ is an alias to /src
import MListCard from "../components/ListCard";
import dayjs from 'dayjs'
export default {
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')
    }
  },
  data() {
    return {
      newsData: [],
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        }
      }
    };
  },
  components: {
    MListCard,
  },
  methods: {
    async fetchNews() {
      const res = await this.$http.get('news/list');
      this.newsData = res.data;
    }
  },
  created() {
    this.fetchNews()
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