import { useEffect, useState } from 'react'
import type { LanyardData, Activity, DiscordPresenceProps } from '../models/types'

export default function DiscordPresence({ userId }: DiscordPresenceProps) {
    const [data, setData] = useState<LanyardData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
}