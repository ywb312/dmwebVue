export default {
    // obj需要转换的对象 key为要转换的属性名 arr转换数据的数组id,text
    code2Text: function (obj, key, arr) {
        arr.forEach(item => {
            if (item.id == obj[key]) {
                obj[key + "Text"] = item.text;
                return obj;
            }
        });
    }
}