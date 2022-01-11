<template>
  <div class="demo-nav-right">
    <div
      v-for="nav in navs"
      :key="nav.target"
      class="demo-nav-right_item"
    >
      <a :href="nav.target">{{ nav.label }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import { registryScrollHandler, removeScrollHandler } from '../layout/base-layout.vue'

export default defineComponent({
  name: 'NavRight',
  setup() {
    const navs = ref<{label: string; target: string}[]>([])
    const curNav = ref(null)

    // 获取文档内的 h2
    const loadAllNavs = () => {
      const doms = document.querySelector('#zdp-lib-doc')?.querySelectorAll('h2')
      curNav.value = null
      Array.prototype.forEach.call(doms, (dom) => {
        if(dom.id) {
          // 初始化激活第一个nav
          if(!curNav.value) {
            curNav.value = dom
          }
          navs.value.push({
            label: dom.innerText,
            target: '#' + dom.id
          })
        }
      })
    }

    // 页面滚动监听函数
    const scrollHandler = (e: Event) => {
      // e.scrollTop
      console.dir((e.target as HTMLElement).scrollTop)
    }

    onMounted(() => {
      registryScrollHandler(scrollHandler)
      loadAllNavs()
    })

    onBeforeUnmount(() => {
      removeScrollHandler(scrollHandler)
    })

    return {
      navs
    }
  }
})

</script>

<style lang="scss">
$themeColor: #409eff;

.demo-nav-right {
  width: 170px;
  position: fixed;
  right: 10px;
  top: 20px;
  font-size: 12px;
  border-left: 1px solid #eee;
}
.demo-nav-right_item {
  line-height: 1.5;
  margin: 6px 0 6px 10px;
  color: #606266;
  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.2s;
    &:hover {
      text-decoration: underline;
      color: $themeColor;
    }
  }
}
</style>
