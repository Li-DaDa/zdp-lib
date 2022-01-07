import { App } from 'vue';
import TestBlock from './components/test-block';
import { imageReview } from './components/image-view';

console.log('abc')

const components = [TestBlock];

const install: any = function (Vue: App) {
  if (install.installed) return;
  components.map((component) => Vue.component(component.name, component));
  install.installed = true;
};

export {
  TestBlock,
};

export {
  imageReview
}

export default {
  install,
  TestBlock,
  imageReview
};
