<template>
  <div
    class="demo-block"
    :class="[blockClass, { 'hover': hovering }]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div class="source">
      <slot name="source" />
    </div>
    <div
      ref="meta"
      class="meta"
    >
      <div
        v-if="$slots.default"
        class="description"
      >
        <slot />
      </div>
      <div class="highlight">
        <slot name="highlight" />
      </div>
    </div>
    <div
      ref="control"
      class="demo-block-control"
      :class="{ 'is-fixed': fixedControl }"
      @click="isExpanded = !isExpanded"
    >
      <transition name="arrow-slide">
        <i :class="[iconClass, { 'hovering': hovering }]" />
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
      <div class="control-button-container">
        <el-button
          v-show="isExpanded"
          ref="copyButton"
          size="small"
          type="text"
          class="control-button copy-button"
          @click.stop="copy"
        >
          复制代码片段
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { nextTick } from 'vue';
import hljs from 'highlight.js';
import clipboardCopy from 'clipboard-copy';
import { ElButton } from 'element-plus';
import {
  stripScript, stripStyle, stripTemplate, stripSetup, removeSetup,
} from '../util';

const stripTemplateAndRemoveTemplate = (code) => {
  const result = removeSetup(stripTemplate(code));
  if (result.indexOf('<template>') === 0) {
    const html = result.replace(/^<template>/, '').replace(/<\/template>$/, '');
    return html.replace(/^[\r?\n|\r]/, '').replace(/[\r?\n|\r]$/, '').trim();
  }
  return result;
};
const sanitizeHTML = (str) => {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
};
export default {

  components: {
    ElButton,
  },
  data() {
    return {
      codepen: {
        script: '',
        html: '',
        style: '',
        full: '',
      },
      hovering: false,
      isExpanded: false,
      fixedControl: false,
      scrollParent: null,
      showSetup: false,
      hasSetup: false,
    };
  },

  computed: {

    blockClass() {
      return `demo-zh-CN demo-${this.$router.currentRoute.value.path.split('/').pop()}`;
    },

    iconClass() {
      return this.isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom';
    },

    controlText() {
      return this.isExpanded ? '隐藏代码' : '显示代码';
    },

    codeArea() {
      return this.$el.getElementsByClassName('meta')[0];
    },

    displayDemoCode() {
      return this.showSetup ? this.codepen.setup : this.codepen.script;
    },
  },

  watch: {
    isExpanded(val) {
      this.setCodeAreaHeight();
      if (!val) {
        this.fixedControl = false;
        this.$refs.control.style.left = '0';
        this.removeScrollHandler();
        return;
      }
      setTimeout(() => {
        this.scrollParent = document.querySelector('.page-component__scroll > .el-scrollbar__wrap');
        // eslint-disable-next-line no-unused-expressions
        this.scrollParent && this.scrollParent.addEventListener('scroll', this.scrollHandler);
        this.scrollHandler();
      }, 200);
    },
  },

  created() {
    // eslint-disable-next-line no-debugger
    const highlight = this.$slots.highlight && this.$slots.highlight();
    if (highlight && highlight[0]) {
      let code = '';
      let cur = highlight[0];
      if (cur.type === 'pre' && (cur.children && cur.children[0])) {
        // eslint-disable-next-line prefer-destructuring
        cur = cur.children[0];
        if (cur.type === 'code') {
          code = cur.children;
        }
      }
      this.codepen.full = '';
      if (code) {
        this.codepen.full = code;
        this.codepen.html = stripTemplateAndRemoveTemplate(code);
        this.codepen.script = stripScript(code);
        this.codepen.style = stripStyle(code);
        this.codepen.setup = stripSetup(code);
        if (this.codepen.setup) {
          this.hasSetup = true;
        }
      }
    }
  },

  beforeUnmount() {
    this.removeScrollHandler();
  },

  mounted() {
    this.prettyCode();
  },

  methods: {
    getCodeAreaHeight() {
      if (this.$el.getElementsByClassName('description').length > 0) {
        return this.$el.getElementsByClassName('description')[0].clientHeight
            + this.$el.getElementsByClassName('highlight')[0].clientHeight + 20;
      }
      return this.$el.getElementsByClassName('highlight')[0].clientHeight;
    },
    setCodeAreaHeight() {
      this.codeArea.style.height = this.isExpanded ? `${this.getCodeAreaHeight() + 1}px` : '0';
    },
    prettyCode() {
      nextTick(() => {
        const highlight = this.$el.querySelector('.highlight');
        const hlcode = highlight.querySelector('pre code');
//         const innerScript = `<script>
//   ${this.displayDemoCode}
// <\\/script>
// `;
//         const innerStyle = this.codepen.style && this.codepen.style.trim() ? `<style>
//   ${this.codepen.style}
// </style>
// ` : '';
        hlcode.innerHTML = sanitizeHTML(this.codepen.full);

        nextTick(() => {
          if (this.$el.getElementsByClassName('description').length === 0) {
            highlight.style.width = '100%';
            highlight.borderRight = 'none';
          }
          try {
            hljs.highlightBlock(hlcode);
          } catch (error) {
            console.log(error);
          }
        });
      });
    },
    copy() {
      const res = clipboardCopy(this.codepen.full);

      res.then(() => {
        this.$message({
          showClose: true,
          message: '已复制！',
          type: 'success',
        });
      }).catch(() => {
        this.$message({
          showClose: true,
          message: '该浏览器不支持自动复制！',
          type: 'error',
        });
      });
    },

    scrollHandler() {
      const { top, bottom, left } = this.$refs.meta.getBoundingClientRect();
      const controlBarHeight = 44;
      this.fixedControl = bottom + controlBarHeight > document.documentElement.clientHeight
          && top <= document.documentElement.clientHeight;
      this.$refs.control.style.left = this.fixedControl ? `${left}px` : '0';
    },

    removeScrollHandler() {
      // eslint-disable-next-line no-unused-expressions
      this.scrollParent && this.scrollParent.removeEventListener('scroll', this.scrollHandler);
    },
  },
};
</script>
<style lang="scss">
  .demo-block {
    border: solid 1px var(--el-border-color-base);
    border-radius: 3px;
    transition: .2s;

    &.hover {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
    }

    code {
      font-family: Menlo, Monaco, Consolas, Courier, monospace;
    }

    .demo-button {
      float: right;
    }

    .source {
      padding: 24px;
    }

    .meta {
      background-color: #fafafa;
      border-top: solid 1px var(--el-border-color-base);
      overflow: hidden;
      height: 0;
      transition: height .2s;
    }

    .description {
      padding: 20px;
      box-sizing: border-box;
      border: solid 1px var(--el-border-color-base);
      border-radius: 3px;
      font-size: 14px;
      line-height: 22px;
      color: var(--el-text-color-regular);
      word-break: break-word;
      margin: 10px;
      background-color: #fff;

      p {
        margin: 0;
        line-height: 26px;
      }

      code {
        color: #5e6d82;
        background-color: #e6effb;
        margin: 0 4px;
        display: inline-block;
        padding: 1px 5px;
        font-size: 12px;
        border-radius: 3px;
        height: 18px;
        line-height: 18px;
      }
    }

    .highlight {
      pre {
        margin: 0;
      }

      code.hljs {
        margin: 0;
        border: none;
        max-height: none;
        border-radius: 0;

        &::before {
          content: none;
        }
      }
    }

    .demo-block-control {
      border-top: solid 1px var(--el-border-color-base);
      height: 44px;
      box-sizing: border-box;
      background-color: #fff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      text-align: center;
      margin-top: -1px;
      color: #d3dce6;
      cursor: pointer;
      position: relative;

      &.is-fixed {
        position: sticky;
        bottom: 0;
      }

      i {
        font-size: 16px;
        line-height: 44px;
        transition: .3s;
        &.hovering {
          transform: translateX(-40px);
        }
      }

      > span {
        position: absolute;
        transform: translateX(-30px);
        font-size: 14px;
        line-height: 44px;
        transition: .3s;
        display: inline-block;
      }

      &:hover {
        color: #409EFF;
        background-color: #f9fafc;
      }

      & .text-slide-enter,
      & .text-slide-leave-active {
        opacity: 0;
        transform: translateX(10px);
      }

      .control-button-container {
        line-height: 40px;
        position: absolute;
        top: 0;
        right: 0;
        padding-left: 5px;
        padding-right: 25px;
      }

      .control-button-container-left {
        left: 0;
        width: 100px;
        padding-left: 14px; // 14 + 10 = 24px .hljs code padding left 24
      }

      .control-button {
        font-size: 14px;
        margin: 0 10px;
        cursor: pointer;
      }
    }
  }
</style>
