<template>
    <div class="auditDetail">
        <mt-header title="审核详情" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div class="wrap">
            <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                <div class="title">
                    <h4>{{index+1+'.'+item.name}}</h4>
                    <p style="min-width:40px">
                        <mt-badge size="normal">{{item.fxtypeText}}</mt-badge>
                    </p>
                </div>
                <div class="main">
                    <div>
                        <span>危险源名称: {{item.wname}}</span>
                    </div>
                    <div>
                        <span>危险源责任单位: {{item.deptname}}</span>
                    </div>
                    <div v-if="item.grade">
                        <span>
                            风险等级:
                            <mt-badge
                                :type="item.grade == 1?'error':item.grade==2?'warning':'primary'"
                                :color="item.grade == 3?'yellow':''"
                                size="normal"
                            >{{item.grade+"级"}}</mt-badge>
                        </span>
                    </div>
                    <div>
                        <span>项目: {{item.project}}</span>
                    </div>
                    <div>
                        <span>内容: {{item.content}}</span>
                    </div>
                    <div>
                        <span>影响范围: {{item.yxfwText}}</span>
                    </div>
                    <div>
                        <span>可能导致的事故: {{item.knfsText}}</span>
                    </div>
                    <div>
                        <span>潜在后果: {{item.qzhgText}}</span>
                    </div>
                    <div v-if="item.gtypeText">
                        <span>管控措施: {{item.gtypeText}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "auditDetail",
    data() {
        return {
            page: 1,
            // 渲染的数据
            rendering: []
        };
    },
    created() {
        console.log(this.selectData);
        this.rendering = this.setData(this.selectData);
    },
    methods: {
        setData(obj) {
            let arr = [];
            arr.push(...obj.child);
            delete obj.child;
            arr.push(obj);
            arr.forEach(element => {
                this.$common.codeToText(
                    element,
                    "knfs",
                    this.knfsSlots[0].values
                );
                this.$common.codeToText(
                    element,
                    "yxfw",
                    this.yxfwSlots[0].values
                );
                this.$common.codeToText(
                    element,
                    "qzhg",
                    this.qzhgSlots[0].values
                );
                this.$common.codeToText(
                    element,
                    "gtype",
                    this.gTypeSlots[0].values
                );
            });
            return arr;
        }
    },
    computed: {
        selectData() {
            return this.$store.state.selectData;
        },
        knfsSlots() {
            return this.$store.state.knfsSlots;
        },
        yxfwSlots() {
            return this.$store.state.yxfwSlots;
        },
        qzhgSlots() {
            return this.$store.state.qzhgSlots;
        },
        gTypeSlots() {
            return this.$store.state.gTypeSlots;
        }
    },
    components: {}
};
</script>
<style scoped src="@/assets/css/public.css"/>