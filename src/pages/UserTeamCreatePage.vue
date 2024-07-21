<!-- 用户创建的队页 -->
<template>
  <van-pull-refresh v-model="isLoadingDog" :head-height="80" @refresh="listTeam">
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
      <van-tabs v-model:active="active" @change="changeTab(active)">
        <van-tab title="当前队伍" name="current"/>
        <van-tab title="历史队伍" name="history"/>
      </van-tabs>
      <div style="margin-bottom: 16px"/>
      <team-card-list :team-list="teamList" :active="active"/>
      <van-divider/>
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
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();

const active = ref('current');

const isLoadingDog = ref(false);

const teamList = ref([]);

// 页面加载完成时触发
onMounted( () => {
  listTeam(); // 搜索所有队伍
});

/**
 * 搜索队伍
 * @param val 参数
 */
const listTeam = async (val = '') => {
  isLoadingDog.value = true;
  let res;
  if (active.value === 'current') {
    res = await myAxios.get('/team/list/my/create', {
      params: {
        searchText: val,
        pageNum: 1,
      }
    });
  } else {
    res = await myAxios.get('/team/list/my/create/timeout', {
      params: {
        searchText: val,
        pageNum: 1,
      }
    });
  }

  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showFailToast('加载失败' + res?.description)
  }
  isLoadingDog.value = false;
}

/**
 * 切换上方菜单栏触发
 * @param val
 */
const changeTab = (val) => {
  active.value = val;
  listTeam();
}

</script>

<style scoped>

</style>