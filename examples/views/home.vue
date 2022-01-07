<template>
  <div>
    <div @click="clickHandler">
      home
    </div>
    <test-block />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { imageReview, TestBlock } from '@/index'

export default defineComponent({
  name: 'HomePage',
  components: {
    TestBlock
  },
  setup() {

    const clickHandler = () => {
      imageReview('https://img0.baidu.com/it/u=3436810468,4123553368&fm=26&fmt=auto')
    }

    return {
      clickHandler
    }
  }
})

</script>
