export default function Footer() {
  return (
    <footer className="bg-background text-white py-8 px-4 text-center w-full">
      <div className="flex flex-col items-center">
        <p>
            © {new Date().getFullYear()} — Alle Rechte vorbehalten
        </p>
      </div>
    </footer>
  )
}