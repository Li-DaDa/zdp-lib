<template>
  <div class="doc-index">
    <div class="doc-index_container">
      <div class="doc-index_title">
        大数据平台业务组件
      </div>
      <div class="doc-index_container-btns">
        <div class="doc-index_container-btn">
          Git地址
        </div>
        <div
          class="doc-index_container-btn"
          @click="$router.push('/guide/test')"
        >
          进入文档
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    return {}
  }
})

</script>

<style lang="scss">
.doc-index {
  height: 100vh;
  background: linear-gradient(to left bottom, #fff9b3 0%, #b3f2ff 100%);
  position: relative;
}
.doc-index_container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.doc-index_title {
  font-weight: 300;
  text-align: center;
  font-size: 40px;
  margin-bottom: 40px;
}
.doc-index_container-btns {
  display: flex;
}
.doc-index_container-btn {
  border: 1px solid #42b983;
  border-radius: 50px;
  padding: 12px 32px;
  color: #42b983;
  margin: 10px 10px;
  cursor: pointer;
  opacity: 0.8;
  transition: all 0.2s;
  & + .doc-index_container-btn {
    background: #42b983;
    color: #fff;
  }
  &:hover {
    opacity: 1;
  }
}
</style>
