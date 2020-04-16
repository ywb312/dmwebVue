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
                        <p style="min-width:40px">
                            <mt-badge size="small">{{item.deptName}}</mt-badge>
                        </p>
                    </div>
                    <div class="main">
                        <div>
                            <p>性别: {{item.specialSex == "XB001" ?'男':'女'}} | 学历: {{item.education}}</p>
                        </div>
                        <div>
                            <p>身份证号: {{item.idcard}}</p>
                        </div>
                        <div>
                            <p>准操项目: {{item.project}}</p>
                        </div>
                        <div>
                            <p>证件编号: {{item.specialIdCard}}</p>
                        </div>
                        <div>
                            <p>发证日期: {{item.startDate}}</p>
                        </div>
                        <div>
                            <p>复审日期: {{item.endDate}}</p>
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
</template>
<script>
import SearchBox from "@/components/pub/SearchBox";
import ViewBox from "@/components/pub/ViewBox.vue";
export default {
    name: "SpecialPeople",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/people/specialPeople/list.action",
                obj: {}
            }
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
        btnClick(obj) {}
    },
    components: {
        SearchBox,
        ViewBox
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>