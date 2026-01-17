import Footer from './components/Footer'
import Social from './components/Social'
import Experience from './components/Experience'
import ContactForm from './components/ContactForm'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-cyan-900 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-200 bg-clip-text text-transparent mb-6 tracking-tight text-center">
            Felix
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-center max-w-xl sm:max-w-2xl mb-8 text-gray-300 px-2">
            Backend & Frontend Entwickler | Kreativ & Innovativ
          </p>
          <div className="flex space-x-4 sm:space-x-6 mb-6">
            <Social title="GitHub" href='https://github.com/zfelyx' path='github.svg' color="#24292e"/>
            <Social title="Discord" href='https://discord.com/users/1078242409495932969' path='discord.svg' color="#5865F2"/>
            <Social title="Email" href='mailto:felix.schneider008@outlook.de' path='envelope.svg' color="#D44638"/>
          </div>
          <div className="flex items-center gap-4">
            <a href="/tools" className="inline-flex items-center gap-2 bg-transparent border border-white/30 text-white font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-white/10 hover:text-white hover:scale-105 transition-all text-sm sm:text-base">
              Tools entdecken
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Erfahrungen
          </h2>
          <p className="text-center text-base sm:text-xl mb-8 sm:mb-16 text-gray-400">
            Die Sprachen und Werkzeuge, mit denen ich bereits gearbeitet habe
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Experience name='Python' href='https://python.org/' path='python.svg'/>
              <h3 className="text-xl sm:text-2xl font-semibold mt-4">Python</h3>
              <p className="text-gray-300">Backend-Entwicklung, Scripting</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Experience name='Typescript' href='https://www.typescriptlang.org/' path='typescript.svg'/>
              <h3 className="text-xl sm:text-2xl font-semibold mt-4">TypeScript</h3>
              <p className="text-gray-300">Frontend-Entwicklung, Typensicherheit</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Experience name='PostgreSQL' href='https://www.postgresql.org/' path='pgsql.svg'/>
              <h3 className="text-xl sm:text-2xl font-semibold mt-4">PostgreSQL</h3>
              <p className="text-gray-300">Datenbank-Management</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Experience name='PostgreSQL' href='https://www.sqlite.org/index.html' path='sqlite.svg'/>
              <h3 className="text-xl sm:text-2xl font-semibold mt-4">Sqlite</h3>
              <p className="text-gray-300">Leichtgewichtige Datenbanken</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Experience name='React' href='https://react.dev/' path='react.svg'/>
              <h3 className="text-xl sm:text-2xl font-semibold mt-4">React</h3>
              <p className="text-gray-300">Frontend-Entwicklung</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Experience name='React' href='https://nodejs.org/' path='nodejs.svg'/>
              <h3 className="text-xl sm:text-2xl font-semibold mt-4">Node.js</h3>
              <p className="text-gray-300">Vielseitige Programmierung</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <Experience name='React' href='https://www.lua.org/' path='lua.svg'/>
              <h3 className="text-xl sm:text-2xl font-semibold mt-4">Lua</h3>
              <p className="text-gray-300">Scripting & Automatisierung</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12 sm:py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
            Projekte
          </h2>
          <p className="text-base sm:text-xl text-gray-400">
            Aktuell arbeite ich an spannenden Projekten. Bald mehr dazu!
          </p>
        </div>
      </section>
      <ContactForm />
      <Footer />
    </div>
  )
}

export default App