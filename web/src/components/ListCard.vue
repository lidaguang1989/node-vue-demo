<template>
  <div>
    <m-card :title="title" :iconleft="iconleft" :iconright="iconright">
      <div class="nav jc-between py-2">
        <div
          class="nav-item"
          :class="{active: active === i}"
          v-for="(data, i) in datas"
          :key="i"
          @click="navChange(i)"
        >
          <router-link tag="div" to>{{data.name}}</router-link>
        </div>
      </div>
      <swiper ref="mSwiper" :options="{autoHeight: true}" @slide-change="swiperChange">
        <swiper-slide v-for="(data, i) in datas" :key="i">
          <slot name="items" :data="data"></slot>
        </swiper-slide>
      </swiper>
    </m-card>
  </div>
</template>

<script>
import MCard from "./Card";

export default {
  props: {
    title: { type: String, require: true },
    iconleft: { type: String, require: true },
    iconright: { type: String, require: false },
    datas: { type: Array, require: true }
  },
  data() {
    return {
      active: 0
    };
  },
  components: {
    MCard
  },
  methods: {
    navChange(i) {
      this.active = i;
      this.$refs.mSwiper.swiper.slideTo(i);
    },
    swiperChange() {
      this.active = this.$refs.mSwiper.swiper.realIndex;
    }
  }
};
</script>