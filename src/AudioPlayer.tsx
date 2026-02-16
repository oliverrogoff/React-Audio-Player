import styles from "./AudioPlayer.module.css";
import { useState, useRef, useEffect } from "react";

export type Song = {
    id: number;
    title: string;
    artist: string;
    src: string;
    cover: string;
};

interface AudioPlayerProps {
    playlist: Song[];
}

export default function AudioPlayer({ playlist }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [shouldPlayOnLoad, setShouldPlayOnLoad] = useState(false);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [durations, setDurations] = useState<Record<number, string>>({});
    const [isScrubbing, setIsScrubbing] = useState(false);
    const [hoverTime, setHoverTime] = useState<string | null>(null);
    const [hoverX, setHoverX] = useState<number | null>(null);
    const [duration, setDuration] = useState(0);

    const audio = useRef<HTMLAudioElement | null>(null);
    const progressBarRef = useRef<HTMLDivElement | null>(null);
    const playIcon = isPlaying ? "pause" : "play_arrow";
    const progress = duration ? (currentTime / duration) * 100 : 0;

    function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audio.current) {
            audio.current.volume = newVolume;
        }
    }

    function handleCurrentSongChange(song: Song, autoPlay = false) {
        if (audio.current) {
            audio.current.pause();
            setCurrentTime(0);
            setDuration(0);
        }
        if (autoPlay) {
            setShouldPlayOnLoad(true);
        }
        setCurrentSong(song);
    }

    function handleCurrentTimeChange(newTime: number) {
        if (audio.current) {
            audio.current.currentTime = newTime;
        }
        setCurrentTime(newTime);
    }

    function handleScrub(e: React.MouseEvent | React.Touch | MouseEvent | Touch) {
        if (!audio.current || !progressBarRef.current) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        const scrubX = e.clientX - rect.left;
        const percent = Math.min(Math.max(scrubX / rect.width, 0), 1);
        const newTime = percent * audio.current.duration;

        handleCurrentTimeChange(newTime);
        setHoverX(scrubX);
        setHoverTime(formatDuration(newTime));
    }

    function handleHoverMove(e: React.MouseEvent | MouseEvent) {
        if (!audio.current?.duration) return;
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const time = audio.current.duration * percent;

        setHoverX(e.clientX - rect.left);
        setHoverTime(formatDuration(time));
    }

    function handleMouseDown() {
        setIsScrubbing(true);
    }

    function handleMouseUp() {
        if (isScrubbing) {
            setIsScrubbing(false);
        }
    }

    function handleMouseMove(e: React.MouseEvent<HTMLElement> | MouseEvent) {
        if (isScrubbing) {
            handleScrub(e);
        } else {
            handleHoverMove(e);
        }
    }

    function handleTouchStart(e: React.TouchEvent<HTMLElement>) {
        setIsScrubbing(true);
        handleScrub(e.touches[0]);
    }

    function handleTouchMove(e: TouchEvent) {
        if (isScrubbing) {
            handleScrub(e.touches[0]);
        }
    }

    function handleTouchEnd() {
        if (isScrubbing) {
            setIsScrubbing(false);
        }
    }

    function handleMouseLeave() {
        setHoverTime(null);
        setHoverX(null);
    }

    function toggleIsPlaying() {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }

    function play() {
        audio.current?.play();
    }

    function pause() {
        audio.current?.pause();
    }

    function next(autoPlay = false) {
        if (currentSong && playlist.length > 0) {
            let i = playlist.findIndex((song) => song.id === currentSong.id);
            if (i >= 0) {
                i = (i + 1) % playlist.length;
                handleCurrentSongChange(playlist[i], isPlaying || autoPlay);
            }
        }
    }

    function prev() {
        if (currentSong && playlist.length > 0) {
            let i = playlist.findIndex((song) => song.id === currentSong.id);
            if (i >= 0) {
                i = (i - 1 + playlist.length) % playlist.length;
                handleCurrentSongChange(playlist[i], isPlaying);
            }
        }
    }

    // Audio event listeners
    useEffect(() => {
        const el = audio.current;
        if (!el || !currentSong) return;

        if (currentSong.id !== null) {
            sessionStorage.setItem("currentSongId", String(currentSong.id));
        }

        const handleEnded = () => next(true);
        const handleTimeUpdate = () => setCurrentTime(el.currentTime);
        const handleLoadedMetadata = () => {
            setDuration(el.duration);
            setDurations((prev) => ({
                ...prev,
                [currentSong.id]: formatDuration(el.duration),
            }));
        };

        const onCanPlay = () => {
            if (el.src.includes(currentSong.src)) {
                if (shouldPlayOnLoad && el.paused) {
                    el.play().catch((err: Error) => {
                        console.warn("Playback failed:", err);
                    });
                }
                setShouldPlayOnLoad(false);
            }
        };

        el.addEventListener("loadeddata", onCanPlay);
        el.addEventListener("loadedmetadata", handleLoadedMetadata);
        el.addEventListener("timeupdate", handleTimeUpdate);
        el.addEventListener("ended", handleEnded);

        return () => {
            el.removeEventListener("loadeddata", onCanPlay);
            el.removeEventListener("loadedmetadata", handleLoadedMetadata);
            el.removeEventListener("timeupdate", handleTimeUpdate);
            el.removeEventListener("ended", handleEnded);
        };
    }, [currentSong]);

    // Restore saved song and load durations on playlist change
    useEffect(() => {
        playlist.forEach((song) => {
            if (!song?.src) return;
            getSongDuration(song.src).then((dur) => {
                setDurations((prev) => ({
                    ...prev,
                    [song.id]: dur,
                }));
            });
        });

        if (typeof window === "undefined") return;

        const savedId = sessionStorage.getItem("currentSongId");
        if (savedId) {
            const savedSong = playlist.find((song) => song.id === Number(savedId));
            if (savedSong) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setCurrentSong(savedSong);
                return;
            }
        }
        setCurrentSong(playlist[0]);
    }, [playlist]);

    // Global scrubbing listeners
    useEffect(() => {
        if (isScrubbing) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
            window.addEventListener("touchmove", handleTouchMove);
            window.addEventListener("touchend", handleTouchEnd);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isScrubbing]);

    // Sync volume to audio element
    useEffect(() => {
        if (audio.current) audio.current.volume = volume;
    }, [volume]);

    // Space bar play/pause
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                e.code === "Space" &&
                !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName ?? "")
            ) {
                e.preventDefault();
                toggleIsPlaying();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isPlaying]);

    // Sync isPlaying state with audio element events
    useEffect(() => {
        const el = audio.current;
        if (!el) return;

        const updatePlayingState = () => setIsPlaying(!el.paused);

        el.addEventListener("play", updatePlayingState);
        el.addEventListener("pause", updatePlayingState);
        el.addEventListener("ended", updatePlayingState);

        return () => {
            el.removeEventListener("play", updatePlayingState);
            el.removeEventListener("pause", updatePlayingState);
            el.removeEventListener("ended", updatePlayingState);
        };
    }, []);

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.current}>
                    <div className={styles.imageWrapper}>
                        <div className={styles.musicImage}>
                            {currentSong?.cover && (
                                <img
                                    src={currentSong.cover}
                                    alt="Album cover art"
                                />
                            )}
                        </div>
                    </div>
                    <div className={styles.currentControls}>
                        <div className={styles.musicTitles}>
                            <div className={styles.songName}>{currentSong?.title || ""}</div>
                            <div className={styles.artistName}>{currentSong?.artist || ""}</div>
                        </div>
                        <div className={styles.spacer}></div>
                        <div className={styles.time}>
                            <span className={styles.currentTime}>{formatDuration(currentTime)}</span>
                            <span className={styles.finalTime}>
                                {currentSong ? durations[currentSong.id] || "" : ""}
                            </span>
                        </div>
                        <div
                            className={styles.progressDetails}
                            ref={progressBarRef}
                            onMouseDown={handleMouseDown}
                            onTouchStart={handleTouchStart}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            onClick={(e) => {
                                if (!audio.current?.duration) return;
                                const rect = e.currentTarget.getBoundingClientRect();
                                const clickX = e.clientX - rect.left;
                                const newTime = (clickX / rect.width) * audio.current.duration;
                                handleCurrentTimeChange(newTime);
                            }}
                        >
                            <div
                                className={styles.progressBar}
                                style={{ width: progress + "%" }}
                            >
                                <span></span>
                            </div>
                            {hoverTime !== null && (isScrubbing || hoverX !== null) && (
                                <div
                                    className={styles.progressTooltip}
                                    style={{ left: hoverX ?? 0 }}
                                >
                                    {hoverTime}
                                </div>
                            )}
                        </div>
                        <div className={styles.controlBtn}>
                            <div className={styles.centeredButtons}>
                                <span className="material-icons-round" onClick={prev}>
                                    skip_previous
                                </span>
                                <div className={styles.playPause}>
                                    <span className="material-icons-round" onClick={toggleIsPlaying}>
                                        {playIcon}
                                    </span>
                                </div>
                                <span className="material-icons-round" onClick={() => next()}>
                                    skip_next
                                </span>
                            </div>
                            <div className={styles.volumeContainer}>
                                <span className="material-icons-round" id="volume">
                                    volume_up
                                </span>
                                <div className={styles.hoverArea}></div>
                                <input
                                    type="range"
                                    className={styles.volumeSlider}
                                    id="volumeSlider"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.playlistScroll}>
                    <ul>
                        {playlist.map((song) => (
                            <li
                                className={styles.playlistScrollItem}
                                key={song.id}
                                onClick={() => {
                                    if (!currentSong) return;
                                    if (song.id === currentSong.id) {
                                        toggleIsPlaying();
                                    } else {
                                        handleCurrentSongChange(song, true);
                                    }
                                }}
                            >
                                <div className={styles.miniCover}>
                                    {song.cover && (
                                        <img
                                            src={song.cover}
                                            alt={`${song.title} cover`}
                                        />
                                    )}
                                    <div className={styles.overlay} />
                                    <span className={"material-icons-round " + styles.playOverlay}>
                                        play_arrow
                                    </span>
                                </div>
                                <div className={styles.playlistTextContainer}>
                                    <span className={styles.song}>{song.title}</span>
                                    <span className={styles.artist}>{song.artist}</span>
                                </div>
                                <div className={styles.spacer} />
                                <span className={styles.playlistSongLength}>
                                    {durations[song.id] || "loading..."}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <audio
                    ref={audio}
                    className={styles.mainSong}
                    src={currentSong?.src}
                    preload="auto"
                />
            </div>
        </>
    );
}

function getSongDuration(songUrl: string): Promise<string> {
    return new Promise((resolve) => {
        const audio = new Audio(songUrl);
        audio.addEventListener("loadedmetadata", () => {
            resolve(formatDuration(audio.duration));
        });
    });
}

function formatDuration(duration: number): string {
    const minutes = Math.floor(duration / 60);
    let seconds = String(Math.floor(duration % 60));
    if (seconds.length < 2) seconds = "0" + seconds;
    return minutes + ":" + seconds;
}