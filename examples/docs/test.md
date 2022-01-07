
### 自定义关闭按钮

自定义关闭按钮为文字或其他符号。

:::demo 在 Alert 组件中

```html
<template>
  <div class="abcd">
    <div class="dd">assa</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    setup() {
      const hello = () => {
        alert('Hello World!');
      }
      return {
        hello
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
