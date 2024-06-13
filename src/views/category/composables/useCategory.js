//封装category相关的业务代码
import {getTopCategoryAPI} from '@/apis/category'
import {ref,onMounted} from 'vue'
import {useRoute} from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'

export function useCategory (){
  const categoryData = ref({})
  const route = useRoute()
  const getCategory = async (id) => {
      // 如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
    const res = await getTopCategoryAPI(id)
    categoryData.value = res.result
  }
  onMounted(()=>{
    getCategory(route.params.id)
  })
  //目标：路由参数变化的时候可以把分类数据接口重新发送
  onBeforeRouteUpdate((to)=>{
    //存在问题：使用最新的路由参数请求最新的分类数据
    getCategory(to.params.id)
  })
  return{
    categoryData
  }
}