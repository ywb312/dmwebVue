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
                        <van-tag size="large" round type="primary">{{item.fxtypeText}}</van-tag>
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
        this.setData(this.selectData).then(res => {
            this.rendering = res;
        });
    },
    methods: {
        setData(obj) {
            let arr = [];
            if (obj.child) {
                arr.push(...obj.child);
                delete obj.child;
            }
            arr.push(obj);
            let _self = this;
            return Promise.all([
                _self.$common.comboList({ sourcename: "KNFS" }),
                _self.$common.comboList({ sourcename: "YXFWEI" }),
                _self.$common.comboList({ sourcename: "QZHG" }),
                _self.$common.comboList({ sourcename: "GKCSLX" })
            ]).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "knfs", res[0]);
                    _self.$common.code2Text(element, "yxfw", res[1]);
                    _self.$common.code2Text(element, "qzhg", res[2]);
                    _self.$common.code2Text(element, "gtype", res[3]);
                });
                return arr;
            });
        }
    },
    computed: {
        selectData() {
            return this.$store.state.selectData;
        }
    },
    components: {}
};
</script>
<style scoped src="@/assets/css/public.css"/>