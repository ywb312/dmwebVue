<template>
    <div class="tree">
        <mt-cell :title="title" is-link @click.native="popupVisible = true;">
            <span style="color:black">{{selectVal.name}}</span>
        </mt-cell>
        <mt-popup class="fill" v-model="popupVisible" closeOnClickModal="true" position="right">
            <tree-preview
                :data="lists"
                v-model="selectVal"
                value-key="id"
                label-key="name"
                @finish="popupVisible = false"
            />
        </mt-popup>
    </div>
</template>
<script>
//title传入的标题 placeholder默认文字 @selectMsg返回数据
import treePreview from "./treePreview";
import { mapState } from "vuex";
import { Popup } from "mint-ui";
export default {
    name: "tree",
    data() {
        return {
            popupVisible: false,
            lists: [],
            selectVal: {}
        };
    },
    created() {
        let self = this;
        this.selectVal.name = this.placeholder;
        // 判断vuex中是否存在数据 如果不存在就获取
        if (this.treeData != "") {
            this.lists = this.treeData;
            return;
        }
    },
    props: {
        title: {
            type: String,
            default: "单位"
        },
        placeholder: {
            type: String,
            default: "请选择单位"
        }
    },
    watch: {
        selectVal: {
            handler(newValue, oldValue) {
                this.$emit("selectMsg", newValue);
            },
            deep: true
        }
    },
    components: {
        "mt-popup": Popup,
        treePreview
    },
    computed: {
        ...mapState(["treeData"])
    }
};
</script>
<style scoped>
.fill {
    width: 70%;
    height: 100%;
    margin-left: 30%;
}
</style>