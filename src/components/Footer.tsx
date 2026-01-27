import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-background text-white py-8 px-4 text-center w-full">
      <div className="flex flex-col items-center">
        <p className="mb-4">
            © {new Date().getFullYear()} — Alle Rechte vorbehalten
        </p>
        <Link to="/impressum" className="text-gray-400 hover:text-white transition-colors">
          Impressum & Datenschutz
        </Link>
      </div>
    </footer>
  )
}