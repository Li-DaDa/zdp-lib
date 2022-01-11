/* eslint-disable @typescript-eslint/no-var-requires */
const { compileTemplate, TemplateCompiler } = require('@vue/compiler-sfc');

function stripScript(content) {
  const result = content.match(/<(script) lang="ts">([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}

function stripStyle(content) {
  const result = content.match(/<(style[\s\S]*)?>([\s\S]+)<\/style>/);
  return result && result[2] ? result[2].trim() : '';
}

// 在一个demo模板中，可能存在着多个style，正则需要变一下
function stripStyle2(content) {
  return content.match(/(<style[\s\S]*?>[\s\S]+?<\/style>)/g);
}

// 编写例子时不一定有 template。所以采取的方案是剔除其他的内容
function stripTemplate(content) {
  content = content.trim();
  if (!content) {
    return content;
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim();
}

function pad(source) {
  return source
    .split(/\r?\n/)
    .map((line) => `  ${line}`)
    .join('\n');
}

const templateReplaceRegex = /<template>([\s\S]+)<\/template>/g;
// 这里添加了name，是当前组件的名称，把内部的import提取到最顶层，然后区别名，防止冲突，原来引用的地方定义变量接收这个别名   element这个坑
function genInlineComponentText(template, script, _name) {
  const name = _name.replace('-', '')
  let source = template;
  if (templateReplaceRegex.test(source)) {
    source = source.replace(templateReplaceRegex, '$1');
  }
  const finalOptions = {
    source: `<div>${source}</div>`,
    filename: 'inline-component', // TODO：这里有待调整
    compiler: TemplateCompiler,
    compilerOptions: {
      mode: 'function',
    },
  };
  const compiled = compileTemplate(finalOptions);
  // tips
  if (compiled.tips && compiled.tips.length) {
    compiled.tips.forEach((tip) => {
      console.warn(tip);
    });
  }
  // errors
  if (compiled.errors && compiled.errors.length) {
    console.error(
      `\n  Error compiling template:\n${pad(compiled.source)}\n${
        compiled.errors.map((e) => `  - ${e}`).join('\n')
      }\n`,
    );
  }
  let demoComponentContent = `
    ${(compiled.code).replace('return function render', 'function render')}
  `;
  // 需要提升的import声明
  const imports = []
  // todo: 这里采用了硬编码有待改进
  script = script.trim();
  if (script) {
    script = script
      .replace(/export\s+default/, 'const democomponentExport =')
      .replace(/import ({.*}) from 'vue'/g, (s, s1) => `const ${s1} = Vue`)
      .replace(/import ({.*}) from "vue"/g, (s, s1) => `const ${s1} = Vue`)
      .replace(/import ({.*}) from 'element-plus'/g, (s, s1) => `const ${s1} = require('element-plus')`)
      .replace(/import ({.*}) from "element-plus"/g, (s, s1) => `const ${s1} = require('element-plus')`);
      // 提取import的导入，设置别名
      // 获取所有import
      const importStrs = script.match(/\bimport (.*) from (["|']).*\2/g) || []
      importStrs.forEach((ims) => {
        /**
         * 仅支持 import some from '';  import { some } from ''
         */
        let varStr = ims.match(/import (.*) from .*/)[1]
        if(/^{.*}$/.test(varStr)) {
          // 第二种格式
          varStr = varStr.replace('{', '').replace('}', '').replace(/ /g, '')
          const vars = varStr.split(',')
          const varsArr = []
          let constStr = ''
          vars.forEach((vs) => {
            const nvs = name + '_' + vs
            varsArr.push(vs + ' as ' + nvs)
            constStr += `const ${vs} = ${nvs};\n`
          })

          imports.push(ims.replace(/import (.*) from .*/, (t, p) => {
            return t.replace(p, '{' + varsArr.join(',') + '}')
          }))
          // 替换内部组件import为变量
          script = script.replace(ims, constStr)

        } else if(/^[\w]+$/.test(varStr)) {
          const nvs = name + '_' + varStr
          // 第一种格式
          imports.push(ims.replace(/import (.*) from .*/, (t, p) => {
            return t.replace(p, nvs)
          }))
          // 替换内部组件import为变量
          script = script.replace(ims, `const ${varStr} = ${nvs} \n`)
        }

      })
  } else {
    script = 'const democomponentExport = {}';
  }
  demoComponentContent = `(function() {
    ${demoComponentContent}
    ${script}
    return {
      render,
      ...democomponentExport
    }
  })()`;
  return {
    demoComponentContent,
    imports: imports
  };
}

module.exports = {
  stripScript,
  stripStyle,
  stripStyle2,
  stripTemplate,
  genInlineComponentText,
};
