<template>
    <div>
        <div class="searchPopup">
            <div
                class="maskWrap"
                v-show="searchShow"
                @touchmove.prevent
                @click="reset"
            >
                <div @click.stop class="maskMiddle">
                    <div class="maskTitle">统计时间段</div>
                    <double-date-pick
                        ref="date"
                        :config="dbDateConifg"
                        :type="dateType"
                        @returnDate1="getStartDate"
                        @returnDate2="getEndDate"
                    ></double-date-pick>
                    <van-button type="info" size="large" @click="update"
                        >确定</van-button
                    >
                </div>
            </div>
        </div>
        <van-sticky :offset-top="$common.getOffset()">
            <van-button plain color="#2585cf" @click="searchShow = true" block
                >查询</van-button
            >
        </van-sticky>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item, index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">年份:</span>
                                <span class="main_val">{{ item.year }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">季度:</span>
                                <span class="main_val">{{ item.season }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title"
                                    >季度事故数量总和:</span
                                >
                                <span class="main_val">{{
                                    item.jdnumber
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title"
                                    >本年度事故数量总和:</span
                                >
                                <span class="main_val">{{
                                    item.nfnumber
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">季度占该年比:</span>
                                <span class="main_val">{{
                                    Math.round(
                                        (item.jdnumber / item.nfnumber) * 10000
                                    ) /
                                        100.0 +
                                    "%"
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">轻伤:</span>
                                <span class="main_val">{{ item.shcdA }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">重伤:</span>
                                <span class="main_val">{{ item.shcdB }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">死亡:</span>
                                <span class="main_val">{{ item.shcdC }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">统计开始日期:</span>
                                <span class="main_val">{{
                                    item.startDate
                                }}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">统计截止日期:</span>
                                <span class="main_val">{{ item.endDate }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <!-- 弹窗组件 -->
        <Popup :popshow="popshow" @close="popshow = false">
            <div slot="title" class="popupTitle">详情</div>
            <div slot="views" class="popup">
                <div>
                    <p>年份:{{ selectData.year }}</p>
                </div>
                <div>
                    <p>季度:{{ selectData.season }}</p>
                </div>
                <div>
                    <p>季度事故数量总和:{{ selectData.jdnumber }}</p>
                </div>
                <div>
                    <p>本年度事故数量总和:{{ selectData.nfnumber }}</p>
                </div>
                <div>
                    <p>
                        季度占该年比:{{
                            Math.round(
                                (selectData.jdnumber / selectData.nfnumber) *
                                    10000
                            ) /
                                100.0 +
                            "%"
                        }}
                    </p>
                </div>
                <div>
                    <p>物体打击:{{ selectData.sglxA }}</p>
                </div>
                <div>
                    <p>
                        占本年度比:{{
                            Math.round(
                                (selectData.sglxA / selectData.nfnumber) * 10000
                            ) /
                                100.0 +
                            "%"
                        }}
                    </p>
                </div>
                <div>
                    <p>车辆伤害:{{ selectData.sglxB }}</p>
                </div>
                <div>
                    <p>
                        占本年度比:{{
                            Math.round(
                                (selectData.sglxB / selectData.nfnumber) * 10000
                            ) /
                                100.0 +
                            "%"
                        }}
                    </p>
                </div>
                <div>
                    <p>机械伤害:{{ selectData.sglxC }}</p>
                </div>
                <div>
                    <p>
                        占本年度比:{{
                            Math.round(
                                (selectData.sglxC / selectData.nfnumber) * 10000
                            ) /
                                100.0 +
                            "%"
                        }}
                    </p>
                </div>
                <div>
                    <p>高处坠落:{{ selectData.sglxD }}</p>
                </div>
                <div>
                    <p>
                        占本年度比:{{
                            Math.round(
                                (selectData.sglxD / selectData.nfnumber) * 10000
                            ) /
                                100.0 +
                            "%"
                        }}
                    </p>
                </div>
                <div>
                    <p>冒顶片帮:{{ selectData.sglxE }}</p>
                </div>
                <div>
                    <p>
                        占本年度比:{{
                            Math.round(
                                (selectData.sglxE / selectData.nfnumber) * 10000
                            ) /
                                100.0 +
                            "%"
                        }}
                    </p>
                </div>
                <div>
                    <p>中毒窒息:{{ selectData.sglxF }}</p>
                </div>
                <div>
                    <p>
                        占本年度比:{{
                            Math.round(
                                (selectData.sglxF / selectData.nfnumber) * 10000
                            ) /
                                100.0 +
                            "%"
                        }}
                    </p>
                </div>
                <div>
                    <p>放炮事故:{{ selectData.sglxG }}</p>
                </div>
                <div>
                    <p>
                        占本年度比:{{
                            Math.round(
                                (selectData.sglxG / selectData.nfnumber) * 10000
                            ) /
                                100.0 +
                            "%"
                        }}
                    </p>
                </div>
                <div>
                    <p>起重伤害:{{ selectData.sglxH }}</p>
                </div>
                <div>
                    <p>
                        占本年度比:{{
                            Math.round(
                                (selectData.sglxH / selectData.nfnumber) * 10000
                            ) /
                                100.0 +
                            "%"
                        }}
                    </p>
                </div>
                <div>
                    <p>火灾:{{ selectData.sglxI }}</p>
                </div>
                <div>
                    <p>
                        占本年度比:{{
                            Math.round(
                                (selectData.sglxI / selectData.nfnumber) * 10000
                            ) /
                                100.0 +
                            "%"
                        }}
                    </p>
                </div>
                <div>
                    <p>灼烫:{{ selectData.sglxJ }}</p>
                </div>
                <div>
                    <p>
                        占本年度比:{{
                            Math.round(
                                (selectData.sglxJ / selectData.nfnumber) * 10000
                            ) /
                                100.0 +
                            "%"
                        }}
                    </p>
                </div>
                <div>
                    <p>触电:{{ selectData.sglxK }}</p>
                </div>
                <div>
                    <p>
                        占本年度比:{{
                            Math.round(
                                (selectData.sglxK / selectData.nfnumber) * 10000
                            ) /
                                100.0 +
                            "%"
                        }}
                    </p>
                </div>
                <div>
                    <p>其它伤害:{{ selectData.sglxL }}</p>
                </div>
                <div>
                    <p>
                        占本年度比:{{
                            Math.round(
                                (selectData.sglxL / selectData.nfnumber) * 10000
                            ) /
                                100.0 +
                            "%"
                        }}
                    </p>
                </div>
                <div>
                    <p>淹溺:{{ selectData.sglxM }}</p>
                </div>
                <div>
                    <p>
                        占本年度比:{{
                            Math.round(
                                (selectData.sglxM / selectData.nfnumber) * 10000
                            ) /
                                100.0 +
                            "%"
                        }}
                    </p>
                </div>
                <div>
                    <p>坍塌:{{ selectData.sglxN }}</p>
                </div>
                <div>
                    <p>
                        占本年度比:{{
                            Math.round(
                                (selectData.sglxN / selectData.nfnumber) * 10000
                            ) /
                                100.0 +
                            "%"
                        }}
                    </p>
                </div>
                <div>
                    <p>透水:{{ selectData.sglxO }}</p>
                </div>
                <div>
                    <p>
                        占本年度比:{{
                            Math.round(
                                (selectData.sglxO / selectData.nfnumber) * 10000
                            ) /
                                100.0 +
                            "%"
                        }}
                    </p>
                </div>
                <div>
                    <p>火药爆炸:{{ selectData.sglxP }}</p>
                </div>
                <div>
                    <p>
                        占本年度比:{{
                            Math.round(
                                (selectData.sglxP / selectData.nfnumber) * 10000
                            ) /
                                100.0 +
                            "%"
                        }}
                    </p>
                </div>
                <div>
                    <p>瓦斯爆炸:{{ selectData.sglxQ }}</p>
                </div>
                <div>
                    <p>
                        占本年度比:{{
                            Math.round(
                                (selectData.sglxQ / selectData.nfnumber) * 10000
                            ) /
                                100.0 +
                            "%"
                        }}
                    </p>
                </div>
                <div>
                    <p>锅炉爆炸:{{ selectData.sglxR }}</p>
                </div>
                <div>
                    <p>
                        占本年度比:{{
                            Math.round(
                                (selectData.sglxR / selectData.nfnumber) * 10000
                            ) /
                                100.0 +
                            "%"
                        }}
                    </p>
                </div>
                <div>
                    <p>容器爆炸:{{ selectData.sglxS }}</p>
                </div>
                <div>
                    <p>
                        占本年度比:{{
                            Math.round(
                                (selectData.sglxS / selectData.nfnumber) * 10000
                            ) /
                                100.0 +
                            "%"
                        }}
                    </p>
                </div>
                <div>
                    <p>其他爆炸:{{ selectData.sglxT }}</p>
                </div>
                <div>
                    <p>
                        占本年度比:{{
                            Math.round(
                                (selectData.sglxT / selectData.nfnumber) * 10000
                            ) /
                                100.0 +
                            "%"
                        }}
                    </p>
                </div>
                <div>
                    <p>轻伤:{{ selectData.shcdA }}</p>
                </div>
                <div>
                    <p>重伤:{{ selectData.shcdB }}</p>
                </div>
                <div>
                    <p>死亡:{{ selectData.shcdC }}</p>
                </div>
                <div>
                    <p>统计开始日期:{{ selectData.startDate }}</p>
                </div>
                <div>
                    <p>统计截止日期:{{ selectData.endDate }}</p>
                </div>
            </div>
        </Popup>
    </div>
</template>
<script>
import ViewBox from "@/components/pub/ViewBox.vue";
import doubleDatePick from "@/components/pub/doubleDatePick";
import Popup from "@/components/pub/Popup.vue";
export default {
    name: "Accidentzt",
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/operate/accibook/selectBySeasonList.action",
                obj: {
                    "bean.param": "",
                    "bean.startDate": "",
                    "bean.endDate": "",
                },
            },
            searchShow: false,
            dbDateConifg: [
                { title: "起始日期", placeholder: "请选择开始日期" },
                { title: "截至日期", placeholder: "请选择截至日期" },
            ],
            dateType: "year-month",
            popshow: false,
            selectData: {},
        };
    },
    created() {},
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        },
        // 获取日期
        getStartDate(v) {
            this.postData.obj["bean.startDate"] = v.substring(0, 4);
        },
        getEndDate(v) {
            this.postData.obj["bean.endDate"] = v.substring(0, 4);
        },
        // 弹窗确定
        update() {
            this.$refs.view.clearData();
            this.reset();
        },
        // 弹窗重置
        reset() {
            Object.keys(this.postData).forEach((key) => {
                this.postData.obj[key] = "";
            });
            this.searchShow = false;
            this.$refs.date.reset();
        },
        btnClick(obj) {
            this.selectData = obj;
            this.popshow = true;
        },
    },
    computed: {},
    components: {
        ViewBox,
        doubleDatePick,
        Popup
    },
};
</script>
<style scoped src="@/assets/css/public.css"/>