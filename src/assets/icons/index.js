/**
 * svg图标自动导入
 * 利用webpack的reqiure.context自动导入
 */

// 创建新的上下文环境（模块），指向 './svg'
// req是只加载指定目录中模块的函数
// './svg' - 目标目录，false - 无需递归，/\.svg$/ - 文件匹配规则
const req = require.context('./svg', false, /\.svg$/)

// req.keys()返回一个数组，map遍历在递归一次，分别指向所有的svg模块
req.keys().map(req)
