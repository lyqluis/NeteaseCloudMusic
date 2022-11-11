export const menus = [
  {
    name: "Now",
    title: "现在就听",
    path: "/now",
    icon: "play-circle-filled",
    routes: ['allrank', 'rank', 'artists',]
  },
  {
    name: "Home",
    title: "浏览",
    path: "/",
    // icon: "browse",
    icon: "star",
    routes: ['allrank', 'rank', 'artists',]
  },
  {
    name: "Radio",
    title: "播客",
    path: "/radio",
    icon: "radio",
    routes: []
  },
  {
    name: "Library",
    title: "乐库",
    path: "/library",
    icon: "albums",
    routes: ['login', 'user']
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
  'podcast': {
    hasNum: 0,
    hasImg: 1,
    circleImg: 0,
  },
}

export const playModeIcon = {
  'sequence': 'repeat',
  'loop': 'repeat-1',
  'shuffle': 'shuffle'
}

export const COVER_TYPE = [
  "album",
  "artist",
  "podcast",
  "playlist",
]

export const APPLE_MOODS_PICS = [
  'https://is2-ssl.mzstatic.com/image/thumb/Features114/v4/fa/53/4b/fa534b5a-cfcf-ec6e-6f65-201d0b046a14/source/680x382mv.webp',
  'https://is2-ssl.mzstatic.com/image/thumb/Features114/v4/8e/d3/f8/8ed3f8c5-e866-1ba8-2f39-ec49b23a07d7/source/680x382mv.webp',
  'https://is4-ssl.mzstatic.com/image/thumb/Features114/v4/60/f5/a2/60f5a289-3dd2-2d6a-2d14-7c926109791e/source/680x382mv.webp',
  'https://is1-ssl.mzstatic.com/image/thumb/Features116/v4/eb/49/d6/eb49d678-ca48-11f8-06e7-43edea87a67f/source/680x382mv.webp',
  'https://is3-ssl.mzstatic.com/image/thumb/Features116/v4/fb/f4/98/fbf49875-78cd-ee5a-3c38-3f8c943d4e58/source/680x382mv.webp',
  'https://is4-ssl.mzstatic.com/image/thumb/Features124/v4/af/2f/48/af2f480e-9197-6910-2d8c-9e6650e30304/source/680x382mv.webp',
  'https://is5-ssl.mzstatic.com/image/thumb/Features114/v4/57/4a/59/574a59d7-5a35-6c83-58fa-b61b47a34364/source/680x382mv.webp',
  'https://is1-ssl.mzstatic.com/image/thumb/Features114/v4/52/76/e8/5276e8e3-17b5-500f-6514-ff730e7e3247/source/680x382mv.webp',
  'https://is5-ssl.mzstatic.com/image/thumb/Features126/v4/49/a7/e6/49a7e6ac-f203-98f2-84ac-8bb002b4a002/source/680x382mv.webp',
  'https://is2-ssl.mzstatic.com/image/thumb/Features126/v4/47/9d/74/479d74ec-94f3-928f-e9b3-381188bda5eb/source/680x382mv.webp',
]
