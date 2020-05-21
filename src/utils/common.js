import apiPub from "@/api/pub.js"
export default {
    // obj需要转换的对象 key为要转换的属性名 arr转换数据的数组id,text
    code2Text(obj, key, arr) {
        arr.forEach(item => {
            if (item.id == obj[key]) {
                obj[key + "Text"] = item.text;
                return obj;
            }
        });
    },
    setSex(obj, key = "sex") {
        if (obj[key] == "XB001") {
            obj.sexText = "男";
        } else if (obj[key] == "XB002") {
            obj.sexText = "女";
        }
    },
    // 将父id并列的数组改为层级关系children数组
    toTree(data) {
        // 删除 所有 nodes,以防止多次调用
        data.forEach(function (item) {
            delete item.children;
        });

        let map = {};
        // 将数据存储为 以key是id item是value的map索引数据列
        data.forEach(function (item) {
            map[item.id] = item;
        });

        let val = [];
        data.forEach(function (item) {
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
    // 根据单位id获取名称
    getDeptName(tree, id) {
        var isGet = false;
        var retNode = {};

        function deepSearch(tree, id) {
            for (var i = 0; i < tree.length; i++) {
                if (tree[i].children) {
                    deepSearch(tree[i].children, id);
                }
                if (id == tree[i].id && !isGet) {
                    isGet = true;
                    retNode = tree[i];
                    break;
                }
            }
        }
        deepSearch(tree, id);
        return retNode;
    },
    // 获取根元素font-size
    getFontSize() {
        let fontSzie = document.documentElement.style.fontSize;
        return fontSzie.substring(0, fontSzie.length - 2)
    },
    // 返回offset高度
    getOffset() {
        return this.getFontSize() * (1.22667).toFixed(2);
    },
    // 将返回字符串变为数组
    comboArr(str) {
        let arr = str.trim().split(",")
        let arr2 = []
        arr.forEach(item => {
            let obj = {
                id: item.split(":")[0].replace(/^\'|\'$/g, ''),
                text: item.split(":")[1].replace(/^\'|\'$/g, '')
            }
            arr2.push(obj)
        });
        return arr2
    },
    comboList(data) {
        let _self = this;
        return new Promise(function (resolve, reject) {
            //做一些异步操作
            apiPub.comboboxList(data).then(res => {
                resolve(_self.comboArr(res))
            }).catch(error => {
                reject(error)
            })
        });
    },
    getLevel(){
        return window.localStorage.roleLevel;
    }
}