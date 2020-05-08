<template>
    <div class="record">
        <Popup :popshow="recordVisible" @close="recordClose">
            <div slot="title" class="popupTitle">审批意见</div>
            <div slot="views" class="popup">
                <van-loading style="text-align: center;" v-show="isLoading" color="#2585cf" />
                <div class="chunk" v-for="item in resData" :key="item.id">
                    <div>
                        <h4>{{item.name}}</h4>
                    </div>
                    <div>
                        <span class="minWidth">审批人: {{item.username}}</span>
                    </div>
                    <div>
                        <span class="minWidth">审批时间: {{item.endtime}}</span>
                    </div>
                    <div>
                        <span class="minWidth">审批结果: {{item.message1}}</span>
                    </div>
                    <div>
                        <span class="minWidth">审批意见: {{item.message2}}</span>
                    </div>
                </div>
                <van-empty v-show="noData" description="无审批记录" />
                <van-empty image="error" v-show="noRes" description="数据有误" />
            </div>
        </Popup>
    </div>
</template>
<script>
import Popup from "@/components/pub/Popup.vue";
export default {
    name: "record",
    data() {
        return {
            recordVisible: false,
            resData: [],
            // 无数据
            noData: false,
            // 数据有误
            noRes: false,
            isLoading: true
        };
    },
    props: ["compShow"],
    methods: {
        getData(obj) {
            this.isLoading = true;
            let self = this;
            self.resData = [];
            this.$api.danger
                .getHicomments({ bussinesskey: obj.yhid })
                .then(res => {
                    this.isLoading = false;
                    if (typeof res != "object") {
                        this.noRes = true;
                        return;
                    }
                    if (res.rows.length == 0) {
                        this.noData = true;
                        return;
                    }
                    self.resData = res.rows;
                });
        },
        recordClose() {
            this.recordVisible = false;
            this.$emit("popupClose");
        }
    },
    watch: {
        // 监听值 确定显示的状态
        compShow(val) {
            //popshow为父组件的值，val参数为值
            if (val) {
                this.getData(this.selectData);
                this.recordVisible = val; //将父组件的值赋给popupVisible 子组件的值
            }
        }
    },
    components: {
        Popup
    },
    computed: {
        selectData() {
            return this.$store.state.selectData;
        }
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>
<style scoped>
::-webkit-scrollbar {
    width: 0px;
}
.noData {
    padding-top: 10px;
    text-align: center;
}
.minWidth {
    min-width: 70px;
}
.chunk div {
    display: flex;
    justify-content: space-between;
    padding: 4px 0;
    background-color: rgb(250, 250, 250);
}
</style>