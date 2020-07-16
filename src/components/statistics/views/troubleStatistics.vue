<template>
    <div>
        <!-- 标题  -->
        <van-nav-bar
            title="隐患信息统计"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
            @click-right="popshow=true"
        >
            <template #right>
                <img src="@/assets/iconfont/search.svg" />
            </template>
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
                    <div class="title">
                        <h4>{{index+1+"."}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">隐患类型:</span>
                                <span class="main_val">{{item.prtype}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">隐患上报单位:</span>
                                <span class="main_val">{{item.checkDeptname}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">隐患总和:</span>
                                <span class="main_val">{{item.troublesum}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">时间周期:</span>
                                <span class="main_val">{{item.dateRange}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">待评估:</span>
                                <span class="main_val">{{item.yhzt001}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">待指派:</span>
                                <span class="main_val">{{item.yhzt002}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">待督办:</span>
                                <span class="main_val">{{item.yhzt009}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">待整改:</span>
                                <span class="main_val">{{item.yhzt003}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">待验收:</span>
                                <span class="main_val">{{item.yhzt004}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">待闭环:</span>
                                <span class="main_val">{{item.yhzt012}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">已闭环:</span>
                                <span class="main_val">{{item.yhzt011}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <search
            @returnMsg="paramsDate"
            :popshow="popshow"
            :dateShow="true"
            :companyShow="true"
            @popupClose="popshow=false"
        ></search>
    </div>
</template>
<script>
import choiceDept from "@/components/pub/choiceDept";
import ViewBox from "@/components/pub/ViewBox.vue";
import search from "@/components/statistics/search.vue";
export default {
    name: "troubleStatistics",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/sa/trouble/list.action",
                obj: {}
            },
            popshow: false
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        },
        paramsDate(val) {
            this.postData.obj["bean.dateRange"] =
                val["start"] + "至" + val["endtime"];
            this.$refs.view.clearData();
        },
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
        search,
        choiceDept
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>