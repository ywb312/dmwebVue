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
            <van-sticky :offset-top="$common.getOffset()">
                <van-field
                    label="作业地点"
                    placeholder="请输入作业地点"
                    v-model="zydd"
                    :rules="[{ required: true, message: '1' }]"
                ></van-field>
                <van-field
                    label="检查人员"
                    placeholder="请输入检查人员"
                    v-model="tbr"
                    :rules="[{ required: true, message: '1' }]"
                ></van-field>
                <date-pick title="检查日期" type="datetime" time="before" nowTime @returnDate="getTime"></date-pick>
                <div class="setBtnGroup">
                    <van-button plain type="info" native-type="button" @click="allChange('2')">落实</van-button>
                    <van-button plain type="info" native-type="button" @click="allChange('0')">不涉及</van-button>
                </div>
                <van-button type="info" block native-type="submit">提交</van-button>
            </van-sticky>
            <div class="wrapper" v-for="(item,index) in rendering" :key="item.inspacetid">
                <div class="main">
                    <div>
                        <p>
                            <span class="main_title bold">{{1+index+"."}}危险源名称:</span>
                            <span class="main_val">{{item.maindanger}}</span>
                        </p>
                    </div>
                    <div>
                        <p>
                            <span class="main_title bold">管控措施:</span>
                            <span class="main_val">{{item.inspacetcontent}}</span>
                        </p>
                    </div>
                    <div>
                        <p>
                            <span class="main_title bold">落实条件:</span>
                            <span class="main_val">
                                <van-radio-group v-model="item.isok">
                                    <van-radio name="2">落实</van-radio>
                                    <van-radio name="1" @click="isokChange(index)">未落实</van-radio>
                                    <van-radio name="0">不涉及</van-radio>
                                </van-radio-group>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <van-empty v-show="noData" description="暂无数据" />
            <van-empty image="error" v-show="noRes" description="数据有误" />
        </van-form>
        <change-pop
            :changeShow="changeShow"
            :selectData="rendering[index]"
            @popupClose="changeClose"
            @suc="changeOK"
        ></change-pop>
    </div>
</template>
<script>
import changePop from "@/components/plan/changePop";
import datePick from "@/components/pub/datePick";
export default {
    name: "myPlanDetail",
    data() {
        return {
            zydd: window.localStorage.deptname + "作业",
            tbr: window.localStorage.username,
            date: "",
            rendering: [],
            changeShow: false,
            noRes: false,
            noData: false,
            index: 0
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
                    this.rendering = this.setRes(res.rows);
                } else {
                    this.noData = true;
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
            // 判断是否落实完成
            for (let i = 0, len = this.rendering.length; i < len; i++) {
                if (!this.rendering[i].isok) {
                    this.$toast("请将落实条件补充完整");
                    return;
                }
            }
            this.$store.commit("setIsLoading", true);
            // 提交
            this.$api.pub
                .showPage("biz/sc/checkplandetail/doAddSave.action", {
                    obj: JSON.stringify(this.rendering),
                    lsjhzydd: this.zydd,
                    tbr: this.tbr,
                    checkend: this.date
                })
                .then(res => {
                    this.$store.commit("setIsLoading", false);
                    res = eval("(" + res + ")");
                    // 数据有误
                    if (typeof res != "object") {
                        _self.$toast("");
                        return;
                    }
                    if (res.success) {
                        this.$toast(res.id);
                        this.$router.back(-1);
                    }
                });
        },
        // 一键设置落实/不涉及
        allChange(type) {
            for (let j = 0, len = this.rendering.length; j < len; j++) {
                this.$set(this.rendering[j], "isok", type);
            }
        },
        // 点击不涉及事件
        isokChange(index) {
            this.index = index;
            this.changeShow = true;
        },
        changeClose() {
            this.changeShow = false;
            this.$set(this.rendering[this.index], "isok", "");
        },
        changeOK() {
            this.$set(this.rendering[this.index], "isok", "1");
        },
        // 更改返回对象键名 便于后续提交
        setRes(arr) {
            for (let i = 0, len = arr.length; i < len; i++) {
                arr[i]["crLevel"] = arr[i]["pcLevel"];
                delete arr[i]["pcLevel"];
            }
            return arr;
        }
    },
    computed: {
        selectData() {
            return this.$store.state.selectData;
        }
    },
    components: {
        datePick,
        changePop
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>