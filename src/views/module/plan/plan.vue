<template>
    <div class="plan">
        <!-- 标题  -->
        <mt-header :title="pageData.text" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <!-- 主体 -->
        <div class="wrap">
            <preview :params="params" :pageData="pageData"></preview>
        </div>
    </div>
</template>
<script>
import preview from "@/components/pub/preview";
export default {
    name: "plan",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 传入的对象
            params: {
                olddate: "0",
                queryAll: "",
                crstate: "",
                crqy: "",
                str: "",
                end: "",
                zgzrdw: "",
                param: ""
            },
            page: [
                {
                    text: "我的检查计划",
                    ajaxurl: "biz/sc/checkplan/list.action",
                    updata: [],
                    headerLeft: {
                        key: "标题",
                        value: "crname"
                    },
                    headerRight: {
                        key: "栏目名称",
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
                },
                {
                    text: "计划查询"
                    // ajaxurl: "biz/sc/checkplan/getChildPlanRecord.action",
                    // updata:[],
                    // headerLeft: {
                    //     key: "标题",
                    //     value: "crname",
                    // },
                    // headerRight: {
                    //     key: "栏目名称",
                    //     value: "txlb",
                    // },
                    // main: [{
                    //     key: "隐患描述",
                    //     value: "crdesc",
                    // }, {
                    //     key: "隐患场所",
                    //     value: "craddr",
                    // }, {
                    //     key: "审批时间",
                    //     value: "pcdate",
                    // }],
                },
                {
                    text: "专项检查计划",
                    ajaxurl: "biz/sc/checkplantemp/list.action",
                    updata: [],
                    headerLeft: {
                        key: "标题",
                        value: ""
                    },
                    headerRight: {
                        key: "栏目名称",
                        value: ""
                    },
                    main: [
                        {
                            key: "检查内容",
                            value: "cpname"
                        },
                        {
                            key: "检查开始时间",
                            value: "checkstatar"
                        },
                        {
                            key: "检查结束时间",
                            value: "checkdeadline"
                        },
                        {
                            key: "已完成",
                            value: "workload"
                        },
                        {
                            key: "未完成",
                            value: "undone"
                        }
                    ]
                }
            ]
        };
    },
    created() {
        let a = this.$route.query.a;
        this.pageData = this.page[a]; //当前页面的配置
    },
    methods: {},
    components: {
        preview
    }
};
</script>
<style scoped>
.mint-header {
    background-color: #2585cf;
    height: 1.1rem;
    font-size: 20px;
}
.plan {
    height: 100%;
}
.wrap {
    padding-top: 1.1rem;
}
</style>