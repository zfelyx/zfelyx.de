import Footer from './components/Footer'
import Social from './components/Social'
import Experience from './components/Experience'
import Snowfall from './components/Snowfall'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Snowfall />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-200 bg-clip-text text-transparent mb-6 tracking-tight text-center">
            Felix
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-center max-w-xl sm:max-w-2xl mb-8 text-gray-300 px-2">
            Backend & Frontend Entwickler | Kreativ & Innovativ
          </p>
          <div className="flex space-x-4 sm:space-x-6 mb-6">
            <Social title="GitHub" href='https://github.com/zfelyx' path='github.svg' color="#24292e"/>
            <Social title="Discord" href='https://discord.com/users/1159547960233836684' path='discord.svg' color="#5865F2"/>
            <Social title="Email" href='mailto:felix.schneider008@outlook.de' path='envelope.svg' color="#D44638"/>
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 bg-gradient-to-r from-gray-200 to-gray-500 bg-clip-text text-transparent">
            Projekte
          </h2>
          <p className="text-base sm:text-xl text-gray-400">
            Aktuell arbeite ich an spannenden Projekten. Bald mehr dazu!
          </p>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default App