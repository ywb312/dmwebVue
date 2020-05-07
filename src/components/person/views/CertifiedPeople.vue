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
                    <div class="title">
                        <h4>{{index+1+"."+item.peopleName}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>性别: {{item.sexText}}</p>
                        </div>
                        <div>
                            <p>服务部门: {{item.industry}}</p>
                        </div>
                        <div>
                            <p>证件有效期: {{item.endDate}}</p>
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
                    <p>姓名: {{selectData.peopleName}}</p>
                </div>
                <div>
                    <p>性别: {{selectData.peopleSex == "XB001" ?'男':'女'}}</p>
                </div>
                <div>
                    <p>文化程度: {{selectData.education}}</p>
                </div>
                <div>
                    <p>岗位: {{selectData.position}}</p>
                </div>
                <div>
                    <p>服务部门: {{selectData.industry}}</p>
                </div>
                <div>
                    <p>身份证号: {{selectData.idcard}}</p>
                </div>
                <div>
                    <p>联系方式: {{selectData.contact}}</p>
                </div>
                <div>
                    <p>初次培训时间: {{selectData.startDate}}</p>
                </div>
                <div>
                    <p>最新核证书时间: {{selectData.birthday}}</p>
                </div>
                <div>
                    <p>培训地点: {{selectData.trainplace}}</p>
                </div>
                <div>
                    <p>全考核证书发证机关: {{selectData.certificate}}</p>
                </div>
                <div>
                    <p>证件有效期: {{selectData.endDate}}</p>
                </div>
                <div>
                    <p>培训类别: {{selectData.traintype}}</p>
                </div>
                <div>
                    <p>备注: {{selectData.memo}}</p>
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
    name: "CertifiedPeople",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/people/certifiedPeople/list.action",
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