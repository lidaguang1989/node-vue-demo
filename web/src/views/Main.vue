<template>
  <div>
    <div class="bg-black d-flex ai-center py-2 px-3 topbar">
      <i class="sprite sprite-logo"></i>
      <div class="flex-1 mx-2">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-2 fs-xxs">团队成就更多</div>
      </div>
      <!-- <button type="button" class="btn bg-primary">立即下载</button> -->
      <i class="sprite sprite-download"></i>
    </div>
    <div class="nav reverse jc-around bg-primary py-3">
      <div class="nav-item active">
        <router-link tag='div' to='/'>首页</router-link>
      </div>
      <div class="nav-item ">
        <router-link tag='div' to='/'>攻略中心</router-link>
      </div>
      <div class="nav-item">
        <router-link tag='div' to='/'>赛事中心</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
  .topbar{
    position: sticky;
    top: 0;
    z-index: 999;
  }
</style>