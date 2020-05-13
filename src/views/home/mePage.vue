<template>
    <div class="page">
        <van-nav-bar title="我的" fixed placeholder />
        <div class="banner">
            <img src="@/assets/img/homeshow.png" alt />
        </div>
        <h3>{{username}}</h3>
        <h3>{{deptname}}</h3>
        <h3>{{rolename}}</h3>
    </div>
</template>
<script>
export default {
    name: "mePage",
    data() {
        return {
            username: window.localStorage["username"],
            deptname: window.localStorage["deptname"],
            rolename: window.localStorage["rolename"]
        };
    },
    mounted() {},
    methods: {}
};
</script>
<style scoped src="@/assets/css/public.css"/>