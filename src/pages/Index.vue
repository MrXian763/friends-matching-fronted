<!-- 主页 -->
<template>
  <van-cell center title="❤️️心动模式❤️">
    <template #right-icon>
      <van-switch v-model="isMatchMode"/>
    </template>
  </van-cell>

  <!-- 下拉刷新 -->
  <van-pull-refresh v-model="isLoadingDog" :head-height="80" @refresh="loadData">
    <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
    <template #pulling="props">
      <img
          class="doge"
          src="https://your-avatar-address-bucketNa.png"
          :style="{ transform: `scale(${props.distance / 80})` }"
      />
    </template>
    <!-- 释放提示 -->
    <template #loosing>
      <img
          class="doge"
          src="https://your-avatar-address-bucketNam.png"
      />
    </template>
    <!-- 加载提示 -->
    <template #loading>
      <img
          class="doge"
          src="https://your-avatar-address-bucketName.jpg"
      />
    </template>

    <!-- 用户卡片列表 -->
    <div>
      <user-card-list :user-list="userList" :loading="loading"/>
    </div>
    <van-divider/>
    <!-- 分页 -->
    <van-pagination
        v-model="currentPage"
        :total-items="totalItem"
        show-page-size="3"
        :items-per-page="itemsPerPage"
        force-ellipses
    />
    <!-- 未加载到数据 -->
    <van-empty v-if="!userList || userList.length < 1" description="数据为空"/>
  </van-pull-refresh>


</template>

<script setup lang="ts">
import {ref, watchEffect} from 'vue';
import myAxios from '../plugins/myAxios.ts';
import UserCardList from "../components/UserCardList.vue";
import {showFailToast} from "vant";

const isMatchMode = ref<boolean>(false); // 是否心动模式

const userList = ref([]); // 用户集合

const loading = ref(true);
const isLoadingDog = ref(false); // 下拉刷新图标

const currentPage = ref(1); // 当前页码
const totalItem = ref(12); // 总记录数量
const itemsPerPage = ref(10); // 每页展示的记录数

// 根据模式动态获取数据
const loadData = async () => {
  loading.value = true;
  isLoadingDog.value = true;
  if (isMatchMode.value) { // 心动模式
    const num = 15; // 匹配15个用户
    const userListData = await myAxios.get('/user/match', {
      params: {
        num,
        pageSize: itemsPerPage.value,
        pageNum: currentPage.value,
      },
    });
    if (userListData?.data?.records) {
      userListData.data.records.forEach(user => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags); // 解析后端返回的json字符串为js数组
        }
      });
      userList.value = userListData.data?.records;
      totalItem.value = userListData.data.total;
      itemsPerPage.value = userListData.data.size;
      currentPage.value = userListData.data.current;
    } else {
      showFailToast('暂无与你匹配的伙伴');
      isMatchMode.value = false;
    }
  } else { // 普通模式
    const response = await myAxios.get('/user/recommend', {
      params: {
        pageSize: itemsPerPage.value,
        pageNum: currentPage.value,
      }
    });
    if (response?.data) {
      response.data?.records.forEach(user => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags); // 解析后端返回的json字符串为js数组
        }
      });
      userList.value = response.data?.records;
      totalItem.value = response.data.total;
    } else {
      showFailToast('请求失败' + response?.description);
    }
  }
  loading.value = false;
  isLoadingDog.value = false;
  window.scrollTo({top: 0})
}

// 监控变量变化触发方法
watchEffect(() => {
  loadData()
})

</script>

<style scoped>
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
</style>