interface ProjectProps {
  title: string
  href?: string
  desc: string
  gradientStart: string
  gradientEnd: string
}

export default function Project({ title, href, desc, gradientStart, gradientEnd }: ProjectProps) {
  const isDisabled = !href

  return (
    <div 
      className="relative p-5 rounded-xl my-4 text-white text-center w-[700px] shadow-lg transition-transform duration-200 flex flex-col overflow-hidden hover:-translate-y-1.5 before:content-[''] before:absolute before:inset-0 before:bg-black/40 before:transition-opacity before:duration-500 before:rounded-xl before:z-0 hover:before:opacity-0 [&>*]:relative [&>*]:z-10"
      style={{
        background: `linear-gradient(${gradientStart}, ${gradientEnd})`
      }}
    >
      <div className="text-2xl font-bold mb-2">{title}</div>
      <div className="flex-grow mb-4 text-base">{desc}</div>
      
      {isDisabled ? (
        <div className="relative bg-gray-500 cursor-not-allowed text-white py-2.5 px-4 rounded font-bold text-center group">
          View Project
          <span className="invisible opacity-0 absolute bottom-full left-1/2 -translate-x-1/2 translate-y-2 bg-gray-800/80 text-white text-center py-2 px-3 rounded-2xl whitespace-nowrap z-10 shadow-lg text-sm group-hover:visible group-hover:opacity-100 group-hover:animate-fade-in-up">
            link unavailable
          </span>
        </div>
      ) : (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-gray-800 py-2.5 px-4 rounded font-bold text-center no-underline hover:opacity-90 transition-opacity"
        >
          View Project
        </a>
      )}
    </div>
  )
}