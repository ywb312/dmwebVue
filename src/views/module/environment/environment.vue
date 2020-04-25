<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            :title="pageData.text"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <!-- 主体 -->
        <div class="wrap">
            <component :is="pageData.components" :pageData="pageData"></component>
        </div>
    </div>
</template>
<script>
export default {
    name: "environment",
    data() {
        return {
            // 页面配置
            pageData: "",
            page: [
                {
                    text: "在线设施台账",
                    id: "onlinefacility"
                },
                {
                    text: "固体废物产生利用统计表",
                    id: "sowageut"
                },
                {
                    text: "项目建设情况",
                    id: "projectconst"
                },
                {
                    text: "排口台账",
                    id: "drainageacc"
                },
                {
                    text: "评先创优情况",
                    id: "comfirstsitu"
                },
                {
                    text: "危险废物处置统计表",
                    id: "hazwastedis"
                }
            ]
        };
    },
    created() {
        this.getPageData();
    },
    methods: {
        // 处理数据 展示相同页面根据pageData.element=1/2/3传参调用不同的接口
        getPageData() {
            let id = this.$route.query.id;
            this.page.forEach(item => {
                if (item.id == id) {
                    item.components = item.id;
                    this.pageData = item;
                }
            });
        }
    },
    components: {
        // 在线设施台账
        onlinefacility: resolve =>
            require(["@/components/environment/views/OnlineFacility"], resolve),
        // 固体废物产生利用统计表
        sowageut: resolve =>
            require(["@/components/environment/views/Sowageut"], resolve),
        // 项目建设情况
        projectconst: resolve =>
            require(["@/components/environment/views/ProjectConst"], resolve),
        // 排口台账
        drainageacc: resolve =>
            require([
                "@/components/environment/views/DrainageAccount"
            ], resolve),
        // 评先创优情况
        comfirstsitu: resolve =>
            require(["@/components/environment/views/ComfirstSitu"], resolve),
        // 危险废物处置统计表
        hazwastedis: resolve =>
            require(["@/components/environment/views/HazWastedIs"], resolve)
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>