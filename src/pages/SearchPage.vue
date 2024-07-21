<!-- 搜索页 -->
<template>
  <form action="/">
    <h4 style="text-align: center">选择要搜索伙伴的标签</h4>
  </form>

  <!-- 分隔线 -->
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">未选择</div>
  <!-- 多选标签 -->
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <!-- 分隔线 -->
  <van-divider content-position="left">选择标签</van-divider>
  <!-- 多选标签 -->
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />

  <div style="padding: 12px">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";

const router = useRouter();

// 所有标签数据
const originTagList = ref([]);

// 用户搜索的标签
let tagList = ref(originTagList);

// 已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);

// 移除标签
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    // 过滤 保留没有选择移除的标签
    return item !== tag;
  })
}

/**
 * 根据标签搜索用户
 */
const doSearchResult = () => {
  router.push({
    path: '/user/list', // 路由跳转地址
    query: {
      tags: activeIds.value, // 参数
    }
  })
}

onMounted((async () => {
  const res = await myAxios.get('/tag/all');
  if (res.code === 0) {
    originTagList.value = res.data;
  }
}))

</script>

<style scoped>

</style>