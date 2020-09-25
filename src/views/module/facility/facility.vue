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
    name: "facility",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 切换组件页面配置数组
            page: [
                {
                    text: "特种设备检测检验",
                    id: "equipcheck",
                },
                {
                    text: "特种设备、安标产品台账",
                    id: "equipspecial",
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
                    item.components = id;
                    this.pageData = item;
                }
            });
        },
    },
    components: {
        // 特种设备检测检验
        equipcheck: (resolve) =>
            require(["@/components/facility/views/Equipcheck"], resolve),
        // 特种设备、安标产品台账
        equipspecial: (resolve) =>
            require(["@/components/facility/views/Equipspecial"], resolve),
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>