<template>
    <div class="list">
        <!-- 标题  -->
        <mt-header :title="pageData.title">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="banner">
            <img src="@/assets/incid_management.png" alt />
        </div>
        <mt-cell
            v-for="(item,index) in pageData.page"
            :key="item"
            :title="item"
            is-link
            :to="{path:pageData.path,query:{a:index}}"
        >
            <img slot="icon" src="@/assets/incid_rep.png" width="20" height="20" />
        </mt-cell>
    </div>
</template>
<script>
export default {
    data() {
        return {
        };
    },
    created() {
        let num = this.$store.state.listNum;
        this.pageData = this.$store.state.listPage[num - 1];
    },
    // 控制list缓存
    beforeRouteLeave(to, from, next) {
        // 如果是主页,则不缓存;不是主页则缓存。
        if (to.name != "home") {//不是home , 缓存
            from.meta.keepAlive = true;
        } else {//home主页,不缓存
            from.meta.keepAlive = false;
            this.$destroy();
        }
        next();
    }
};
</script>
<style scoped>
.list {
    height: 100%;
}
.mint-header {
    background-color: #2585cf;
    height: 1.1rem;
    font-size: 20px;
}
.banner img {
    display: block;
    width: 100%;
}
</style>