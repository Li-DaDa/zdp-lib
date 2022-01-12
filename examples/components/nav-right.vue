<template>
  <div class="demo-nav-right">
    <div
      v-for="nav in navs"
      :key="'#' + nav.target"
      class="demo-nav-right_item"
      :class="[{'is-active': curNav === nav.target}]"
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
    const curNav = ref('')
    const titleTagName = 'h2'

    // 获取文档内的 h2
    const loadAllNavs = () => {
      const doms = document.querySelector('#zdp-lib-doc')?.querySelectorAll(titleTagName)
      curNav.value = ''
      Array.prototype.forEach.call(doms, (dom) => {
        if(dom.id) {
          // 初始化激活第一个nav
          if(!curNav.value) {
            curNav.value = dom.id
          }
          navs.value.push({
            label: dom.innerText,
            target: dom.id
          })
        }
      })
    }

    // 页面滚动监听函数
    const scrollHandler = (e: Event) => {
      const scrollTop = (e.target as HTMLElement).scrollTop
      if(!curNav.value) return
      const curDom = document.querySelector('#' + curNav.value)
      if(!curDom) return
      const allTitles = document.querySelector('#zdp-lib-doc')?.querySelectorAll(titleTagName)
      if(!allTitles) return
      const curIndex = Array.prototype.findIndex.call(allTitles, (h2: HTMLElement) => {
        return h2.id === curNav.value
      })
      // 判断当前标题是否卷入
      if((curDom as HTMLElement).offsetTop < scrollTop) {
        if(curIndex < allTitles.length - 1) {
          curNav.value = allTitles[curIndex + 1].id
        }
        return 
      }
      // 判断前一个标题是否出来
      if(curIndex > 0 && allTitles[curIndex - 1].offsetTop > scrollTop) {
        curNav.value = allTitles[curIndex - 1].id
      }
    }

    onMounted(() => {
      registryScrollHandler(scrollHandler)
      loadAllNavs()
    })

    onBeforeUnmount(() => {
      removeScrollHandler(scrollHandler)
    })

    return {
      navs,
      curNav
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
  &.is-active {
    color: $themeColor;
  }
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
