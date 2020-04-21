<template>
    <div class="page">
        <!-- 标题  -->
        <mt-header title="员工详细信息" fixed>
            <router-link to slot="left">
                <mt-button icon="back" @click="$router.back(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div class="wrap">
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
                                <p>姓名: {{item.name}}</p>
                            </div>
                            <div>
                                <p>性别: {{item.sexText}}</p>
                            </div>
                            <div>
                                <p>文化程度: {{item.edugradeText}}</p>
                            </div>
                            <div>
                                <p>出生年月: {{item.birthday}}</p>
                            </div>
                            <div>
                                <p>参加工作时间: {{item.companyType}}</p>
                            </div>
                            <div>
                                <p>工种: {{item.profession}}</p>
                            </div>
                            <div>
                                <p>电话号码: {{item.phone}}</p>
                            </div>
                            <div>
                                <p>身份证号码: {{item.idcard}}</p>
                            </div>
                            <div>
                                <p>备注: {{item.memo}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div slot="tip">
                    <van-divider>没有更多数据了</van-divider>
                </div>
            </ViewBox>
        </div>
        <!-- 操作面板 -->
        <!-- <van-action-sheet
            v-model="show"
            :actions="actions"
            @select="onSelect"
            cancel-text="取消"
            close-on-click-action
        />-->
        <!-- 弹窗组件 -->
        <!-- <Popup :popshow="popshow" @close="popshow=false">
            <div slot="title" class="popupTitle">详情</div>
            <div slot="views" class="popup">
                <div>
                    <p>单位名称: {{selectData.companyName}}</p>
                </div>
                <div>
                    <p>主要负责人: {{selectData.legalPerson}}</p>
                </div>
                <div>
                    <p>单位地址: {{selectData.companyAddress}}</p>
                </div>
                <div>
                    <p>经济类型: {{selectData.companyType}}</p>
                </div>
                <div>
                    <p>许可范围: {{selectData.permission}}</p>
                </div>
                <div>
                    <p>编号: {{selectData.socialCode}}</p>
                </div>
                <div>
                    <p>业主单位: {{selectData.ownerUnit}}</p>
                </div>
                <div>
                    <p>属地监管单位: {{selectData.supervisionUnit}}</p>
                </div>
                <div>
                    <p>业务主管部门: {{selectData.competentDept}}</p>
                </div>
                <div>
                    <p>有效始期: {{selectData.startDate}}</p>
                </div>
                <div>
                    <p>有效止期: {{selectData.endDate}}</p>
                </div>
            </div>
        </Popup>-->
    </div>
</template>
<script>
import Popup from "@/components/pub/Popup.vue";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "projectStaff",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/health/projectinfo/list.action",
                obj: {
                    filters: this.$route.query.filters
                }
            },
            xlArr: [
                {
                    id: "XL001",
                    text: "小学"
                },
                {
                    id: "XL002",
                    text: "初中"
                },
                {
                    id: "XL003",
                    text: "高中"
                },
                {
                    id: "XL004",
                    text: "大专"
                },
                {
                    id: "XL005",
                    text: "本科"
                },
                {
                    id: "XL006",
                    text: "硕士研究生"
                },
                {
                    id: "XL007",
                    text: "博士研究生"
                },
                {
                    id: "XL008",
                    text: "技校"
                },
                {
                    id: "XL009",
                    text: "中专"
                },
                {
                    id: "XL010",
                    text: "职高"
                }
            ]
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
               this.$common.setSex(element);
                this.$common.code2Text(element, "edugrade", this.xlArr);
            });
            this.rendering = arr;
        }
    },
    components: {
        ViewBox,
        Popup
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>