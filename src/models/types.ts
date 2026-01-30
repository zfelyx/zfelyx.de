interface LanyardData {
    discord_user: {
        id: string;
        username: string;
        discriminator: string;
        avatar: string,
        global_name?: string;
    }
    discord_status: 'online' | 'idle' | 'dnd' | 'offline';
    activities: Activity[]
    listening_to_spotify: boolean
    spotify?: SpotifyData
}

interface Activity {
    id: string
    name: string
    type: number
    state?: string
    details?: string
    timestamps?: {
        start?: number
        end?: number
    }
    assets?: {
        large_image?: string
        large_text?: string
        small_image?: string
        small_text?: string
    }
    applications_id?: string
}

interface SpotifyData {
    track_id: string
    timestamp: {
        start: number
        end: number
    }
    song: string
    artist: string
    album_art_url: string
    album: string
}

interface DiscordPresenceProps {
    userId: string;
}