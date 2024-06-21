import request from '@/utils/request'
import qs from 'qs'

//注册接口
export const userRegisterService = ({ userId, password }) => {
  return request.post('user/register', qs.stringify({ userId, password }))
}

export const userLoginService = ({ userId, password }) => {
  return request.post('user/login', qs.stringify({ userId, password }))
}
