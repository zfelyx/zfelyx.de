import { useEffect, useState } from 'react'

interface LanyardData {
    discord_user: {
        id: string
        username: string
        avatar: string
        discriminator: string
        global_name: string | null
    }
    discord_status: 'online' | 'idle' | 'dnd' | 'offline'
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
    application_id?: string
}

interface SpotifyData {
    track_id: string
    timestamps: {
        start: number
        end: number
    }
    song: string
    artist: string
    album_art_url: string
    album: string
}

interface DiscordPresenceProps {
    userId: string
}

export default function DiscordPresence({ userId }: DiscordPresenceProps) {
    const [data, setData] = useState<LanyardData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let ws: WebSocket | null = null
        let heartbeatInterval: NodeJS.Timeout | null = null
        let reconnectTimeout: NodeJS.Timeout | null = null

        const connect = () => {
            ws = new WebSocket('wss://api.lanyard.rest/socket')

            ws.onopen = () => {
                console.log('Lanyard WebSocket connected')
                setError(null)
            }

            ws.onmessage = (event) => {
                const message = JSON.parse(event.data)
                console.log('Lanyard message:', message)

                if (message.op === 1) {
                    // Hello - start heartbeat
                    const heartbeatMs = message.d.heartbeat_interval
                    heartbeatInterval = setInterval(() => {
                        if (ws?.readyState === WebSocket.OPEN) {
                            ws.send(JSON.stringify({ op: 3 }))
                        }
                    }, heartbeatMs)

                    // Subscribe to user
                    ws?.send(
                        JSON.stringify({
                            op: 2,
                            d: {
                                subscribe_to_id: userId,
                            },
                        })
                    )
                } else if (message.op === 0) {
                    // Event
                    if (message.t === 'INIT_STATE' || message.t === 'PRESENCE_UPDATE') {
                        console.log('Received presence data:', message.d)
                        setData(message.d)
                        setLoading(false)
                        setError(null)
                    }
                } else if (message.op === 1 && message.d?.error) {
                    // Error from Lanyard
                    console.error('Lanyard error:', message.d.error)
                    setError(message.d.error)
                    setLoading(false)
                }
            }

            ws.onerror = (err) => {
                console.error('WebSocket error:', err)
                setError('Connection failed')
                setLoading(false)
            }

            ws.onclose = () => {
                console.log('Lanyard WebSocket disconnected, reconnecting...')
                if (heartbeatInterval) clearInterval(heartbeatInterval)

                // Reconnect after 3 seconds
                reconnectTimeout = setTimeout(() => {
                    connect()
                }, 3000)
            }
        }

        connect()

        return () => {
            if (ws) {
                ws.close()
            }
            if (heartbeatInterval) {
                clearInterval(heartbeatInterval)
            }
            if (reconnectTimeout) {
                clearTimeout(reconnectTimeout)
            }
        }
    }, [userId])

    if (loading) {
        return (
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 animate-pulse">
                <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-white/10 rounded-full"></div>
                    <div className="flex-1 space-y-3">
                        <div className="h-4 bg-white/10 rounded w-3/4"></div>
                        <div className="h-3 bg-white/10 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !data || !data.discord_user) {
        return (
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <div className="text-center text-gray-400">
                    <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm mb-2">Discord status nicht verfügbar</p>
                    <a
                        href="https://discord.gg/lanyard"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:text-blue-300 underline"
                    >
                        Trete dem Lanyard Discord bei um dies zu aktivieren
                    </a>
                </div>
            </div>
        )
    }

    const statusColors = {
        online: '#43b581',
        idle: '#faa61a',
        dnd: '#f04747',
        offline: '#747f8d',
    }

    const statusLabels = {
        online: 'Online',
        idle: 'Idle',
        dnd: 'Do Not Disturb',
        offline: 'Offline',
    }

    const activity = data.activities?.find(a => a.type === 0) // Playing
    const customStatus = data.activities?.find(a => a.type === 4) // Custom status

    const getActivityImage = (activity: Activity) => {
        if (!activity.assets?.large_image) return null

        if (activity.assets.large_image.startsWith('mp:')) {
            return `https://media.discordapp.net/${activity.assets.large_image.replace('mp:', '')}`
        }
        if (activity.application_id) {
            return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`
        }
        return null
    }

    const formatElapsedTime = (startTimestamp?: number) => {
        if (!startTimestamp) return null

        const elapsed = Date.now() - startTimestamp
        const seconds = Math.floor(elapsed / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)

        if (hours > 0) {
            return `${hours}:${String(minutes % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
        }
        return `${minutes}:${String(seconds % 60).padStart(2, '0')}`
    }

    return (
        <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                    {data.discord_user.avatar ? (
                        <img
                            src={`https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=128`}
                            alt={data.discord_user.username}
                            className="w-20 h-20 rounded-full border-2 border-white/20"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full border-2 border-white/20 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl font-bold">
                            {data.discord_user.username?.charAt(0).toUpperCase() || '?'}
                        </div>
                    )}
                    <div
                        className="absolute bottom-0 right-0 w-6 h-6 rounded-full border-4 border-gray-900"
                        style={{ backgroundColor: statusColors[data.discord_status] }}
                    ></div>
                </div>

                {/* User Info & Activity */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-bold text-white truncate">
                            {data.discord_user.global_name || data.discord_user.username}
                        </h3>
                        <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{
                                backgroundColor: `${statusColors[data.discord_status]}20`,
                                color: statusColors[data.discord_status]
                            }}
                        >
              {statusLabels[data.discord_status]}
            </span>
                    </div>

                    {customStatus && (
                        <div className="text-sm text-gray-300 mb-2 flex items-center">
                            {customStatus.state && (
                                <>
                                    {customStatus.state.match(/:\w+:/)?.[0] && (
                                        <span className="mr-1">{customStatus.state.match(/:\w+:/)?.[0]}</span>
                                    )}
                                    <span className="truncate">{customStatus.state.replace(/:\w+:/g, '').trim()}</span>
                                </>
                            )}
                        </div>
                    )}

                    {/* Spotify */}
                    {data.listening_to_spotify && data.spotify && (
                        <div className="mt-3 bg-black/20 rounded-lg p-3 border border-green-500/30">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={data.spotify.album_art_url}
                                    alt={data.spotify.album}
                                    className="w-12 h-12 rounded"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                                        </svg>
                                        <span className="text-xs text-green-500 font-medium">Listening to Spotify</span>
                                    </div>
                                    <p className="text-sm font-semibold text-white truncate">{data.spotify.song}</p>
                                    <p className="text-xs text-gray-400 truncate">by {data.spotify.artist}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Game/Activity */}
                    {activity && !data.listening_to_spotify && (
                        <div className="mt-3 bg-black/20 rounded-lg p-3 border border-purple-500/30">
                            <div className="flex items-center space-x-3">
                                {getActivityImage(activity) && (
                                    <img
                                        src={getActivityImage(activity)!}
                                        alt={activity.name}
                                        className="w-12 h-12 rounded"
                                    />
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <svg className="w-4 h-4 text-purple-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6Z"/>
                                        </svg>
                                        <span className="text-xs text-purple-400 font-medium">Playing</span>
                                    </div>
                                    <p className="text-sm font-semibold text-white truncate">{activity.name}</p>
                                    {activity.details && (
                                        <p className="text-xs text-gray-400 truncate">{activity.details}</p>
                                    )}
                                    {activity.state && (
                                        <p className="text-xs text-gray-400 truncate">{activity.state}</p>
                                    )}
                                    {activity.timestamps?.start && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            {formatElapsedTime(activity.timestamps.start)} elapsed
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}