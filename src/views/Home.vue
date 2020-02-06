<template>
  <div class="home">
    <div class="title">
      <p>安全生产标准化</p>
      <p>体系运行管理信息系统</p>
    </div>
    <div class="main">
      <p>
        <img src="../assets/icon-test_1.png" alt />
        <input id="nickname" type="text" placeholder="请输入账号" />
      </p>
      <p>
        <img src="../assets/icon-test.png" alt />
        <input id="password" type="password" placeholder="请输入密码" />
      </p>
    </div>
    <p class="login">登录</p>
  </div>
</template>
<script>
export default {
	
};
</script>
<style scoped>
.home {
  height: 100%;
  background: rgb(16, 187, 255);
}
.title {
  padding-top: 2.8rem;
  text-align: center;
  font-size: 0.52rem;
  font-weight: bold;
  color: white;
}
.main {
  box-sizing: border-box;
  height: 2.8rem;
  margin: 0.4rem 0.8rem 0.8rem;
  padding-top: 0.5rem;
  background: skyblue;
  text-align: center;
  border-radius: 0.1rem;
}
.main p:last-of-type {
  margin-top: 0.1rem;
}
.main p {
  position: relative;
}
.main img {
  width: 0.6rem;
  height: 0.6rem;
  position: absolute;
  left: 0.5rem;
  top: 0.1rem;
}
.main input {
  box-sizing: border-box;
  padding-left: 0.9rem;
  width: 4.8rem;
  height: 0.8rem;
  font-size: 0.4rem;
  border-radius: 0.1rem;
  border: none;
}
.login {
  width: 5.6rem;
  height: 0.8rem;
  margin: auto;
  text-align: center;
  line-height: 0.8rem;
  color: white;
  font-size: 0.5rem;
  text-indent: 0.5rem;
  letter-spacing: 0.5rem;
  border-radius: 0.1rem;
  background: rgba(55, 55, 104, 0.8);
}
</style>