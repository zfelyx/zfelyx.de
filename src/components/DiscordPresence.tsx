import { useEffect, useState } from 'react'

export default function DiscordPresence({ userId }: DiscordPresenceProps) {
    const [data, setData] = useState<LanyardData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
}