// https://github.com/luukdv/color.js
import { prominent, average } from 'color.js'

/** 
  * 使用sRGB Luma方法计算灰度
  * grayLevel = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255
 */
function findTextColor(rgbArr) {
  const threshold = 0.8 // 阈值
  // > 0.5 , 图片色值偏向 #fff, 字体颜色应为 #000；< 0.5, color: #fff
  const grayLevel = (0.2126 * rgbArr[0] + 0.7152 * rgbArr[1] + 0.0722 * rgbArr[2]) / 255;
  console.log('grayLevel', grayLevel)
  return grayLevel > threshold ? 'dark' : 'light'
}

function transToRGB(arr) {
  return 'rgb(' + arr.join(',') + ')'
}

const options = {
  format: 'hex'
}

export default {
  data() {
    return {
      desColorType: '',
    }
  },
  mounted() { },
  watch: {
    playlist(playlist) {
      if (playlist.coverImgUrl) {
        // prominent(playlist.coverImgUrl).then(colors => {
        //   console.log('🎨 prominent', colors)
        //   colors.map(c => {
        //     const color = transToRGB(c)
        //     console.log(`%c  ${color}  `, `background: ${color}`)
        //     console.log(resBgColor(c))
        //   })
        // })
        average(playlist.coverImgUrl).then(c => {
          this.desColorType = findTextColor(c)
          const color = transToRGB(c)
          console.log(`🎨 average %c  ${color}  `, `background: ${color}`)
        })
      }
    }
  }
}