<template>
    <div class="traplanDetail">
        <mt-header title="培训计划详情" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div class="wrapper wrap">
            <div class="title">
                <h4>基本信息</h4>
            </div>
            <div class="main">
                <div>
                    <span>计划名称: {{selectData.planname}}</span>
                </div>
                <div>
                    <span>计划级别: {{selectData.planlevel}}</span>
                </div>
                <div>
                    <span>发布单位: {{selectData.pubdept}}</span>
                </div>
                <div>
                    <span>发布时间: {{selectData.pubtime}}</span>
                </div>
                <div>
                    <span>发布动态: {{selectData.pubstate=="FBZT001"?"未发布":"已发布"}}</span>
                </div>
                <div>
                    <span>创建人: {{selectData.pubman}}</span>
                </div>
                <div>
                    <span>开始时间: {{selectData.starttime}}</span>
                </div>
                <div>
                    <span>创建时间: {{selectData.maketime}}</span>
                </div>
                <div>
                    <span>结束时间: {{selectData.endtime}}</span>
                </div>
                <div>
                    <span>培训对象: {{selectData.objectvalue}}</span>
                </div>
                <div>
                    <span>培训内容: {{selectData.contextvalue}}</span>
                </div>
                <div>
                    <span>授课老师: {{selectData.trateacherid}}</span>
                </div>
                <div>
                    <span>培训地点: {{selectData.traplace}}</span>
                </div>
                <div>
                    <span>组织单位: {{selectData.hostdept}}</span>
                </div>
                <div>
                    <span>培训方式: {{selectData.tratypeText}}</span>
                </div>
                <div>
                    <span>培训负责人: {{selectData.traman}}</span>
                </div>
            </div>
        </div>
        <div class="wrapper">
            <div class="title">
                <h4>培训计划安排表</h4>
            </div>
            <div class="tr">
                <div>姓名</div>
                <div>工号</div>
                <div>单位</div>
            </div>
            <div class="tr" v-for="item in rendering" :key="item.planmanaid">
                <div>{{item.empname}}</div>
                <div>{{item.empid}}</div>
                <div>{{item.dept}}</div>
            </div>
        </div>
    </div>
</template>
<script>
// 这是基本渲染功能的组件 公用
export default {
    name: "traplanDetail",
    data() {
        return {
            rendering: [],
            solts: [
                {
                    id: "PXFS001",
                    text: "主题报告"
                },
                {
                    id: "PXFS002",
                    text: "集中授课"
                },
                {
                    id: "PXFS003",
                    text: "实际操作"
                },
                {
                    id: "PXFS004",
                    text: "视频影音学习"
                },
                {
                    id: "PXFS005",
                    text: "讨论互动学习"
                }
            ]
        };
    },
    created() {
        this.setRendering(this.selectData);
        this.getData();
    },
    methods: {
        setRendering(obj) {
            this.$common.codeToText(obj, "tratype", this.solts);
            return obj;
        },
        getData() {
            this.$api.education
                .getTraTable({
                    rows: 10,
                    page: this.page,
                    filters: this.selectData.planid,
                    session: window.localStorage["session_Id"]
                })
                .then(res => {
                    console.log(res);
                    if (res.rows && res.rows.length > 0) {
                        this.rendering = res.rows;
                    }
                });
        }
    },
    computed: {
        selectData() {
            return this.$store.state.selectData;
        }
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>
<style scoped>
.tr {
    display: flex;
    justify-content: space-around;
    padding: 0.2rem 0;
    background-color: rgb(250, 250, 250);
    border-bottom: solid 1px #ddd;
}
.tr div {
    width: 30%;
    text-align: center;
}
</style>