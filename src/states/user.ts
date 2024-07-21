// 内存存储当前已经登录的用户信息
import {UserType} from "../models/user";

let currentUser: UserType;

// 存储当前登录用户
const setCurrentUserState = (user: UserType) => {
    currentUser = user;
}

// 获取当前登录用户
const getCurrentUserState = () : UserType => {
    return currentUser;
}

// 清空内存中当前登录用户
const clearCurrentUserState = () => {
    setCurrentUserState(null);
}

export {
    setCurrentUserState,
    getCurrentUserState,
    clearCurrentUserState,
}