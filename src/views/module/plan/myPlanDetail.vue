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
            <div class="wrapper" v-for="(item,index) in rendering" :key="index">
                <div class="main">
                    <div>
                        <p>
                            <span class="main_title">危险源名称:</span>
                            <span class="main_val">{{item.maindanger}}</span>
                        </p>
                    </div>
                    <div>
                        <p>
                            <span class="main_title">管控措施:</span>
                            <span class="main_val">{{item.inspacetcontent}}</span>
                        </p>
                    </div>
                    <div>
                        <p></p>
                    </div>
                    <div>
                        <p>
                            <span class="main_title">落实条件:</span>
                            <span class="main_val">
                                <van-radio-group v-model="radio">
                                    <van-radio name="1">落实</van-radio>
                                    <van-radio name="2">未落实</van-radio>
                                    <van-radio name="3">不涉及</van-radio>
                                </van-radio-group>
                            </span>
                        </p>
                    </div>
                </div>
                <van-empty image="error" v-show="noRes" description="数据有误" />
            </div>
        </van-form>
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
            radio: ""
        };
    },
    created() {
        // 获取排查表
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
                }
            });
    },
    methods: {
        // 获取时间
        getTime(v) {
            this.date = v;
        },
        // 提交
        postData(val) {
            this.$api.pub
                .showPage("biz/sc/checkplandetail/doAddSave.action", {
                    obj: this.rendering,
                    lsjhzydd: this.zydd,
                    tbr: this.tbr,
                    checkend: this.date
                })
                .then(res => {
                    if (res.success) {
                        this.$router.back(-1);
                    }
                });
        },
        // 一键设置落实/不涉及
        allChange(type) {
            for (j = 0, len = arr.length; j < len; j++) {
                // arr[j] = type;
            }
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