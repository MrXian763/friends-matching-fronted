// 路由配置
import Index from "../pages/Index.vue";                                 // 主页
import Team from "../pages/TeamPage.vue";                               // 队伍页
import UserPage from "../pages/UserPage.vue";                           // 个人页
import UserUpdatePage from "../pages/UserUpdatePage.vue";               // 个人信息修改页
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";           // 用户加入的队伍列表页
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";       // 用户创建的队伍列表页
import SearchPage from "../pages/SearchPage.vue";                       // 搜索页
import SearchResultPage from "../pages/SearchResultPage.vue";           // 搜索结果页
import UserEditPage from "../pages/UserEditPage.vue";                   // 编辑用户信息页
import UserLoginPage from "../pages/UserLoginPage.vue";                 // 用户登录页
import UserRegisterPage from "../pages/UserRegisterPage.vue";           // 用户注册页
import UserTagsPage from "../pages/UserTagsPage.vue";                   // 用户兴趣页
import TeamAddPage from "../pages/TeamAddPage.vue";                     // 用户加入队伍页
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";               // 用户修改队伍页
import UserTagsAddPage from "../pages/UserTagsAddPage.vue";             // 创建标签页
import UserDetailsPage from "../pages/UserDetailsPage.vue";             // 用户详情页
import TeamDetailsPage from "../pages/TeamDetailsPage.vue";             // 队伍详情页
import TeamMemberPage from "../pages/TeamMemberPage.vue";               // 队伍成员页
import UserChatPage from "../pages/UserChatPage.vue";                   // 用户私聊页
import ChatPage from "../pages/ChatPage.vue";                           // 消息页
import UserFansPage from "../pages/UserFansPage.vue";                   // 粉丝列表页
import UserFollowersPage from "../pages/UserFollowersPage.vue";         // 关注列表页
import UserUpdatePwdPage from "../pages/UserUpdatePwdPage.vue";         // 粉丝列表页
import UserResetPasswordPage from "../pages/UserResetPasswordPage.vue"; // 重设密码页

// 定义路由
const routes = [
    {path: '/', component: Index},
    {path: '/team',title:'找队伍', component: Team},
    {path: '/chat',title:'消息', component: ChatPage},
    {path: '/chat/private',title:'私聊', component: UserChatPage},
    {path: '/team/details',title:'队伍详情', component: TeamDetailsPage},
    {path: '/team/member',title:'成员列表', component: TeamMemberPage},
    {path: '/team/add', title:'创建队伍', component: TeamAddPage},
    {path: '/team/update', title:'修改队伍', component: TeamUpdatePage},
    {path: '/user', title:'个人主页', component: UserPage},
    {path: '/user/fans', title:'粉丝列表', component: UserFansPage},
    {path: '/user/followers', title:'关注列表', component: UserFollowersPage},
    {path: '/user/details', title:'个人详情', component: UserDetailsPage},
    {path: '/user/password', title:'修改密码', component: UserUpdatePwdPage},
    {path: '/user/password/reset', title:'重置密码', component: UserResetPasswordPage},
    {path: '/search', title:'找伙伴', component: SearchPage},
    {path: '/user/list', title:'伙伴列表', component: SearchResultPage},
    {path: '/user/edit', title:'修改信息', component: UserEditPage},
    {path: '/user/login', title:'登录', component: UserLoginPage},
    {path: '/user/register', title:'注册', component: UserRegisterPage},
    {path: '/user/update', title:'详细信息', component: UserUpdatePage},
    {path: '/user/interest', title:'标签管理', component: UserTagsPage},
    {path: '/user/team/join', title:'我加入的队伍', component: UserTeamJoinPage},
    {path: '/user/team/create', title:'我创建的队伍', component: UserTeamCreatePage},
    {path: '/tag/add', title:'创建标签', component: UserTagsAddPage},
]

export default routes;