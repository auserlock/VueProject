import request from '@/utils/request'
import qs from 'qs'
//注册接口
// 请求路径：/user/get
// 请求方式：GET
export const getUserInfoService = () => {
  return request.get('/user/get')
}

// 请求路径：/user/update
// 请求方式：PUT
// 请求参数格式：json
// 参数名称	说明	类型	是否必须	备注
// userName	用户昵称	string	是	6 - 16位
// userSex	用户性别	number	是	1表示男
export const updateUserInfoService = (userName, userSex) => {
  return request.put('/user/update', {
    userName,
    userSex
  })
}

// 请求路径：/user/updateImg
// 请求方式：PUT
// 请求参数格式：x - www - form - urlencoded
// 参数名称	说明	类型	是否必须	备注
// userImg	用户头像	string	是
export const updateUserImgService = (userImg) => {
  return request.put(
    '/user/updateImg',
    qs.stringify({
      userImg
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}

// 请求路径：/user/update
// 请求方式：PUT
// 请求参数格式：x - www - form - urlencoded
// 参数名称	说明	类型	是否必须	备注
// password	用户密码	string	是	6 - 16位
export const updateUserPwdService = (password) => {
  return request.put(
    '/user/updatePassword',
    qs.stringify({
      password
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}
