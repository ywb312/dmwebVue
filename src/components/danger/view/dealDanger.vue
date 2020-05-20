<template>
    <div class="dealDanger">
        <!-- 标题  -->
        <van-nav-bar
            title="隐患处理"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
            @click-right="$router.push('/danger/increase')"
        >
            <template #right>
                <img src="@/assets/iconfont/add.svg" />
            </template>
        </van-nav-bar>
        <div>
            <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
                <div slot="views">
                    <div
                        class="wrapper"
                        v-for="(item,index) in rendering"
                        :key="index"
                        @click="btnClick(item)"
                    >
                        <div class="title">
                            <h4>{{index+1+'.'+item.crname}}</h4>
                            <p class="main_tag">
                                <van-tag round size="large" type="primary">{{item.stateText}}</van-tag>
                            </p>
                        </div>
                        <div class="main">
                            <div>
                                <p class="main_text">
                                    <span class="main_title">隐患描述:</span>
                                    <span class="main_val">{{item.crdesc}}</span>
                                </p>
                            </div>
                            <div>
                                <p class="main_text">
                                    <span class="main_title">隐患场所:</span>
                                    <span class="main_val">{{item.craddr}}</span>
                                </p>
                            </div>
                            <div>
                                <p class="main_text">
                                    <span class="main_title">审批时间:</span>
                                    <span class="main_val">{{item.pcdate}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </ViewBox>
        </div>
        <!-- 隐藏的组件 -->
        <van-action-sheet
            v-model="show"
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
// 渲染组件
import ViewBox from "@/components/pub/ViewBox.vue";
import record from "@/components/danger/record";
export default {
    name: "dealDanger",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/im/zdrisknotice/list_notice_two.action",
                obj: {
                    "bean.olddate": "0"
                }
            },
            show: false,
            actions: [
                { name: "隐患详情" },
                { name: "审批记录" },
                { name: "自查自改" },
                { name: "上报上级" },
                { name: "隐患指派" }
            ],
            // 选中的对象
            selectData: {},
            // 审批记录操作框
            compShow: false,
            isOrg: false
        };
    },
    created() {
        this.$api.pub
            .getConfig("manager/sys/dept/getselfdept.action")
            .then(res => {
                let data = eval("(" + res + ")");
                // 数据有误
                if (typeof data != "object") {
                    this.$toast("服务器连接错误");
                    return;
                }
                if (data.cells[0].isOrg && data.cells[0].isOrg == "1") {
                    this.isOrg = true;
                }
            });
    },
    methods: {
        // 获取当前页面数据函数
        getRendering(arr) {
            let _self = this;
            _self.$common.comboList({ sourcename: "SPZT" }).then(res => {
                arr.forEach(element => {
                    _self.$common.code2Text(element, "state", res);
                });
                _self.rendering = arr;
            });
        },
        // 检验可否自查自改、上报、审批
        postDeal(type) {
            if (
                this.selectData.stateText == "审批中" ||
                this.selectData.stateText == "审批通过"
            ) {
                this.$toast(
                    "该记录处于审批中，数据不能修改！请在工作台-待办事项中完成！"
                );
                return;
            }
            let obj = {
                "bean.yhid": this.selectData.yhid
            };
            if (type == "zczg") {
                obj["bean.zgtype"] = "ZGLX002";
                this.$dialog
                    .confirm({
                        title: "自查自改",
                        message: "确定执行此操作?"
                    })
                    .then(resolve => {
                        this.dealAjax(obj);
                    })
                    .catch(reject => {});
            } else if (type == "sbsj") {
                obj["bean.zgtype"] = "ZGLX001";
                this.$dialog
                    .confirm({
                        title: "上报上级",
                        message: "确定执行此操作?"
                    })
                    .then(resolve => {
                        this.dealAjax(obj);
                    })
                    .catch(reject => {});
            } else if (type == "tbzp" && this.isOrg) {
                this.$router.push({
                    path: "/danger/assign"
                });
            }
        },
        // 上传
        dealAjax(obj) {
            this.$api.danger.doexp(obj).then(res => {
                // 数据有误
                if (typeof res != "object") {
                    this.$toast("服务器连接错误");
                    return;
                }
                if (res.message) {
                    this.$toast(res.message);
                    this.$refs.view.cleraData();
                }
            });
        },
        // 点击每一项
        btnClick(obj) {
            this.show = true;
            this.$store.commit("getSelectData", obj);
            this.selectData = obj;
        },
        // 选中面板操作
        onSelect(item) {
            this.show = false;
            if (item.name == "隐患详情") {
                this.$router.push({
                    path: "/danger/detail",
                    query: {
                        yhid: this.selectData.yhid
                    }
                });
            } else if (item.name == "审批记录") {
                this.compShow = true;
            } else if (item.name == "自查自改") {
                this.postDeal("zczg");
            } else if (item.name == "上报上级") {
                this.postDeal("sbsj");
            } else if (item.name == "隐患指派") {
                this.postDeal("tbzp");
            }
        }
    },
    components: {
        ViewBox,
        record
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>