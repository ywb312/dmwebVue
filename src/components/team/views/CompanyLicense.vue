<template>
    <div>
        <SearchBox placeholder="请输入单位名称搜索" @callback="searchBack"></SearchBox>
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
                            <p class="main_text">
                                <span class="main_title">主要负责人:</span>
                                <span class="main_val">{{item.legalPerson}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">单位地址:</span>
                                <span class="main_val">{{item.companyAddress}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">经济类型:</span>
                                <span class="main_val">{{item.companyType}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">许可范围:</span>
                                <span class="main_val">{{item.permission}}</span>
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
                    <p>主要负责人: {{selectData.legalPerson}}</p>
                </div>
                <div>
                    <p>单位地址: {{selectData.companyAddress}}</p>
                </div>
                <div>
                    <p>经济类型: {{selectData.companyType}}</p>
                </div>
                <div>
                    <p>许可范围:{{selectData.permission}}</p>
                </div>
                <div>
                    <p>有效始期:{{selectData.startDate}}</p>
                </div>
                <div>
                    <p>有效至期:{{selectData.endDate}}</p>
                </div>
                <div v-for="(m,n) in selectData.attach" :key="m">
                    <p>
                        文件:
                        <a :href="m">{{selectData.attachname[n]}}</a>
                    </p>
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
    name: "CompanyLicense",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/create/companyLicense/list.action",
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
    methods: {
        getRendering(arr) {
            arr.forEach(item => {
                if (item.attach) {
                    item.attach = item.attach.split(",");
                    item.attachname = item.attachname.split(",");
                } else {
                    item.attach = [];
                    item.attachname = [];
                }
            });
            this.rendering = arr;
        },
        // 搜索框的回调
        searchBack(str) {
            this.postData.obj["bean.param"] = str;
            this.rendering = [];
            this.$refs.view.cleraData();
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