<template>
    <div>
        <!-- 标题  -->
        <van-nav-bar
            title="重大隐患督办记录"
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
                                <span class="main_title">督办单位:</span>
                                <span class="main_val">{{item.deptName}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">督办事项:</span>
                                <span class="main_val">{{item.column_12}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">督办截止日期:</span>
                                <span class="main_val">{{item.dbjzdate}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">创建时间:</span>
                                <span class="main_val">{{item.createdate}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">填表人员:</span>
                                <span class="main_val">{{item.tbr}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">备注:</span>
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
                url: "biz/rm/zdriskfeet/list.action",
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
            this.$refs.view.clearData();
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