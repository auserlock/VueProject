import request from '@/utils/request'

//注册接口
export const userRegisterService = ({ userId, password }) => {
  return request.post(
    'user/register',
    { userId, password },
    {
      headers: {
        'Content-Type': 'x-www-form-urlencoded'
      }
    }
  )
}

export const userLoginervice = ({ userId, password }) => {
  return request.post(
    'user/login',
    { userId, password },
    {
      headers: {
        'Content-Type': 'x-www-form-urlencoded'
      }
    }
  )
}
