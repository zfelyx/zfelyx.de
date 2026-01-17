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
        // Check if current date is between December 1st and February 1st
        const checkSnowSeason = () => {
            const now = new Date()
            const month = now.getMonth() // 0-11
            const day = now.getDate()

            // December (month 11), January (month 0), or start of February (month 1, day 1)
            const isInSeason =
                month === 11 || // December
                month === 0 ||  // January
                (month === 1 && day === 1) // February 1st only

            setIsSnowSeason(isInSeason)
        }

        checkSnowSeason()

        // Check again every hour in case the date changes
        const interval = setInterval(checkSnowSeason, 3600000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (!isSnowSeason) {
            setSnowflakes([])
            return
        }

        // Generate snowflakes
        const flakes: Snowflake[] = []
        const numberOfFlakes = 150 // More snowflakes for better coverage

        for (let i = 0; i < numberOfFlakes; i++) {
            flakes.push({
                id: i,
                left: Math.random() * 100, // Random position from 0-100%
                animationDuration: 8 + Math.random() * 12, // 8-20 seconds (faster)
                opacity: 0.4 + Math.random() * 0.6, // 0.4-1.0 opacity
                size: 8 + Math.random() * 8, // 8-16px size (bigger)
                delay: 0, // No delay - all start immediately
                initialY: Math.random() * 120 - 20, // Random start height from -20vh to 100vh
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
                        {/* Classic snowflake design */}
                        <g>
                            {/* Center */}
                            <circle cx="25" cy="25" r="2" />

                            {/* Main lines */}
                            <line x1="25" y1="5" x2="25" y2="45" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            <line x1="5" y1="25" x2="45" y2="25" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            <line x1="11" y1="11" x2="39" y2="39" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                            <line x1="39" y1="11" x2="11" y2="39" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>

                            {/* Decorative branches - vertical */}
                            <line x1="20" y1="10" x2="25" y2="5" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="30" y1="10" x2="25" y2="5" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="20" y1="40" x2="25" y2="45" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="30" y1="40" x2="25" y2="45" stroke="white" strokeWidth="1" strokeLinecap="round"/>

                            {/* Decorative branches - horizontal */}
                            <line x1="10" y1="20" x2="5" y2="25" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="10" y1="30" x2="5" y2="25" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="40" y1="20" x2="45" y2="25" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="40" y1="30" x2="45" y2="25" stroke="white" strokeWidth="1" strokeLinecap="round"/>

                            {/* Decorative branches - diagonal 1 */}
                            <line x1="15" y1="15" x2="11" y2="11" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="18" y1="12" x2="11" y2="11" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="35" y1="35" x2="39" y2="39" stroke="white" strokeWidth="1" strokeLinecap="round"/>
                            <line x1="32" y1="38" x2="39" y2="39" stroke="white" strokeWidth="1" strokeLinecap="round"/>

                            {/* Decorative branches - diagonal 2 */}
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