import httpInstance from '@/utils/http'

export function getCategoryAPI(){
  return httpInstance.get('/home/category/head')
}