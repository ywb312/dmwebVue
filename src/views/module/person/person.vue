<template>
    <div class="person">
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
    name: "person",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 传入的对象
            params: {
                olddate: "0"
            },
            page: [
                {
                    text: "特种作业人员信息"
                    // ajaxurl: "biz/people/specialPeople/list.action",
                    // search:true,
                    // updata: ["param"],
                    // headerLeft: {
                    //     key: "标题",
                    //     value: "crname",
                    // },
                    // headerRight: {
                    //     key: "栏目名称",
                    //     value: "",
                    // },
                    // main: [{
                    //     key: "隐患描述",
                    //     value: "crdesc",
                    // }, {
                    //     key: "提醒类型",
                    //     value: "txlb",
                    // }, {
                    //     key: "隐患类型",
                    //     value: "checkdeadline",
                    // }, {
                    //     key: "检查人员",
                    //     value: "createid",
                    // }, {
                    //     key: "截止日期",
                    //     value: "pcdate",
                    // }, {
                    //     key: "整改单位",
                    //     value: "zgzrdw",
                    // }],
                },
                {
                    text: "持证人员信息"
                    // ajaxurl: "biz/people/certifiedPeople/list.action",
                    // search:true,
                    // updata: ["param"],
                    // headerLeft: {
                    //     key: "标题",
                    //     value: "crname",
                    // },
                    // headerRight: {
                    //     key: "栏目名称",
                    //     value: "",
                    // },
                    // main: [{
                    //     key: "隐患描述",
                    //     value: "crdesc",
                    // }, {
                    //     key: "提醒类型",
                    //     value: "txlb",
                    // }, {
                    //     key: "隐患类型",
                    //     value: "checkdeadline",
                    // }, {
                    //     key: "检查人员",
                    //     value: "createid",
                    // }, {
                    //     key: "截止日期",
                    //     value: "pcdate",
                    // }, {
                    //     key: "整改单位",
                    //     value: "zgzrdw",
                    // }],
                },
                {
                    text: "主要负责人信息",
                    ajaxurl: "biz/people/peoplephoto/list.action",
                    search: true,
                    updata: ["param"],
                    headerLeft: {
                        key: "标题",
                        value: "peopleName"
                    },
                    headerRight: {
                        key: "栏目名称",
                        value: "peopleSex"
                    },
                    main: [
                        {
                            key: "行业类别",
                            value: "industry"
                        },
                        {
                            key: "出生日期",
                            value: "birthday"
                        },
                        {
                            key: "职务",
                            value: "position"
                        },
                        {
                            key: "证件号码",
                            value: "idcard"
                        },
                        {
                            key: "初领日期",
                            value: "startDate"
                        },
                        {
                            key: "结束日期",
                            value: "endDate"
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
.person {
    height: 100%;
}
</style>