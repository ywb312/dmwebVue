<template>
    <div class="backlog">
        <!-- 标题  -->
        <mt-header title="待办事项" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <!-- 主体 -->
        <div class="wrap">
            <!-- <preview :params="params" :pageData="pageData"></preview> -->
        </div>
    </div>
</template>
<script>
export default {
    name: "backlog",
    data() {
        return {
            pageData: {
                ajaxurl: "/manager/activity/taskList.action",
                updata: [],
                headerLeft: {
                    value: "crname"
                },
                headerRight: {
                    value: "txlb"
                },
                main: [
                    {
                        key: "隐患描述",
                        value: "crdesc"
                    },
                    {
                        key: "隐患场所",
                        value: "craddr"
                    },
                    {
                        key: "审批时间",
                        value: "pcdate"
                    }
                ]
            }
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