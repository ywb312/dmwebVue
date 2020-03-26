<template>
    <div class="finished">
         <!-- 标题  -->
        <mt-header title="已办事项" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <!-- 主体 -->
        <div class="wrap">
            <!-- <preview :params="params" :pageData="pageData"></preview> -->
        </div>
    </div>
    </div>
</template>
<script>
export default {
    name: "finished",
    data() {
        return {
            
        };
    },
    mounted() {},
    methods: {}
};
</script>
<style scoped>
.mint-header {
    background-color: #2585cf;
    height: 1.1rem;
    font-size: 20px;
}
</style>