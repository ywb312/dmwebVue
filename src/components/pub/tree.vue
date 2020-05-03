<template>
    <div class="tree">
        <van-field
            readonly
            clickable
            :label="title"
            name="datetimePicker"
            :value="selectVal.name"
            :placeholder="placeholder"
            :rules="[{ required: true, message: '请选择' }]"
            @click="treeShow"
        />
        <van-popup class="fill" v-model="popupVisible" position="right" get-container="#app">
            <tree-preview
                :data="lists"
                v-model="selectVal"
                value-key="id"
                label-key="name"
                @finish="popupVisible = false"
            />
        </van-popup>
    </div>
</template>
<script>
//title传入的标题 placeholder默认文字 @selectMsg返回数据
import treePreview from "./treePreview";
import { mapState } from "vuex";
export default {
    name: "tree",
    data() {
        return {
            popupVisible: false,
            lists: [],
            selectVal: {
                name: ""
            }
        };
    },
    methods: {
        treeShow() {
            if (this.treeData.length != 0) {
                this.lists = this.treeData;
            } else {
                this.$api.pub.getTree().then(function(res) {
                    let data = eval("(" + res + ")");
                    let sortData = _self.$common.toTree(data.cells);
                    this.lists = sortData;
                });
            }
            this.popupVisible = true;
        },
        reset() {
            this.selectVal = { name: "" };
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
            handler(newValue) {
                if (newValue.id) {
                    this.$emit("selectMsg", newValue);
                }
            },
            deep: true
        }
    },
    components: {
        treePreview
    },
    computed: {
        ...mapState(["treeData"])
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>
<style scoped>
.fill {
    width: 70%;
    height: 100%;
    margin-left: 30%;
}
</style>