import myAxios from "../plugins/myAxios.ts";
import {getCurrentUserState, setCurrentUserState} from "../states/user.ts";

/**
 * 获取当前登录用户
 */
export const getCurrentUser = async () => {
    const currentUser = getCurrentUserState(); // 获取内存中的当前登录用户
    if (currentUser) {
        return currentUser;
    }
    // 内存中没有则从远程获取
    const res = await myAxios.get('/user/current');
    if (res.code === 0) {
        setCurrentUserState(res.data); // 将当前登录用户存到内存中
        // console.log(JSON.stringify(store.state.loginUser))
        return res.data;
    }
    return null;
}