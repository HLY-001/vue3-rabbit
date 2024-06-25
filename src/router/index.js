import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/login/index.vue'
import layout from '@/views/layout/index.vue'
import home from '@/views/home/index.vue'
import category from '@/views/category/index.vue'
import subcategory from '@/views/subcategory/index.vue'
import detail from '@/views/detail/index.vue'
import cartlist from '@/views/cartlist/index.vue'
import checkout from '@/views/checkout/index.vue'
import pay from '@/views/pay/index.vue'
import payback from '@/views/pay/payback.vue'
import member from '@/views/member/index.vue'
import userinfo from '@/views/member/components/userinfo.vue'
import userorder from '@/views/member/components/userorder.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component:layout,
      children:[
        {path:'',component:home},
        {path:'category/:id',component:category},
        {path:'category/sub/:id',component:subcategory},
        {path:'detail/:id',component:detail},
        {path:'cartlist',component:cartlist},
        {path:'checkout',component:checkout},
        {path:'pay',component:pay},
        {path:'paycallback',component:payback},
        { 
          path:'member',
          component:member,
          children:[
            {path:'',component:userinfo},
            {path:'order',component:userorder}
          ]
        }
      ]
    },
    {path:'/login',component:login}
  ],
  //路由滚动行为定制
  scrollBehavior(){
    return{
      top:0
    }
  }
})

export default router
