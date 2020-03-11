<template>
    <div class="remind">
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
    name: "remind",
    data() {
        return {
            // 页面配置
            pageData: "",
            // 传入的对象
            params: {
                olddate: "0"
            },
            page: [{
						text: "隐患预警",
						// ajaxurl: "biz/tm/warninginfo/list.action",
						// updata: [],
						// headerLeft: {
						//     key: "标题",
						//     value: "",
						// },
						// headerRight: {
						//     key: "栏目名称",
						//     value: "",
						// },
						// main: [{
						//     key: "检查内容",
						//     value: "cpname",
						// }, {
						//     key: "检查开始时间",
						//     value: "checkstatar",
						// }, {
						//     key: "检查结束时间",
						//     value: "checkdeadline",
						// }, {
						//     key: "已完成",
						//     value: "workload",
						// }, {
						//     key: "未完成",
						//     value: "undone",
						// }],
					},
					{
						text: "检查逾期预警",
						// ajaxurl: "biz/sc/checkplan/list_child_notice.action",
						// updata: [],
						// headerLeft: {
						//     key: "标题",
						//     value: "",
						// },
						// headerRight: {
						//     key: "栏目名称",
						//     value: "",
						// },
						// main: [{
						//     key: "检查内容",
						//     value: "cpname",
						// }, {
						//     key: "检查开始时间",
						//     value: "checkstatar",
						// }, {
						//     key: "检查结束时间",
						//     value: "checkdeadline",
						// }, {
						//     key: "已完成",
						//     value: "workload",
						// }, {
						//     key: "未完成",
						//     value: "undone",
						// }],
					},
					{
						text: "隐患逾期预警",
						ajaxurl: "biz/im/zdrisknotice/list_notice_two.action",
						updata: ["olddate"],
						headerLeft: {
							key: "标题",
							value: "crname",
						},
						headerRight: {
							key: "栏目名称",
							value: "",
						},
						main: [{
							key: "隐患描述",
							value: "crdesc",
						}, {
							key: "提醒类型",
							value: "txlb",
						}, {
							key: "隐患类型",
							value: "checkdeadline",
						}, {
							key: "检查人员",
							value: "createid",
						}, {
							key: "截止日期",
							value: "pcdate",
						}, {
							key: "整改单位",
							value: "zgzrdw",
						}],
					}
				],
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
.remind {
    height: 100%;
}
.wrap {
    padding-top: 1.1rem;
}
</style>