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
                            <p style="min-width:40px">
                                <van-tag round type="primary">{{item.stateText}}</van-tag>
                            </p>
                        </div>
                        <div class="main">
                            <div>
                                <span>隐患描述: {{item.crdesc}}</span>
                            </div>
                            <div>
                                <span>隐患场所: {{item.craddr}}</span>
                            </div>
                            <div>
                                <span>审批时间: {{item.pcdate}}</span>
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
                { name: "查看详情" },
                { name: "审批记录" },
                { name: "自查自改" },
                { name: "上报上级" },
                { name: "隐患指派" }
            ],
            // 选中的对象
            selectData: {},
            // 审批记录操作框
            compShow: false,
            spArr: [
                {
                    id: "SPZT001",
                    text: "审批中"
                },
                {
                    id: "SPZT002",
                    text: "审批通过"
                },
                {
                    id: "SPZT003",
                    text: "审批不通过"
                },
                {
                    id: "SPZT004",
                    text: "未审批"
                },
                {
                    id: "SPZT005",
                    text: "未提交"
                }
            ]
        };
    },
    methods: {
        // 获取当前页面数据函数
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.code2Text(element, "state", this.spArr);
            });
            this.rendering = arr;
        },
        // 自查自改和上报
        postDeal(type) {
            if (this.selectData.state == "SPZT001") {
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
            } else if (type == "sbsj") {
                obj["bean.zgtype"] = "ZGLX001";
            }
            this.$api.danger.doexp(obj).then(res => {
                if (res.message) {
                    this.$toast(res.message);
                }
            });
        },
        btnClick(obj) {
            this.show = true;
            this.$store.commit("getSelectData", obj);
            this.selectData = obj;
        },
        onSelect(item) {
            if (item.name == "查看详情") {
                this.$router.push({
                    path: "/danger/detail"
                });
            } else if (item.name == "审批记录") {
                this.compShow = true;
            } else if (item.name == "自查自改") {
                this.postDeal("zczg");
            } else if (item.name == "上报上级") {
                this.postDeal("sbsj");
            } else if (item.name == "隐患指派") {
                this.$router.push({
                    path: "/danger/assign"
                });
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