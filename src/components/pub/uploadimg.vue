<template>
    <div>
        <van-cell title="选择图片"></van-cell>
        <div class="mg_lf">
            <van-uploader
                v-model="fileList"
                :after-read="afterRead"
                :before-read="beforeRead"
                @delete="toParent"
                :max-count="3"
            />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fileList: []
        };
    },
    methods: {
        beforeRead(file) {
            // 上传之前检测图片类似返回true和false会影响到onRead函数
            let regex = /(.jpg|.jpeg|.png|.bmp)$/;
            if (!regex.test(file.type)) {
                this.$toast("图片格式不支持上传");
                return false;
            } else {
                return true;
            }
        },
        afterRead(file) {
            // file.status = "uploading";
            // file.message = "上传中...";
            console.log(file.content)
            this.toParent();
        },
        toParent() {
            let arr = this.fileList.map(item => {
                return item.content;
            });
            this.$emit("toImgArr", arr);
        }
    }
};
</script>
<style scoped>
.mg_lf {
    margin-left: 20px;
}
</style>