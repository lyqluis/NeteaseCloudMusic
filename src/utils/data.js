export function findBlock(blocks, name) {
  return blocks.find(
    (block) => block.blockCode === name
  );
}

export function formatedData(type, arr) {
  if (type === 'playlist') {
    return arr.map(item => {
      const ui = item.uiElement
      return {
        id: item.creativeId,
        picUrl: ui.image.imageUrl,
        labels: ui.labelTexts,
        title: ui.mainTitle.title,
        ...item.resources[0]
      }
    })
  } else if (type === 'podcast') {
    // todo 如果未登陆，数据格式参考 type === song
    return arr.map(item => {
      const ui = item.uiElement
      return {
        id: item.creativeId,
        picUrl: ui.image.imageUrl,
        labels: ui.labelTexts,
        title: ui.mainTitle.title,
      }
    })
  } else if (type === 'song') {
    return arr.map(item => {
      return item.resources.map(song => song.resourceExtInfo.songData)
    })
  }
}