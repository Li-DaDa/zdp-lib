import { App } from 'vue';
import TestBlock from './test.vue';

console.log('aaaa')

TestBlock.install = (Vue: App) => {
  Vue.component(TestBlock.name, TestBlock)
}

export default TestBlock
