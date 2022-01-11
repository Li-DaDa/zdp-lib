import { App } from 'vue';
import TestBlock from './components/test-block';
import { imageReview } from './components/image-view';
import TestFunction from './components/functionTest'

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

export {
  TestFunction
}

export default {
  install,
  TestBlock,
  imageReview,
  TestFunction
};
