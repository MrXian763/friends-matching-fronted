<!-- 用户个人页 -->
<template>
  <template v-if="user">
    <div style="display: flex; flex-direction: column; align-items: center;">
      <van-image
          round
          width="10rem"
          height="10rem"
          :src="user?.avatarUrl"
      />
      <p style="font-weight: bold; margin-top: 0.5rem; text-align: center;">{{ user?.username }}</p>
    </div>
    <van-cell-group inset>
      <van-cell title="粉丝列表" is-link to="/user/fans" :value="fansNum" />
      <van-cell title="关注列表" is-link to="/user/followers" :value="followNum" />
      <van-cell title="个人详情" is-link to="/user/update"/>
      <van-cell title="标签管理" is-link to="/user/interest"/>
      <van-cell title="我创建的队伍" is-link to="/user/team/create"/>
      <van-cell title="我加入的队伍" is-link to="/user/team/join"/>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round plain block type="primary" native-type="submit" @click="doLogoutConfirm()">
        退出登录
      </van-button>
    </div>
  </template>
  <template v-else>
    <van-empty description="未登录">
      <van-button round type="primary" class="bottom-button" @click="moveToLogin">登录｜注册</van-button>
    </van-empty>
  </template>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import myAxios from "../plugins/myAxios.ts";
import {closeDialog, showConfirmDialog, showFailToast, showLoadingToast, showSuccessToast} from 'vant';
import {clearCurrentUserState} from "../states/user.ts";

const router = useRouter();

const user = ref();

// 粉丝数
const fansNum = ref(0);
// 关注数
const followNum = ref(0);

// 加载提示图标
const showLoading = () => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
  })
}

onMounted(async () => {
  showLoading()
  user.value = await getCurrentUser(); // 获取当前登录用户
  await getFollows(); // 获取用户关注数
  await getFans(); // 获取用户粉丝数
  showSuccessToast('加载成功')
})

// 跳转到登录页
const moveToLogin = () => {
  router.push('/user/login')
}

/**
 * 退出登录确认
 */
const doLogoutConfirm = () => showConfirmDialog({
  title: '退出登录',
  message:
      '退出登录不会删除你的数据，确认退出吗',
})
    .then(() => {
      doUserLogout();
      router.push('/user/login'); // 跳转到登录页
    })
    .catch(() => {
      closeDialog()
    });

/**
 * 发送退出登录请求
 */
const doUserLogout = async () => {
  clearCurrentUserState();
  const res = await myAxios.post('/user/logout');
  if (res?.code === 0) {
    showSuccessToast('退出成功')
  } else {
    showFailToast('退出失败' + res?.description)
  }
}

/**
 * 获取用户关注数量
 */
const getFollows = async () => {
  const id = user.value.id;
  const res = await myAxios.get(`/user/follows/${id}`);
  if (res?.code === 0) {
    followNum.value = res.data;
  } else {
    showFailToast('获取关注数失败' + res?.description)
  }
}

/**
 * 获取用户粉丝数量
 */
const getFans = async () => {
  const id = user.value.id;
  const res = await myAxios.get(`/user/fans/${id}`);
  if (res?.code === 0) {
    fansNum.value = res.data;
  } else {
    showFailToast('获取粉丝数失败' + res?.description)
  }
}

</script>

<style scoped>
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>