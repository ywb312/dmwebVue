<template>
    <div class="homePage">
        <mt-header title="主页"></mt-header>
        <div class="banner">
            <img src="@/assets/img/homeshow.png" alt />
        </div>
        <div class="grids">
            <figure v-for="(item) in grid" :key="item.id" @click="linkTo(item.id)">
                <img :src="item.url" alt />
                <figcaption>
                    <p>{{item.title}}</p>
                </figcaption>
            </figure>
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
                    id: 1,
                    url: require("@/assets/img/ic_news.png"),
                    title: "通知公告"
                },
                {
                    id: 2,
                    url: require("@/assets/img/ic_risk.png"),
                    title: "隐患管理"
                },
                {
                    id: 3,
                    url: require("@/assets/img/ic_survey.png"),
                    title: "计划管理"
                },
                {
                    id: 4,
                    url: require("@/assets/img/ic_emergcy.png"),
                    title: "提醒预警"
                },
                {
                    id: 5,
                    url: require("@/assets/img/ic_sitesafe.png"),
                    title: "风险管理"
                },
                {
                    id: 6,
                    url: require("@/assets/img/ic_three_person.png"),
                    title: "三项人员"
                },
                {
                    id: 7,
                    url: require("@/assets/img/ic_train.png"),
                    title: "方针目标"
                },
                {
                    id: 8,
                    url: require("@/assets/img/ic_train_edu.png"),
                    title: "教育培训"
                },
                {
                    id: 9,
                    url: require("@/assets/img/ic_craft_manager.png"),
                    title: "工艺管理"
                },
                {
                    id: 10,
                    url: require("@/assets/img/ic_envir_pro.png"),
                    title: "环保管理"
                },
                {
                    id: 11,
                    url: require("@/assets/img/ic_emergency_manager.png"),
                    title: "应急管理"
                },
                {
                    id: 12,
                    url: require("@/assets/img/ic_accident_manager.png"),
                    title: "事故管理"
                }
            ]
        };
    },
    mounted() {},
    methods: {
        linkTo(id) {
            this.$store.commit("setListNum", id);
            this.$router.push({
                name: "list"
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
    display: flex;
    width: 100%;
    height: 6.7rem;
    overflow: auto;
    flex-wrap: wrap;
}
.grids figure {
    margin: 0 0 0 -1px;
    width: 33.33%;
    box-sizing: border-box;
    text-align: center;
    padding: 0.4rem 0.5rem;
    border-left: solid 1px #ddd;
    border-bottom: solid 1px #ddd;
    border-collapse: collapse;
}
.grids figure:last-of-type {
    border-right: solid 1px #ddd;
}
.grids::after {
    content: "";
    flex: auto;
}
.grids figure img {
    width: 1rem;
    height: 1rem;
    margin-bottom: 0.2rem;
}
</style>