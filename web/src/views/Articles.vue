<template>
  <div class="articles" v-if="model">
    <div class="article-header d-flex ai-center p-2 pl-0 border-bottom">
      <i class="iconfont icon-back text-blue" @click="$router.go(-1)"></i>
      <strong class="flex-1 px-2 text-blue text-ellipsis pr-3">{{model.title}}</strong>
      <div class="fs-sm text-grey">{{model.createdAt | dateFormat('YYYY-MM-DD')}}</div>
    </div>

    <div class="article-body" v-html="model.content"></div>

    <div class="px-2">
      <div class="article-footer d-flex ai-center py-3">
        <i class="iconfont icon-suggest"></i>
        <strong class="text-blue px-1 fs-xl">相关资讯</strong>
      </div>
      <router-link
        tag="div"
        :to="`/articles/${item._id}`"
        class="d-flex jc-between ai-center py-1"
        v-for="item in model.related"
        :key="item._id"
      >
        <div class="text-ellipsis pr-4 flex-1">{{item.title}}</div>
        <div class="text-grey">{{item.createdAt | dateFormat('YYYY-MM-DD')}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { require: true }
  },
  watch: {
    id() {
      this.fetchDetail();
    }
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async fetchDetail() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetchDetail();
  }
};
</script>

<style lang="scss">
.articles {
  .icon-back {
    font-size: 1.7692rem;
  }
}
</style>