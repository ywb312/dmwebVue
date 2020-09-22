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
            <component :is="pageData.components" :pageData="pageData"></component>
        </div>
    </div>
</template>
<script>
export default {
    name: "simultaneously",
    data() {
        return {
            // 页面配置
            pageData: "",
            page: [
                {
                    text: "完成的建设项目的汇总统计",
                    id: "roofgrading",
                    components: "roofgrading",
                },
            ],
        };
    },
    created() {
        this.getPageData();
    },
    methods: {
        // 处理数据 展示相同页面根据pageData.element=1/2/3传参调用不同的接口
        getPageData() {
            let id = this.$route.query.id;
            this.page.forEach((item) => {
                if (item.id == id) {
                    let i = id.charAt(id.length - 1);
                    if (!isNaN(i * 1)) {
                        item.components = id.substring(0, id.length - 1);
                        item.element = i;
                    } else {
                        item.components = item.id;
                    }
                    this.pageData = item;
                }
            });
        },
    },
    components: {
        // 完成的建设项目的汇总统计
        roofgrading: (resolve) =>
            require([
                "@/components/technology/views/TechonlogyProdcreview",
            ], resolve),
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>