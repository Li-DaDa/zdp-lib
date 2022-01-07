<template>
  <div class="block">
    <div>test-block</div>
    <el-button>click</el-button>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from 'vue';
import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'TestBlock',
  components: {
    ElButton
  },
  setup() {
    const dts = reactive({});

    return {
      ...toRefs(dts),
    };
  },

});
</script>

<style lang="scss">
.block {
  background: url(./imgs/1.jpg);
}
</style>
