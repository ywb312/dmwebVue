<template>
    <div class="remind">
        <!-- 标题  -->
        <mt-header :title="pageData.text" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <!-- 主体 -->
        <mt-loadmore
            class="wrap"
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            :auto-fill="allLoaded"
            ref="loadmore"
        >
            <preview :res="rendering" :pageData="pageData"></preview>
        </mt-loadmore>
    </div>
</template>
<script>
import { Loadmore } from "mint-ui";
import preview from "@/components/inform/preview";
export default {
    name: "remind",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 页码
            page: 1,
            // 传入的对象
            params: {
                olddate: "0",
            },
            // 接口返回的数据
            rendering: [],
            // 停止上拉加载
            allLoaded: false
        };
    },
    created() {
        let a = this.$route.query.a;
        let num = this.$store.state.listNum;
        this.pageData = this.$store.state.listPage[num - 1].page[a]; //当前页面的配置
        // 进入页面调取详情页接口 进行渲染
        this.getData();
    },
    methods: {
        // 根据当前页面的配置 对请求的data进行添加
        returnData(option) {
            let obj = {
                rows: 5,
                page: this.page
            };
            if (option.updata) {
                for (let i = 0; i < option.updata.length; i++) {
                    obj["bean." + option.updata[i]] = this.params[
                        option.updata[i]
                    ];
                }
            }
            return obj;
        },
        // 获取当前页面数据函数
        getData() {
            this.$api.inform
                .showPage(this.pageData.ajaxurl, this.returnData(this.pageData))
                .then(res => {
                    if (res.rows) {
                        this.rendering.push(...res.rows);
                        // 返回数据小于10条 停止上拉刷新
                        if (res.rows.length < 5) {
                            this.allLoaded = true;
                        }
                    }
                });
        },
        // 上拉加载方法
        loadBottom() {
            this.page++;
            this.$refs.loadmore.onBottomLoaded();
            this.getData();
        }
    },
    components: {
        preview,
        "mt-loadmore": Loadmore
    }
};
</script>
<style scoped>
.detail {
    height: 100%;
}
.mint-header {
    background-color: #2585cf;
    height: 1.1rem;
    font-size: 20px;
}
.wrap {
    padding-top: 1.1rem;
}
</style>