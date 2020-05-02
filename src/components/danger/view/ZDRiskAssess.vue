<template>
    <div>
        <!-- 标题  -->
        <van-nav-bar
            title="重大隐患评估记录"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
            @click-right="popshow=true"
        >
            <template #right>
                <img src="@/assets/iconfont/search.svg" />
            </template>
        </van-nav-bar>
        <ViewBox :postData="postData" ref="view" @getRendering="getRendering">
            <div slot="views">
                <div
                    class="wrapper"
                    v-for="(item,index) in rendering"
                    :key="index"
                    @click="btnClick(item)"
                >
                    <div class="title">
                        <h4>{{index+1+"."+item.crname}}</h4>
                    </div>
                    <div class="main">
                        <div>
                            <p>评估部门: {{item.deptName}}</p>
                        </div>
                        <div>
                            <p>评估描述: {{item.pgdesc}}</p>
                        </div>
                        <div>
                            <p>管控措施: {{item.gkcs}}</p>
                        </div>
                        <div>
                            <p>评估时间: {{item.pgdate}}</p>
                        </div>
                        <div>
                            <p>创建时间: {{item.createdate}}</p>
                        </div>
                        <div>
                            <p>填表人员: {{item.tbr}}</p>
                        </div>
                        <div>
                            <p>备注: {{item.memo}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <search-popup
            @returnMsg="paramsDate"
            :statusShow="false"
            :companyShow="false"
            :popshow="popshow"
            @popupClose="popshow=false"
        ></search-popup>
    </div>
</template>
<script>
import ViewBox from "@/components/pub/ViewBox.vue";
// 查找组件
import searchPopup from "@/components/danger/searchPopup";
export default {
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/rm/zdriskassess/list.action",
                obj: {}
            },
            // 查找组件的显示
            popshow: false
        };
    },
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        },
        paramsDate(v) {
            Object.keys(v).forEach(key => {
                this.postData.obj["bean." + key] = v[key];
            });
            this.$refs.view.cleraData();
        },
        btnClick(obj) {}
    },
    components: {
        ViewBox,
        searchPopup
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>