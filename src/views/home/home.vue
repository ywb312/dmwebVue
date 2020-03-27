<template>
    <div class="home">
        <router-view></router-view>
        <!-- 底部导航 -->
        <div class="bottom">
            <figure
                v-for="item in tabConfig"
                :key="item.text"
                :class="item.active?'selected':''"
                class="item"
                @click.stop="toRouter(item)"
            >
                <img :src="item.iconUrl" />
                <figcaption>{{item.text}}</figcaption>
            </figure>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tabConfig: [
                {
                    iconUrl: require("@/assets/img/home.png"),
                    text: "主页",
                    name: "homePage",
                    active: true
                },
                {
                    iconUrl: require("@/assets/img/computer.png"),
                    text: "工作台",
                    name: "computerPage",
                    active: false
                },
                {
                    iconUrl: require("@/assets/img/me.png"),
                    text: "我的",
                    name: "mePage",
                    active: false
                }
            ]
        };
    },
    methods: {
        toRouter(obj) {
            if (this.$route.name == obj.name) {
                return;
            }
            this.tabConfig.forEach(item => {
                item.active = false;
            });
            obj.active = true;
            this.$router.push({ name: obj.name });
        }
    }
};
</script>
<style scoped>
.home {
    height: 100%;
}
.bottom {
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
    color: #999999;
    background-color: #565656;
}
.item {
    display: block;
    padding: 7px 0;
    flex: 1;
    text-align: center;
    margin: 0;
    text-decoration: none;
}
.item img {
    width: 24px;
    height: 24px;
    margin: 0 auto 5px;
}
.item figcaption {
    font-size: 12px;
    line-height: 1;
    color: inherit;
}
.selected {
    background-color: #2585cf;
    color: white;
}
</style>