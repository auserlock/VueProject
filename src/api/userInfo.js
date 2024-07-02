import request from '@/utils/request'

//注册接口
// 请求路径：/user/get
// 请求方式：GET
export const getUserInfoService = () => {
  return request.get('/user/get')
}
