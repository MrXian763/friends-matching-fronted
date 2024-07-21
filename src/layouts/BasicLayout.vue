<template>
  <!-- 顶部栏 -->
  <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      class="fixed-top-bar">
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>

  <!-- 内容 -->
  <div id="content">
    <router-view/>
  </div>

  <!-- 底部菜单栏 -->
  <van-tabbar v-model="active" active-color="#4169E1">
    <van-tabbar-item to="/" name="index" icon="home-o">主页</van-tabbar-item>
    <van-tabbar-item to="/team" name="team" icon="search">队伍</van-tabbar-item>
    <van-tabbar-item to="/chat" name="chat" icon="friends-o">消息</van-tabbar-item>
    <van-tabbar-item to="/user" name="user" icon="setting-o">个人</van-tabbar-item>
  </van-tabbar>

</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import routes from "../config/router.ts";

const router = useRouter();
const DEFAULT_TITLE = '伙伴匹配';

const title = ref(DEFAULT_TITLE); // 页面标题

const active = ref('index');

/**
 * 全局导航守卫
 * 根据路由切换标题
 */
router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path;
  });
  title.value = route?.title ?? DEFAULT_TITLE;
  updateActive(toPath);
})

const onClickLeft = () => {
  // 路由跳转回到上一页
  router.back();
};
const onClickRight = () => {
  // 路由跳转到 search 页面
  router.push('/search')
};

// 刷新下方导航栏导航提示
const updateActive = (toPath: string) => {
  if (toPath === '/') {
    active.value = 'index';
  } else if (toPath === '/team') {
    active.value = 'team';
  } else if (toPath === '/chat') {
    active.value = 'chat';
  } else {
    active.value = 'user';
  }
}

</script>

<style scoped>
#content {
  padding-top: 46px; /* 确保内容不会被固定的顶部栏遮挡 */
  padding-bottom: 50px;
}
</style>