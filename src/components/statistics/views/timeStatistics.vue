<template>
    <div>
        <!-- 标题  -->
        <van-nav-bar
            title="按时间统计"
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
        <div class="btnGroup">
            <span :class="postData.obj['bean.cycle']=='day'?'active':''" @click="inquire('day')">日</span>
            <span
                :class="postData.obj['bean.cycle']=='MONTH'?'active':''"
                @click="inquire('MONTH')"
            >月</span>
            <span :class="postData.obj['bean.cycle']=='YEAR'?'active':''" @click="inquire('YEAR')">年</span>
        </div>
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
                                <span class="main_title">周期:</span>
                                <span class="main_val">{{item.cycle}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">时间:</span>
                                <span class="main_val">{{item.start}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">隐患数量总和:</span>
                                <span class="main_val">{{item.h}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">已整改数量:</span>
                                <span class="main_val">{{item.y}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">未整改数量:</span>
                                <span class="main_val">{{item.w}}</span>
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
            :sortShow="true"
            @popupClose="popshow=false"
        ></search>
    </div>
</template>
<script>
import choiceDept from "@/components/pub/choiceDept";
import ViewBox from "@/components/pub/ViewBox.vue";
import search from "@/components/statistics/search.vue";
export default {
    name: "timeStatistics",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/sa/time/list.action",
                obj: {
                    "bean.cycle": "day"
                }
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
            this.postData.obj["bean.sort"] = val["sort"];
            this.postData.obj["bean.start"] = val["start"];
            this.postData.obj["bean.endtime"] = val["endtime"];
            this.$refs.view.clearData();
        },
        btnClick(item) {
            let _self = this;
            let obj = {
                "bean.start": this.postData.obj["bean.start"],
                "bean.endtime": this.postData.obj["bean.endtime"],
                "bean.flag": 0,
                "bean.tablesuffix": this.postData.obj["bean.tablesuffix"]
            };
            this.$router.push({
                path: "/statistics/timeStat",
                query: obj
            });
        },
        // 选取矿业公司
        getCompany(v) {
            for (const key in v) {
                this.postData.obj[key] = v[key];
            }
            this.$refs.view.clearData();
        },
        // 头部查询功能
        inquire(str) {
            this.postData.obj["bean.cycle"] = str;
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
<style scoped>
.btnGroup {
    padding-top: 8px;
    display: flex;
    justify-content: space-around;
    background-color: white;
}
.btnGroup span {
    width: 20%;
    padding: 8px 0;
    text-align: center;
    border: solid 1px #2585cf;
    border-radius: 10px;
}
.active {
    color: white;
    background-color: #2585cf;
}
</style>