<template>
    <div class="uploadimg">
        <mt-cell title="选择图片"></mt-cell>
        <ul class="load-list">
            <li v-for="(item,index) in imgArr" :key="index">
                <div class="load-container">
                    <img :src="item" />
                    <span @click="delImg(index)">
                        <img src="@/assets/iconfont/close.svg" alt />
                    </span>
                </div>
            </li>
            <li class="img-upload" v-if="allowAddImg">
                <div class="only-add">
                    <div class="load-add" @click="upload()">
                        <img style="color:black" src="@/assets/iconfont/increase.png" />
                        <input
                            type="file"
                            accept="image/*"
                            multiple="multiple"
                            style="display: none"
                            @change="changeImg($event)"
                            ref="uploadImages"
                        />
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "uploadimg",
    data() {
        return {
            imgArr: [], // 存放临时图片的数组
            allowAddImg: true // 上传达到限制后隐藏上传按钮
        };
    },
    methods: {
        upload() {
            // 调起input选择框
            this.$refs.uploadImages.click();
        },
        // base64格式后台不支持
        changeImg(e) {
            let self = this;
            let file = e.target.files[0];
            if (
                file.type != "image/png" &&
                file.type != "image/jpeg" &&
                file.type != "image/gif"
            ) {
                return false;
            }
            // 大于100M
            if (file.size > 104857600) {
                return;
            }
            let formData = new FormData();
            formData.append("file", file);
            formData.append("fileName", file.name);
            formData.append("suffix", file.name.split(".")[1].toLowerCase());
            // formData.append("businessid", "8928680f-6444-4fe8-a6e6-6c1cad0a9df8"); //ID
            // formData.append("businessname", "安全生成许可证");
            // formData.append("businesstablename", "t_create_companylicense"); //业务表名称
            // formData.append("tableprimarykey", "id");
            this.$api.pub
                .doupfile(formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                    transformRequest: function(data) {
                        return data;
                    }
                })
                .then(function(res) {
                    res.fileurl = res.fileurl.replace(/[\\]/g, "/");
                    if (self.imgArr.length <= 4) {
                        self.imgArr.push("");
                        self.imgArr.splice(-1, 1, res.fileurl); //替换数组数据的方法，此处不能使用：this.imgArr[index] = url;
                        if (self.imgArr.length >= 5) {
                            self.allowAddImg = false;
                        }
                        self.toParent();
                    }
                });
        },
        // 删除图片
        delImg(n) {
            this.imgArr.splice(n, 1);
            if (this.imgArr.length < 5) {
                this.allowAddImg = true;
            }
            this.toParent();
        },
        toParent() {
            this.$emit("toImgArr", this.imgArr);
        }
    }
};
</script>
<style scoped>
.uploadimg h1 {
    padding-left: 20px;
}
.uploadimg .load-list {
    display: flex;
    flex-flow: row wrap;
    padding: 0 15px;
}
.load-list li {
    height: 100px;
    flex: 0 0 33.3%;
    margin-top: 15px;
    position: relative;
    display: flex;
    align-items: center;
}

.load-container span {
    display: block;
    width: 20px;
    height: 20px;
    background: black;
    color: white;
    border-radius: 50%;
    font-size: 12px;
    text-align: center;
    position: absolute;
    right: 2px;
    top: 2px;
}
.load-list {
    margin-bottom: 1rem;
}
.load-list img {
    width: 100%;
    height: 100%;
}

.img-upload {
    flex: 0 0 31%;
    margin-right: auto;
    margin-top: 15px;
}

.load-add {
    width: 50%;
    height: 60%;
    background: #ffffff;
    border-radius: 50%;
    margin: 15px auto 0;
    text-align: center;
}

.load-container,
.only-add {
    width: 90%;
    height: 90%;
    margin: auto;
    background: #f7f7f7;
}
</style>