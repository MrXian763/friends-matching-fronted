<!-- 个人详情页 -->
<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <van-image
        round
        width="15rem"
        height="15rem"
        :src="currentUser?.avatarUrl"
    />
    <p style="font-weight: bold; margin-top: 0.5rem; text-align: center;">{{ currentUser?.username }}</p>
  </div>

  <van-cell-group inset>
    <div class="centered-container">
      <p class="small-text">
        {{ followCount }} 关注 &nbsp;&nbsp;&nbsp; {{ fanCount }} 粉丝
      </p>
    </div>
    <van-cell v-if="currentUser.profile" title="个人简介" :label="currentUser.profile" size="large"/>

    <div class="tag-container" v-if="currentUser.tags">
      <van-tag
          v-for="tag in currentUser.tags"
          :key="tag"
          plain
          round
          type="primary"
          size="large"
          color="#00BFFF"
          class="tag-inline"
      >
        {{ tag }}
      </van-tag>
    </div>
    <van-cell v-if="currentUser.phone" title="电话" :value="currentUser.phone"/>
    <van-cell v-if="currentUser.gender" title="性别" :value="currentUser.gender === '0' ? '女' : '男'"/>
    <van-cell v-if="currentUser.email" title="邮箱" :value="currentUser.email"/>
    <van-cell v-if="currentUser.planetCode" title="星球编号" :value="currentUser.planetCode"/>
    <van-cell v-if="currentUser.createTime" title="注册时间" :value="currentUser.createTime"/>

    <div v-if="!isFans && (currentUser.id != loginUser.id)" @click="followUser" style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        关注
      </van-button>
    </div>
    <div style="margin: 16px;" v-else-if="isFans && (currentUser.id != loginUser.id)" @click="toSendMessage">
      <van-button round plain block type="primary" native-type="submit">
        发信息
      </van-button>
    </div>
    <div v-if="isFans && (currentUser.id != loginUser.id)" @click="unFollowUser" style="margin: 16px;">
      <van-button round plain block type="warning" native-type="submit">
        取消关注
      </van-button>
    </div>

  </van-cell-group>

</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {useStore} from "vuex";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast, showConfirmDialog, showLoadingToast} from "vant";
import {useRouter} from "vue-router";
import {getCurrentUserState} from "../states/user.ts";

const store = useStore();
const router = useRouter();

const followCount = ref(0); // 关注数
const fanCount = ref(0); // 粉丝数

const isFans = ref(false);

// 当前用户信息
const currentUser = reactive(store.state.user);
// 当前登录用户
const loginUser = getCurrentUserState();

onMounted(async () => {
  await getFans();
  await getFollows();
  await isFollow();
})

/**
 * 获取当前用户粉丝数
 */
const getFans = async () => {
  const id = currentUser.id;
  const res = await myAxios.get(`/user/fans/${id}`);
  if (res?.code === 0) {
    fanCount.value = res.data
  } else {
    showFailToast('获取粉丝数失败' + res?.description)
  }
}

/**
 * 获取当前用户关注数
 */
const getFollows = async () => {
  const id = currentUser.id;
  const res = await myAxios.get(`/user/follows/${id}`);
  if (res?.code === 0) {
    followCount.value = res.data
  } else {
    showFailToast('获取关注数失败' + res?.description)
  }
}

/**
 * 判断是否已关注用户
 */
const isFollow = async () => {
  const id = currentUser.id;
  const res = await myAxios.get(`/user/isfans/${id}`);
  if (res?.code === 0) {
    isFans.value = res.data;
  } else {
    showFailToast('判断失败' + res?.description)
  }
}

/**
 * 关注用户
 */
const followUser = async () => {
  showLoadingToast({
    message: '操作中...',
    forbidClick: true,
  });
  const id = currentUser.id;
  const res = await myAxios.post(`/user/dofollow/${id}`);
  if (res?.code === 0) {
    isFans.value = true; // 设置状态
    fanCount.value = fanCount.value + 1; // 更新粉丝数显示
    showSuccessToast('关注成功')
  } else {
    showFailToast('关注失败' + res?.description)
  }
}

/**
 * 取消关注用户
 */
const unFollowUser = () => {
  showConfirmDialog({
    title: '提示',
    message:
        '确认取消关注该用户吗？',
  })
      .then(async () => { // 确认
        showLoadingToast({
          message: '操作中...',
          forbidClick: true,
        });
        const id = currentUser.id;
        const res = await myAxios.post(`/user/unfollow/${id}`);
        if (res?.code === 0) {
          isFans.value = false; // 设置状态
          fanCount.value = fanCount.value - 1; // 更新粉丝数显示
          showSuccessToast('已取消关注')
        }
      })
      .catch(() => { // 取消
        showSuccessToast('取消操作')
      });
}

/**
 * 跳转到发送信息页
 */
const toSendMessage = () => {
  store.commit('updateChatUserId', currentUser)
  router.push('/chat/private')
}

</script>

<style scoped>
.tag-container {
  /* 使用 Flexbox 布局 */
  display: flex;
  /* 允许内容换行 */
  flex-wrap: wrap;
  /* 如果需要水平居中，可以添加以下属性 */
  justify-content: center;
  /* 如果需要垂直居中（在容器高度确定的情况下），可以添加以下属性 */
  align-items: center;
}

.tag-inline {
  /* 确保标签之间有一定的间距 */
  margin-right: 5px;
  margin-bottom: 5px; /* 如果需要更清晰的换行间距 */
}

.centered-container {
  display: flex;
  justify-content: center; /* 水平居中 */
}

.small-text {
  font-size: 15px; /* 设置字体大小 */
  /* 可以添加其他样式，如字体颜色、行高等 */
  color: #333;
  line-height: 0;
}
</style>