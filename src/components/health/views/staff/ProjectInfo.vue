<template>
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
                        <h4>{{index+1+"."+item.companyName}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>主要负责人: {{item.legalPerson}}</p>
                        </div>
                        <div>
                            <p>单位地址: {{item.companyAddress}}</p>
                        </div>
                        <div>
                            <p>经济类型: {{item.companyType}}</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </ViewBox>
        <!-- 操作面板 -->
        <van-action-sheet
            v-model="show"
            :actions="actions"
            @select="onSelect"
            cancel-text="取消"
            close-on-click-action
        />
        <!-- 弹窗组件 -->
        <Popup :popshow="popshow" @close="popshow=false">
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
        </Popup>
    </div>
</template>
<script>
import Popup from "@/components/pub/Popup.vue";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "ProjectInfo",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/create/stakeholder/list.action",
                obj: {}
            },
            show: false,
            popshow: false,
            actions: [{ name: "查看更多" }, { name: "员工详细信息" }],
            selectData: {}
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        },
        btnClick(obj) {
            this.show = true;
            this.selectData = obj;
        },
        onSelect(item) {
            if (item.name == "查看更多") {
                this.popshow = true;
            } else if (item.name == "员工详细信息") {
                this.$router.push({
                    path: "/health/projectStaff",
                    query: {
                        filters: this.selectData.staid
                    }
                });
            }
        }
    },
    components: {
        ViewBox,
        Popup
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>