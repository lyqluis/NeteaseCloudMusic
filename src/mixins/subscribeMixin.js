import { mapState, mapActions } from 'vuex'
import { setVal } from 'utils/global'
import { subscribePodcast } from "api/podcast";
import { subscribeArtist } from "api/artist";
import { subscribeUser } from 'api/user'
import { subscribePlaylist } from 'api/playlist'
import { subscribeAlbum } from 'api/album'

const subFns = {
  'podcast': {
    fn: subscribePodcast,
    params: ['rid', 't'],
    txt: '订阅',
    target: 'podcast.subed'
  },
  'artist': {
    fn: subscribeArtist,
    params: ['id', 't'],
    txt: '关注',
    target: 'artist.followed'
  },
  'user': {
    fn: subscribeUser,
    params: ['id', 't'],
    txt: '关注',
    target: 'userInfo.profile.followed'
  },
  'playlist': {
    fn: subscribePlaylist,
    params: ['id', 't'],
    txt: '收藏',
    target: 'playlist.subscribed'
  },
  'album': {
    fn: subscribeAlbum,
    params: ['id', 't'],
    txt: '收藏',
    target: 'album.isSub'
  },
}


export function handleSubscribe(type) {
  const sub = subFns[type]
  const subscribe = sub.fn
  const params = sub.params
  const txt = sub.txt
  const target = sub.target

  return {
    computed: {
      ...mapState('user', ['isLoggedIn'])
    },
    methods: {
      ...mapActions(["openNotice"]),
      handleSubscribe(isSub) {
        if (!this.isLoggedIn) {
          this.openNotice({ msg: '请先登录', type: 'warn' })
          return
        }

        subscribe({
          [params[0]]: this.id,
          [params[1]]: isSub ? 0 : 1
        })
          .then(res => {
            console.log('subscribe:', res)
            let msg
            if (res.code == 200) {
              setVal(this, target, isSub ? false : true)
              msg = isSub ? `取消${txt}` : `${txt}成功`
            } else {
              msg = res.message ?? '出错了'
            }
            this.openNotice({ msg })
          })
          .catch(err => {
            console.error('Error', err)
            this.openNotice({ msg: err.data.blockText ?? '出错了' })
          })
      }
    }
  }
}
