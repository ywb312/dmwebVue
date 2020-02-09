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
            let _this = this;
            // 对账号验空
            if (!_this.username) {
                // 弹出提示
                Toast({
                    message: "请输入用户名",
                    position: "bottom",
                    duration: 4000
                });
                return;
            }
            // 对密码验空
            if (!_this.password) {
                // 弹出提示
                Toast({
                    message: "请输入密码",
                    position: "bottom",
                    duration: 4000
                });
                return;
            }
            _this.$api.login
                .login({
                    username: _this.username,
                    password: _this.password,
                    "user-agent": "mobile"
                })
                .then(function(res) {
                    if (res.result) {
                        localStorage.session_Id = res.session_Id;
                        localStorage.deptname = res.result.deptname;
                        localStorage.rolename = res.result.rolename;
                        localStorage.username = res.result.username;
                        localStorage.loginname = res.result.loginname;
                        _this.$router.push({
                            name: "home"
                        });
                    } else {
                        Toast({
                            message: "账户或密码不正确",
                            position: "bottom",
                            duration: 4000
                        });
                        return;
                    }
                });
        }
    }
};
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