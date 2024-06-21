import request from '@/utils/request'

export const businessGetListService = () => {
  return request.get('/business/get')
}

export const businessGetByTypeService = (value) => {
  return request.get('/business/getByType', {
    params: {
      orderTypeId: value
    }
  })
}
