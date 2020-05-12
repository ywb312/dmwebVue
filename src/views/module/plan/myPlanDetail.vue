<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="排查表"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <van-form @submit="postData" :show-error-message="false">
            <van-field label="作业地点" placeholder="请输入作业地点" v-model="zydd"></van-field>
            <van-field label="检查人员" placeholder="请输入备注说明" v-model="tbr"></van-field>
            <date-pick title="检查日期" time="after" @returnDate="getTime"></date-pick>
            <van-button type="info" size="large" native-type="submit">提交</van-button>
        </van-form>
        <div class="wrapper" v-for="(item,index) in rendering" :key="index" @click="btnClick(item)">
            <div class="main">
                
            </div>
            <van-empty v-if="noData" description="暂无数据" />
            <van-empty image="error" v-show="noRes" description="数据有误" />
        </div>
    </div>
</template>
<script>
import datePick from "@/components/pub/datePick";
export default {
    name: "myPlanDetail",
    data() {
        return {
            zydd: "",
            tbr: "",
            date: "",
            rendering: [],
            noRes: false,
            noData:false
        };
    },
    created() {
        this.$api.plan
            .myPlan({
                "bean.cpid": this.selectData.cpid,
                "bean.checktype": this.selectData.checktype,
                "bean.checkdept": this.selectData.checkdept
            })
            .then(res => {
                // 数据有误
                if (typeof res != "object") {
                    this.noRes = true;
                    return;
                }
                if (res.rows && res.rows.length != 0) {
                    this.rendering = res.rows;
                }else{
                    this.noData = true;
                }
            });
    },
    methods: {
        getTime(v) {
            this.date = v;
        },
        postData(val) {
            console.log(val);
        }
    },
    computed: {
        selectData() {
            return this.$store.state.selectData;
        }
    },
    components: {
        datePick
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>