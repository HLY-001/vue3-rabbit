<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'
//触发获取导航列表的action
import {useCategoryStore} from '@/stores/category'
import { onMounted } from 'vue';

const CategoryStore =useCategoryStore()
onMounted(()=>{
  CategoryStore.getCategory()
})
</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>