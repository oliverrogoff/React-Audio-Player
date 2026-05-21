# React Audio Player

A lightweight, reusable React audio player component with playlist support. No external dependencies beyond React.

## Features

- Playlist with track switching and auto-advance
- Progress bar with scrub, seek, and hover tooltip
- Vertical volume slider
- Spacebar play/pause
- Touch support for mobile
- Responsive layout via container queries
- Import stylesheet alongside player
- Material Icons loaded automatically

## Install

```bash
npm install git@github.com:oliverrogoff/React-Audio-Player.git
```

## Usage

```jsx
import { AudioPlayer } from 'audio-player';
import 'audio-player/dist/audio-player.css';

const playlist = [
  {
    id: '1',
    title: 'Morning Light',
    artist: 'Ada Sun',
    src: '/audio/morning-light.mp3',
    cover: '/images/morning-light.jpg',
  },
  {
    id: '2',
    title: 'Coastal Drive',
    artist: 'Ada Sun',
    src: '/audio/coastal-drive.mp3',
    cover: '/images/coastal-drive.jpg',
  },
];

function App() {
  return <AudioPlayer playlist={playlist} />;
}
```

## Props

| Prop | Type     | Default | Description |
|------|----------|---------|-------------|
| `playlist` | `Song[]` | `[]` | Array of track objects |

## Song Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string \| number` | yes | Unique identifier |
| `title` | `string` | yes | Track title |
| `artist` | `string` | yes | Artist name |
| `src` | `string` | yes | Audio file URL |
| `cover` | `string` | no | Cover art image URL |

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Toggle play/pause |
