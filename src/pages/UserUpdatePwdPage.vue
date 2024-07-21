<!-- 用户修改密码页 -->
<template>
  <div>
    <van-cell-group inset>
      <van-field v-model="oldPassword" label="旧密码" placeholder="请输入旧密码" />
      <van-field v-model="newPassword" label="新密码" placeholder="请输入新密码" />
      <van-field v-model="confirmPassword" label="确认密码" placeholder="请输入确认密码" />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit" @click="updatePwd">
        提交
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">

import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {clearCurrentUserState} from "../states/user.ts";

const router = useRouter();

const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

/**
 * 更新密码
 */
const updatePwd = async () => {
  const passwordData = {
    oldPassword: oldPassword.value,
    newPassword: newPassword.value,
    confirmPassword: confirmPassword.value
  };
  const res = await myAxios.post('/user/password', passwordData)
  if (res?.code === 0) {
    clearCurrentUserState(); // 修改信息后清楚缓存的用户数据
    showSuccessToast('修改成功')
    router.push({ // 修改成功跳转到个人页
      path: '/user/update',
      replace: true, // 提交后不能回退到页面
    })
  } else {
    showFailToast(res?.description)
  }
}

</script>

<style scoped>

</style>