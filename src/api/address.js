import request from '@/utils/request'

// 请求路径：/da/list
// 请求方式：GET
export const getAddressListService = () => {
  return request.get('/da/list')
}

// 请求路径：/da/add
// 请求方式：POST
// 请求参数类型：json
// 参数名称	说明	类型	是否必须	备注
// contactName	联系人姓名	string	是
// contactSex	联系人性别	number	是	0表示女性
// 1表示男性
// contactTel	联系人电话	string	是
// address	地址	string	是
export const addAddressService = (data) => {
  return request.post('/da/add', data)
}

// 请求路径：/da/update
// 请求方式：PUT
// 请求参数格式：json
// 参数名称	说明	类型	是否必须	备注
// daId	收货地址编号	number	是
// contactName	联系人姓名	string	是
// contactSex	联系人性别	number	是	0表示女性
// 1表示男性
// contactTel	联系人电话	string	是
// address	地址	string	是
export const updateAddressService = (data) => {
  return request.put('/da/update', data)
}

// 请求路径：/da/delete
// 请求方式：DELETE
// 请求参数格式：queryString
// 参数名称	说明	类型	是否必须	备注
// daId	收货地址编号	number	是
export const deleteAddressService = (daId) => {
  return request.delete('/da/delete', {
    params: {
      daId
    }
  })
}
