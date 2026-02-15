import AudioPlayer, {type Song} from './AudioPlayer';

function getPlaylist(): Song[] {
    const playlist: Song[] = [];
    for (let i: number = 0; i < 12; i++) {
        const song: Song = {
            id: i + 1,
            title: "Song "  + String(i + 1),
            artist: "Artist "  + String(i + 1),
            src: "/music/song" + String(i + 1) + ".mp3",
            cover: "/covers/cover" + String(i + 1) + ".png"
        }
        playlist.push(song);
    }
    return playlist;
}


function App() {
    return (
        <div style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "2rem",
            textBox: "center"
        }}>
            <div
                className={"audio-player-wrapper"}
                style={{
                    margin: "auto",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    minWidth: "250px",
                    width: "600px",
                    height: "740px",
                    overflow: "hidden"
                }}
            >
                <AudioPlayer playlist={getPlaylist()} />
            </div>
        </div>
    )
}

export default App
