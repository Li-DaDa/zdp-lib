
## 这是一个样例

自定义关闭按钮为文字或其他符号。

:::demo 这是关于这个组件的说明

```html
<template>
  <div class="abcd">
    <div class="dd" @click="hello">assa</div>
    <test-block @click="clickHandler" />
  </div>
</template>

<script lang="ts">
  import { TestBlock } from 'zdp-lib'
  import { defineComponent } from 'vue'

  export default defineComponent({
    components: {
      TestBlock
    },
    setup() {
      const hello = () => {
        alert('Hello World!');
      }

      const clickHandler = () => {
        alert('clickHandler')
      }
      return {
        hello,
        clickHandler
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

## 这是另一个样例

`这是一段说明`

:::demo 这也是一个组件说明

```html
<template>
  <div class="abcd">
    <div class="dd" @click="hello">assa</div>
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

## 这里还有一个标题

* 这
* 个
* 就
* 很
* 高
* 了
* ，
* 你
* 看
* 是
* 不
* 是

## 这里还有一个表格

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title     | 标题           | string | — | — |
| type | 主题 | string | success/warning/info/error | info |
| description | 辅助性文字。也可通过默认 slot 传入 | string | — | — |
| closable | 是否可关闭 | boolean | — | true |
| center | 文字是否居中 | boolean | — | true |
| close-text | 关闭按钮自定义文本 | string | — | — |
| show-icon | 是否显示图标 | boolean | — | false |
| effect | 选择提供的主题 | string | light/dark | light |
