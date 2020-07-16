<template>
    <div>
        <!-- 弹窗组件 -->
        <Popup :popshow="popupShow" @close="close">
            <div slot="title" class="popupTitle">统计详情</div>
            <div slot="views" class="popup">
                <div>
                    <p>隐患名称: {{msg.crname}}</p>
                </div>
                <div>
                    <p>隐患类型: {{msg.prtype}}</p>
                </div>
                <div>
                    <p>检查日期: {{msg.pcdate}}</p>
                </div>
                <div>
                    <p>整改类型: {{msg.zgtype}}</p>
                </div>
                <div>
                    <p>隐患地点: {{msg.craddr}}</p>
                </div>
                <div>
                    <p>存在问题: {{msg.crdesc}}</p>
                </div>
                <div>
                    <p>隐患状态: {{msg.crstate}}</p>
                </div>
                <div>
                    <p>检查人: {{msg.tbr}}</p>
                </div>
                <div>
                    <p>可能发生的事故: {{msg.knfs}}</p>
                </div>
            </div>
        </Popup>
    </div>
</template>

<script>
import Popup from "@/components/pub/Popup.vue";
export default {
    data() {
        return {
            popupShow: false
        };
    },
    // pageData父组件传来的配置项
    props: ["msg", "detailShow"],
    methods: {
        close() {
            this.$emit("close");
            this.popupShow = false;
        }
    },
    components: {
        Popup
    },
    watch: {
        // 确定显示的状态
        detailShow(val) {
            if (val) {
                this.popupShow = val;
            }
        }
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>