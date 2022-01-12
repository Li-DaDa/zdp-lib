
## 这是另一个样例

`这是一段说明`

:::demo 这也是一个组件说明

```html
<template>
  <div class="abcd" @click="test">
    调用函数
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { TestFunction } from 'zdp-lib'

  export default defineComponent({
    setup() {
      const test = () => {
        TestFunction('Hello World')
      }
      return {
        test
      }
    }
  })
</script>

<style lang="scss">
  .abcd {
    .dd {
      color: red;
    }
  }
</style>

```

:::
