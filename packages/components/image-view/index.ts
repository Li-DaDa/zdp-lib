import { createApp } from 'vue';
import ImageReview from './src/image-view.vue';

// 引入组件时创建
// 创建根节点
const rootDom = document.createElement('div');
document.body.appendChild(rootDom);
const instance = createApp(ImageReview).mount(rootDom);

export const imageReview = (urls: string | string[]) => {
  const root = instance.$root as any;
  root.review(urls);
};
