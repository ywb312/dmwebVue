<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            :title="title"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div v-if="$route.query.type=='evalplan'" slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.planname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">一级要素:</span>
                                <span class="main_val">{{item.firstitem}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">二级要素:</span>
                                <span class="main_val">{{item.seconditemText}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">三级要素:</span>
                                <span class="main_val">{{item.versioncode}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">PDCA:</span>
                                <span class="main_val">{{item.pdcaText}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">标准分:</span>
                                <span class="main_val">{{item.standerdscore}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">负责人:</span>
                                <span class="main_val">{{item.chargeman}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">规则描述:</span>
                                <span class="main_val">{{item.ruledescribe}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">规则分:</span>
                                <span class="main_val">{{item.rulescore}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">评分方式:</span>
                                <span class="main_val">{{item.doscoretypeText}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">定量:</span>
                                <span class="main_val">{{item.dxdl=="DXDL001"?"定量":"定性"}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="$route.query.type=='scorerules'" slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.planname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">三级要素:</span>
                                <span class="main_val">{{item.itemdescribe}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">标准分:</span>
                                <span class="main_val">{{item.standerdscore}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">规则描述:</span>
                                <span class="main_val">{{item.ruledescribe}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">规则分:</span>
                                <span class="main_val">{{item.rulescore}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">定性/定量:</span>
                                <span class="main_val">{{item.dxdl=="DXDL001"?"定量":"定性"}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">实际情况:</span>
                                <span class="main_val">{{item.factsdescribe}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">当前得分:</span>
                                <span class="main_val">{{item.finalscore}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">评分时间:</span>
                                <span class="main_val">{{item.doscoretime}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">评分人:</span>
                                <span class="main_val">{{item.doscoreman}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="$route.query.type=='items'" slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">要素编码:</span>
                                <span class="main_val">{{item.itemcode}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">规则编码:</span>
                                <span class="main_val">{{item.rulecode}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">规则描述:</span>
                                <span class="main_val">{{item.ruledescribe}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">规则分:</span>
                                <span class="main_val">{{item.rulescore}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">得分下限:</span>
                                <span class="main_val">{{item.downline}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">得分上限:</span>
                                <span class="main_val">{{item.upline}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">评分方式:</span>
                                <span class="main_val">{{item.doscoretypeText}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">定性/定量:</span>
                                <span class="main_val">{{item.dxdl=="DXDL001"?"定量":"定性"}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">调用路径:</span>
                                <span class="main_val">{{item.webpath}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="$route.query.type=='version'" slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">版本名称:</span>
                                <span class="main_val">{{item.versionname}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">一级要素:</span>
                                <span class="main_val">{{item.firstitem}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">二级要素:</span>
                                <span class="main_val">{{item.seconditemText}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">三级要素:</span>
                                <span class="main_val">{{item.itemdescribe}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">PDCA:</span>
                                <span class="main_val">{{item.pdcaText}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">要素编码:</span>
                                <span class="main_val">{{item.itemcode}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">规则数量:</span>
                                <span class="main_val">{{item.rulenums}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">标准分:</span>
                                <span class="main_val">{{item.standerdscore}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
    </div>
</template>
<script>
import ViewBox from "@/components/pub/ViewBox.vue";
import Popup from "@/components/pub/Popup.vue";
export default {
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "",
                obj: {
                    filters: this.$route.query.filters
                }
            },
            title: "",
            show: false,
            popshow: false,
            actions: [{ name: "查看详情" }],
            selectData: {},
            pffsArr: [
                { id: "PFFS001", text: "基础数据" },
                { id: "PFFS002", text: "查询统计" },
                { id: "PFFS003", text: "系统设定" }
            ],
            yjkhxArr: [
                { id: "YJKHX001001", text: "1.1方针" },
                { id: "YJKHX001002", text: "1.2目标" }
            ],
            pcdaArr: [
                { id: "PDCA001", text: "P" },
                { id: "PDCA002", text: "D" },
                { id: "PDCA003", text: "C" },
                { id: "PDCA004", text: "A" }
            ]
        };
    },
    created() {
        if (this.$route.query.type == "evalplan") {
            this.title = "标准化自评计划评分内容";
            this.postData.url = "biz/eval/doscorerules/list.action";
        } else if (this.$route.query.type == "scorerules") {
            this.title = "标准化自评规则打分";
            this.postData.url = "biz/eval/doscorerules/list.action";
        } else if (this.$route.query.type == "items") {
            this.title = "标准化评分规则表";
            this.postData.url = "biz/eval/evalrules/list.action";
        } else if (this.$route.query.type == "version") {
            this.title = "标准化评分版本要素内容";
            this.postData.url = "biz/eval/versionitems/list.action";
        }
    },
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(element, "firstitem", this.yjkhxArr);
                this.$common.code2Text(element, "seconditem", this.yjkhxArr);
                this.$common.code2Text(element, "pdca", this.pcdaArr);
                this.$common.code2Text(element, "doscoretype", this.pffsArr);
            });
            this.rendering = arr;
        },
        btnClick(obj) {
            this.show = true;
            this.selectData = obj;
        }
    },
    components: {
        ViewBox,
        Popup
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>