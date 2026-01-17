import { useEffect, useState } from 'react'
import Footer from './Footer'

export default function NotFound() {
    const [floatOffset, setFloatOffset] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setFloatOffset(prev => (prev + 0.5) % 360)
        }, 30)
        return () => clearInterval(interval)
    }, [])

    const floatY = Math.sin(floatOffset * Math.PI / 180) * 20

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <section className="relative overflow-hidden">
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
                    <div
                        className="mb-8 relative"
                        style={{
                            transform: `translateY(${floatY}px)`,
                            transition: 'transform 0.03s linear'
                        }}
                    >
                        <svg width="280" height="180" viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                {/* Monitor/Screen */}
                                <rect x="40" y="30" width="200" height="120" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="3"/>
                                <rect x="50" y="40" width="180" height="100" rx="4" fill="#1f2937"/>

                                {/* Error symbol on screen */}
                                <circle cx="140" cy="90" r="30" stroke="#e5e7eb" strokeWidth="4" fill="none">
                                    <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
                                </circle>
                                <line x1="125" y1="75" x2="155" y2="105" stroke="#e5e7eb" strokeWidth="4" strokeLinecap="round">
                                    <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
                                </line>
                                <line x1="155" y1="75" x2="125" y2="105" stroke="#e5e7eb" strokeWidth="4" strokeLinecap="round">
                                    <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
                                </line>

                                {/* Monitor stand */}
                                <rect x="120" y="150" width="40" height="8" rx="2" fill="#4b5563"/>
                                <rect x="100" y="158" width="80" height="4" rx="2" fill="#4b5563"/>

                                {/* Floating particles */}
                                <circle cx="30" cy="50" r="4" fill="#9ca3af" opacity="0.6">
                                    <animate attributeName="cy" values="50;45;50" dur="2s" repeatCount="indefinite"/>
                                    <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" repeatCount="indefinite"/>
                                </circle>
                                <circle cx="250" cy="140" r="3" fill="#d1d5db" opacity="0.5">
                                    <animate attributeName="cy" values="140;135;140" dur="2.5s" repeatCount="indefinite"/>
                                    <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2.5s" repeatCount="indefinite"/>
                                </circle>
                                <circle cx="260" cy="60" r="3" fill="#6b7280" opacity="0.4">
                                    <animate attributeName="cy" values="60;55;60" dur="3s" repeatCount="indefinite"/>
                                    <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite"/>
                                </circle>
                            </g>
                        </svg>
                    </div>

                    <h1 className="text-8xl font-extrabold bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 bg-clip-text text-transparent mb-6 tracking-tight">
                        404
                    </h1>
                    <p className="text-2xl text-center max-w-2xl mb-4 text-gray-300">
                        Seite nicht gefunden
                    </p>
                    <p className="text-lg text-center max-w-xl mb-8 text-gray-400">
                        Diese Seite existiert nicht
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <a href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-gray-500/50 hover:scale-105 transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Zur Startseite
                        </a>
                        <a href="/tools" className="inline-flex items-center gap-2 bg-transparent border border-white/30 text-white font-semibold px-5 py-3 rounded-full shadow-lg hover:bg-white/10 hover:text-white hover:scale-105 transition-all">
                            Tools entdecken
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}