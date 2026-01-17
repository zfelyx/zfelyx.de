import { useState } from 'react'

type Options = {
  lower: boolean
  upper: boolean
  numbers: boolean
  symbols: boolean
}

function getCharset(options: Options) {
  const lower = 'abcdefghijklmnopqrstuvwxyz'
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
  let chars = ''
  if (options.lower) chars += lower
  if (options.upper) chars += upper
  if (options.numbers) chars += numbers
  if (options.symbols) chars += symbols
  return chars
}

function generatePassword(length: number, options: Options) {
  const chars = getCharset(options)
  if (!chars) return ''
  const array = new Uint32Array(length)
  // Use Web Crypto for secure randomness
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(array)
  } else {
    // Fallback to Math.random (unlikely in modern browsers)
    for (let i = 0; i < length; i++) array[i] = Math.floor(Math.random() * Math.pow(2, 32))
  }
  const result = new Array(length)
  for (let i = 0; i < length; i++) {
    result[i] = chars[array[i] % chars.length]
  }
  return result.join('')
}

function calculateStrength(pw: string) {
  let score = 0
  if (!pw) return { score: 0, label: 'Empty' }
  if (pw.length >= 8) score++
  if (pw.length >= 12) score++
  // character variety
  const hasLower = /[a-z]/.test(pw)
  const hasUpper = /[A-Z]/.test(pw)
  const hasNumber = /[0-9]/.test(pw)
  const hasSymbol = /[^A-Za-z0-9]/.test(pw)
  const variety = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length
  if (variety >= 2) score++
  if (variety >= 3 && pw.length >= 12) score++

  const labels = ['Very weak', 'Weak', 'Okay', 'Good', 'Strong']
  return { score: Math.min(4, score), label: labels[Math.min(4, score)] }
}

async function copyToClipboard(text: string) {
  if (!text) return
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
    } else {
      // fallback
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
  } catch (e) {
    // ignore
  }
}

export default function PasswordGenerator() {
  const [length, setLength] = useState<number>(16)
  const [options, setOptions] = useState<Options>({ lower: true, upper: true, numbers: true, symbols: false })
  const [password, setPassword] = useState<string>('')
  const [copied, setCopied] = useState(false)

  const strength = calculateStrength(password)

  const onGenerate = () => {
    const pw = generatePassword(length, options)
    setPassword(pw)
    setCopied(false)
  }

  const onCopy = async () => {
    await copyToClipboard(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto my-12 p-6 bg-white/5 backdrop-blur rounded-2xl">
      <h3 className="text-2xl font-semibold mb-4">Passwort-Generator</h3>
      <p className="text-gray-300 mb-4">Erzeuge sichere Passwörter. Dieses Passwort wird nicht gespeichert.</p>

      <div className="mb-4">
        <label className="block text-sm text-gray-300 mb-2">Länge: {length}</label>
        <input
          type="range"
          min={6}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="flex gap-4 flex-wrap mb-4">
        <label className="inline-flex items-center gap-2 text-sm text-gray-300">
          <input type="checkbox" checked={options.lower} onChange={(e) => setOptions(o => ({ ...o, lower: e.target.checked }))} />
          Kleinbuchstaben
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-gray-300">
          <input type="checkbox" checked={options.upper} onChange={(e) => setOptions(o => ({ ...o, upper: e.target.checked }))} />
          Großbuchstaben
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-gray-300">
          <input type="checkbox" checked={options.numbers} onChange={(e) => setOptions(o => ({ ...o, numbers: e.target.checked }))} />
          Zahlen
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-gray-300">
          <input type="checkbox" checked={options.symbols} onChange={(e) => setOptions(o => ({ ...o, symbols: e.target.checked }))} />
          Symbole
        </label>
      </div>

      <div className="flex gap-3 mb-4">
        <button onClick={onGenerate} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">Generieren</button>
        <button onClick={() => { setPassword(''); setCopied(false) }} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">Leeren</button>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <input className="flex-1 bg-black/20 px-3 py-2 rounded text-white" readOnly value={password} />
        <button onClick={onCopy} disabled={!password} className="bg-gray-100 text-black px-3 py-2 rounded disabled:opacity-50">{copied ? 'Kopiert' : 'Kopieren'}</button>
      </div>

      <div className="mb-2">
        <div className="h-2 rounded bg-gray-700 overflow-hidden">
          <div className={`h-full transition-all ${strength.score <= 1 ? 'w-1/4 bg-red-500' : strength.score === 2 ? 'w-2/4 bg-amber-400' : strength.score === 3 ? 'w-3/4 bg-green-400' : 'w-full bg-green-600'}`}></div>
        </div>
        <div className="text-sm text-gray-300 mt-2">Stärke: {strength.label}</div>
      </div>

      <div className="text-xs text-gray-500 mt-3">Hinweis: Für sehr sensible Anwendungsfälle verwende bitte einen dedizierten Passwort-Manager. Dieses Tool speichert keine Passwörter.</div>
    </div>
  )
}
