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
