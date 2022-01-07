/**
 * @description 配置结构
 */
export interface NavType {
  label: string;
  dir: string;
  child?: {
    label: string;
    tpl: string;
    type: 'md' | 'vue'
  }[]
}

// 配置对象
const menus:NavType[] = [
  {
    label: '指南', // 生成的菜单名称
    dir: 'guide', // 对应的文件目录，用于子菜单查找文件
    child: [
      {
        label: '介绍', // 菜单名称
        tpl: 'introduce', // 对应的文件
        type: 'md' // 文件的类型，分为 md 和 vue，md为markdown文档，tpl会去docs目录下加载，vue 为vue文档，会去 views 目录下加载
      }, {
        label: '测试',
        tpl: 'test',
        type: 'vue'
      }
    ]
  }
]

export default menus
