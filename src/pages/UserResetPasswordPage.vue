<!-- 用户重置密码页 -->
<template>
  <van-cell-group inset>
    <van-field v-model="userAccount" label="账号" placeholder="请输入账号" />
    <van-field v-model="email" label="邮箱" placeholder="请输入账号绑定的邮箱" />
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit" @click="toResetPassword">
      提交
    </van-button>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showLoadingToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";

const router = useRouter();

const userAccount = ref('');
const email = ref('');

/**
 * 重设密码
 */
const toResetPassword = async () => {

  showLoadingToast({
    message: '发送中...',
    forbidClick: true,
  });

  const requestDTO = {
    userAccount: userAccount.value,
    email: email.value
  }
  const res = await myAxios.post('/user/password/reset', requestDTO);
  if (res?.code === 0) {
    showSuccessToast('修改成功，请前往邮箱获取新密码');
    router.push({ // 重设成功跳转到登录页
      path: '/user/login',
      replace: true, // 提交后不能回退到页面
    })
  } else {
    showFailToast('修改失败' + res?.description)
  }
}

</script>

<style scoped>

</style>