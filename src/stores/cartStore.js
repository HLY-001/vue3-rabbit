// 封装购物车模块
import {defineStore} from 'pinia'
import {ref,computed} from 'vue'
import { useUserStore } from './user.js'
import { insertCartAPI,findNewCartListAPI,delCartAPI } from '@/apis/cart'
export const useCartStore = defineStore('cart',()=>{
  const userStore = useUserStore()
  const isLogin = computed(()=>userStore.userInfo.token)
  //1.定义state-cartList
  const cartList = ref([])
  //2.定义action-addCart
  const addCart =async (goods)=>{
    const {skuId,count} = goods
    if(isLogin.value){
       // 登录之后的加入购车逻辑
      await insertCartAPI({skuId,count})
      updateNewList()
    }else{
      //添加购物车操作
      //已添加过-count+1
      //没有添加过-直接push
      //思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
      const item = cartList.value.find(item => goods.skuId === item.skuId)
      if(item){
        item.count++
      }else{
        cartList.value.push(goods)
      }
    }   
  }
 // 删除购物车
  const delCart =async (skuId)=>{
    if(isLogin.value){
      // 登录之后的删除购车逻辑
     await delCartAPI([skuId])
     updateNewList()
    }else{
      // 思路：
      // 1. 找到要删除项的下标值 - splice
      // 2. 使用数组的过滤方法 - filter
      const idx = cartList.value.findIndex(item => skuId === item.skuId)
      cartList.value.splice(idx,1)
    }
    
  }
  //获取最新购物车列表action
  const updateNewList=async()=>{
    const res = await findNewCartListAPI()
     cartList.value = res.result
  }
  //清除购物车
  const clearCart = ()=>{
    cartList.value=[]
  }
  // 单选
  const singleCheck = (skuId,selected)=>{
    const item = cartList.value.find(item => item.skuId === skuId)
    item.selected = selected
  }
  // 全选功能
  const allCheck = (selected)=>{
    cartList.value.forEach(item => item.selected = selected)
  }
  //计算属性
  //1,总的数量所有项的count之和
  const allCount = computed(()=>cartList.value.reduce((sum,item)=>sum+item.count,0))
  //2.总价所有项的count*price之和.
  const allPrice = computed(()=>cartList.value.reduce((sum,item)=>sum+item.count*item.price,0))  
  // 是否全选计算属性
  const isAll=computed(()=>cartList.value.every(item =>item.selected))
  // 3. 已选择数量
  // const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  const selectedCount = computed(()=>cartList.value.filter(item => item.selected).reduce((sum,item) => sum+item.count,0))
  // 4. 已选择商品价钱合计
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))
  return{
    cartList,
    allCount,
    allPrice,
    isAll,
    selectedCount,
    selectedPrice,
    addCart,
    delCart,
    singleCheck,
    allCheck,
    clearCart,
    updateNewList
  }
},{
  persist:true
})