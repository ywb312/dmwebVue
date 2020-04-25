<template>
    <div class="page">
        <!-- 标题  -->
        <van-nav-bar
            title="员工档案详情"
            left-text="返回"
            fixed
            placeholder
            left-arrow
            @click-left="$router.back(-1)"
        />
        <!-- 主体 -->
        <div>
            <div class="main">
                <div>
                    <p>姓名: {{selectData.colligatename}}</p>
                </div>
                <div>
                    <p>民族: {{selectData.nationText}}</p>
                </div>
                <div>
                    <p>出生日期: {{selectData.birthday}}</p>
                </div>
                <div>
                    <p>学历: {{selectData.educationText}}</p>
                </div>
                <div>
                    <p>身份证号码: {{selectData.idcard}}</p>
                </div>
                <div>
                    <p>籍贯: {{selectData.nativeplace}}</p>
                </div>
                <div>
                    <p>专业: {{selectData.major}}</p>
                </div>
                <div>
                    <p>入职时间: {{selectData.entrydate}}</p>
                </div>
                <div>
                    <p>政治面貌: {{selectData.political}}</p>
                </div>
                <div>
                    <p>入党时间: {{selectData.joinparytime}}</p>
                </div>
                <div>
                    <p>邮箱: {{selectData.email}}</p>
                </div>
                <div>
                    <p>婚姻状况: {{selectData.marriageStatus}}</p>
                </div>
                <div>
                    <p>毕业院校: {{selectData.graduationschool}}</p>
                </div>
                <div>
                    <p>户籍所在地: {{selectData.householdaddress}}</p>
                </div>
                <div>
                    <p>户口性质: {{selectData.householdNature}}</p>
                </div>
                <div>
                    <p>家庭住址: {{selectData.address}}</p>
                </div>
                <div>
                    <p>出生地: {{selectData.birthplace}}</p>
                </div>
                <div>
                    <p>联系电话: {{selectData.relaphone}}</p>
                </div>
                <div>
                    <p>职称或技术等级: {{selectData.tptitle}}</p>
                </div>
                <div>
                    <p>证书授予时间及编号: {{selectData.certificate}}</p>
                </div>
                <div>
                    <p>健康情况: {{selectData.healthStatus}}</p>
                </div>
            </div>
            <div class="cards">
                <van-tabs type="card">
                    <van-tab title="工作经历">
                        <div class="main" v-for="item in jobArr" :key="item.colligateworkid">
                            <div>
                                <p>入职时间: {{item.entrydate}}</p>
                            </div>
                            <div>
                                <p>离职时间: {{item.quitdate}}</p>
                            </div>
                            <div>
                                <p>部门及职务: {{item.deptandjop}}</p>
                            </div>
                            <div>
                                <p>证明人: {{item.proveman}}</p>
                            </div>
                            <div>
                                <p>联系电话: {{item.relaphone}}</p>
                            </div>
                        </div>
                        <van-empty v-show="jobArr.length == 0" description="暂无数据" />
                    </van-tab>
                    <van-tab title="学习经历">
                        <div class="main" v-for="item in studyArr" :key="item.studyid">
                            <div>
                                <p>入学时间: {{item.studystarttime}}</p>
                            </div>
                            <div>
                                <p>毕业时间: {{item.studyendtime}}</p>
                            </div>
                            <div>
                                <p>学校名称: {{item.schoolname}}</p>
                            </div>
                            <div>
                                <p>专业: {{item.major}}</p>
                            </div>
                            <div>
                                <p>证明人: {{item.proveman}}</p>
                            </div>
                            <div>
                                <p>联系电话: {{item.relaphone}}</p>
                            </div>
                        </div>
                        <van-empty v-show="studyArr.length == 0" description="暂无数据" />
                    </van-tab>
                    <van-tab title="家庭成员">
                        <div class="main" v-for="item in familyArr" :key="item.homefamilyid">
                            <div>
                                <p>姓名: {{item.familyname}}</p>
                            </div>
                            <div>
                                <p>与本人关系: {{item.relationship}}</p>
                            </div>
                            <div>
                                <p>出生日期: {{item.birthday}}</p>
                            </div>
                            <div>
                                <p>单位及职务: {{item.deptandjop}}</p>
                            </div>
                            <div>
                                <p>联系电话: {{item.relaphone}}</p>
                            </div>
                        </div>
                        <van-empty v-show="studyArr.length == 0" description="暂无数据" />
                    </van-tab>
                    <van-tab title="奖惩记录">
                        <div class="main" v-for="item in punishmentArr" :key="item.punishmentid">
                            <div>
                                <p>奖罚名称: {{item.punishmentname}}</p>
                            </div>
                            <div>
                                <p>奖罚时所在单位: {{item.punishmentdept}}</p>
                            </div>
                            <div>
                                <p>奖罚时间: {{item.punishmenttime}}</p>
                            </div>
                        </div>
                        <van-empty v-show="studyArr.length == 0" description="暂无数据" />
                    </van-tab>
                    <van-tab title="培训记录">
                        <div class="main" v-for="item in trainArr" :key="item.trainid">
                            <div>
                                <p>培训单位: {{item.traindept}}</p>
                            </div>
                            <div>
                                <p>培训活动名称及内容: {{item.traincontent}}</p>
                            </div>
                            <div>
                                <p>培训时间: {{item.traintime}}</p>
                            </div>
                        </div>
                        <van-empty v-show="studyArr.length == 0" description="暂无数据" />
                    </van-tab>
                    <van-tab title="语音能力">
                        <div class="main" v-for="item in languageArr" :key="item.languageid">
                            <div>
                                <p>语种: {{item.languagetype}}</p>
                            </div>
                            <div>
                                <p>证书名称: {{item.bookname}}</p>
                            </div>
                            <div>
                                <p>取证时间: {{item.getbooktime}}</p>
                            </div>
                        </div>
                        <van-empty v-show="studyArr.length == 0" description="暂无数据" />
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "colligateDetail",
    data() {
        return {
            jobArr: [],
            studyArr: [],
            familyArr: [],
            punishmentArr: [],
            trainArr: [],
            languageArr: []
        };
    },
    created() {
        // 工作
        this.getData(
            "biz/operate/staffarchive/colligatework/list.action",
            "jobArr"
        );
        // 学习
        this.getData(
            "biz/operate/staffarchive/colligatestudy/list.action",
            "studyArr"
        );
        // 家庭
        this.getData(
            "biz/operate/staffarchive/colligatehomefamily/list.action",
            "familyArr"
        );
        // 奖罚
        this.getData(
            "biz/operate/staffarchive/colligatepunishment/list.action",
            "punishmentArr"
        );
        // 培训
        this.getData(
            "biz/operate/staffarchive/colligatetrain/list.action",
            "trainArr"
        );
        // 语言能力
        this.getData(
            "biz/operate/staffarchive/colligatelanguage/list.action",
            "languageArr"
        );
    },
    methods: {
        getData(url, arr) {
            let obj = {
                rows: 10,
                page: 1,
                "bean.colligateid": this.selectData.colligateid
            };
            this.$api.pub.showPage(url, obj).then(res => {
                if (res.rows) {
                    // this.$set(arr, res.rows);
                    this[arr].push(...res.rows);
                }
            });
        }
    },
    computed: {
        selectData() {
            return this.$store.state.selectData;
        }
    }
};
</script>
<style scoped src="@/assets/css/public.css"/>
<style scoped>
.cards {
    min-height: 200px;
    margin-bottom: 50px;
}
</style>