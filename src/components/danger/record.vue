<template>
    <div class="record">
        <mt-popup
            class="popup"
            v-model="recordVisible"
            popup-transition="popup-fade"
            closeOnClickModal="true"
        >
            <h2 class="title">审批意见</h2>
            <div class="noData" v-if="resData.length==0">无审批记录</div>
            <div class="chunk" v-for="item in resData" :key="item.id">
                <div>
                    <h3>{{item.name}}</h3>
                </div>
                <div>
                    <span class="minWidth">审批人:</span>
                    <span style="max-width:250px;">{{item.username}}</span>
                </div>
                <div>
                    <span class="minWidth">审批时间:</span>
                    <span style="max-width:250px;">{{item.endtime}}</span>
                </div>
                <div>
                    <span class="minWidth">审批结果:</span>
                    <span style="max-width:250px;">{{item.message1}}</span>
                </div>
                <div>
                    <span class="minWidth">审批意见:</span>
                    <span style="max-width:250px;">{{item.message2}}</span>
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import { Popup } from "mint-ui";
export default {
    name: "record",
    data() {
        return {
            recordVisible: false,
            resData: [],
        };
    },
    props: ["recordShow"],
    methods: {
        getData(obj) {
            let self = this;
            self.resData = [];
            this.$api.danger.getHicomments({ bussinesskey: obj.yhid }).then(res => {
                self.resData = res.rows;
            });
        }
    },
    watch: {
        // 监听两个值 确定显示的状态
        recordShow(val) {
            //popshow为父组件的值，val参数为值
            this.recordVisible = val; //将父组件的值赋给popupVisible 子组件的值
        },
        recordVisible(val) {
            if (val == false) {
                this.$emit("popupClose");
            }
        }
    },
    components: {
        "mt-popup": Popup
    }
};
</script>
<style scoped>
.popup {
    width: 5.5rem;
    height: 10rem;
    overflow: scroll;
}
::-webkit-scrollbar {
    width: 0px;
}
.title {
    text-align: center;
    padding: 0.2rem 0;
    border-bottom: solid 1px #ddd;
}
.noData{
    padding-top: 10px;
    text-align: center;
}
.minWidth {
    min-width: 70px;
}
.chunk {
    margin-bottom: 10px;
}
.chunk div {
    display: flex;
    justify-content: space-between;
    padding: 0.1rem 0.4rem;
    background-color: rgb(250, 250, 250);
}
</style>