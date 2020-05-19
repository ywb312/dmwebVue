<template>
    <div class="page">
        <van-nav-bar title="我的" fixed placeholder />
        <div class="relative">
            <img class="myBanner" src="@/assets/img/blueback.png" alt />
            <figure class="head">
                <img src="@/assets/img/head.png" alt />
                <figcaption>{{username}}</figcaption>
            </figure>
            <van-row class="info">
                <van-col span="8">{{deptname}}</van-col>
                <van-col span="8">{{rolename}}</van-col>
                <van-col span="8">{{loginname}}</van-col>
            </van-row>
        </div>
        <van-cell title="退出登录" icon="clear" @click="logOut"></van-cell>
    </div>
</template>
<script>
export default {
    name: "mePage",
    data() {
        return {
            username: window.localStorage["username"],
            deptname: window.localStorage["deptname"],
            rolename: window.localStorage["rolename"],
            loginname: window.localStorage["loginname"]
        };
    },
    mounted() {},
    methods: {
        logOut() {
            let _this = this;
            this.$dialog
                .confirm({
                    title: "退出登录",
                    message: "确定执行此操作?"
                })
                .then(resolve => {
                    _this.$api.pub.logout().then(res => {
                        _this.$router.push({
                            path: "/"
                        });
                    });
                })
                .catch(reject => {});
        }
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>
<style scoped>
.relative {
    position: relative;
}
.myBanner {
    display: block;
    width: 100%;
    min-height: 200px;
}
.head {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-60%);
    margin: 0;
}
.head img {
    width: 90px;
    height: 90px;
}
.head figcaption {
    margin-top: 10px;
    color: white;
    text-align: center;
}
.info {
    width: 100%;
    color: white;
    padding: 10px 0;
    text-align: center;
    position: absolute;
    bottom: 0;
    border-top: solid 1px white;
    border-bottom: solid 1px white;
}
</style>