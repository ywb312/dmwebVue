<template>
    <div class="assign page">
        <!-- 标题  -->
        <van-nav-bar
            title="填报指派"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <tree title="整改责任单位" @selectMsg="getCompany"></tree>
        <mt-field label="整改治理要求" placeholder="请输入整改治理要求" v-model="zgzlyq"></mt-field>
        <date-pick title="整改截止时间" time="after" placeholder="请选择整改截止时间" @returnDate="getZgjzsj"></date-pick>
        <mt-field label="填表人员" placeholder="请输入填表人员名称" v-model="tbr"></mt-field>
        <mt-field label="备注" placeholder="请输入备注说明" v-model="memo"></mt-field>
        <div>
            <mt-button class="btn" type="primary" size="large" @click="update">提交</mt-button>
        </div>
    </div>
</template>
<script>
import tree from "@/components/pub/tree";
import datePick from "@/components/pub/datePick";
export default {
    name: "assign",
    data() {
        return {
            tbr: "",
            zgzlyq: "",
            memo: "",
            zgzrdw: "",
            zgzrdwName: "",
            zgdate: ""
        };
    },
    methods: {
        getCompany(v) {
            this.zgzrdw = v.id;
            this.zgzrdwName = v.name;
        },
        getZgjzsj(v) {
            this.zgdate = v;
        },
        update() {
            if (this.zgzrdw == "") {
                this.$toast("请选择整改责任单位");
                return;
            } else if (this.zgzlyq == "") {
                this.$toast("请输入整改治理要求");
                return;
            } else if (this.tbr == "") {
                this.$toast("请输入填表人员名称");
                return;
            } else if (this.zgdate == "") {
                this.$toast("请选择整改截止时间");
                return;
            }
            let _self = this;
            let obj = {
                "sbzpEntity.yhid": this.selectData.yhid,
                "sbzpEntity.assignFlag": 0,
                "sbzpEntity.zgzrdw": this.zgzrdw,
                "sbzpEntity.zgzrdwName": this.zgzrdwName,
                "sbzpEntity.zgzlyq": this.zgzlyq,
                "sbzpEntity.zgdate": this.zgdate,
                "sbzpEntity.tbr": this.tbr,
                "sbzpEntity.memo": this.memo,
                session: window.localStorage["session_Id"]
            };
            // 上传接口
            this.$api.danger.doexp(obj).then(function() {
                let instance = this.$toast("操作成功");
                setTimeout(() => {
                    instance.clear();
                    _self.$router.back(-1);
                }, 1000);
            });
        }
    },
    computed: {
        selectData() {
            return this.$store.state.selectData;
        }
    },
    components: {
        datePick,
        tree
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>