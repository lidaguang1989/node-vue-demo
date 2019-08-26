<template>
  <div class="about">
    <h1>管理员列表</h1>

    <el-table :data="dataList" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="260"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
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
      dataList: []
    };
  },
  methods: {
    async fetchLists() {
      const res = await this.$http.get("rest/admin_users");
      this.dataList = res.data;
    },
    handleEditClick(row) {
      this.$router.push(`/admin_users/edit/${row._id}`);
    },
    handleDeleteClick(row) {
      this.$confirm(`是否确定要删除用户 ${row.name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`rest/admin_users/${row._id}`);
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