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
                                <span class="main_val">{{item.colligatename}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">民族:</span>
                                <span class="main_val">{{item.nationText}}</span>
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
                                <span class="main_title">学历:</span>
                                <span class="main_val">{{item.educationText}}</span>
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
                    <p>姓名: {{selectData.colligatename}}</p>
                </div>
                <div>
                    <p>民族: {{selectData.nationText}}</p>
                </div>
                <div>
                    <p>出生日期: {{selectData.birthday}}</p>
                </div>
                <div>
                    <p>籍贯: {{selectData.nativeplace}}</p>
                </div>
                <div>
                    <p>学历: {{selectData.educationText}}</p>
                </div>
                <div>
                    <p>入职时间: {{selectData.entrydate}}</p>
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
    name: "Colligate",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/staffarchive/colligate/list.action",
                obj: {}
            },
            sheetShow: false,
            actions: [{ name: "查看更多" }, { name: "查看详情" }],
            popshow: false,
            selectData: {}
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            let _self = this;
            Promise.all([
                _self.$common.comboList({ sourcename: "MZ" }),
                _self.$common.comboList({ sourcename: "XL" })
            ]).then(res => {
                arr.forEach(element => {
                    _self.$common.setSex(element);
                    _self.$common.code2Text(element, "nation", this.mzArr);
                    _self.$common.code2Text(element, "education", this.xlArr);
                });
                _self.rendering = arr;
            });
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
            } else if (item.name == "查看更多") {
                this.$store.commit("getSelectData", this.selectData);
                this.$router.push({
                    path: "/team/colligateDetail"
                });
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