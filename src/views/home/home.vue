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
                <mt-badge
                    v-show="item.badge>0"
                    class="float"
                    type="error"
                    size="small"
                >{{item.badge}}</mt-badge>
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
                    active: false
                },
                {
                    iconUrl: require("@/assets/img/computer.png"),
                    text: "工作台",
                    name: "computerPage",
                    active: false,
                    badge: 0
                },
                {
                    iconUrl: require("@/assets/img/me.png"),
                    text: "我的",
                    name: "mePage",
                    active: false
                }
            ],
            // 需要传的消息数 不是工作台的的数
            comBadge: 0
        };
    },
    created() {
        let self = this;
        self.tabConfig.forEach(item => {
            if (item.name == self.$route.name) {
                item.active = true;
            }
        });
        this.$api.work
            .taskList({
                page: 1,
                rows: 10,
                session: window.localStorage["session_Id"]
            })
            .then(res => {
                self.$store.commit("setBacklog", res);
                self.$set(self.tabConfig[1], "badge", res.records);
            });
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
            this.$router.push({
                name: obj.name
            });
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
.float {
    position: absolute;
    top: 2px;
}
.item {
    display: block;
    padding: 7px 0;
    flex: 1;
    text-align: center;
    margin: 0;
    text-decoration: none;
    position: relative;
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