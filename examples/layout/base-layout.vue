<template>
  <div class="doc-base-layout">
    <div class="doc-base-layout_left">
      <el-menu
        v-if="defaultActive"
        class="el-menu-vertical-demo"
        router
        :default-active="defaultActive"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu
          v-for="menu in menus"
          :key="menu.key"
          :index="menu.key"
        >
          <template #title>
            <span class="doc-base-layout_menu-label">{{ menu.title }}</span>
          </template>
          <el-menu-item
            v-for="child in menu.child"
            :key="child.path"
            :index="child.path"
            :route="{path: child.path}"
          >
            {{ child.title }}
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div
      class="doc-base-layout_right"
      @scroll="scrollHandler"
    >
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from 'vue';
import { useRoute } from 'vue-router'
import { navGenerator, NavType } from '~/utils/route'

interface HandlerType {
  (e:Event): void;
}
const scrollhandlers: HandlerType[] = []

// 注册滚动回调
export const registryScrollHandler = (handler: HandlerType) => {
  if(typeof handler === 'function') {
    scrollhandlers.push(handler)
  } else {
    throw new Error('registryScrollHandler 实参应为 function 类型')
  }
}

// 注销滚动回调
export const removeScrollHandler = (handler: HandlerType) => {
  for(let i=0; i<scrollhandlers.length; i++) {
    if(handler === scrollhandlers[i]) {
      scrollhandlers.splice(i, 0)
      return true
    }
  }
  return false
}

export default defineComponent({
  name: 'BaseLayout',
  setup() {
    const route = useRoute()
    const handleOpen = (key: string, keyPath: string) => {
      console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string) => {
      console.log(key, keyPath)
    }

    // 获取默认激活菜单
    const defaultActive = computed(() => {
      return route.path
    })

    // 获取菜单列表
    const menus: Ref<NavType[]> = ref([])
    const loadNavMenus = () => {
      menus.value = navGenerator()
      console.log(menus.value)
    }

    // 页面滚动
    const scrollHandler = (e: Event) => {
      scrollhandlers.forEach((handler) => {
        handler(e)
      })
    }

    onMounted(() => {
      loadNavMenus()
    })

    return {
      handleOpen,
      handleClose,
      menus,
      defaultActive,
      scrollHandler
    }
  }
})

</script>

<style lang="scss">
.doc-base-layout {
  width: 100%;
  height: 100vh;
  display: flex;
}
.doc-base-layout_left {
  width: 320px;
  border-right: 1px solid #eee;
}
.doc-base-layout_right {
  flex: 1;
  padding: 0 30px;
  overflow: auto;
  position: relative;
}
.doc-base-layout_menu-label {
  font-weight: 800;
  font-size: 16px;
}
</style>
