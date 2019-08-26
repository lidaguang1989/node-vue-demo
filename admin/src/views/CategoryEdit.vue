<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}分类</h1>

    <el-form label-width="80px">
      <el-form-item label>
        <el-select v-model="model.parent" placeholder="请选择上级分类">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
      model: {},
      parents: []
    };
  },
  methods: {
    async onSubmit() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/categories/", this.model);
      }
      console.log("onSubmit:", res);
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetchCategoryById() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get("rest/categories");
      this.parents = res.data;
    }
  },
  created() {
    this.fetchCategories();
    this.id && this.fetchCategoryById();
  }
};
</script>