<template>
    <div>
        <SearchBox placeholder="请输入员工姓名,工号,单位,工种搜索" @callback="searchBack"></SearchBox>
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
                            <p class="main_text">
                                <span class="main_title">姓名:</span>
                                <span class="main_val">{{item.staffname}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">性别:</span>
                                <span class="main_val">{{item.sexText}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">身份证号:</span>
                                <span class="main_val">{{item.idcard}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">工号:</span>
                                <span class="main_val">{{item.staffcode}}</span>
                            </p>
                        </div>
                        <div>
                            <p class="main_text">
                                <span class="main_title">单位:</span>
                                <span class="main_val">{{item.deptname}}</span>
                            </p>
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
        <Popup :popshow="popshow" @close="popshow=false">
            <div slot="title" class="popupTitle">详情</div>
            <div slot="views" class="popup">
                <div>
                    <p>姓名: {{selectData.staffname}}</p>
                </div>
                <div>
                    <p>性别: {{selectData.sexText}}</p>
                </div>
                <div>
                    <p>身份证号: {{selectData.idcard}}</p>
                </div>
                <div>
                    <p>工号: {{selectData.staffcode}}</p>
                </div>
                <div>
                    <p>单位: {{selectData.deptname}}</p>
                </div>
                <div>
                    <p>工种: {{selectData.station}}</p>
                </div>
                <div>
                    <p>总工龄: {{selectData.workingAge}}</p>
                </div>
                <div>
                    <p>联系方式: {{selectData.relaphone}}</p>
                </div>
                <div>
                    <p>体检周期: {{selectData.examperiod}}</p>
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
    name: "HealthExamPeriod",
    data() {
        return {
            // 渲染的数据
            rendering: [],
            postData: {
                url: "biz/sm/staff/periodlist.action",
                obj: {}
            },
            sheetShow: false,
            actions: [{ name: "个人体检档案" }, { name: "查看详情" }],
            popshow: false,
            selectData: {}
        };
    },
    // pageData父组件传来的配置项
    props: ["pageData"],
    methods: {
        getRendering(arr) {
            arr.forEach(element => {
                this.$common.setSex(element);
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
            if (item.name == "个人体检档案") {
                this.$router.push({
                    path: "/team/healthDetail",
                    query: {
                        filters: this.selectData.idcard
                    }
                });
            } else if (item.name == "查看详情") {
                this.popshow = true;
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