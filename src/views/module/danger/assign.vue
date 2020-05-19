<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="填报指派"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <van-form @submit="update" :show-error-message="false">
            <tree title="整改责任单位" @selectMsg="getCompany"></tree>
            <van-field
                label="整改治理要求"
                v-model="zgzlyq"
                placeholder="整改治理要求"
                :rules="[{ required: true, message: '请填写整改治理要求' }]"
            />
            <date-pick title="整改截止时间" type="datetime" time="after" @returnDate="getZgjzsj"></date-pick>
            <van-field
                label="填表人员"
                v-model="tbr"
                placeholder="填表人员名称"
                :rules="[{ required: true, message: '请填写填表人员名称' }]"
            />
            <van-field label="备注" placeholder="请输入备注说明" v-model="memo" />
            <van-button class="btn" type="info" size="large" native-type="submit">提交</van-button>
        </van-form>
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
            let _self = this;
            _self.$store.commit("setIsLoading", true);
            let obj = {
                "sbzpEntity.yhid": this.selectData.yhid,
                "sbzpEntity.assignFlag": 0,
                "sbzpEntity.zgzrdw": this.zgzrdw,
                "sbzpEntity.zgzrdwName": this.zgzrdwName,
                "sbzpEntity.zgzlyq": this.zgzlyq,
                "sbzpEntity.zgdate": this.zgdate,
                "sbzpEntity.tbr": this.tbr,
                "sbzpEntity.memo": this.memo
            };
            // 上传接口
            this.$api.danger.doexp(obj).then(function(res) {
                _self.$store.commit("setIsLoading", false);
                // 数据有误
                if (typeof res != "object") {
                    _self.$toast("服务器连接错误");
                    return;
                }
                _self.$toast({ message: "操作成功", duration: 2000 });
                setTimeout(() => {
                    _self.$router.back(-1);
                }, 2000);
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