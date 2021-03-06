const md = require('./config');
const {
  stripScript,
  stripTemplate,
  stripStyle2,
  genInlineComponentText,
} = require('./util');

module.exports = (source) => {
  const content = md.render(source);

  // 组件的script必须要有，否则ts会报错
  let pageScript = `<script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Test',
    setup() {
      return {};
    },
  });
  
  </script>
  `;

  const startTag = '<!--element-demo:';
  const startTagLen = startTag.length;
  const endTag = ':element-demo-->';
  const endTagLen = endTag.length;

  let componentsString = '';
  let id = 0; // demo 的 id
  const output = []; // 输出的内容
  let start = 0; // 字符串开始位置
  // 收集demo中定义的css
  const styles = [];

  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart));

    const commentContent = content.slice(commentStart + startTagLen, commentEnd);
    const html = stripTemplate(commentContent);
    const script = stripScript(commentContent);
    const style = stripStyle2(commentContent);
    styles.push(...style);
    const demoComponentContent = genInlineComponentText(html, script);
    const demoComponentName = `element-demo${id}`;
    output.push(`<template #source><${demoComponentName} /></template>`);
    componentsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`;

    // 重新计算下一次的位置
    id++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }

  // 仅允许在 demo 不存在时，才可以在 Markdown 中写 script 标签
  // todo: 优化这段逻辑

  if (componentsString) {
    pageScript = `<script lang="ts">
      import * as Vue from 'vue';
      export default {
        name: 'component-doc',
        components: {
          ${componentsString}
        }
      }
    </script>`;
  } else if (content.indexOf('<script>') === 0) { // 硬编码，有待改善
    start = content.indexOf('</script>') + '</script>'.length;
    pageScript = content.slice(0, start);
  }

  output.push(content.slice(start));
  const result = `
  <template>
    <section class="content element-doc">
      ${output.join('')}
    </section>
  </template>
  ${pageScript}
  ${styles.join('\n')}
  `;
  return result;
};
