<template>
    <div class="login">
        <div class="title">
            <p>安全生产标准化</p>
            <p>体系运行管理信息系统</p>
        </div>
        <div class="main">
            <div>
                <mt-field class="input" placeholder="请输入用户名" v-model="username"></mt-field>
                <img src="@/assets/img/icon-test_1.png" alt />
            </div>
            <div>
                <mt-field class="input" placeholder="请输入密码" type="password" v-model="password"></mt-field>
                <img src="@/assets/img/icon-test.png" alt />
            </div>
        </div>
        <p class="loginBtn" @click="login">登录</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            //input双向绑定
            username: "",
            password: ""
        };
    },
    // 设置免登陆 如果本地有数据自动跳转
    created() {
        let storage = window.localStorage;
        if (
            storage.session_Id &&
            storage.deptname &&
            storage.username &&
            storage.loginname &&
            storage.rolename &&
            storage.roleLevel
        ) {
            this.$router.push({
                name: "home"
            });
        }
    },
    methods: {
        login() {
            let _this = this;
            this.alertMsg();
            _this.$api.pub
                .login({
                    username: _this.username,
                    password: _this.password,
                    "user-agent": "mobile"
                })
                .then(function(res) {
                    if (res.result) {
                        if (window.localStorage) {
                            var storage = window.localStorage;
                            storage.session_Id = res.session_Id;
                            storage.deptname = res.result.deptname;
                            storage.username = res.result.username;
                            storage.loginname = res.result.loginname;
                            storage.rolename = res.result.rolename;
                            storage.roleLevel = _this.getDeptId(
                                res.result.deptname
                            );
                        }
                        _this.$router.push({
                            name: "home"
                        });
                    } else {
                        this.$toast({
                            message: "账户或密码不正确",
                            position: "bottom",
                            duration: 4000
                        });
                        return;
                    }
                });
        },
        getDeptId(name) {
            let roleLevel = "1";
            if (name.indexOf("班组") != -1) {
                roleLevel = "1";
            } else if (
                name.indexOf("车间") != -1 ||
                name.indexOf("工区") != -1 ||
                name.indexOf("科室") != -1
            ) {
                roleLevel = "2";
            } else if (name.indexOf("厂级") != -1) {
                roleLevel = "3";
            } else if (
                name.indexOf("安全环保部") != -1 ||
                name.indexOf("安环部") != -1 ||
                name.indexOf("安全生产委员会") != -1
            ) {
                roleLevel = "4";
            }
            return roleLevel;
        },
        alertMsg() {
            // 对账号验空
            if (!this.username) {
                // 弹出提示
                this.$toast({
                    message: "请输入用户名",
                    position: "bottom",
                    duration: 4000
                });
                return;
            }
            // 对密码验空
            if (!this.password) {
                // 弹出提示
                this.$toast({
                    message: "请输入密码",
                    position: "bottom",
                    duration: 4000
                });
                return;
            }
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
    padding-top: 140px;
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    color: white;
}
.main {
    box-sizing: border-box;
    height: 160px;
    margin: 20px 40px 40px;
    padding-top: 28px;
    background: skyblue;
    text-align: center;
    border-radius: 6px;
}
.main div:last-of-type {
    margin-top: 5px;
}
.main div {
    position: relative;
}
.main img {
    width: 34px;
    height: 34px;
    position: absolute;
    left: 20px;
    top: 8.5px;
}
.main .input {
    box-sizing: border-box;
    margin: auto;
    padding-left: 40px;
    width: 275px;
    height: 26px;
    border-radius: 5px;
    border: none;
}
.loginBtn {
    width: 320px;
    height: 45px;
    margin: auto;
    text-align: center;
    line-height: 45px;
    color: white;
    font-size: 26px;
    text-indent: 27px;
    letter-spacing: 27px;
    border-radius: 5px;
    background: #2585cf;
}
</style>