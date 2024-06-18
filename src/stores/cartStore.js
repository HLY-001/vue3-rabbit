import {defineStore} from 'pinia'

defineStore('cart',()=>{
  //1.定义state-cartList
  const cartList = ref([])
  //2.定义action-addCart
  const addCart = ()=>{

  }
  return{
    cartList,
    addCart
  }
})