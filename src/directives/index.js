// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'
export const lazyPlugin={
  install(app){   
    //定义全局指令
    app.directive('img-lazy',{
      mounted(el,binding){
        //el:指令绑定的那个元素img
        //binding:binding.value指令等于号后面绑定的表达式的值图片url
        const {stop} = useIntersectionObserver(
          el,
          ([{isIntersecting}])=>{
            //console.log(isIntersecting);
            if(isIntersecting){
              el.src=binding.value
              stop()
            }
          }
        )
      }
    })
  }
}