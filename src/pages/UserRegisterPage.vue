<!-- 用户注册页 -->
<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <van-image
        width="10rem"
        height="10rem"
        fit="cover"
        position="center"
        src="https://your-avatar-address-bucketName/t%326app%3D138%26f%3DJPEG.jpg"
    />
    <p style="font-weight: bold; margin-top: 0.5rem; text-align: center;">伙伴匹配</p>
  </div>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="username"
          name="username"
          label="昵称"
          placeholder="请输入昵称"
          :rules="[{ required: true, message: '请填写长度 2-10 昵称' }]"
      />
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
      <van-field
          v-model="checkPassword"
          type="password"
          name="checkPassword"
          label="确认密码"
          placeholder="请再次输入密码"
          :rules="[{ required: true, message: '请填写确认密码' }]"
      />
      <van-field
          v-model="email"
          name="email"
          label="QQ邮箱"
          placeholder="请输入QQ邮箱，用于找回密码"
          :rules="[{ required: true, message: '请填写QQ邮箱' }]"
      />
      <van-field
          v-model="planetCode"
          name="planetCode"
          label="星球成员编号"
          placeholder="请输入编号"
          :rules="[{ required: true, message: '请填写编号' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>

    <div style="margin: 16px;">
      <van-button round plain block type="primary" native-type="submit" @click="moveToLogin">
        已有账号？去登录
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from 'vant';

const router = useRouter();
const route = useRoute();

const username = ref('');
const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');
const planetCode = ref('');
const email = ref('');

// 跳转到登录页
const moveToLogin = () => {
  router.push('/user/login')
}

/**
 * 发送注册请求
 */
const onSubmit = async () => {
  const res = await myAxios.post('/user/register', {
    username: username.value,
    userAccount: userAccount.value,
    userPassword: userPassword.value,
    checkPassword: checkPassword.value,
    planetCode: planetCode.value,
    email: email.value
  })
  if (res.code === 0 && res.data) {
    showSuccessToast('注册成功');
    // 注册成功跳转到登录页
    window.location.href = '/user/login';
  } else {
    showFailToast('注册失败' + res?.description);
  }
};

</script>

<style scoped>

</style>