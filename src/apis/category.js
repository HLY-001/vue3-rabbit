import httpInstance from '@/utils/http'

export const getTopCategoryAPI = (id)=>{
  return httpInstance('/category',{
    params:{
      id
    }}
  )
}