<template>
    <div>
        <SearchBox placeholder="请输入文件编号,要素号,文件名称搜索" @callback="searchBack"></SearchBox>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.filename}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">要素号:</span>
                                <span class="main_val">{{item.elemcode}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">创建单位:</span>
                                <span class="main_val">{{item.createdept}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">创建人:</span>
                                <span class="main_val">{{item.createman}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">创建单位:</span>
                                <span class="main_val">{{item.createdept}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">责任人:</span>
                                <span class="main_val">{{item.respname}}</span>
                            </p>
                            <p class="mian_tag">
                                <van-tag round type="primary">{{item.createstage}}</van-tag>
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
                    <p>文件名称: {{selectData.filename}}</p>
                </div>
                <div>
                    <p>要素号: {{selectData.elemcode}}</p>
                </div>
                <div>
                    <p>文件级别: {{selectData.filedegree}}</p>
                </div>
                <div>
                    <p>文件编号: {{selectData.filecode}}</p>
                </div>
                <div>
                    <p>模板名:{{selectData.templatename}}</p>
                </div>
                <div>
                    <p>创建单位:{{selectData.createdept}}</p>
                </div>
                <div>
                    <p>创建人:{{selectData.createman}}</p>
                </div>
                <div>
                    <p>最后修改时间:{{selectData.lastmoditime}}</p>
                </div>
                <div>
                    <p>责任人:{{selectData.respname}}</p>
                    <van-tag round type="primary">{{selectData.createstage}}</van-tag>
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
    name: "FileApprove",
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
        // 安全管理体系制度文件审批
        if (this.pageData.id == "filecreate") {
            this.postData.url = "biz/create/filecreate/validlist.action";
            // 安全生产责任制审批
        } else if (this.pageData.id == "safprodccreate") {
            this.postData.url = "biz/create/safprodccreate/validlist.action";
            // 安全操作规程审批
        } else if (this.pageData.id == "safoperulcreate") {
            this.postData.url = "biz/create/safoperulcreate/validlist.action";
            // 作业指导书审批
        } else if (this.pageData.id == "opeinstrucreate") {
            this.postData.url = "biz/create/opeinstrucreate/validlist.action";
        }
    },
    methods: {
        getRendering(arr) {
            // arr.forEach(item => {
            // });
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