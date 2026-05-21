import styles from "./AudioPlayer.module.css";
import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type MouseEvent as ReactMouseEvent,
    type TouchEvent as ReactTouchEvent,
} from "react";

export type Song = {
    id: string | number;
    title: string;
    artist: string;
    src: string;
    cover?: string;
};

type IconName = "next" | "pause" | "play" | "prev" | "volume";

interface AudioPlayerProps {
    playlist: Song[];
}

export default function AudioPlayer({ playlist }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [shouldPlayOnLoad, setShouldPlayOnLoad] = useState(false);
    const [currentSongId, setCurrentSongId] = useState<Song["id"] | null>(() => {
        if (typeof window === "undefined") return null;
        return sessionStorage.getItem("currentSongId");
    });
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [durations, setDurations] = useState<Record<string, string>>({});
    const [isScrubbing, setIsScrubbing] = useState(false);
    const [hoverTime, setHoverTime] = useState<string | null>(null);
    const [hoverX, setHoverX] = useState<number | null>(null);
    const [duration, setDuration] = useState(0);

    const audio = useRef<HTMLAudioElement | null>(null);
    const progressBarRef = useRef<HTMLDivElement | null>(null);
    const currentSong = getCurrentSong(playlist, currentSongId);
    const progress = currentSong && duration ? (currentTime / duration) * 100 : 0;

    function handleVolumeChange(e: ChangeEvent<HTMLInputElement>) {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audio.current) {
            audio.current.volume = newVolume;
        }
    }

    const handleCurrentSongChange = useCallback((song: Song, autoPlay = false) => {
        if (audio.current) {
            audio.current.pause();
            setCurrentTime(0);
            setDuration(0);
        }
        if (autoPlay) {
            setShouldPlayOnLoad(true);
        }
        setCurrentSongId(song.id);
    }, []);

    const handleCurrentTimeChange = useCallback((newTime: number) => {
        if (audio.current) {
            audio.current.currentTime = newTime;
        }
        setCurrentTime(newTime);
    }, []);

    const handleScrub = useCallback((e: { clientX: number }) => {
        if (!audio.current || !progressBarRef.current) return;
        if (!Number.isFinite(audio.current.duration) || audio.current.duration <= 0) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        const scrubX = e.clientX - rect.left;
        const percent = Math.min(Math.max(scrubX / rect.width, 0), 1);
        const newTime = percent * audio.current.duration;

        handleCurrentTimeChange(newTime);
        setHoverX(percent * rect.width);
        setHoverTime(formatDuration(newTime));
    }, [handleCurrentTimeChange]);

    const handleHoverMove = useCallback((e: { clientX: number }) => {
        if (!audio.current?.duration || !progressBarRef.current) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
        const time = audio.current.duration * percent;

        setHoverX(percent * rect.width);
        setHoverTime(formatDuration(time));
    }, []);

    function handleMouseDown() {
        setIsScrubbing(true);
    }

    const handleMouseUp = useCallback(() => {
        if (isScrubbing) {
            setIsScrubbing(false);
        }
    }, [isScrubbing]);

    const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLElement> | MouseEvent) => {
        if (isScrubbing) {
            handleScrub(e);
        } else {
            handleHoverMove(e);
        }
    }, [handleHoverMove, handleScrub, isScrubbing]);

    function handleTouchStart(e: ReactTouchEvent<HTMLElement>) {
        setIsScrubbing(true);
        handleScrub(e.touches[0]);
    }

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (isScrubbing) {
            handleScrub(e.touches[0]);
        }
    }, [handleScrub, isScrubbing]);

    const handleTouchEnd = useCallback(() => {
        if (isScrubbing) {
            setIsScrubbing(false);
        }
    }, [isScrubbing]);

    function handleMouseLeave() {
        setHoverTime(null);
        setHoverX(null);
    }

    const play = useCallback(() => {
        audio.current?.play().catch((err: Error) => {
            console.warn("Playback failed:", err);
        });
    }, []);

    const pause = useCallback(() => {
        audio.current?.pause();
    }, []);

    const toggleIsPlaying = useCallback(() => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }, [isPlaying, pause, play]);

    const next = useCallback((autoPlay = false) => {
        if (currentSong && playlist.length > 0) {
            let i = playlist.findIndex((song) => song.id === currentSong.id);
            if (i >= 0) {
                i = (i + 1) % playlist.length;
                handleCurrentSongChange(playlist[i], isPlaying || autoPlay);
            }
        }
    }, [currentSong, handleCurrentSongChange, isPlaying, playlist]);

    const prev = useCallback(() => {
        if (currentSong && playlist.length > 0) {
            let i = playlist.findIndex((song) => song.id === currentSong.id);
            if (i >= 0) {
                i = (i - 1 + playlist.length) % playlist.length;
                handleCurrentSongChange(playlist[i], isPlaying);
            }
        }
    }, [currentSong, handleCurrentSongChange, isPlaying, playlist]);

    // Audio event listeners
    useEffect(() => {
        const el = audio.current;
        if (!el || !currentSong) return;

        if (typeof window !== "undefined") {
            sessionStorage.setItem("currentSongId", String(currentSong.id));
        }

        const handleEnded = () => next(true);
        const handleError = () => next(true);
        const handleTimeUpdate = () => setCurrentTime(el.currentTime);
        const handleLoadedMetadata = () => {
            setDuration(el.duration);
            setDurations((prev) => ({
                ...prev,
                [getSongKey(currentSong.id)]: formatDuration(el.duration),
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
        el.addEventListener("error", handleError);

        return () => {
            el.removeEventListener("loadeddata", onCanPlay);
            el.removeEventListener("loadedmetadata", handleLoadedMetadata);
            el.removeEventListener("timeupdate", handleTimeUpdate);
            el.removeEventListener("ended", handleEnded);
            el.removeEventListener("error", handleError);
        };
    }, [currentSong, next, playlist, shouldPlayOnLoad]);

    // Load durations on playlist change
    useEffect(() => {
        if (typeof window === "undefined") return;

        if (!playlist.length) {
            audio.current?.pause();
            sessionStorage.removeItem("currentSongId");
            return;
        }

        playlist.forEach((song) => {
            if (!song?.src) return;
            getSongDuration(song.src).then((dur) => {
                setDurations((prev) => ({
                    ...prev,
                    [getSongKey(song.id)]: dur,
                }));
            });
        });

    }, [playlist]);

    // Global scrubbing listeners
    useEffect(() => {
        if (!isScrubbing) return;
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleTouchEnd);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [handleMouseMove, handleMouseUp, handleTouchEnd, handleTouchMove, isScrubbing]);

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
    }, [toggleIsPlaying]);

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
                            <span className={styles.currentTime}>
                                {formatDuration(currentSong ? currentTime : 0)}
                            </span>
                            <span className={styles.finalTime}>
                                {currentSong ? durations[getSongKey(currentSong.id)] || "" : ""}
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
                                <button
                                    type="button"
                                    className={styles.iconButton}
                                    aria-label="Previous track"
                                    onClick={prev}
                                >
                                    <SvgIcon name="prev" />
                                </button>
                                <div className={styles.playPause}>
                                    <button
                                        type="button"
                                        className={`${styles.iconButton} ${styles.playPauseButton}`}
                                        aria-label={isPlaying ? "Pause" : "Play"}
                                        onClick={toggleIsPlaying}
                                    >
                                        <SvgIcon name={isPlaying ? "pause" : "play"} />
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    className={styles.iconButton}
                                    aria-label="Next track"
                                    onClick={() => next()}
                                >
                                    <SvgIcon name="next" />
                                </button>
                            </div>
                            <div className={styles.volumeContainer}>
                                <span
                                    className={styles.volumeIcon}
                                    id="volume"
                                    aria-hidden="true"
                                >
                                    <SvgIcon name="volume" />
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
                            <li key={song.id}>
                                <button
                                    type="button"
                                    className={styles.playlistScrollItem}
                                    onClick={() => {
                                        if (currentSong && song.id === currentSong.id) {
                                            toggleIsPlaying();
                                        } else {
                                            handleCurrentSongChange(song, true);
                                        }
                                    }}
                                    aria-label={`${currentSong && song.id === currentSong.id && isPlaying ? "Pause" : "Play"} ${song.title} by ${song.artist}`}
                                >
                                    <div className={styles.miniCover}>
                                        {song.cover && (
                                            <img
                                                src={song.cover}
                                                alt={`${song.title} cover`}
                                            />
                                        )}
                                        <div className={styles.overlay} />
                                        <span className={styles.playOverlay}>
                                            <SvgIcon name="play" />
                                        </span>
                                    </div>
                                    <div className={styles.playlistTextContainer}>
                                        <span className={styles.song}>{song.title}</span>
                                        <span className={styles.artist}>{song.artist}</span>
                                    </div>
                                    <div className={styles.spacer} />
                                    <span className={styles.playlistSongLength}>
                                        {durations[getSongKey(song.id)] || "loading..."}
                                    </span>
                                </button>
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

        function cleanup() {
            audio.removeEventListener("loadedmetadata", onLoaded);
            audio.removeEventListener("error", onError);
            audio.src = "";
        }
        function onLoaded() {
            resolve(formatDuration(audio.duration));
            cleanup();
        }
        function onError() {
            resolve("--:--");
            cleanup();
        }

        audio.addEventListener("loadedmetadata", onLoaded);
        audio.addEventListener("error", onError);
    });
}

function formatDuration(duration: number): string {
    if (!Number.isFinite(duration) || duration < 0) return "0:00";
    const minutes = Math.floor(duration / 60);
    let seconds = String(Math.floor(duration % 60));
    if (seconds.length < 2) seconds = "0" + seconds;
    return minutes + ":" + seconds;
}

function getCurrentSong(playlist: Song[], currentSongId: Song["id"] | null): Song | null {
    if (!playlist.length) return null;
    if (currentSongId === null) return playlist[0];
    return playlist.find((song) => getSongKey(song.id) === getSongKey(currentSongId)) ?? playlist[0];
}

function getSongKey(id: Song["id"]): string {
    return String(id);
}

function SvgIcon({ name }: { name: IconName }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            focusable="false"
        >
            {name === "prev" && (
                <>
                    <path d="M6 5h2v14H6z" />
                    <path d="m19 6-9 6 9 6z" />
                </>
            )}
            {name === "next" && (
                <>
                    <path d="M16 5h2v14h-2z" />
                    <path d="m5 6 9 6-9 6z" />
                </>
            )}
            {name === "play" && <path d="m8 5 11 7-11 7z" />}
            {name === "pause" && (
                <>
                    <path d="M7 5h4v14H7z" />
                    <path d="M13 5h4v14h-4z" />
                </>
            )}
            {name === "volume" && (
                <>
                    <path d="M4 9v6h4l5 4V5L8 9z" />
                    <path
                        d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                    />
                </>
            )}
        </svg>
    );
}
