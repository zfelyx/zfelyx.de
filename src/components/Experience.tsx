interface ExperienceProps {
  name: string
  href: string
  path: string
}

export default function Experience({ name, href, path }: ExperienceProps) {
  return (
    <div className="flex justify-center items-center my-4">
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center transition-transform duration-200 hover:scale-110">
        <img 
          src={`/experiences/${path}`} 
          alt={name} 
          className="w-12 h-12 sm:w-16 sm:h-16"
        />
      </a>
    </div>
  )
}