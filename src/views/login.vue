<template>
    <div class="login">
        <div class="main">
            <van-form @submit="onSubmit" :show-error-message="false">
                <van-field
                    class="round_top"
                    label="用户名"
                    v-model="username"
                    name="username"
                    placeholder="请输入用户名"
                    :rules="[{ required: true, message: '请输入用户名' }]"
                />
                <van-field
                    class="round_bottom"
                    label="密码"
                    v-model="password"
                    type="password"
                    name="password"
                    placeholder="请输入密码"
                    :rules="[{ required: true, message: '请输入密码' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">提交</van-button>
                </div>
            </van-form>
        </div>
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
        this.$api.pub.logout().then(res => {});
    },
    methods: {
        onSubmit(values) {
            let _this = this;
            let toast = this.$toast({
                message: "正在登录...",
                forbidClick: true,
                loadingType: "spinner"
            });
            _this.$api.pub
                .login({
                    username: values.username,
                    password: values.password,
                    "user-agent": "mobile"
                })
                .then(function(res) {
                    toast.clear();
                    if (res.result) {
                        var storage = window.localStorage;
                        storage.session_Id = res.session_Id;
                        storage.deptname = res.result.deptname;
                        storage.username = res.result.username;
                        storage.loginname = res.result.loginname;
                        storage.rolename = res.result.rolename;
                        storage.deptid = res.result.deptid;
                        storage.roleLevel = _this.getDeptId(
                            res.result.rolename
                        );
                        _this.$router.push({
                            name: "home"
                        });
                    } else {
                        _this.$toast({
                            message: "账户或密码不正确",
                            position: "bottom"
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
                name.indexOf("科室") != -1 ||
                name.indexOf("生产队") != -1
            ) {
                roleLevel = "2";
            } else if (name.indexOf("厂级") != -1) {
                roleLevel = "3";
            } else if (
                name.indexOf("超级管理员") != -1 ||
                name.indexOf("安全环保部") != -1 ||
                name.indexOf("安环部") != -1 ||
                name.indexOf("安全生产委员会") != -1
            ) {
                roleLevel = "4";
            }
            return roleLevel;
        }
    }
};
</script>
<style scoped>
.login {
    height: 100%;
    background: url("../assets/img/loginBg.jpg") no-repeat;
    background-size: 100%;
    position: relative;
}
.round_top {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.round_bottom {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
.main {
    width: 300px;
    box-sizing: border-box;
    padding: 28px 10px;
    background: skyblue;
    text-align: center;
    border-radius: 6px;
    position: absolute;
    top: 10rem;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>