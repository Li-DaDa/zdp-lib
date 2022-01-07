// import {defineAsyncComponent, AsyncComponentLoader} from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { toCalmel } from '~/utils/str'
import menus from '~/router/conifg'

// const getAsyncComponent = (func: AsyncComponentLoader) => {
//   return defineAsyncComponent({
//     loader: func,
//     delay: 0,
//     timeout: 30000
//   })
// }

// 根据配置，生成路由
export const routesGenerator = () => {
  const routes: Array<RouteRecordRaw> = []
  menus.forEach(menu => {
    if(menu.child) {
      const childRoutes: Array<RouteRecordRaw> = []
      menu.child.forEach(child => {
        const tpl = child.type === 'md' ? `docs/${menu.dir}/${child.tpl}.md` : `views/${menu.dir}/${child.tpl}.vue`
        childRoutes.push({
          path: menu.dir + '/' + child.tpl,
          name: toCalmel(menu.dir)+toCalmel(child.tpl),
          component: () => import(`~/${tpl}`)
        })
      })
      routes.push(...childRoutes)
    }
  })
  return routes
}

export interface NavType {
  title: string;
  key: string;
  child: {
    title: string;
    key: string;
    path: string;
  }[]
}

// 根据配置，生成菜单
export const navGenerator = () => {
  const navs: NavType[] = []
  menus.forEach(menu => {
    const nav: NavType = {
      title: menu.label,
      key: menu.dir,
      child: []
    }
    if(menu.child) {
      menu.child.forEach(child => {
        nav.child.push({
          title: child.label,
          key: child.tpl,
          path: '/' + menu.dir + '/' + child.tpl
        })
      })
    }
    navs.push(nav)
  })
  return navs
}
