<template>
    <div class="homePage">
        <van-nav-bar title="主页" fixed placeholder z-index="100" />
        <div class="banner">
            <img src="@/assets/img/homeshow.png" alt />
        </div>
        <div class="grids" :style="gridStyle">
            <van-grid :border="true" :column-num="3">
                <van-grid-item
                    class="grids_item"
                    v-for="(item) in grid"
                    :key="item.id"
                    @click="linkTo(item.id)"
                >
                    <van-image class="grids_img" :src="item.url" />
                    <span>{{item.title}}</span>
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>
<script>
export default {
    name: "homePage",
    data() {
        return {
            //九宫格布局
            grid: [
                {
                    id: "inform",
                    url: require("@/assets/img/ic_news.png"),
                    title: "通知公告"
                },
                {
                    id: "danger",
                    url: require("@/assets/img/ic_risk.png"),
                    title: "隐患管理"
                },
                {
                    id: "plan",
                    url: require("@/assets/img/ic_survey.png"),
                    title: "计划管理"
                },
                {
                    id: "remind",
                    url: require("@/assets/img/ic_emergcy.png"),
                    title: "提醒预警"
                },
                {
                    id: "risk",
                    url: require("@/assets/img/ic_sitesafe.png"),
                    title: "风险管理"
                },
                {
                    id: "statistics",
                    url: require("@/assets/img/ic_three_person.png"),
                    title: "统计分析"
                },
                {
                    id: "emergency",
                    url: require("@/assets/img/ic_emergency_manager.png"),
                    title: "应急管理"
                },
                {
                    id: "health",
                    url: require("@/assets/img/ic_health.png"),
                    title: "职业卫生"
                },
                {
                    id: "simultaneously",
                    url: require("@/assets/img/ic_inject.png"),
                    title: "项目三同时"
                },
                // {
                //     id: "inject",
                //     url: require("@/assets/img/ic_inject.png"),
                //     title: "安全环保投入"
                // },
                // {
                //     id: "fire",
                //     url: require("@/assets/img/ic_fire.png"),
                //     title: "消防管理"
                // },
                // {
                //     id: "performance",
                //     url: require("@/assets/img/ic_performance.png"),
                //     title: "绩效考核"
                // }
            ],
            gridStyle: {
                overflow: "scroll",
                height: window.innerHeight - 310 + "px"
            }
        };
    },
    methods: {
        linkTo(id) {
            this.$router.push({
                name: "list",
                query: {
                    page: id
                }
            });
        }
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>
<style scoped>
.grids_img {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
}
.grids_item {
    font-size: 14px;
}
</style>