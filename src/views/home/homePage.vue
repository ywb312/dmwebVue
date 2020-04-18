<template>
    <div class="homePage">
        <mt-header title="主页" fixed></mt-header>
        <div class="banner wrap">
            <img src="@/assets/img/homeshow.png" alt />
        </div>
        <div class="grids">
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
                    id: "person",
                    url: require("@/assets/img/ic_three_person.png"),
                    title: "作业现场管理"
                },
                {
                    id: "target",
                    url: require("@/assets/img/ic_train.png"),
                    title: "方针目标"
                },
                {
                    id: "education",
                    url: require("@/assets/img/ic_train_edu.png"),
                    title: "教育培训"
                },
                {
                    id: "technology",
                    url: require("@/assets/img/ic_craft_manager.png"),
                    title: "工艺管理"
                },
                {
                    id: "environment",
                    url: require("@/assets/img/ic_envir_pro.png"),
                    title: "环保管理"
                },
                {
                    id: "emergency",
                    url: require("@/assets/img/ic_emergency_manager.png"),
                    title: "应急管理"
                },
                {
                    id: "accident",
                    url: require("@/assets/img/ic_accident_manager.png"),
                    title: "事故管理"
                },
                {
                    id: "laws",
                    url: require("@/assets/img/ic_accident_manager.png"),
                    title: "法律法规"
                },
            ]
        };
    },
    mounted() {},
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
<style scoped>
.banner img {
    display: block;
    width: 100%;
}
.grids {
    height: 360px;
    overflow: auto;
    margin-bottom: 50px;
}
.grids_img {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
}
.grids_item {
    font-size: 14px;
}
</style>