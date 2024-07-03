import request from '@/utils/request'
// 请求路径：/cart/set
// 请求方式：POST
// 请求参数格式：json
// 参数名称	说明	类型	是否必须	备注
// foodId	食物编号	number	是
// businessId	商家编号	number	是
// quantity	食物数量	number	是
export const cartSetService = (foodId, businessId, quantity) => {
  const requestData = {
    foodId,
    businessId,
    quantity
  }
  // console.log(requestData)
  return request.post('/cart/set', requestData)
}

// 请求路径：/cart/delete
// 请求方式：DELETE
// 请求参数格式：queryString
// 参数名称	说明	类型	是否必须	备注
// foodId	食物编号	number	是
// businessId	商家编号	number	是

export const cartDeleteService = (foodId, businessId) => {
  return request.delete('/cart/delete', {
    params: {
      foodId,
      businessId
    }
  })
}
