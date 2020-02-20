<template>
    <div class="danger">
        <!-- 标题  -->
        <mt-header :title="pageData.text" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
            <mt-button slot="right" @click="add"></mt-button>
        </mt-header>
        <div class="wrap">
            <!-- 查看方式 -->
            <correlation @radioChange="radioData" v-if="pageData.updata.indexOf('queryAll')>=0"></correlation>
            <!-- 主体 -->
            <mt-loadmore
                :bottom-method="loadBottom"
                :bottom-all-loaded="allLoaded"
                :auto-fill="allLoaded"
                ref="loadmore"
            >
                <preview :res="rendering" :pageData="pageData"></preview>
            </mt-loadmore>
        </div>
    </div>
</template>
<script>
import { Loadmore } from "mint-ui";
import correlation from "@/components/danger/correlation";
import preview from "@/components/inform/preview";
export default {
    name: "danger",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 页码
            page: 1,
            // 传入的对象
            params: {
                olddate: "0",
                queryAll: "null",
                crstate: "",
                crqy: "",
                str: "",
                end: "",
                zgzrdw: "",
                param: ""
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
                rows: 10,
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
        getData(a=true) {
            this.$api.inform
                .showPage(this.pageData.ajaxurl, this.returnData(this.pageData))
                .then(res => {
                    if (res.rows) {
                        // 判断是新增还是替换
                        if(a){
                            this.rendering.push(...res.rows);
                        }else{
                            this.rendering = res.rows;
                        }
                        // 返回数据小于10条 停止上拉刷新
                        if (res.rows.length < 10) {
                            this.allLoaded = true;
                        }else{
                            this.allLoaded = false;
                        }
                    }
                });
        },
        // 上拉加载方法
        loadBottom() {
            this.page++;
            this.$refs.loadmore.onBottomLoaded();
            this.getData();
        },
        // 查看方式 得到子组件传入的值
        radioData(v){
            this.rendering = "";
            this.params.queryAll = v;
            this.getData(false);
        },
    },
    components: {
        preview,
        correlation,
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