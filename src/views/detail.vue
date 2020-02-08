<template>
    <div class="detail">
        <!-- 标题  -->
        <mt-header :title="pageData.text">
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
    </div>
</template>
<script>
export default {
    data() {
        return {
            pageData:"",
        };
    },
    created() {
        let a = this.$route.query.a;
        let num = this.$store.state.listNum;
        this.pageData = this.$store.state.listPage[num - 1].page[a];
    },
    methods: {},
    components: {}
};
</script>
<style scoped>
.detail {
    height: 100%;
}
.mint-header {
    background-color: #2585cf;
    height: 1.1rem;
    font-size: 20px;
}
</style>