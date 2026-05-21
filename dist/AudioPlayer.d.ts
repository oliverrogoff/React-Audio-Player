export type Song = {
    id: string | number;
    title: string;
    artist: string;
    src: string;
    cover?: string;
};
interface AudioPlayerProps {
    playlist: Song[];
}
export default function AudioPlayer({ playlist }: AudioPlayerProps): import("react/jsx-runtime").JSX.Element;
export {};
