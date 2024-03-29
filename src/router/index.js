import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import Login from '../components/Login.vue'

import Activate from '../components/Activate.vue'

/// 以下是老师界面相关路由 ///
import Home from '../components/teachers/TeacherHome.vue'                           /// 老师登录后主页
import Welcome from '../components/teachers/Welcome.vue'                            /// 老师登陆后，信息公告页
import Users from '../components/teachers/Users/Users.vue'                          /// 老师登录后，个人信息页
import AllCourses from '../components/teachers/Courses/AllCourses.vue'              /// 老师登陆后，查看所有课程页
import CertainCourse from '../components/teachers/Courses/CertainCourse.vue'        /// 老师登录后，进入具体课程页
import InfoManage from '../components/teachers/Courses/CourseInfo/InfoManage.vue'   /// 进入课程后，查看课程信息页
import FileManage from '../components/teachers/Courses/CourseInfo/FileManage.vue'   /// 进入课程后，查看课程文件页
import StuManage from '../components/teachers/Courses/CourseInfo/StuManage.vue'     /// 进入课程后，查看课程人员页
import LabManage from '../components/teachers/Courses/CourseInfo/LabManage.vue'     /// 进入课程后，查看课程实验页
import Attendance from '../components/teachers/Courses/CourseInfo/Attendance.vue'     /// 进入课程后，查看课程实验页
import Score from '../components/teachers/Courses/CourseInfo/ScoreManage.vue'
import Exp from '../components/teachers/Experiment/Exp.vue'
import LabInfo from '../components/teachers/Experiment/LabInfo.vue'
import LabReport from '../components/teachers/Experiment/LabReport.vue'
//=====================================================================
import AllTeachingCourses from '../components/teachers/TeachingCourse/AllCourses.vue'
import CertainCourseTeaching from '../components/teachers/TeachingCourse/CertainCourse.vue'
import InfoManageTeaching from '../components/teachers/TeachingCourse/CourseInfo/InfoManage.vue'   /// 进入课程后，查看课程信息页
import FileManageTeaching from '../components/teachers/TeachingCourse/CourseInfo/FileManage.vue'   /// 进入课程后，查看课程文件页
import StuManageTeaching from '../components/teachers/TeachingCourse/CourseInfo/StuManage.vue'     /// 进入课程后，查看课程人员页
import LabManageTeaching from '../components/teachers/TeachingCourse/CourseInfo/LabManage.vue'     /// 进入课程后，查看课程实验页
import AttendanceTeaching from '../components/teachers/TeachingCourse/CourseInfo/Attendance.vue'     /// 进入课程后，查看课程实验页
import ScoreTeaching from '../components/teachers/TeachingCourse/CourseInfo/ScoreManage.vue'
//====================================================================
import AllCoursesAssist from '../components/teachers/AssistCourse/AllCourses.vue'
import CertainCourseAssist from '../components/teachers/AssistCourse/CertainCourse.vue'
import InfoManageAssist from '../components/teachers/AssistCourse/CourseInfo/InfoManage.vue'   /// 进入课程后，查看课程信息页
import FileManageAssist from '../components/teachers/AssistCourse/CourseInfo/FileManage.vue'   /// 进入课程后，查看课程文件页
import StuManageAssist from '../components/teachers/AssistCourse/CourseInfo/StuManage.vue'     /// 进入课程后，查看课程人员页
import LabManageAssist from '../components/teachers/AssistCourse/CourseInfo/LabManage.vue'     /// 进入课程后，查看课程实验页
import AttendanceAssist from '../components/teachers/AssistCourse/CourseInfo/Attendance.vue'     /// 进入课程后，查看课程实验页
import ScoreAssist from '../components/teachers/AssistCourse/CourseInfo/ScoreManage.vue'
/// 以下是学生界面相关的路由
import StuHome from '../components/students/StudentHome.vue'
import StuWelcome from '../components/students/StuWelcome.vue'
import StuAllCourses from '../components/students/StuAllCourses.vue'
import StuCertainCourse from '../components/students/StuCertainCourse.vue'
import StuCourseInfo from '../components/students/CourseInfo/StuCourseInfo.vue'
import StuCourseFile from '../components/students/CourseInfo/StuCourseFile.vue'
import StuCourseLabs from '../components/students/CourseInfo/StuCourseLabs.vue'
import StuLabs       from '../components/students/Experiment/StuLabs.vue'
import StuLabReports from '../components/students/Experiment/StuLabReports.vue'
import StuLabInfo    from '../components/students/Experiment/StuLabInfo.vue'
import StuScore from '../components/students/Score/StuScore.vue'
import StuUsersInfo from '../components/students/User/User.vue'
Vue.use(VueRouter)
Vue.use(Vuex)

// const store = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     }
//   }
// })

const router = new VueRouter({
  // mode:'history',
  routes:[
    { path:'/', redirect: '/Login' },
    { path: '/Login', component: Login },
    { 
      path: '/Home', 
      component: Home, 
      redirect: '/Welcome',
      children:[
        { path: '/Welcome', component: Welcome },
        { path: '/Users-Info', component: Users},
        { path: '/Courses-Manage',
          component: AllCourses,
          children: []
        },
        { path: '/Courses-Info', 
          component: CertainCourse,
          children: [
            { path: '/Course-Documents',  component: FileManage },
            { path: '/Course-Students',   component: StuManage  },
            { path: '/Course-Labs',       component: LabManage  },
            { path: '/Course-Info',       component: InfoManage },
            { path: '/Attendance',        component: Attendance },
            { path: '/Course-Score',      component: Score }
          ],
          redirect: '/Course-Info'
        },
        { path: '/Experiment', name: 'Experiment', component: Exp,
          children: [
            { path: '/Lab-Info', name: 'Lab-Info', component:LabInfo },
            { path: '/Lab-Report', name: 'Lab-Report', component:LabReport },
          ],
          redirect: '/Lab-Info'
        },
        { path: '/Courses-Teach', component: AllTeachingCourses },

        { 
          path: '/TeachingCourses-Info', 
          component: CertainCourseTeaching,
        children: [
          { path: '/TeachingCourse-Documents',  component: FileManageTeaching },
          { path: '/TeachingCourse-Students',   component: StuManageTeaching  },
          { path: '/TeachingCourse-Labs',       component: LabManageTeaching  },
          { path: '/TeachingCourse-Info',       component: InfoManageTeaching },
          { path: '/TeachingAttendance',        component: AttendanceTeaching },
          { path: '/TeachingCourse-Score',      component: ScoreTeaching }
        ],
        redirect: '/TeachingCourse-Info'
        },
//         import AllCoursesAssist from '../components/teachers/AssistCourse/AllCourses.vue'
// import CertainCourseAssist from '../components/teachers/AssistCourse/CertainCourse.vue'
// import InfoManageAssist from '../components/teachers/AssistCourse/CourseInfo/InfoManage.vue'   /// 进入课程后，查看课程信息页
// import FileManageAssist from '../components/teachers/AssistCourse/CourseInfo/FileManage.vue'   /// 进入课程后，查看课程文件页
// import StuManageAssist from '../components/teachers/AssistCourse/CourseInfo/StuManage.vue'     /// 进入课程后，查看课程人员页
// import LabManageAssist from '../components/teachers/AssistCourse/CourseInfo/LabManage.vue'     /// 进入课程后，查看课程实验页
// import AttendanceAssist from '../components/teachers/AssistCourse/CourseInfo/Attendance.vue'     /// 进入课程后，查看课程实验页
// import ScoreAssist from '../components/teachers/AssistCourse/CourseInfo/ScoreManage.vue'
        { path: '/Courses-Assist', component: AllCoursesAssist},
        { 
          path: '/AssistCourses-Info', 
          component: CertainCourseAssist,
        children: [
          { path: '/AssistCourse-Documents',  component: FileManageAssist },
          { path: '/AssistCourse-Labs',       component: LabManageAssist  },
          { path: '/AssistCourse-Info',       component: InfoManageAssist },
        ],
        redirect: '/AssistCourse-Info'
        },
      ] 
    },
    { path: '/Activate', name: 'Activate', component: Activate },
    { path: '/StuHome', 
      name: 'StuHome', 
      component: StuHome,
      redirect: '/StuWelcome',
      children: [
        { path: '/StuWelcome', component: StuWelcome },
        { path: '/StuCourses', component: StuAllCourses },
        { path:'/StuScore', component:StuScore},//TODO:学生成绩
        { path:'/Stu-Users-Info', component: StuUsersInfo },
        { path: '/StuCertainCourse',                    /// 学生，进入具体某门课的页面
          component: StuCertainCourse,
          children: [
            { path: '/StuCourseInfo', component: StuCourseInfo },
            { path: '/StuCourseFile', component: StuCourseFile },
            { path: '/StuCourseLabs', component: StuCourseLabs }
          ],
          redirect: '/StuCourseInfo'
        },
        { path: '/StuLabs', name: 'StuLabs', component: StuLabs,
        children: [
          { path: '/StuLabReports', name: 'StuLabReports', component: StuLabReports },
          { path: '/StuLabInfo', name: 'StuLabInfo', component: StuLabInfo },
        ]
      }
      ]
    }
  ]
})


//挂载路由导航守卫
router.beforeEach((to, from, next) => {

  if(to.path === '/Login') return next()
  if(to.path === '/Activate') return next()
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/Login')
  next()
})

export default router
