<template>
    <div>
        <!-- 标题  -->
        <van-nav-bar
            title="风险统计"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
            @click-right="popshow=true"
        >
            <!-- <template #right>
                <img src="@/assets/iconfont/search.svg" />
            </template>-->
        </van-nav-bar>
        <choice-dept @choiceCompany="getCompany"></choice-dept>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">{{index+1+"."}}</span>
                                <span class="main_val">{{item.deptname}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">类型:</span>
                                <span class="main_val">{{item.fxtypeText}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">一级风险:</span>
                                <span class="main_val">{{item.onegrade}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">二级风险:</span>
                                <span class="main_val">{{item.twograde}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">三级风险:</span>
                                <span class="main_val">{{item.threegrade}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">四级风险:</span>
                                <span class="main_val">{{item.fourgrade}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <!-- <search
            @returnMsg="paramsDate"
            :popshow="popshow"
            :typeShow="true"
            :companyShow="true"
            @popupClose="popshow=false"
        ></search>-->
    </div>
</template>
<script>
import choiceDept from "@/components/pub/choiceDept";
import ViewBox from "@/components/pub/ViewBox.vue";
// import search from "@/components/statistics/search.vue";
export default {
    name: "riskSta",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/risk/info/fxtjlist.action",
                obj: {}
            },
            popshow: false,
            fxdlxSort: []
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    created() {
        let _self = this;
        this.$common.comboList({ sourcename: "FXDLX" }).then(res => {
            _self.fxdlxSort = res;
        });
    },
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(element, "fxtype", this.fxdlxSort);
            });
            this.rendering = arr;
        },
        btnClick(item) {
            // this.$router.push({
            //     path:"/statistics/staEcharts",
            // })
        },
        // paramsDate(val) {
        //     this.postData.obj["bean.zrdw"] = val["zrdw"];
        //     this.postData.obj["bean.lx"] = val["lx"];
        //     this.$refs.view.clearData();
        // },
        // 选取矿业公司
        getCompany(v) {
            for (const key in v) {
                this.postData.obj[key] = v[key];
            }
            this.$refs.view.clearData();
        }
    },
    components: {
        ViewBox,
        // search,
        choiceDept
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>