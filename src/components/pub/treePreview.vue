<template>
    <div class="trePreview">
        <p class="back">
            <span v-show="parentId!=-1" @click="backclick">返回上一级</span>
        </p>
        <div class="material-list">
            <ul>
                <li
                    v-for="(item,index) in treeList"
                    :key="index"
                    :id="item.id"
                    @click="choosemater(item)"
                >
                    {{item.name}}
                    <i class="cubeic-arrow" v-show="item.children.length!=0"></i>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: "trePreview",
    data() {
        return {
            parentId: -1, //判断是否存在上一级
            treeList: [], //数据列表
            materialTree: [], //暂存的数据列表
            parentNames: [] //父级数据名
        };
    },
    methods: {
        getWarehouse() {
            chooseWarehouse().then(json => {
                this.treeList = []; //这个是存放数据名的数组
                this.materialTree = json.data; //这个是暂时存放数据名的数组
                this.getChild(0, this.materialTree); //这里是调用递归方法  初始化
            });
        },
        choosemater(item) {
            // this.current = id;
            if (item.type == 1 && item.children.length == 0) {
                //这里是判断是否还存在下一级以及是否到数据名 数据名的type为2 不是数据名则为1
                console.log("下面暂无数据");
                // this.parentId = -1;
                return;
            } else if (item.type == 2) {
                // console.log(this.parentNames.toString() + "," + item.name);
                this.$emit("applyMaterial", "选择物料（二级）", item.id); //我这里是需要选择数据在跳转其他页面
                return;
            }
            this.parentNames.push(item.name); //存放每点击的数据名
            this.treeList = [];
            this.getChild(item.id, this.materialTree);
            this.treeList = this.treeList;
            this.parentId = item.parent_id;
            return;
        },
        backclick() {
            this.treeList = [];
            this.getChild(this.parentId, this.materialTree);
            this.parentNames.splice(this.parentNames.length - 1, 1); //点击返回上级时删除上次点击的数据名
        },
        getChild(id, children) {
            //这里就是递归获取每一级的数据 传入数据id和树形和结构数据
            let _this = this;
            children.forEach(function(item) {
                if (item.id == id) {
                    //判断你点击的数据名并拿到该数据的上一级id
                    _this.parentId = item.parent_id;
                }
                if (item.parent_id == id) {
                    _this.treeList.push(item);
                } else {
                    _this.getChild(id, item.children);
                }
            });
            if (id == 0) {
                //我的第一级id为0
                this.parentId = -1; //让返回上一级按钮隐藏
            }
        }
    }
};
</script>
<style scoped>
</style>