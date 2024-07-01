import request from '@/utils/request'

export const businessGetFoodListService = (value) => {
  return request.get('/food', {
    params: {
      businessId: value
    }
  })
}
