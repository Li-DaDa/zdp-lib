export function stripScript(content: string) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}

export function stripStyle(content: string) {
  const result = content.match(/<(style)[\s\S]*?>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}

export function stripTemplate(content: string) {
  content = content.trim();
  if (!content) {
    return content;
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim();
}

const setupCommentGlobalRegx = /<!--[\r?\n|\r]?(<setup>[\s\S]+)-->/g;
export function removeSetup(content: string) {
  return content.replace(setupCommentGlobalRegx, '').trim();
}

const setupCommentRegx = /<!--[\r?\n|\r]?(<setup>[\s\S]+)-->/;
export function stripSetup(content: string) {
  const result = content.match(setupCommentRegx);
  const comment = result && result[1] ? result[1].trim() : '';
  if (!comment) return comment;
  const result2 = comment.match(/<(setup)>([\s\S]+)<\/\1>/);
  return result2 && result2[2] ? result2[2].trim() : '';
}

/**
 * format kebab-case to PascalCase with space (Pascal Case)
 * @param {string} type
 */
export function formatType(type: string) {
  return type
    .split('-')
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' ');
}

/**
 * get css var value
 * @param {string} namespace
 * @param {string} type
 * @returns
 */
export function getCssVarValue(namespace: string, type: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(
    `--el-${namespace}-${type}`,
  );
}

/**
 * get css var name
 * @param {string} namespace
 * @param {string} type
 * @returns
 */
export function getCssVarName(namespace: string, type: string) {
  return `var(--el-${namespace}-${type})`;
}
