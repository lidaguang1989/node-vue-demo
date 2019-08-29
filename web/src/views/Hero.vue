<template>
  <div v-if="model" class="page-hero">
    <div class="bg-black d-flex ai-center py-2 px-3 text-white topbar">
      <i class="sprite sprite-logo"></i>
      <div class="flex-1 mx-2">
        <span class>王者荣耀</span>
        <span class="px-3">攻略站</span>
      </div>
      <router-link to="/" tag="div">
        <span class="fs-sm px-2">更多英雄</span>
        <span class="fs-sm">></span>
      </router-link>
    </div>

    <div class="banner" :style="{'background-image': `url(${model.banner})`}">
      <div class="info text-white p-3 d-flex flex-column jc-end h-100">
        <div class="fs-sm">{{model.title}}</div>
        <h2 class="my-1">{{model.name}}</h2>
        <div>{{model.categories.map(cat => cat.name).join('/')}}</div>
        <div v-if="model.scores" class="d-flex ai-center jc-between mt-1">
          <div class="fs-sm">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{model.scores.skill}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-grey">{{model.scores.survive}}</span>
          </div>
          <router-link tag="div" to="/" class="fs-sm text-grey-4">
            <span>皮肤:</span>
            <span class="px-2">4</span>
            <span>></span>
          </router-link>
        </div>
      </div>
    </div>

    <m-card title="出装推荐" iconleft="rementuijian">
      <div class="items-good pb-3">
        <div class="fs-xl">顺风出装</div>
        <div class="d-flex">
          <div class="p-2" v-for="item in model.itemsGood" :key="item._id" style="width: 16.5%;">
            <el-avatar size="large" :src="item.icon"></el-avatar>
            <div class="fs-xs">{{item.name}}</div>
          </div>
        </div>
        <div class="notes lineheight text-grey-5 py-2">
          <span>小提示</span>
          <span>：</span>
          <span>全防御出装，能够成为团队的前排，为队友争取到输出空间，红莲斗篷能帮助亚瑟快速清线，霸者重装让其恢复能力大幅上升</span>
        </div>
      </div>

      <div class="pt-3">
        <div class="fs-xl">逆风出装</div>
        <div class="d-flex">
          <div class="p-2" v-for="item in model.itemsBad" :key="item._id" style="width: 16.5%;">
            <el-avatar size="large" :src="item.icon"></el-avatar>
            <div class="fs-xs">{{item.name}}</div>
          </div>
        </div>
        <div class="notes text-grey-5 py-2">
          <span>小提示</span>
          <span>：</span>
          <span>装备提供了大量冷却缩减，让亚瑟能一直维持一个超高的机动性，让其能够频繁的释放技能制造混乱和伤害</span>
        </div>
      </div>
    </m-card>
    <m-card title="使用技巧" iconleft="rementuijian">
      <div class="text-grey-5 lineheight">{{model.usageTips}}</div>
    </m-card>
    <m-card title="对抗技巧" iconleft="rementuijian">
      <div class="text-grey-5 lineheight">{{model.battleTips}}</div>
    </m-card>
    <m-card title="团战思路" iconleft="rementuijian">
      <div class="text-grey-5 lineheight">{{model.teamTips}}</div>
    </m-card>
    <m-card title="英雄关系" iconleft="rementuijian">
      <div class="fs-xl">最佳搭档</div>
      <div class="d-flex my-3" v-for="partner in model.partners" :key="partner._id">
        <img :src="partner.hero.icon" height="50" />
        <span class="px-2 lineheight">{{partner.description}}</span>
      </div>
    </m-card>
  </div>
</template>sty

<script>
import MCard from "../components/Card";
export default {
  props: {
    id: { require: true }
  },
  components: {
    MCard
  },
  data() {
    return {
      model: null
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.page-hero {
  .lineheight {
    line-height: 1.5rem;
  }

  .card-header {
    border-bottom: none !important;
  }

  .topbar {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .banner {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }

  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  }

  .badge {
    margin: 0 0.3846rem;
    display: inline-block;
    width: 0.9231rem;
    height: 0.9231rem;
    line-height: 0.9231rem;
    text-align: center;
    border-radius: 50%;
    font-size: 8px;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .items-good {
    border-bottom: 1px solid $borderColor;
  }
}
</style>