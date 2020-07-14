<template>
    <div class="list page">
        <!-- 标题  -->
        <van-nav-bar
            :title="pageData.title"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.push({path:'/home'})"
        />
        <div class="banner wrap">
            <img src="@/assets/img/incid_management.png" alt />
        </div>
        <div class="content">
            <div v-for="(item,index) in pageData.page" :key="item.text" :title="item.text">
                <van-cell
                    v-if="!item.child"
                    :title="item.text"
                    is-link
                    :to="{path:pageData.path,query:{id: item.id}}"
                >
                    <img slot="icon" src="@/assets/img/incid_rep.png" class="icon" />
                </van-cell>
                <van-collapse v-else v-model="activeName" accordion>
                    <van-collapse-item :title="item.text" :name="index">
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
        this.pageData();
    },
    methods: {
        listClick(n) {
            this.$router.push({
                path: this.pageData.path,
                query: { id: n.id }
            });
        },
        pageData() {
            // if (this.onePage.path == "risk") {
            //     let arr = [];
            //     let pageData = this.onePage;
            //     // 遍历对象数组
            //     pageData.page.forEach(element => {
            //         element.condition.forEach(item => {
            //             if (item.show == this.$common.getLevel()) {
            //                 let text = item.text || "";
            //                 element.text = text + element.text;
            //                 arr.push(element);
            //             }
            //         });
            //     });
            //     pageData.page = arr;
            //     this.pageData = pageData;
            // } else {
                this.pageData = this.onePage;
            // }
        }
    },
    computed: {
        listPage() {
            return this.$store.state.listPage;
        },
        onePage() {
            let id = this.$route.query.page;
            let obj = {};
            this.listPage.forEach(element => {
                if (element.path == id) {
                    // 后续修改对象 必须深拷贝出来 否则会覆盖原有数据
                    obj = JSON.parse(JSON.stringify(element));
                }
            });
            return obj;
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