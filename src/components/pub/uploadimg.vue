<template>
    <div>
        <van-cell title="选择图片"></van-cell>
        <div class="mg_lf">
            <van-uploader
                v-model="fileList"
                :after-read="afterRead"
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
        afterRead(file) {
            this.toParent();
            // console.log(this.fileList)

            // let formData = new FormData();
            // formData.append("file", file.file);
            // formData.append("fileName", file.file.name);
            // formData.append(
            //     "suffix",
            //     file.file.name.split(".")[1].toLowerCase()
            // );
            // this.$api.pub
            //     .doupfile(formData, {
            //         headers: { "Content-Type": "multipart/form-data" },
            //         transformRequest: function(data) {
            //             return data;
            //         }
            //     })
            //     .then(res => {
            //         file.status = "";
            //         file.message = "";
            //         file.fileurl = res.fileurl.replace(/[\\]/g, "/");
            //         self.toParent();
            //     })
            //     .catch(reject => {
            //         file.status = "failed";
            //         file.message = "上传失败";
            //     });
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