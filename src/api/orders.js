import request from '@/utils/request'

// 请求路径：/orders/add
// 请求方式：POST
// 请求参数格式：querystring
// 参数名称	说明	类型	是否必须	备注
// businessId	商家编号	number	是
// daId	送货地址Id	number	是
export const ordersAddService = (businessId, daId) => {
  return request.post('/orders/add', null, {
    params: {
      businessId,
      daId
    }
  })
}

// 请求路径：/orders/list
// 请求方式：GET
export const ordersGetService = () => {
  return request.get('/orders/list')
}

// 请求路径：/orders/update
// 请求方式：PUT
// 请求参数格式：json
// 参数名称	说明	类型	是否必须	备注
// orderId	订单编号	number	是	不可变
// businessId	商家编号	number	是	不可变
// daId	送货地址编号	number	是
// orderState	订单状态	number	是
export const ordersUpdateService = (orderId, orderState) => {
  return request.put('/orders/update', {
    orderId,
    orderState
  })
}
