<!-- 队伍卡片列表公共组件 -->
<template>
  <div>
    <van-card
        v-for="team in props.teamList"
        :thumb="logo"
        :desc="team.description"
        :title="`${team.name}`"
        @click="teamDetails(team)"
        class="custom-card"
    >
      <!-- 队伍状态标签 -->
      <template #tags>
        <van-tag plain type="primary" style="margin-right: 8px; margin-top: 8px">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `队伍人数：${team.hasJoinNum}/${team.maxNum}` }}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间：' + team.expireTime }}
        </div>
        <div v-if="team.createTime">
          {{ '发布时间：' + team.createTime }}
        </div>
      </template>
    </van-card>
  </div>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team.ts";
import logo from '../assets/logo.jpg'
import {getCurrentUser} from "../services/user.ts";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

// 定义组件属性
interface TeamCardListProps {
  teamList: TeamType[];
  active: string;
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  // @ts-ignore
  teamList: [] as TeamType[],
  active: '' as string,
});

const currentUser = ref();

const router = useRouter();

const store = useStore();

onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

/**
 * 查看队伍详情
 */
const teamDetails = (team: TeamType) => {
  store.commit('updateTeam', team); // 更新存储的当前队伍数据
  router.push({
    path: '/team/details',
  })
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
  margin-bottom: 10px; /* 卡片底部外边距 */
}

.custom-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* 鼠标悬停时更深的阴影 */
}

/* 为底部和底部按钮添加样式 */
.custom-card #bottom, .custom-card #footer {
  padding: 8px; /* 内边距 */
  text-align: left; /* 文本左对齐 */
}

.custom-card #bottom div {
  margin-bottom: 4px; /* 每行文本之间的间距 */
}

/* 确保按钮垂直排列 */
.custom-card #footer .van-button {
  margin-right: 8px; /* 按钮之间的间距 */
}
</style>