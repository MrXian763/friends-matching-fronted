import {UserType} from "./user";

/**
 * 队伍类别
 */
export type TeamType = {
    id: number;
    name: string;
    description: string;
    expireTime?: Date;
    maxNum: number;
    password?: string;
    // TODO 定义枚举值类型更规范
    status: number;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
    hasJoin: boolean;
    hasJoinNum?: number;
};