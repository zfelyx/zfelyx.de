import { useEffect, useState } from 'react'

interface Snowflake {
    id: number
    left: number
    animationDuration: number
    opacity: number
    size: number
    delay: number
    initialY: number
}

export default function Snowfall() {
    const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])
    const [isSnowSeason, setIsSnowSeason] = useState(false)

    useEffect(() => {
        const checkSnowSeason = () => {
            const now = new Date()
            const month = now.getMonth()
            const day = now.getDate()

            const isInSeason =
                month === 11 ||
                month === 0 ||
                (month === 1 && day === 1)

            setIsSnowSeason(isInSeason)
        }

        checkSnowSeason()

        const interval = setInterval(checkSnowSeason, 3600000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (!isSnowSeason) {
            setSnowflakes([])
            return
        }

        const flakes: Snowflake[] = []
        const numberOfFlakes = 150

        for (let i = 0; i < numberOfFlakes; i++) {
            flakes.push({
                id: i,
                left: Math.random() * 100,
                animationDuration: 8 + Math.random() * 12,
                opacity: 0.4 + Math.random() * 0.6,
                size: 8 + Math.random() * 8,
                delay: 0,
                initialY: Math.random() * 120 - 20,
            })
        }

        setSnowflakes(flakes)
    }, [isSnowSeason])

    if (!isSnowSeason) {
        return null
    }

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="absolute animate-snowfall"
                    style={{
                        top: `${flake.initialY}vh`,
                        left: `${flake.left}%`,
                        opacity: flake.opacity,
                        width: `${flake.size}px`,
                        height: `${flake.size}px`,
                        animationDuration: `${flake.animationDuration}s`,
                        animationDelay: `${flake.delay}s`,
                    }}
                >
                    <svg
                        viewBox="0 0 50 50"
                        fill="white"
                        className="drop-shadow-lg"
                    >
                        <g>
                            <circle cx="25" cy="25" r="2" />

                            {/* Main lines */}
                            <line x1="25" y1="5" x2="25" y2="45" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            <line x1="5" y1="25" x2="45" y2="25" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            <line x1="11" y1="11" x2="39" y2="39" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            <line x1="39" y1="11" x2="11" y2="39" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>

                            {/*  vertical */}
                            <line x1="20" y1="10" x2="25" y2="5" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="30" y1="10" x2="25" y2="5" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="20" y1="40" x2="25" y2="45" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="30" y1="40" x2="25" y2="45" stroke="white" strokeWidth="1" strokeLinecap="round"/>

                            {/* horizontal */}
                            <line x1="10" y1="20" x2="5" y2="25" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="10" y1="30" x2="5" y2="25" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="40" y1="20" x2="45" y2="25" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="40" y1="30" x2="45" y2="25" stroke="white" strokeWidth="1" strokeLinecap="round"/>

                            {/* diagonal 1 */}
                            <line x1="15" y1="15" x2="11" y2="11" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="18" y1="12" x2="11" y2="11" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="35" y1="35" x2="39" y2="39" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="32" y1="38" x2="39" y2="39" stroke="white" strokeWidth="1" strokeLinecap="round"/>

                            {/* diagonal 2 */}
                            <line x1="35" y1="15" x2="39" y2="11" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="32" y1="12" x2="39" y2="11" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="15" y1="35" x2="11" y2="39" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="18" y1="38" x2="11" y2="39" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                        </g>
                    </svg>
                </div>
            ))}
        </div>
    )
}
