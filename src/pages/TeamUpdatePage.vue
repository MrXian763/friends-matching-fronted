<!-- 修改队伍页面 -->
<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请填写队伍名' }]"
        />

        <van-field
            v-model="addTeamData.description"
            rows="4"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />

        <van-field
            is-link
            name="datePicker"
            label="过期时间"
            :placeholder="addTeamData.expireTime ?? '点击选择过期时间'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker
              :v-model="addTeamData.expireTime"
              @confirm="onConfirm"
              type="datetime"
              title="请选择过期时间"
              :min-date="minDate"
          />
        </van-popup>

        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field
            v-if="Number(addTeamData.status) === 2"
            v-model="addTeamData.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请填写队伍密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";

// 展示日期选择器
const showPicker = ref(false);

const router = useRouter();
const route = useRoute();

// 用户填写的表单数据
const addTeamData = ref({});

const minDate = new Date();

const id = route.query.id;

// 获取之前的队伍信息
onMounted(async () => {
  if (id <= 0) {
    showFailToast('加载队伍失败')
    return;
  }
  const res = await myAxios.get('/team/get', {
    params: {
      id,
    }
  });
  if (res?.code === 0) {
    addTeamData.value = res.data;
  } else {
    showFailToast('获取队伍信息失败' + res?.description)
  }
})

// 日期格式转换
const onConfirm = (value) => {
  const dateArray = value.selectedValues;
  if (dateArray && dateArray.length === 3) {
    // 拼接成 "YYYY-MM-DD" 格式
    const dateString = dateArray.join('-');
    addTeamData.value.expireTime = dateString; // 更新数据
    showPicker.value = false; // 关闭弹窗
  }
}

// 提交
const onSubmit = async () => {
  const postData = { // 请求数据格式转换
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }
  // TODO 前端参数校验
  const res = await myAxios.post('/team/update', postData);
  if (res?.code === 0 && res.data) {
    showSuccessToast('更新成功');
    router.push({
      path: '/team',
      replace: true, // 提交后不能回退到页面
    })
  } else {
    showFailToast('更新失败' + res?.description);
  }
}
</script>

<style scoped>

</style>