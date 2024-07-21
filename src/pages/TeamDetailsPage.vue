<!-- 队伍详情页 -->
<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <van-image
        width="10rem"
        height="10rem"
        fit="cover"
        position="center"
        src="https://your-avatar-address-bucketName/logo.jpg"
    />
    <p style="font-weight: bold; margin-top: 0.5rem; text-align: center;">{{ team.name }}</p>
  </div>
  <div class="centered-container">
    <p class="small-text">
      {{ team.hasJoinNum }} 加入人数 &nbsp;&nbsp;&nbsp; {{ team.maxNum }} 最大人数
    </p>
  </div>

  <van-cell-group inset>
    <van-cell title="创建人" :value="team.createUser.username"/>
    <van-cell title="队伍描述" :label="team.description" size="large"/>
    <van-cell title="成员列表" @click="moveToMemberPage" is-link/>
    <van-cell title="队伍状态" :value="team.status === 0 ? '公开' : '加密'"/>
    <van-cell title="过期时间" :value="team.expireTime"/>
    <van-cell title="创建时间" :value="team.createTime"/>
  </van-cell-group>

  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit"
                v-if="(createUser.id !== currentUser?.id) && (team.hasJoin === false) && (team.maxNum > team.hasJoinNum)"
                @click="preJoinTeam(team)">
      加入队伍
    </van-button>
  </div>
  <div style="margin: 16px;">
    <van-button round plain block type="primary" native-type="submit"
                v-if="createUser.id === currentUser?.id"
                @click="doUpdateTeam(team.id)">
      修改队伍
    </van-button>
  </div>
  <div style="margin: 16px;">
    <van-button round block type="warning" native-type="submit"
                v-if="((createUser.id !== currentUser?.id) && (team.hasJoin === true))"
                @click="doQuitTeam(team.id)">
      退出队伍
    </van-button>
  </div>
  <div style="margin: 16px;">
    <van-button round plain block type="danger" native-type="submit"
                v-if="createUser.id === currentUser?.id"
                @click="doDeleteTeam(team.id)">
      解散队伍
    </van-button>
  </div>
  <van-dialog v-model:show="showPasswordDialog" title="填写密码" show-cancel-button @confirm="doJoinTeam"
              @cancel="doJoinClear">
    <van-field v-model="password" placeholder="请输入房间密码"/>
  </van-dialog>

</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref, reactive} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {TeamType} from "../models/team";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast, showLoadingToast} from "vant";
import {useStore} from "vuex";

const router = useRouter();

const currentUser = ref();

const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref();

const store = useStore();
// 使用 reactive 来创建一个响应式的引用
const team = reactive(store.state.team);
const createUser = ref(team.createUser);

/**
 * 跳转到队伍成员页
 */
const moveToMemberPage = () => {
  router.push('/team/member')
}

onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

/**
 * 重置数据
 */
const doJoinClear = () => {
  joinTeamId.value = 0;
  password.value = '';
}

/**
 * 私有队伍弹出密码框
 * @param team
 */
const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true; // 显示密码输入框
  }
}

/**
 * 加入队伍
 */
const doJoinTeam = async () => {
  showLoadingToast({
    message: '正在加入...',
    forbidClick: true,
  })
  if (!joinTeamId.value) return;
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value,
  });
  if (res?.code === 0) {
    showSuccessToast('加入成功');
    team.hasJoin = true;
    team.hasJoinNum += 1;
  } else {
    showFailToast('加入失败' + (res.description ? `，${res.description}` : ''));
  }
  doJoinClear();
}

/**
 * 跳转到修改队伍页面
 * @param id 队伍 id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}

/**
 * 退出队伍
 * @param id 队伍 id
 */
const doQuitTeam = async (id: number) => {
  showLoadingToast({
    message: '正在退出...',
    forbidClick: true,
  })
  const res = await myAxios.post('/team/quit', {
    teamId: id
  });
  if (res?.code === 0) {
    showSuccessToast('已退出');
    router.push('/team')
  } else {
    showFailToast('退出失败!' + (res.description ? `，${res.description}}` : ''));
  }
}

/**
 * 解散队伍
 * @param id 队伍 id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    id
  });
  if (res?.code === 0) {
    showSuccessToast('操作成功');
    router.go(-1);  // 刷新页面
  } else {
    showFailToast('操作失败' + (res.description ? `，${res.description}}` : ''));
  }
}

</script>

<style scoped>
.centered-container {
  display: flex;
  justify-content: center; /* 水平居中 */
}
</style>