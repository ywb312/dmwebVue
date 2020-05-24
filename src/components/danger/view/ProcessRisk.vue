<template>
    <div>
        <!-- 标题  -->
        <van-nav-bar
            title="隐患查询"
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
        <div>
            <!-- 查看方式 -->
            <van-sticky :offset-top="$common.getOffset()">
                <correlation @radioChange="radioData"></correlation>
            </van-sticky>
            <!-- 主体 -->
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
                        <h4 :class="item.prtype=='YHLX002'?'red':''">{{index+1+"."+item.crname}}</h4>
                        <p class="main_tag">
                            <van-tag round size="large" type="primary">{{item.crstateText}}</van-tag>
                        </p>
                    </div>
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title">存在问题:</span>
                                <span class="main_val">{{item.crdesc}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">隐患类型:</span>
                                <span class="main_val">{{item.prtype=='YHLX001'?'一般隐患':'重大隐患'}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">隐患类型:</span>
                                <span class="main_val">{{item.craddr}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">待操作部门名称:</span>
                                <span class="main_val bold">{{item.czrdeptName}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">检查时间:</span>
                                <span class="main_val">{{item.pcdate}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">检查人:</span>
                                <span class="main_val">{{item.createid}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <search-popup
            @returnMsg="paramsDate"
            :statusShow="true"
            :companyShow="false"
            :popshow="popshow"
            @popupClose="popshow=false"
        ></search-popup>
        <!-- 隐藏的组件 -->
        <van-action-sheet
            v-model="sheetShow"
            :actions="actions"
            @select="onSelect"
            cancel-text="取消"
            close-on-click-action
        />
        <div>
            <record :compShow="compShow" @popupClose="compShow=false" />
        </div>
    </div>
</template>
<script>
// 查看方式组件
import correlation from "@/components/danger/correlation";
import ViewBox from "@/components/pub/ViewBox.vue";
import record from "@/components/danger/record";
// 查找组件
import searchPopup from "@/components/danger/searchPopup";
export default {
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/rm/processrisk/list.action",
                obj: {
                    "bean.queryAll": ""
                }
            },
            sheetShow: false,
            actions: [{ name: "隐患详情" }, { name: "审批记录" }],
            // 选中的对象
            selectData: {},
            // 审批记录操作框
            compShow: false,
            // 查找组件的显示
            popshow: false,
            crstate: []
        };
    },
    methods: {
        getRendering(arr) {
            let _self = this;
            if (this.crstate.length == 0) {
                _self.$common.comboList({ sourcename: "YHZT" }).then(res => {
                    _self.crstate = res;
                    arr.forEach(item => {
                        _self.$common.code2Text(item, "crstate", _self.crstate);
                    });
                    _self.rendering = arr;
                });
            } else {
                arr.forEach(item => {
                    _self.$common.code2Text(item, "crstate", _self.crstate);
                });
                _self.rendering = arr;
            }
        },
        // 查看方式 得到子组件传入的值
        radioData(v) {
            this.postData.obj["bean.queryAll"] = v;
            this.$refs.view.clearData();
        },
        paramsDate(v) {
            Object.keys(v).forEach(key => {
                this.postData.obj["bean." + key] = v[key];
            });
            this.$refs.view.clearData();
        },
        // 点击每一项
        btnClick(obj) {
            this.sheetShow = true;
            this.$store.commit("getSelectData", obj);
            this.selectData = obj;
        },
        // 选中面板操作
        onSelect(item) {
            this.sheetShow = false;
            if (item.name == "隐患详情") {
                this.$router.push({
                    path: "/danger/detail",
                    query: {
                        yhid: this.selectData.yhid
                    }
                });
            } else if (item.name == "审批记录") {
                this.compShow = true;
            }
        }
    },
    components: {
        ViewBox,
        correlation,
        searchPopup,
        record
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>