<!-- 组队页 -->
<template>
  <van-pull-refresh v-model="isLoadingDog" :head-height="80" @refresh="onTabChange(active)">
    <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
    <template #pulling="props">
      <img
          class="doge"
          src="https://your-avatar-address-bucketName/doge.png"
          :style="{ transform: `scale(${props.distance / 80})` }"
      />
    </template>
    <!-- 释放提示 -->
    <template #loosing>
      <img
          class="doge"
          src="https://your-avatar-address-bucketName/doge.png"
      />
    </template>
    <!-- 加载提示 -->
    <template #loading>
      <img
          class="doge"
          src="https://your-avatar-address-bucketName/doge-fire.jpg"
      />
    </template>
    <div id="teamPage">
      <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
      <van-tabs v-model:active="active" @change="changeTab(active)">
        <van-tab title="公开" name="public" />
        <van-tab title="加密" name="private" />
      </van-tabs>
      <div style="margin-bottom: 16px" />
      <van-button class="add-button" type="primary" icon="plus" @click="toAddTeam" />
      <team-card-list :team-list="teamList"/>
      <van-divider />
      <!-- 分页 -->
      <van-pagination
          v-model="currentPage"
          :total-items="totalItem"
          :show-page-size="showPageSize"
          :items-per-page="itemsPerPage"
          force-ellipses
          @change="onTabChange(active)"
      />
      <!-- 未加载到数据 -->
      <van-empty v-if="!teamList || teamList.length < 1" description="数据为空"/>
    </div>
  </van-pull-refresh>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";

const router = useRouter();

const searchText = ref('');

const active = ref('public');

const isLoadingDog = ref(false);

const currentPage = ref(1); // 当前页码
const totalItem = ref(12); // 总记录数量
const itemsPerPage = ref(8); // 每页展示的记录数
const showPageSize = ref(3); // 展示的页码

const teamList = ref([]);

/**
 * 切换查询状态
 */
const changeTab = (name: string) => {
  currentPage.value = 1; // 将分页条调整回第一页
  onTabChange(name);
}

/**
 * 根据状态动态查询数据
 * @param
 */
const onTabChange = (name: string) => {
  if (name === 'public') { // 查公开
    listTeam(searchText.value, 0);
  } else { // 查加密
    listTeam(searchText.value, 2);
  }
}

// 跳转到创建队伍页
const toAddTeam = () => {
  router.push({
    path: "/team/add"
  })
}

// 页面加载完成时触发
onMounted(() => {
  listTeam(); // 搜索所有队伍
});

/**
 * 根据条件搜索队伍
 * @param val
 */
const onSearch = (val) => {
  if (active.value === 'public') {
    listTeam(val, 0); // 搜索公开队伍
  } else {
    listTeam(val, 2); // 搜索加密队伍
  }
};

/**
 * 搜索队伍
 * @param val 参数
 * @param status 队伍状态 0-公开 1-私有 2-加密
 */
const listTeam = async (val = '', status = 0) => {
  isLoadingDog.value = true;
  const res = await myAxios.get('/team/list', {
    params: {
      searchText: val,
      status,
      pageNum: currentPage.value,
      pageSize: itemsPerPage.value,
    }
  });
  if (res?.code === 0) {
    teamList.value = res?.data?.records;
    totalItem.value = res?.data?.total;
    itemsPerPage.value = res?.data?.size;
    currentPage.value = res?.data?.current;
  } else {
    showFailToast('加载失败!' + res?.description);
  }
  isLoadingDog.value = false;
}

</script>

<style scoped>

</style>