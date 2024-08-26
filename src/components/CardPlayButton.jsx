import { Pause, Play } from "./Player"
import { usePlayerStore } from "@/store/playerStore"

export default function CardPlayButton({ id, size = "small" }) {
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

  const iconClassNames = size === "small" ? "w-4 h-4" : "w-5 h-5"

  return (
    <button className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400"
      onClick={handleClick}
    >
      {isPlayingPlaylist ? <Pause className={iconClassNames} /> : <Play className={iconClassNames} />}
    </button>
  )
}
