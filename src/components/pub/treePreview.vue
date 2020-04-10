<template>
    <ul v-if="data.length">
        <li v-for="(item, i) in data" :key="i" @click.stop="selectItem(item)" v-show="expandFlag">
            <div class="item">
                <!-- 展开的图标 -->
                <b
                    class="expandIcon"
                    @click.stop="expandItem(item, i)"
                    :class="[
        		expandArr.includes(i) ? 'reduce' : 'add',
        		item.children && item.children.length ? '' : 'disabled'
        	]"
                ></b>
                <!-- 选项名 -->
                <h4>{{item[labelKey]}}</h4>
                <!-- 选择的图标 -->
                <b
                    class="selectIcon"
                    :class="[ value[valueKey] == item[valueKey] ? 'checked' : 'noChecked']"
                ></b>
            </div>
            <list-menu
                v-if="item.children"
                @input="input"
                :data="item.children"
                :valueKey="valueKey"
                :labelKey="labelKey"
                :value="value"
                :expandFlag="expandArr.includes(i)"
            />
        </li>
    </ul>
</template>
<script>
export default {
    // 组件名必写
    name: "ListMenu",
    props: {
        // 选中的值的属性名，必传
        valueKey: String,
        // 在页面要展示的选项属性名，必传
        labelKey: String,
        // 选中的值，必传
        value: Object,
        // 控制展开，不需要传
        expandFlag: {
            type: Boolean,
            default: true
        },
        // 总数据，必传
        data: Array
    },
    data() {
        return {
            // 当前级组件已展开的项
            expandArr: []
        };
    },
    methods: {
        // 子组件逐级传递选中项
        input(item) {
            this.$emit("input", item);
        },
        // 选择
        selectItem(item) {
            this.$emit("input", item);
        },
        // 展开
        expandItem(item, i) {
            if (item.children && item.children.length) {
                let index = this.expandArr.indexOf(i);
                if (index > -1) {
                    this.expandArr.splice(index, 1);
                } else {
                    this.expandArr.push(i);
                }
            }
        }
    }
};
</script>
<style scoped>
ul {
    width: 100%;
    height: 100%;
    color: #2a2a2a;
    background: #fff;
    overflow: scroll;
    border-bottom: 0.8px solid #e1e1e1;
}
/* 去除滚动条 */
::-webkit-scrollbar {
    width: 0px;
}
.item {
    box-sizing: border-box;
    padding: 4px 4px;
    display: flex;
    align-items: center;
    width: 100%;
}
.expandIcon {
    height: 20px;
    width: 20px;
    position: relative;
}
.expandIcon:after {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 14px;
    transform: translate(-50%, -50%);
}
.expandIcon.add {
    border-color: #2585cf;
}
.expandIcon.add:after {
    color: #2585cf;
    content: "＋";
}
.expandIcon.reduce {
    border-color: #2585cf;
}
.expandIcon.reduce:after {
    color: #2585cf;
    content: "－";
}
.expandIcon.disabled {
    border-color: #ddd;
}
.expandIcon.disabled:after {
    color: #ddd;
}
.selectIcon {
    height: 20px;
    width: 20px;
    border: 1.5px solid;
    border-radius: 50%;
    position: relative;
}
.selectIcon:after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.selectIcon.checked {
    border-color: #2585cf;
    background: #2585cf;
}
.selectIcon.checked:after {
    font-size: 14px;
    color: #fff;
    content: "✓";
}
.selectIcon.noChecked {
    border-color: #2585cf;
}
.item h4 {
    padding: 0 0 0 10px;
    position: relative;
    top: 2px;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    flex-grow: 1;
    white-space: nowrap;
    color: #2a2a2a;
}
ul li:not(:first-child) {
    border-top: 0.8px solid #e1e1e1;
}
ul li > ul {
    box-sizing: border-box;
    border-bottom: 0;
    padding-left: 20px;
    overflow: hidden;
}
ul li > ul li {
    border-top: 0.8px solid #e1e1e1;
}
ul li > ul li .item {
    padding-left: 8px;
}
</style>