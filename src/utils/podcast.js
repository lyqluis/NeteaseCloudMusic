/**
 * @func: 
 * @param {Array} programs
 * @return {Array} programs.mainSongs
 */
export function handleProgramsData(programs) {
  return programs.map(program => {
    const track = program.mainSong
    track.album.picUrl = program.coverUrl
    track.album.blurPicUrl = program.blurCoverUrl
    if (program.rank !== undefined) {
      track.rank = program.rank
    }
    return track
  })
}