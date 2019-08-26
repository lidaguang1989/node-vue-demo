<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}广告位</h1>

    <el-form label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button type="text" size="small" @click="addNewAd">新建广告</el-button>
        <el-row>
          <el-col :span="24" v-for="(item, i) in model.items" :key="item._id">
            <el-form-item label="跳转链接">
              <el-input v-model="item.link"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthorization()"
                :show-file-list="false"
                :on-success="res => item.image = res.url"
              >
                <img v-if="item.image" :src="item.image" class="avatar" style="width: auto;" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="warning" size="small" @click="model.items.splice(i, 1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String }
  },
  data() {
    return {
      model: {
        items: []
      }
    };
  },
  methods: {
    addNewAd() {
      this.model.items.push({
        link: "",
        image: ""
      });
    },
    async onSubmit() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/ads/", this.model);
      }
      console.log("onSubmit:", res);
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetchDataById() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    }
  },
  created() {
    this.id && this.fetchDataById();
  }
};
</script>