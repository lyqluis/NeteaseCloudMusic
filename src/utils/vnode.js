export const getRefsEl = (name, root) => {
  let node = root.$refs[name]
  if (node) return node
  root = root.$children
  if (Array.isArray(root)) {
    for (let i = 0, len = root.length; i < len; i++) {
      node = getRefsEl(name, root[i])
      if (node) return node
    }
  }
}
