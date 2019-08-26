<template>
  <div class="about">
    <h1>文章列表</h1>

    <el-table :data="lists" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="260"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleEditClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDeleteClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: []
    };
  },
  methods: {
    async fetchLists() {
      const res = await this.$http.get("rest/articles");
      this.lists = res.data;
    },
    handleEditClick(row) {
      this.$router.push(`/articles/edit/${row._id}`);
    },
    handleDeleteClick(row) {
      this.$confirm(`是否确定要删除文章 ${row.title}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`rest/articles/${row._id}`);
          if (res.data.status === 0) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.fetchLists();
          }
        })
        .catch(() => {});
    }
  },
  created() {
    this.fetchLists();
  }
};
</script>