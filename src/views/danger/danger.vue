<template>
    <div class="danger">
        <!-- 标题  -->
        <mt-header :title="pageData.text" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
            <router-link v-if="a==0" slot="right" to="/increase">
                <mt-button>
                    <img class="white" src="../../assets/iconfont/add.svg" />
                </mt-button>
            </router-link>
        </mt-header>
        <div class="wrap">
            <!-- 查看方式 -->
            <correlation @radioChange="radioData" v-if="pageData.updata.indexOf('queryAll')>=0"></correlation>
            <!-- 主体 -->
            <preview :pageData="pageData" :params="params" ref="mychild"></preview>
        </div>
    </div>
</template>
<script>
// 查看方式组件
import correlation from "@/components/danger/correlation";
// 渲染组件
import preview from "@/components/pub/preview";
export default {
    name: "danger",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 第几个页面
            a:"",
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
            }
        };
    },
    created() {
        this.a = this.$route.query.a;
        let num = this.$store.state.listNum;
        this.pageData = this.$store.state.listPage[num - 1].page[a]; //当前页面的配置
    },
    methods: {
        // 查看方式 得到子组件传入的值
        radioData(v) {
            this.params.queryAll = v;
            this.$refs.mychild.cleraDate(); 
        }
    },
    components: {
        preview,
        correlation
    }
};
</script>
<style scoped>
.danger {
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