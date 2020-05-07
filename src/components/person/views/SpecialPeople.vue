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
                        <h4>{{index+1+"."+item.specialName}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>性别: {{item.sexText}}</p>
                        </div>
                        <div>
                            <p>准操项目: {{item.project}}</p>
                        </div>
                        <div>
                            <p>所属单位: {{item.deptName}}</p>
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
                    <p>姓名: {{selectData.specialName}}</p>
                </div>
                <div>
                    <p>性别: {{selectData.specialSex == "XB001" ?'男':'女'}}</p>
                </div>
                <div>
                    <p>学历: {{selectData.education}}</p>
                </div>
                <div>
                    <p>身份证号: {{selectData.idcard}}</p>
                </div>
                <div>
                    <p>准操项目: {{selectData.project}}</p>
                </div>
                <div>
                    <p>证件编号: {{selectData.specialIdCard}}</p>
                </div>
                <div>
                    <p>发证日期: {{selectData.startDate}}</p>
                </div>
                <div>
                    <p>复审日期: {{selectData.endDate}}</p>
                </div>
                <div>
                    <p>备注: {{selectData.memo}}</p>
                </div>
                <div>
                    <p>所属单位: {{selectData.deptName}}</p>
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
                url: "biz/people/specialPeople/list.action",
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
                this.$common.setSex(element, "specialSex");
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