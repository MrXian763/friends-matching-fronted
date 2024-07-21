<!-- 用户卡片列表公共组件 -->
<template>
  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
    <van-card
        :desc="user.profile"
        :title="user.username === null ? '新用户' : user.username"
        :thumb="user.avatarUrl === null ? 'https://your-avatar-address-bucketName/default/%E9%BB%98%E8%A4%E5%A4%B4%E5%83%8F.jpg' : user.avatarUrl"
        @click="userDetails(user)"
        class="custom-card"
    >
      <!-- 用户标签 -->
      <template #tags>
        <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
          {{ tag }}
        </van-tag>
      </template>
    </van-card>
  </van-skeleton>
</template>

<script setup lang="ts">
import {UserType} from "../models/user";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const router = useRouter();

const store = useStore();

// 定义组件属性
interface UserCardListProps {
  loading: boolean;
  userList: UserType[];
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  loading: true, // 默认显示加载中（骨架屏）
  // @ts-ignore
  userList: [] as UserType[],
});

/**
 * 查看用户详情
 */
const userDetails = (user: UserType) => {
  store.commit('updateUser', user); // 更新存储的当前用户数据
  router.push('/user/details')
}

</script>

<style scoped>
.custom-card {
  border: 1px solid #e0e0e0; /* 轻微的灰色边框 */
  background-color: white; /* 白色背景 */
  border-radius: 8px; /* 圆角 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 轻微的阴影 */
  transition: box-shadow 0.3s ease-in-out; /* 阴影过渡效果 */
  cursor: pointer;
  color: #333; /* 文字颜色 */
  margin-bottom: 10px; /* 增加卡片底部的外边距 */
}

.custom-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* 鼠标悬停时更深的阴影 */
}
</style>