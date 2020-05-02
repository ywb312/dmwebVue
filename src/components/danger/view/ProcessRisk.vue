<template>
    <div>
        <!-- 标题  -->
        <van-nav-bar
            title="隐患查询"
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
        <div>
            <!-- 查看方式 -->
            <van-sticky :offset-top="46">
                <correlation @radioChange="radioData"></correlation>
            </van-sticky>
            <!-- 主体 -->
        </div>
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
                            <p>存在问题: {{item.crdesc}}</p>
                        </div>
                        <div>
                            <p>隐患地点: {{item.craddr}}</p>
                        </div>
                        <div>
                            <p>检查时间: {{item.pcdate}}</p>
                        </div>
                        <div>
                            <p>检查人: {{item.createid}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </ViewBox>
        <search-popup
            @returnMsg="paramsDate"
            :statusShow="true"
            :companyShow="false"
            :popshow="popshow"
            @popupClose="popshow=false"
        ></search-popup>
    </div>
</template>
<script>
// 查看方式组件
import correlation from "@/components/danger/correlation";
import ViewBox from "@/components/pub/ViewBox.vue";
// 查找组件
import searchPopup from "@/components/danger/searchPopup";
export default {
    data() {
        return {
            rendering: [],
            postData: {
                url: "biz/rm/processrisk/list.action",
                obj: {
                    "bean.queryAll": ""
                }
            },
            // 查找组件的显示
            popshow: false
        };
    },
    methods: {
        getRendering(arr) {
            this.rendering = arr;
        },
        // 查看方式 得到子组件传入的值
        radioData(v) {
            this.postData.obj["bean.queryAll"] = v;
            this.$refs.view.cleraData();
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
        correlation,
        searchPopup
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>