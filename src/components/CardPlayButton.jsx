import { Pause, Play } from "./Player"
import { usePlayerStore } from "@/store/playerStore"

export default function CardPlayButton({ id }) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state)

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false)
      return
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then(response => response.json())
      .then(data => {
        const { songs, playlist } = data

        setIsPlaying(true)
        setCurrentMusic({ songs, playlist, song: songs[0] })
      })
  }


  console.log(isPlayingPlaylist)
  return (
    <button className="card-play-button rounded-full bg-green-500 p-4"
      onClick={handleClick}
    >
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  )
}
