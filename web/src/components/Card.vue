<template>
  <div class="card p-3 bg-white mt-3">
    <div class="card-header d-flex ai-center bg-white pb-3">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xxl flex-1 px-2">{{title}}</div>
      <i class="iconfont icon-menu"></i>
    </div>
    <div class="card-body mt-2">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, require: true },
    icon: { type: String, require: true }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.card {
  border-bottom: 1px solid $borderColor;
  .card-header {
    border-bottom: 1px solid $borderColor;
  }
}
</style>