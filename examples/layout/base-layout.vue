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
            :key="child.key"
            :index="child.key"
            :route="{path: child.path}"
          >
            {{ child.title }}
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="doc-base-layout_right">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from 'vue';
import { useRoute } from 'vue-router'
import { navGenerator, NavType } from '~/utils/route'

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

    const defaultActive = computed(() => {
      return route.path
    })

    // 获取菜单列表
    const menus: Ref<NavType[]> = ref([])
    const loadNavMenus = () => {
      menus.value = navGenerator()
    }

    onMounted(() => {
      loadNavMenus()
    })

    return {
      handleOpen,
      handleClose,
      menus,
      defaultActive
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
}
.doc-base-layout_menu-label {
  font-weight: 800;
  font-size: 16px;
}
</style>
