import { App } from 'vue';
import TestBlock from './test.vue';

TestBlock.install = (Vue: App) => {
  Vue.component(TestBlock.name, TestBlock)
}

export default TestBlock
