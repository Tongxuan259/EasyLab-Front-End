<template>
    <el-container class="home-container">

        <!-- 头部区域 -->
        <el-header>
            <!-- easyLab图标区 -->
            <div style="float: left; width: 40%">
                <img src="../../assets/icon.png" style="height: 120px; width: 380px; margin-top: -20px; z-index: 999">
            </div>
            
            <div style="float: right; width: 60%">
                <div style="float: left; ">
                    <!-- 消息通知 -->
                    <el-badge :value="messageNum" class="item" style="margin-top: 20px; margin-left: 780px; ;">
                        <!-- <el-button size="small" type="info" icon="el-icon-message" circle>通知</el-button> -->
                        <el-button circle type="info" style="radius: 10px" icon="el-icon-message" @click="getMessage();lookMessage()"></el-button>
                    </el-badge>
                </div>
                <el-drawer :title="messageTitle" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
                    <div v-for="(message,index) in messageList" :key="index" class="container">
                        <el-card  class="box-card">
                            <div slot="header" class="clearfix">
                                <div style="float:left;" v-if="message.type===1"><el-tag type="success">邀请消息</el-tag></div>
                                <div  style="float:left;" v-else><el-tag type="info">系统通知</el-tag></div>
                                 <el-popover placement="top"  title="标题" width="200" trigger="hover" content="设为已读将不再看到本条消息">
                                    <el-button type="success" icon="el-icon-delete" slot="reference" style="float: right; padding: 7px 0" size="medium" @click="changeToReaded(message)">设为已读</el-button>
                                </el-popover>
                            </div>
                            <div class="text item">
                                {{message.content}}
                            </div>
                        </el-card>
                    </div>
                </el-drawer>
               <div style="float: right; ; z-index: 999">
                   <el-dropdown @command="handleCommand" :hide-on-click="false" style="margin-top: 25px;">
                        <span class="el-dropdown-link">
                            {{userInfo.name}}({{userInfo.student_id}})<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown" class="el-dropdown-menu">
                            <el-dropdown-item command="logout" class="el-icon-unlock" >  退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
               </div>
                
            </div>
           
        </el-header>

        <!-- 页面主体区域 -->
        <el-container class="main-container">
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '75px' : '220px'" style="border-radius: 3px;">

                <div class="toggle-button" @click="toggleCollapse" :width="'200px'" 
                style="margin-top: 20px;margin-left: 20px ;border-radius: 5px !important; background: linear-gradient(rgb(88, 88, 88),rgb(43, 42, 42), rgb(20, 20, 20)); height: 30px; font-size: 20px">
                    |||
                </div>
                <div >
                 <el-menu text-color="#fff" active-text-color="#ffd04b"
                    :unique-opened="true" :collapse="isCollapse"
                    :collapse-transition="false" :router="true" 
                    style="margin-top: 10px; margin-left: 20px; border-radius: 5px !important"> 

                    <el-menu-item index="StuWelcome" style="color: #778899; font-size: 18px; width: 100%; border-top-right-radius: 5px; border-top-left-radius: 5px">
                        <i class="el-icon-bell" style="border-top-right-radius: 5px"></i>
                        <span slot="title">主页公告</span>
                    </el-menu-item>

                    <el-menu-item index="Stu-Users-Info" style="color: #778899; font-size: 18px; width: 100%;"> 
                        <i class="el-icon-user"></i>
                        <span slot="title">个人信息</span>
                    </el-menu-item>

                    <el-menu-item index="StuCourses" style="color: #778899; font-size: 18px; width: 100%;">
                        <i class="el-icon-document-copy"></i>
                        <span slot="title">我的课程</span>
                    </el-menu-item>


                    <el-menu-item index="StuScore" style="color: #778899; font-size: 18px; width: 100%;">
                        <i class="el-icon-postcard"></i>
                        <span slot="title">我的成绩</span>
                    </el-menu-item>


                
                </el-menu>
                </div>

                <el-card style="width: 200px; height: 380px; margin-top: 45px; margin-left: -5px" shadow="always">
                    <clock style="margin-left: 5px"></clock>
                    <el-divider></el-divider>
                </el-card>
            </el-aside>

            <!-- 右侧内容主体区 -->
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-aside style="background-color: transparent; width: 260px">
            </el-aside>

          
        </el-container>
    </el-container>
</template>

<script>
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Clock from 'vue-clock2';
export default {
    components: { Clock },
    data() {
        return {
            messageTitle:'',
            drawer: false,
            direction: 'rtl',
            messageList: [],
            messageNum:0,
            nowDate: "", // 当前日期
            isCollapse: false,
            space: '      ',
            userInfo: {},       /// 当前登录的学生的信息
        };
    },
    methods: {
        // 退出返回登录页面
        logout(){
            //清空token
            window.sessionStorage.clear();
            //重定向
            this.$router.push('/Login')
        },
        handleCommand(command) {
            if(command == 'logout')
                {
                     window.sessionStorage.clear();
                     this.$message.success('退出成功！')
                    //重定向
                    this.$router.push('/Login')
                }
        },
        // 处理头像加载错误
        errorHandler() {
            return true
        },

        //获取当前系统时间
        currentTime() {
            setInterval(this.formatDate, 500);
        },

        // 折叠左侧菜单
        toggleCollapse() {
            this.isCollapse = !this.isCollapse
        },

        getUserInfo() {

            this.$http({
            methods:'get',
            url: 'student/getStudentById',
            headers: { 'token': window.sessionStorage.getItem("token"), },
            }).then((response) => {
                console.log(response.data.data.student)
                this.userInfo = response.data.data.student
                
                // advisor_id: "1950081"
                // avatar: "http://192.168.243.1:8080/easyLab/static/advisor/avatar/7654321.jpg"
                // email: "3378681490@qq.com"
                // enable: true
                // gender: 1
                // introduction: null
                // name: "田同轩"
                // password: "123456"
                // phone: null
                // professional_title: null
                // console.log('----end func: getUserInfo----')
            }).catch((error) => {
                console.log(error)
                // console.log('----end func: getUserInfo----')
            })
            this.connect(this.student_id);
            
        },
         handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
            done();
          })
          .catch(_ => {});
        },
        async getMessage() {
            console.log('werwer2')
            var that=this;
            await this.$http({
            methods:'get',
            url: 'system/findAllMessage',
            headers: { 'token': window.sessionStorage.getItem("token"), }
            }).then((response) => {
                that.messageList = response.data.data.messageList;
                console.log('response1',that.messageList.length);
            })
            console.log('reponse',that.messageList.length);
            that.messageNum=that.messageList.length;
            console.log('lllll',that.messageNum);
            that.messageTitle="您有"+that.messageNum+"条未读消息";
        },
        lookMessage() {
            this.drawer=true;
        },
        changeToReaded(message){
            var self=this
            var data=new FormData();
            data.append('message_id',message.message_id)
            this.$http({
            method:'post',
            url: 'system/changeToReaded',
            data: data,
            headers: { 'token': window.sessionStorage.getItem("token"), }
            }).then((response) => {
               self.getMessage()
            })
        },
        connect(){
            var that=this;
            var sockjs=new  SockJS('http://49.235.232.7:8888/easyLab/endpointWisely');
            var stompClient= Stomp.over(sockjs);
            that.$socket.setWs(stompClient);
            that.$socket.ws.connect({}, function (frame) {//连接webSocket的服务端。
                console.log('开始进行连接Connected: ' + frame);

                //订阅广播地址
                stompClient.subscribe('/topic/user', function (response) {
                    console.log(response.body.message)
                    that.open1(JSON.parse(response.body).message);
                });
               
               // 订阅点对点地址'/user/' + userId + '/msg'接收一对一的推送消息
                stompClient.subscribe('/user/' + that.userInfo.student_id + '/signIn', function (response) {
                    that.messageNum+=1;
                    //新消息弹窗
                    that.open1(JSON.parse(response.body).message)
                });

            })
        },
       disconnect() {
            if (stompClient != null) {
                stompClient.disconnect();
            }
            console.log("Disconnected");
        },
        signIn() {
            //通过stompClient.send（）向地址为"/welcome"的服务器地址发起请求，与@MessageMapping里的地址对应。
            stompClient.send("/ws/signIn", { token: 1 }, JSON.stringify({ 'name': name }));
        },
        open1(message) {
            const h = this.$createElement;
            this.$notify({
            title: '您有新消息',
            message: h('i', { style: 'color: teal'},message)
            });
        }
    }, 
    mounted() {
        console.log('sdfasdfsf');
        this.$socket.ws.disconnect();
        this.currentTime()
       
    },
    created(){
        this.getUserInfo()
        this.getMessage()
    },
    watch:{
        userInfo(){
            this.$nextTick(()=>{
                this.connect()
            })
        }
    }
}
</script>



<style lang="less" scoped>

.home-container {
    width: 1707px;
    height: 100%
}

.el-header {
    background: linear-gradient(rgb(0, 0, 0), rgb(20, 20, 20), rgb(88, 88, 88));
    border-bottom-color: rgb(241, 229, 229);
    border-bottom-width: 2px;
    height: 80px !important;
    .el-dropdown-link {
        cursor: pointer;
        color: rgb(247, 242, 242);
        font-size: 16px;
    }
}

.el-aside {
    width: 100px;
    border-width: 50px;
    border-top-color: #EAEDF1;
    height: 100%;
    // background: linear-gradient(rgb(0, 0, 0), rgb(39, 37, 37), rgb(61, 61, 61));
    overflow-x: hidden;
    overflow-y: hidden;
}


.el-main {
    height: 100%;
    background-color: rgb(255, 255, 255);
    
}

.el-menu-item {
    background: rgb(56, 56, 59);
    // background: linear-gradient(90deg, rgb(88, 88, 88), rgb(20, 20, 20),rgb(20, 21, 20),rgb(0, 0, 0),rgb(20, 20, 20), rgb(20, 21, 20),rgb(88, 88, 88));
    // background: black;
    span {
        color: rgb(255, 255, 255)
    };
}

.el-menu-item:hover {
    span {
        color: #050708;
    }
}

.el-menu-item:focus 
 {
    span {
        color: #050708;
    }
}

.el-dropdown {
    margin-top: 20px;
    width: 150px;
    height: 20px;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.el-dropdown-menu {
    margin-top: -20px;
    width: 130px
}

.div-icon img {
    padding-left: -100px;
    margin-top: -25px;
    height: 60px;
    width: 100px;
    z-index: -999;
}

.toggle-button {
    background: #161718;
    font-size: 10px;
    line-height: 24px;
    color: #EAEDF1;
    text-align: center;
    letter-spacing: 0.2ems;
    cursor: pointer;
}

.el-menu-item {
    padding-top: 0px;
}

.box-card {
    line-height: 1.5;
    font-size:16px;
    width: 400px;
    float: left;
  }

.el-card {
    position: relative;
    left: 10%;
    right:10%;
}

.container {
    height: 150px;
    margin-top: 5px;
}

</style>
