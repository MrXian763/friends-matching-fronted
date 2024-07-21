import myAxios from "../plugins/myAxios.js";

/**
 * 获取所有标签（构造好的父子标签）
 */
const getAllTags = async () => {
    return await myAxios.get('/tag/all');
}

export default getAllTags()