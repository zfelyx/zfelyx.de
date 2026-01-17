interface SocialProps {
  title: string
  href: string
  color: string
  path: string
}

export default function Social({ title, href, color, path }: SocialProps) {
  return (
    <li className="flex justify-center items-center">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <button 
          className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-white text-sm sm:text-base font-semibold transition-all duration-300 shadow-lg hover:-translate-y-0.5 hover:shadow-xl hover:opacity-90 active:translate-y-0 active:shadow-md"
          style={{ backgroundColor: color }}
        >
          <img 
            src={`/socials/${path}`} 
            alt={`${title} icon`} 
            className="w-5 h-5 mr-2 flex-shrink-0"
          />
          {title}
        </button>
      </a>
    </li>
  )
}