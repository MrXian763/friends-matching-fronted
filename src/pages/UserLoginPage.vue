<!-- 用户登录页 -->
<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <van-image
        width="10rem"
        height="10rem"
        fit="cover"
        position="center"
        src="https://your-avatar-address-bucketName/u%3D3634386JPEG.jpg"
    />
    <p style="font-weight: bold; margin-top: 0.5rem; text-align: center;">伙伴匹配</p>
  </div>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="text-align: right; margin-top: 4px; margin-bottom: 1px;">
        <span @click="moveToResetPassword" style="color: red; cursor: pointer; font-size: 0.8rem;">忘记密码？</span>
      </div>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>

    <div style="margin: 16px;">
      <van-button round plain block type="primary" native-type="submit" @click="moveToRegister">
        没账号？去注册
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">

import {useRouter, useRoute} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showSuccessToast, showFailToast, showLoadingToast} from 'vant';
import {setCurrentUserState} from "../states/user.ts";

const router = useRouter();
const route = useRoute();

const userAccount = ref('');
const userPassword = ref('');

// 跳转到注册页面
const moveToRegister = () => {
  router.push('/user/register')
}

/**
 * 发送登录请求
 */
const onSubmit = async () => {

  showLoadingToast({
    message: '登录中...',
    forbidClick: true,
  });

  const res = await myAxios.post('/user/login', {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })
  if (res.code === 0 && res.data) {
    showSuccessToast('登录成功');
    setCurrentUserState(res.data); // 缓存当前登录用户
    // 登录成功跳转到首页
    router.push({
      path: '/',
      replace: true, // 提交后不能回退到页面
    })
  } else {
    showFailToast('登录失败' + res?.description);
  }
};

// 跳转到找回密码页面
const moveToResetPassword = () => {
  router.push('/user/password/reset');
}

</script>

<style scoped>

</style>