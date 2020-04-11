<template>
    <div class="list page">
        <!-- 标题  -->
        <mt-header :title="pageData.title" fixed>
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="banner wrap">
            <img src="@/assets/img/incid_management.png" alt />
        </div>
        <div class="content">
            <div v-if="isShow">
                <van-cell
                    v-for="(item,index) in pageData.page"
                    :key="item.text"
                    :title="item.text"
                    is-link
                    :to="{path:pageData.path,query:{a:index}}"
                >
                    <img slot="icon" src="@/assets/img/incid_rep.png" class="icon" />
                </van-cell>
            </div>
            <van-collapse v-else v-model="activeName" accordion>
                <van-collapse-item
                    v-for="(item,index) in pageData.page"
                    :key="index"
                    :title="item.text"
                    :name="index"
                >
                    <img slot="icon" src="@/assets/img/incid_rep.png" class="icon" />
                    <van-cell
                        v-for="(n,m) in item.child"
                        :key="m"
                        :value="n.text"
                        size="small"
                        @click="listClick(n)"
                    ></van-cell>
                </van-collapse-item>
            </van-collapse>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: "",
            isShow: true
        };
    },
    created() {
        let id = this.$route.query.page;
        this.listPage.forEach(element => {
            if (element.path == id) {
                this.pageData = element;
            }
        });
        if (this.pageData.page[0].child) {
            this.isShow = false;
        }
    },
    methods: {
        listClick(n) {
            this.$router.push({
                path: this.pageData.path,
                query: { id: n.id }
            });
        }
    },
    computed: {
        listPage() {
            return this.$store.state.listPage;
        }
    },
    // 控制list缓存
    beforeRouteLeave(to, from, next) {
        // 如果是主页,则不缓存;不是主页则缓存。homePage是home的子路由
        if (to.name != "homePage") {
            //不是home , 缓存
            from.meta.keepAlive = true;
        } else {
            //主页,不缓存
            from.meta.keepAlive = false;
            this.$destroy();
        }
        next();
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>
<style scoped>
.banner img {
    display: block;
    width: 100%;
}
.content {
    height: 420px;
    overflow: auto;
}
::-webkit-scrollbar {
    width: 0px;
}
.icon {
    width: 18px;
    height: 18px;
    margin-right: 10px;
    padding-top: 2px;
}
</style>