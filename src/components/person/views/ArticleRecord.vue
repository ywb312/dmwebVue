<template>
    <div>
        <SearchBox placeholder="请输入发放人、领用人搜索" @callback="searchBack"></SearchBox>
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
                            <p>发放人: {{item.grantPeople}}</p>
                        </div>
                        <div>
                            <p>领用人: {{item.receivePeople}}</p>
                        </div>
                        <div>
                            <p>部门: {{item.deptid}}</p>
                        </div>
                        <div>
                            <p>工种: {{item.workType}}</p>
                        </div>
                        <div>
                            <p>标准规定期限: {{item.stipulatedate}}</p>
                        </div>
                        <div>
                            <p>初次领用日期: {{item.receivedate}}</p>
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
        <Popup :popshow="detailShow" @close="detailShow=false">
            <div slot="title" class="popupTitle">详情</div>
            <div slot="views" class="popup">
                <div>
                    <p>工作服: {{selectData.coveral}}</p>
                </div>
                <div>
                    <p>军用胶鞋: {{selectData.shoes}}</p>
                </div>
                <div>
                    <p>安全帽: {{selectData.safetyhat}}</p>
                </div>
                <div>
                    <p>夏季工作服: {{selectData.summerCoverall}}</p>
                </div>
                <div>
                    <p>秋季工作服: {{selectData.autumnCoverall}}</p>
                </div>
                <div>
                    <p>口罩: {{selectData.mask}}</p>
                </div>
                <div>
                    <p>毛巾: {{selectData.towel}}</p>
                </div>
                <div>
                    <p>洗衣粉: {{selectData.washing}}</p>
                </div>
                <div>
                    <p>普通照明手电: {{selectData.flashligh}}</p>
                </div>
                <div>
                    <p>短筒雨靴: {{selectData.boots}}</p>
                </div>
                <div>
                    <p>领用人: {{selectData.receivePeople}}</p>
                </div>
                <div>
                    <p>发放人: {{selectData.grantPeople}}</p>
                </div>
                <div>
                    <p>部门: {{selectData.deptid}}</p>
                </div>
                <div>
                    <p>工种: {{selectData.workType}}</p>
                </div>
                <div>
                    <p>标准规定期限: {{selectData.stipulatedate}}</p>
                </div>
                <div>
                    <p>初次领用日期: {{selectData.receivedate}}</p>
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
    name: "ArticleRecord",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/protect/protectArticleRecord/list.action",
                obj: {}
            },
            sheetShow: false,
            actions: [{ name: "查看详情" }],
            detailShow: false,
            selectData: {}
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(v) {
            this.rendering = v;
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
                this.detailShow = true;
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