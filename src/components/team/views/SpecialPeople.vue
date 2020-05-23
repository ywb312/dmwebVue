<template>
    <div>
        <SearchBox placeholder="请输入姓名搜索" @callback="searchBack"></SearchBox>
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
                                <span class="main_title">姓名:</span>
                                <span class="main_val">{{item.peopleName}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">性别:</span>
                                <span class="main_val">{{item.sexText}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">出生日期:</span>
                                <span class="main_val">{{item.birthday}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">职务:</span>
                                <span class="main_val">{{item.position}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <!-- 操作面板 -->
        <van-action-sheet
            v-model="sheetShow"
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
                    <p>姓名: {{selectData.peopleName}}</p>
                </div>
                <div>
                    <p>性别: {{selectData.sexText}}</p>
                </div>
                <div>
                    <p>出生日期:{{selectData.birthday}}</p>
                </div>
                <div>
                    <p>身份证号:{{selectData.idcard}}</p>
                </div>
                <div>
                    <p>职务:{{selectData.position}}</p>
                </div>
                <div>
                    <p>行业类别:{{selectData.industry}}</p>
                </div>
                <div>
                    <p>初领日期:{{selectData.startDate}}</p>
                </div>
                <div>
                    <p>有效期至:{{selectData.endDate}}</p>
                </div>
            </div>
        </Popup>
    </div>
</template>
<script>
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
import Popup from "@/components/pub/Popup.vue";
export default {
    name: "SpecialPeople",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "",
                obj: {}
            },
            sheetShow: false,
            actions: [{ name: "查看详情" }],
            popshow: false,
            selectData: {}
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    created() {
        // 主要负责人证照
        if (this.pageData.id == "peoplephoto") {
            this.postData.url = "biz/people/peoplephoto/list.action";
            // 安全员资质
        } else if (this.pageData.id == "secoffqua") {
            this.postData.url = "biz/people/secoffqua/list.action";
            // 员工代表
        } else if (this.pageData.id == "staffrep") {
            this.postData.url = "biz/people/staffrep/list.action";
            // 事故调查员
        } else if (this.pageData.id == "accnve") {
            this.postData.url = "biz/people/accnve/list.action";
            // 职业卫生管理员
        } else if (this.pageData.id == "occhealadmin") {
            this.postData.url = "biz/people/occhealadmin/list.action";
        }
    },
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.setSex(element, "peopleSex");
            });
            this.rendering = arr;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.clearData();
        },
        btnClick(obj) {
            this.selectData = obj;
            this.sheetShow = true;
        },
        onSelect(item) {
            if (item.name == "查看详情") {
                this.popshow = true;
            }
        }
    },
    components: {
        SearchBox,
        ViewBox,
        Popup
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>