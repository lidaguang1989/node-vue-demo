
<template>
  <div class="login-container">
    <el-card class="login-card">
      <div slot="header">
        <span>请先登录</span>
      </div>
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="model.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username: '',
        password: '',
      }
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      localStorage.setItem('token', res.data.data.token);

      if (res.data.status === 0) {
        this.$message({
          type: "success",
          message: "登录成功"
        });
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped>
.login-card {
  width: 30rem;
  margin: 5rem auto;
}
</style>