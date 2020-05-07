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
                        <h4>{{index+1+'.'+item.personnel}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>布工作服: {{item.bgzf}}</p>
                        </div>
                        <div>
                            <p>管理服: {{item.glf}}</p>
                        </div>
                        <div>
                            <p>布胶鞋: {{item.bjx}}</p>
                        </div>
                        <div>
                            <p>全棉衬衣: {{item.qmcy}}</p>
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
                    <p>人员: {{selectData.personnel}}</p>
                </div>
                <div>
                    <p>布工作服: {{selectData.bgzf}}</p>
                </div>
                <div>
                    <p>管理服: {{selectData.glf}}</p>
                </div>
                <div>
                    <p>全棉衬衣: {{selectData.qmcy}}</p>
                </div>
                <div>
                    <p>皮工作鞋(靴): {{selectData.pgzx}}</p>
                </div>
                <div>
                    <p>绝缘皮鞋: {{selectData.jypx}}</p>
                </div>
                <div>
                    <p>布胶鞋: {{selectData.bjx}}</p>
                </div>
                <div>
                    <p>棉上衣: {{selectData.msy}}</p>
                </div>
                <div>
                    <p>长雨衣: {{selectData.cyy}}</p>
                </div>
                <div>
                    <p>上下身雨衣: {{selectData.sxsyy}}</p>
                </div>
                <div>
                    <p>中筒胶鞋: {{selectData.ztjx}}</p>
                </div>
                <div>
                    <p>胶鞋: {{selectData.jx}}</p>
                </div>
                <div>
                    <p>布手套: {{selectData.bst}}</p>
                </div>
                <div>
                    <p>纱手套: {{selectData.sst}}</p>
                </div>
                <div>
                    <p>护目镜: {{selectData.hmj}}</p>
                </div>
                <div>
                    <p>安全帽: {{selectData.aqm}}</p>
                </div>
                <div>
                    <p>口罩: {{selectData.kouz}}</p>
                </div>
                <div>
                    <p>肥皂: {{selectData.feiz}}</p>
                </div>
                <div>
                    <p>毛巾: {{selectData.maoj}}</p>
                </div>
            </div>
        </Popup>
    </div>
</template>
<script>
import ViewBox from "@/components/pub/ViewBox.vue";
import Popup from "@/components/pub/Popup.vue";
export default {
    name: "ArticleStandard",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/operate/protect/protectArticleStandard/list.action",
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
        ViewBox,
        Popup
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>