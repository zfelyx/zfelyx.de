import PasswordGenerator from './PasswordGenerator'

export default function ToolsPage() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'

  if (pathname.startsWith('/tools/password-generator')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-cyan-900 to-slate-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Passwort-Generator</h2>
          <PasswordGenerator />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-cyan-900 to-slate-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">Tools</h2>
        <p className="text-gray-300 mb-6">Hier findest du kleine Werkzeuge. Klicke auf ein Tool, um es zu öffnen.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/tools/password-generator" className="block p-6 bg-white/5 rounded-lg hover:bg-white/10 transition">
            <h3 className="text-2xl font-semibold">Passwort-Generator</h3>
            <p className="text-gray-300 mt-2">Erzeuge sichere Passwörter mit einstellbarer Länge und Zeichentypen.</p>
          </a>
          {/* Platz für weitere Tools */}
        </div>
      </div>
    </div>
  )
}
