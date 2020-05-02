<template>
    <div>
        <!-- 标题  -->
        <van-nav-bar
            title="隐患申请复查记录"
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
                            <p>申请验收单位: {{item.dwysryname}}</p>
                        </div>
                        <div>
                            <p>申请验收说明: {{item.dyysqk}}</p>
                        </div>
                        <div>
                            <p>整改申请部门: {{item.zgpsbmName}}</p>
                        </div>
                        <div>
                            <p>整改情况说明: {{item.zgpsqk}}</p>
                        </div>
                        <div>
                            <p>验收截止日期: {{item.fcjzdate}}</p>
                        </div>
                        <div>
                            <p>创建时间: {{item.createdate}}</p>
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
            :companyShow="true"
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
                url: "biz/rm/zdriskreview/list.action",
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