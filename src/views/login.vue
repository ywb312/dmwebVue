<template>
    <div class="login">
        <div class="title">
            <p>安全生产标准化</p>
            <p>体系运行管理信息系统</p>
        </div>
        <div class="main">
            <div>
                <mt-field class="input" placeholder="请输入用户名" v-model="username"></mt-field>
                <img src="../assets/icon-test_1.png" alt />
            </div>
            <div>
                <mt-field class="input" placeholder="请输入密码" type="password" v-model="password"></mt-field>
                <img src="../assets/icon-test.png" alt />
            </div>
        </div>
        <p class="loginBtn" @click="login">登录</p>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
    data() {
        return {
            //input双向绑定
            username: "",
            password: ""
        };
    },
    mounted() {},
    methods: {
        login() {
            // 对账号验空
            if (!this.username) {
                // 弹出提示
                Toast({
                    message: "请输入用户名",
                    position: "bottom",
                    duration: 4000
                });
                return;
            }
            // 对密码验空
            if (!this.password) {
                // 弹出提示
                Toast({
                    message: "请输入密码",
                    position: "bottom",
                    duration: 4000
                });
                return;
            }
            this.$router.push({
                name:"home"
            });
        }
    }
};
// $.ajax({
//   type: "POST",
//   url: baseUrl + "main/login.action",
//   data: {
//     username: $("#nickname").val(),
//     password: $("#password").val(),
//     "user-agent": "mobile"
//   },
//   success: function(data) {
//     var data = JSON.parse(data);
//     localStorage.session_Id = data.session_Id;
//     localStorage.deptname = data.result.deptname;
//     localStorage.rolename = data.result.rolename;
//     localStorage.username = data.result.username;
//     localStorage.loginname = data.result.loginname;
//     window.location.href = "./home.html";
//   }
// });
</script>
<style scoped>
.login {
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
.main div:last-of-type {
    margin-top: 0.1rem;
}
.main div {
    position: relative;
}
.main img {
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    left: 0.5rem;
    top: 0.15rem;
}
.main .input {
    box-sizing: border-box;
    margin: auto;
    padding-left: 0.6rem;
    width: 4.8rem;
    height: 0.5rem;
    border-radius: 0.1rem;
    border: none;
}
.loginBtn {
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