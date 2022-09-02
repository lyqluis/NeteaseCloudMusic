export const menus = [
  {
    name: "Home",
    title: "发现",
    path: "/",
    icon: "fire",
    routes: ['allrank', 'rank', 'artists',]
  },
  {
    name: "Library",
    title: "乐库",
    path: "/library",
    icon: "music",
    routes: ['login', 'user']
  },
  // {
  //   name: "playlist",
  //   title: "歌单",
  //   // path: "/allplaylist",
  //   icon: "github",
  //   routes: []
  // },
  {
    name: "Podcast",
    title: "电台",
    path: "/podcast",
    icon: "podcast",
    routes: []
  },
  {
    name: "Search",
    title: "搜索",
    path: "/search",
    icon: "search",
    routes: ['searchhot', 'searchresult']
  }
];

export const listTypes = {
  'playlist': {
    hasNum: 0,
    hasImg: 1,
    circleImg: 0,
  },
  'song': {
    hasNum: 0,
    hasImg: 1,
    circleImg: 0,
  },
  'album': {
    hasNum: 1,
    hasImg: 0,
    circleImg: 0,
  },
  'artist': {
    hasNum: 0,
    hasImg: 1,
    circleImg: 1,
  },
  'rank': {
    hasNum: 1,
    hasImg: 1,
    circleImg: 0,
  },
  'songlist': {
    hasNum: 0,
    hasImg: 1,
    circleImg: 0,
  },
  'suggestion': {
    hasNum: 0,
    hasImg: 0,
    circleImg: 0,
  },
}

export const playModeIcon = {
  'sequence': 'repeat',
  'loop': 'repeat-1',
  'shuffle': 'shuffle'
}

