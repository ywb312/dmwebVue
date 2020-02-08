<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { Indicator } from "mint-ui";
export default {
    name: "App",
    computed: {
        ...mapState({
            isLoading: state => state.isLoading
        })
    },
    methods: {
        loadingShow(a) {
            if (a) {
                Indicator.open({
                    text: "加载中...",
                    spinnerType: "fading-circle"
                });
            } else {
                Indicator.close();
            }
        }
    },
    watch: {
        isLoading: function(nval) {
            this.loadingShow(nval.isLoading);
        }
    }
};
</script>
<style scoped>
#app {
    height: 100%;
}
</style>