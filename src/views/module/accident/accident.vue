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
        <div>
            <component
                :is="pageData.components"
                :pageData="pageData"
            ></component>
        </div>
    </div>
</template>
<script>
export default {
    name: "accident",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 切换组件页面配置数组
            page: [
                {
                    text: "事故初报表",
                    id: "accireportnew",
                },
                {
                    text: "事故登记台账",
                    id: "accibook",
                },
                {
                    text: "按事故发生季度统计",
                    id: "accidentzt",
                },
                {
                    text: "按事故伤者年龄统计",
                    id: "accidentsznl",
                },
            ],
        };
    },
    created() {
        this.getPageData();
    },
    methods: {
        getPageData() {
            let id = this.$route.query.id;
            this.page.forEach((item) => {
                if (item.id == id) {
                    item.components = item.id;
                    this.pageData = item;
                }
            });
        },
    },
    computed: {},
    components: {
        // 事故快报
        accireportnew: (resolve) =>
            require(["@/components/accident/views/Accireportnew"], resolve),
        accibook: (resolve) =>
            require(["@/components/accident/views/Accibook"], resolve),
        accidentzt: (resolve) =>
            require(["@/components/accident/views/Accidentzt"], resolve),
        accidentsznl: (resolve) =>
            require(["@/components/accident/views/Accidentsznl"], resolve),
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>