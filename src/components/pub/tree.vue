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
        // 获取tree的数据
        this.$api.pub.getTree().then(function(res) {
            let data = eval("(" + res + ")");
            let sortData = self.toTree(data.cells);
            self.lists = sortData;
            self.$store.commit("setTree", sortData);
        });
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
    methods: {
        // 将父id并列的数组改为层级关系children数组
        toTree(data) {
            // 删除 所有 nodes,以防止多次调用
            data.forEach(function(item) {
                delete item.children;
            });

            let map = {};
            // 将数据存储为 以key是id item是value的map索引数据列
            data.forEach(function(item) {
                map[item.id] = item;
            });

            let val = [];
            data.forEach(function(item) {
                // 以当前遍历项，的parentId,去map对象中找到索引的id
                let parent = map[item.pid]; // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
                if (parent) {
                    (parent.children || (parent.children = [])).push(item);
                } else {
                    //如果没有在map中找到对应的索引id,那么直接把 当前的item添加到 val结果集中，作为顶级
                    val.push(item);
                }
            });
            return val;
        },
        reset(){
            this.selectVal.name = this.placeholder;
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