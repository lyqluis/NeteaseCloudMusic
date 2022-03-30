function isPlayable(track, privileges) {
  return privileges.find(t => track.id === t.id)
}
