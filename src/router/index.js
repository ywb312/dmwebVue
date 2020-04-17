import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import login from '../views/login.vue'
import home from '../views/home/home.vue'
import homePage from '../views/home/homePage.vue'
import computerPage from '../views/home/computerPage.vue'
import mePage from '../views/home/mePage.vue'
import list from '../views/list.vue'
// 十二个功能分为十二个路由 按需加载
Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'login',
		component: login,
		meta: {
			keepAlive: false
		}
	},
	{
		path: '/home',
		name: 'home',
		component: home,
		redirect: "/home/homePage",
		children: [{
				path: 'homePage',
				name: 'homePage',
				component: homePage,
				meta: {
					keepAlive: true
				},
			},
			{
				path: 'computerPage',
				name: 'computerPage',
				component: computerPage,
				meta: {
					keepAlive: true
				},
			},
			{
				path: 'mePage',
				name: 'mePage',
				component: mePage,
				meta: {
					keepAlive: true
				},
			},
		]
	},
	{
		path: '/list',
		name: 'list',
		component: list,
		meta: {
			keepAlive: true
		}
	},
	// 主页模块路由
	{ //通知公告
		path: '/inform',
		name: 'inform',
		component: () => import('@/views/module/inform/inform.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //隐患管理
		path: '/danger',
		name: 'danger',
		component: () => import('@/views/module/danger/danger.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //隐患管理 新增隐患
		path: '/danger/increase',
		name: 'increase',
		component: () => import('@/views/module/danger/increase.vue'),
		meta: {
			keepAlive: true
		}
	},
	{ //隐患管理 隐患详情
		path: '/danger/detail',
		name: 'detail',
		component: () => import('@/views/module/danger/detail.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //隐患管理 填报指派
		path: '/danger/assign',
		name: 'assign',
		component: () => import('@/views/module/danger/assign.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //计划管理
		path: '/plan',
		name: 'plan',
		component: () => import('@/views/module/plan/plan.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //计划管理 安全检查
		path: '/safeCheack',
		name: 'safeCheack',
		component: () => import('@/views/module/plan/safeCheack.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //计划管理 检查记录详情
		path: '/plan/planDetail',
		name: 'planDetail',
		component: () => import('@/views/module/plan/planDetail.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //提醒预警
		path: '/remind',
		name: 'remind',
		component: () => import('@/views/module/remind/remind.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //风险管理
		path: '/risk',
		name: 'risk',
		component: () => import('@/views/module/risk/risk.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //风险管理 危险源
		path: '/risk/companyRisk',
		name: 'companyRisk',
		component: () => import('@/views/module/risk/companyRisk.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //风险管理 管控措施
		path: '/risk/measure',
		name: 'measure',
		component: () => import('@/views/module/risk/measure.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //风险管理 排查信息
		path: '/risk/examine',
		name: 'examine',
		component: () => import('@/views/module/risk/examine.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //风险管理 审核详情列表
		path: '/risk/auditDetailList',
		name: 'auditDeatilListAn',
		component: () => import('@/views/module/risk/auditDetailList.vue'),
		meta: {
			keepAlive: true
		}
	},
	{ //风险管理 安环部审核详情列表
		path: '/risk/auditDetailListAn',
		name: 'auditDetailListAn',
		component: () => import('@/views/module/risk/auditDetailListAn.vue'),
		meta: {
			keepAlive: true
		}
	},
	{ //风险管理 审核详情具体页
		path: '/risk/auditDetail',
		name: 'auditDetail',
		component: () => import('@/views/module/risk/auditDetail.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //三项人员  
		path: '/person',
		name: 'person',
		component: () => import('@/views/module/person/person.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //三项人员	特种人员详情
		path: '/person/specialTypeDetail',
		name: 'specialTypeDetail',
		component: () => import('@/views/module/person/specialTypeDetail.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //三项人员	许可作业申请、审批详情
		path: '/person/permissionDetail',
		name: 'permissionDetail',
		component: () => import('@/views/module/person/permissionDetail.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //三项人员	工作票详情
		path: '/person/workTicketDetail',
		name: 'workTicketDetail',
		component: () => import('@/views/module/person/workTicketDetail.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //三项人员	劳动防护用品详情
		path: '/person/articlDetail',
		name: 'articlDetail',
		component: () => import('@/views/module/person/articlDetail.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //三项人员	交接班记录详情
		path: '/person/replaceDetail',
		name: 'replaceDetail',
		component: () => import('@/views/module/person/replaceDetail.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //三项人员	安全标志申请单详情
		path: '/person/safetySignApplyDetail',
		name: 'safetySignApplyDetail',
		component: () => import('@/views/module/person/safetySignApplyDetail.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //三项人员	照明编号维护
		path: '/person/illumineNumber',
		name: 'illumineNumber',
		component: () => import('@/views/module/person/illumineNumber.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //三项人员	灭火器编号维护
		path: '/person/hydrantNumber',
		name: 'hydrantNumber',
		component: () => import('@/views/module/person/hydrantNumber.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //方针目标
		path: '/target',
		name: 'target',
		component: () => import('@/views/module/target/target.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //教育培训
		path: '/education',
		name: 'education',
		component: () => import('@/views/module/education/education.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //教育培训 计划详情
		path: '/education/traplanDetail',
		name: 'traplanDetail',
		component: () => import('@/views/module/education/traplanDetail.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //工艺管理
		path: '/technology',
		name: 'technology',
		component: () => import('@/views/module/technology/technology.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //环保管理
		path: '/environment',
		name: 'environment',
		component: () => import('@/views/module/environment/environment.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //环保管理 项目建设情况详情
		path: '/environment/ProjectConstDetail',
		name: 'ProjectConstDetail',
		component: () => import('@/views/module/environment/ProjectConstDetail.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //环保管理 创先评优详情
		path: '/environment/ComfirstDetail',
		name: 'ComfirstDetail',
		component: () => import('@/views/module/environment/ComfirstDetail.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //应急管理
		path: '/emergency',
		name: 'emergency',
		component: () => import('@/views/module/emergency/emergency.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //应急管理 应急预案详情
		path: '/emergency/emergPlanDetail',
		name: 'emergPlanDetail',
		component: () => import('@/views/module/emergency/emergPlanDetail.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //应急管理 救援队伍信息
		path: '/emergency/emergAgencyMan',
		name: 'emergAgencyMan',
		component: () => import('@/views/module/emergency/emergAgencyMan.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //应急管理 应急演练方案详情
		path: '/emergency/emergDrillDetail',
		name: 'emergDrillDetail',
		component: () => import('@/views/module/emergency/emergDrillDetail.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //事故管理
		path: '/accident',
		name: 'accident',
		component: () => import('@/views/module/accident/accident.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //事故管理 事故详情
		path: '/accident/accidentDetail',
		name: 'accidentDetail',
		component: () => import('@/views/module/accident/accidentDetail.vue'),
		meta: {
			keepAlive: false
		}
	},

	// 工作台部分路由
	{ //待办事项
		path: '/backlog',
		name: 'backlog',
		component: () => import('@/views/work/backlog.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //已办事项
		path: '/finished',
		name: 'finished',
		component: () => import('@/views/work/finished.vue'),
		meta: {
			keepAlive: false
		}
	},
	{ //自查自改
		path: '/backlog/change',
		name: 'change',
		component: () => import('@/views/work/change.vue'),
		meta: {
			keepAlive: false
		}
	},
]

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

// 全局路由钩子函数 控制加载中的显示
router.beforeEach(function (to, from, next) {
	// store.commit('setIsLoading', {
	// 	isLoading: true
	// })
	next();
})

router.afterEach(function () {
	store.commit('setIsLoading', {
		isLoading: false
	})
})

export default router