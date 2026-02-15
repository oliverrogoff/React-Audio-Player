import styles from "./AudioPlayer.module.css"
import {useState, useRef, useEffect, useCallback, useMemo} from 'react';
import * as React from "react";

export type Song = {
    id: number;
    title: string;
    artist: string;
    src: string;
    cover: string;
}

export default function AudioPlayer({ playlist }: { playlist: Song[] }) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [shouldPlayOnLoad, setShouldPlayOnLoad] = useState<boolean>(false);
    // Initialize currentSong with lazy initializer - only runs once
    const [currentSong, setCurrentSong] = useState<Song | null>(() => {
        const savedId = sessionStorage.getItem('currentSongId');
        if (savedId) {
            const savedSong = playlist.find((song: Song) => song.id === Number(savedId));
            if (savedSong) return savedSong;
        }
        return playlist[0] || null;
    });
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [volume, setVolume] = useState<number>(1);
    const [durations, setDurations] = useState<Record<number, string>>({});
    const [isScrubbing, setIsScrubbing] = useState<boolean>(false);
    const [hoverTime, setHoverTime] = useState<string | null>(null);
    const [hoverX, setHoverX] = useState<number | null>(null);

    const audio= useRef<HTMLAudioElement | null>(null);
    const progressBarRef = useRef<HTMLDivElement | null>(null);
    const playIcon: string = isPlaying ? "pause" : "play_arrow";
    // const [progress, setProgress] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const progress = useMemo(() => {
        return duration ? (currentTime / duration) * 100 : 0;
    }, [currentTime, duration]);

    function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const newVolume: number = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audio.current) {
            audio.current.volume = newVolume;
        }
    }

    function handleCurrentSongChange(song: Song, autoPlay: boolean = false): void {
        if (audio.current) {
            audio.current.pause()
            setCurrentTime(0)
        }
        if (autoPlay) {
            setShouldPlayOnLoad(true);
        }
        setCurrentSong(song);
    }

    function handleCurrentTimeChange(newTime: number): void {
        if (audio.current) {
            audio.current.currentTime = newTime;
        }
        setCurrentTime(newTime);
    }


    const handleScrub = useCallback(
        (e:
             React.MouseEvent<HTMLElement> |
             React.Touch |
             MouseEvent |
             Touch
        ): void => {
            if (!audio.current || !progressBarRef.current ) return;
            const rect: DOMRect = progressBarRef.current.getBoundingClientRect();
            const scrubX: number = e.clientX - rect.left;
            const percent: number = Math.min(Math.max(scrubX / rect.width, 0), 1);
            const newTime: number = percent * audio.current.duration;

            handleCurrentTimeChange(newTime);
            setHoverX(scrubX);
            setHoverTime(String(newTime));
        },[]);

    const handleHoverMove = useCallback((e: React.MouseEvent | MouseEvent): void => {
        if (!audio.current?.duration || !progressBarRef.current) return;
        const rect: DOMRect = progressBarRef.current.getBoundingClientRect();
        const percent: number = (e.clientX - rect.left) / rect.width;
        const time: number = audio.current.duration * percent;

        setHoverX(e.clientX - rect.left);
        setHoverTime(formatDuration(time));
    },[]);

    function play(): void {
        audio.current?.play();
    }

    function pause(): void {
        audio.current?.pause();
    }

    const toggleIsPlaying = useCallback( (): void => {
        if (isPlaying) {
            pause()
        } else {
            play()
        }
    },[isPlaying]);


    //Handle Mouse Actions
    //=============================
    function handleMouseDown(): void {
        setIsScrubbing(true);
    }

    function handleMouseMove(e: React.MouseEvent<HTMLElement>): void {
        if (isScrubbing) {
            handleScrub(e);
        } else {
            handleHoverMove(e);
        }
    }

    function handleTouchStart(e: React.TouchEvent<HTMLElement>): void {
        setIsScrubbing(true);
        handleScrub(e.touches[0]);
    }

    function handleMouseLeave(): void {
        setHoverTime(null);
        setHoverX(null);
    }

    //Player Button Functions
    //=========================

    const next = useCallback((autoPlay: boolean = false)=> {
        if (currentSong && playlist.length > 0) {
            let i: number = playlist.findIndex((song: Song): boolean => song.id === currentSong.id);
            if (i >= 0) {
                i = (i + 1) % playlist.length;
                handleCurrentSongChange(playlist[i], (isPlaying || autoPlay));
            }
        }
    }, [currentSong, isPlaying, playlist]);

    function prev(): void {
        if (currentSong && playlist.length > 0) {
            let i: number = playlist.findIndex((song:Song): boolean => song.id === currentSong.id);
            if (i >= 0) {
                i = (i - 1 + playlist.length) % playlist.length
                handleCurrentSongChange(playlist[i], isPlaying);
            }
        }
    }

    useEffect(() => {
        const audioElement = audio.current;

        if (!audioElement || !currentSong) return;

        if (currentSong.id) {
            sessionStorage.setItem('currentSongId', String(currentSong.id));
        }

        const handleEnded = () => next(true);
        const handleTimeUpdate = () => {
            const newTime = audioElement.currentTime;
            setCurrentTime(newTime);
        };
        const onCanPlay = () => {
            if (audioElement.src.includes(currentSong.src) && shouldPlayOnLoad && audioElement.paused) {
                audioElement.play().catch((err: Error) => {
                    console.warn('Playback failed:', err);
                });
                setShouldPlayOnLoad(false);
            }
        };
        audioElement.addEventListener('loadeddata', onCanPlay);
        audioElement.addEventListener('timeupdate', handleTimeUpdate);
        audioElement.addEventListener('ended', handleEnded);

        return () => {
            audioElement.removeEventListener('loadeddata', onCanPlay);
            audioElement.removeEventListener('timeupdate', handleTimeUpdate);
            audioElement.removeEventListener('ended', handleEnded);
        };
    }, [currentSong, next, shouldPlayOnLoad]);

    useEffect(() => {
        playlist.forEach((song) => {
            if (!song?.src) return;
            getSongDuration(song.src)
                .then((duration: string) => {
                    setDurations((prev) => ({
                        ...prev,
                        [song.id]: duration,
                    }));
                });
        });
    }, [playlist]);

    useEffect(() => {

        function handleMouseMove(e: MouseEvent): void {
            if (isScrubbing) {
                handleScrub(e);
            } else {
                handleHoverMove(e);
            }
        }
        function handleTouchMove(e: TouchEvent): void {
            if (isScrubbing) {
                handleScrub(e.touches[0]);
            }
        }
        function handleMouseUp(): void{
            if (isScrubbing) {
                setIsScrubbing(false);
            }
        }
        function handleTouchEnd(): void {
            if (isScrubbing) {
                setIsScrubbing(false);
            }
        }
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
    }, [isScrubbing, handleScrub, handleHoverMove]);

    useEffect(() => {
        if (audio.current) audio.current.volume = volume;
    }, [volume]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (document.activeElement) {
                if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
                    e.preventDefault();
                    toggleIsPlaying();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPlaying, toggleIsPlaying]);

    useEffect(() => {
        const audioElement = audio.current;
        if (!audioElement || !currentSong) return;

        const handleLoadedMetadata = () => {
            setDuration(audioElement.duration);
        };

        audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);

        // ... rest of your event listeners

        return () => {
            audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
            // ... rest of cleanup
        };
    }, [currentSong, next, shouldPlayOnLoad]);

    useEffect(() => {
        const audioElement: HTMLAudioElement | null = audio.current;
        if (!audioElement) return;

        const updatePlayingState = () => {
            setIsPlaying(!audioElement.paused);
        };

        audioElement.addEventListener('play', updatePlayingState);
        audioElement.addEventListener('pause', updatePlayingState);
        audioElement.addEventListener('ended', updatePlayingState);

        return () => {
            audioElement.removeEventListener('play', updatePlayingState);
            audioElement.removeEventListener('pause', updatePlayingState);
            audioElement.removeEventListener('ended', updatePlayingState);
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
                            <div className={styles.songName}>{currentSong?.title || ''}</div>
                            <div className={styles.artistName}>{currentSong?.artist || ''}</div>
                        </div>
                        <div className={styles.spacer}></div>
                        <div className={styles.time}>
                            <span className={styles.currentTime}>{formatDuration(currentTime)}</span>
                            <span className={styles.finalTime}>{currentSong ? durations[currentSong.id] : ''}</span>
                        </div>
                        <div
                            className={styles.progressDetails}
                            ref={progressBarRef}
                            onMouseDown={handleMouseDown}
                            onTouchStart={handleTouchStart}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            onClick={(e) => {
                                const audioElement: HTMLAudioElement | null = audio.current;
                                if (!audioElement) return;
                                const rect = e.currentTarget.getBoundingClientRect();
                                const clickX = e.clientX - rect.left;
                                const newTime = (clickX / rect.width) * audioElement.duration;
                                handleCurrentTimeChange(newTime);
                            }}
                        >
                            <div
                                className={styles.progressBar}
                                style={{ width: progress + "%" }}
                            >
                                <span></span>
                            </div>
                            {(hoverTime !== null && (isScrubbing || hoverX !== null)) && (
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
                                <span
                                    className="material-icons-round"
                                    onClick={prev}
                                >
                                    skip_previous
                                </span>
                                <div className={styles.playPause}>
                                    <span className="material-icons-round" onClick={toggleIsPlaying}>{playIcon}</span>
                                </div>
                                <span className="material-icons-round" onClick={() => next()}>skip_next</span>
                            </div>
                            <div className={styles.volumeContainer}>
                                <span className="material-icons-round" id="volume">volume_up</span>
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
                        {
                            playlist.map((song) => (
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
                                        <span className={"material-icons-round " + styles.playOverlay}>play_arrow</span>
                                    </div>
                                    <div className={styles.playlistTextContainer}>
                                        <span className={styles.song}>{song.title}</span>
                                        <span className={styles.artist}>{song.artist}</span>
                                    </div>
                                    <div className={styles.spacer} />
                                    <span className={styles.playlistSongLength}>{durations[song.id] || 'loading...'}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <audio
                    ref={audio}
                    className={styles.mainSong}
                    src={currentSong?.src}
                    preload='auto'
                />
            </div>
        </>
    )
}

function getSongDuration(songUrl: string): Promise<string> {
    return new Promise((resolve) => {
        const audio = new Audio(songUrl);
        audio.addEventListener('loadedmetadata', () => {
            const duration: number = audio.duration;
            resolve(formatDuration(duration));
        });
    });
}


function formatDuration (duration: number): string {
    const minutes: string = String(Math.floor(duration / 60));
    let seconds: string = String(Math.floor(duration % 60));
    if (seconds.length < 2) {
        seconds = '0' + seconds;
    }
    return minutes + ":" + seconds;
}

