<template>
    <div class="page">
        <van-nav-bar
            title="审核详情"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <div>
            <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                <div class="title">
                    <h4>{{index+1+'.'+item.name}}</h4>
                    <p style="min-width:40px">
                        <van-tag round type="primary">{{item.fxtypeText}}</van-tag>
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
                            <van-tag
                                size="large"
                                round
                                :type="item.grade == 1?'danger':item.grade==2?'warning':'primary'"
                                :color="item.grade == 3?'yellow':''"
                            >{{item.grade+"级"}}</van-tag>
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
        this.rendering = this.setData(this.selectData);
    },
    methods: {
        setData(obj) {
            let arr = [];
            arr.push(...obj.child);
            delete obj.child;
            arr.push(obj);
            arr.forEach(element => {
                this.$common.code2Text(element, "knfs", this.knfsSlots);
                this.$common.code2Text(element, "yxfw", this.yxfwSlots);
                this.$common.code2Text(element, "qzhg", this.qzhgSlots);
                this.$common.code2Text(element, "gtype", this.gTypeSlots);
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