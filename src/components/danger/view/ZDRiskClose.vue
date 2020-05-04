<template>
    <div>
        <!-- 标题  -->
        <van-nav-bar
            title="重大隐患闭环记录"
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
                            <p class="main_text">
                                <span class="main_title bold">销案日期:</span>
                                <span class="main_val">{{item.zgwcrq}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">整改完成情况:</span>
                                <span class="main_val">{{item.hcqk}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">创建时间:</span>
                                <span class="main_val">{{item.createdate}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">填表人员:</span>
                                <span class="main_val">{{item.username}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title bold">备注:</span>
                                <span class="main_val">{{item.memo}}</span>
                            </p>
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
                url: "biz/rm/zdriskclose/list.action",
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