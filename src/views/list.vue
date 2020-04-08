<template>
    <div class="list">
        <!-- 标题  -->
        <mt-header :title="pageData.title" fixed>
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="banner wrap">
            <img src="@/assets/img/incid_management.png" alt />
        </div>
        <mt-cell
            v-for="(item,index) in pageData.page"
            :key="item"
            :title="item"
            is-link
            :to="{path:pageData.path,query:{a:index}}"
        >
            <img slot="icon" src="@/assets/img/incid_rep.png" width="20" height="20" />
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
        this.pageData = this.listPage[num - 1];
    },
    computed:{
        listPage(){
            return this.$store.state.listPage
        }
    },
    // 控制list缓存
    beforeRouteLeave(to, from, next) {
        // 如果是主页,则不缓存;不是主页则缓存。homePage是home的子路由
        if (to.name != "homePage") {//不是home , 缓存
            from.meta.keepAlive = true;
        } else {//主页,不缓存
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
.banner img {
    display: block;
    width: 100%;
}
</style>