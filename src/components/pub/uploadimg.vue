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
            file.status = "uploading";
            file.message = "上传中...";
            this.dealImage(file.content, 400, base => {
                file.status = "";
                file.message = "";
                file.upUrl = base;
                this.toParent();
            });
        },
        //压缩方法
        dealImage(base64, w, callback) {
            var newImage = new Image();
            //压缩系数0-1之间
            var quality = 0.8;
            newImage.src = base64;
            newImage.setAttribute("crossOrigin", "Anonymous"); //url为外域时需要
            var imgWidth, imgHeight;
            newImage.onload = function() {
                imgWidth = this.width;
                imgHeight = this.height;
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                if (Math.max(imgWidth, imgHeight) > w) {
                    if (imgWidth > imgHeight) {
                        canvas.width = w;
                        canvas.height = (w * imgHeight) / imgWidth;
                    } else {
                        canvas.height = w;
                        canvas.width = (w * imgWidth) / imgHeight;
                    }
                } else {
                    canvas.width = imgWidth;
                    canvas.height = imgHeight;
                    quality = 0.8;
                }
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
                var ba = canvas.toDataURL("image/jpeg", quality); //压缩语句
                // 如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
                while (base64.length / 1024 > 150) {
                    quality -= 0.02;
                    base64 = canvas.toDataURL("image/jpeg", quality);
                }
                // 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
                // while (base64.length / 1024 < 50) {
                //     quality += 0.001;
                //     base64 = canvas.toDataURL("image/jpeg", quality);
                // }
                callback(ba); //必须通过回调函数返回，否则无法及时拿到该值
            };
        },
        toParent() {
            let arr = this.fileList.map(item => {
                return item.upUrl.substring(item.upUrl.indexOf(",") + 1);
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