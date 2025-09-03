import { useEffect, useRef, useState } from "react"

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Articles", href: "#articles" },
]

export default function NavBar() {
  const [active, setActive] = useState(0)
  const [inContact, setInContact] = useState(false)
  const linkRefs = useRef([])
  const indicatorRef = useRef(null)

  const moveIndicator = () => {
    if (inContact) {
      if (indicatorRef.current) {
        indicatorRef.current.style.width = 0
      }
      return
    }
    const el = linkRefs.current[active]
    const indicator = indicatorRef.current
    if (!el || !indicator) return
    const { offsetLeft, offsetWidth } = el
    indicator.style.width = `${offsetWidth}px`
    indicator.style.left = `${offsetLeft}px`
  }

  useEffect(() => {
    moveIndicator()
    window.addEventListener("resize", moveIndicator)
    return () => window.removeEventListener("resize", moveIndicator)
  }, [active, inContact])

  useEffect(() => {
    const sectionEls = [...navItems, { href: "#contact" }]
      .map((i) => document.querySelector(i.href))
      .filter(Boolean)

    const onScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3
      let newActive = 0
      let contactActive = false

      sectionEls.forEach((sec, idx) => {
        if (sec.offsetTop <= scrollY) {
          if (idx === sectionEls.length - 1) {
            contactActive = true
          } else {
            newActive = idx
          }
        }
      })

      if (contactActive !== inContact) setInContact(contactActive)
      if (!contactActive && newActive !== active) setActive(newActive)
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [active, inContact])

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm overflow-hidden">
      <nav className="max-w-6xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Left: Your name / logo */}
           <div className="hidden md:block relative inline-block">
      {/* Name in cursive */}
      <span
        className="text-blue-900 text-4xl text-pretty font-bold"
        style={{ fontFamily: "'Great Vibes', 'Brush Script MT', 'Pacifico', cursive, sans-serif", lineHeight: 1 }}
      >
       The portfolio 
      </span>      
      {/* Optional arrow at the end */}
    </div>


          {/* Center: Nav links */}
          <div className="relative inline-flex gap-8">
            {navItems.map((item, idx) => (
              <a
                key={item.href}
                ref={(el) => (linkRefs.current[idx] = el)}
                href={item.href}
                onClick={() => {
                  setActive(idx)
                  setInContact(false)
                }}
                className={`pb-1 text-sm font-semibold transition-colors ${
                  active === idx && !inContact
                    ? "text-blue-900"
                    : "text-gray-700 hover:text-blue-800"
                }`}
              >
                {item.label}
              </a>
            ))}

            {/* Sliding underline */}
            <span
              ref={indicatorRef}
              className="absolute bottom-0 h-0.5 bg-blue-900 transition-all duration-300"
              style={{ width: 0, left: 0 }}
            />
          </div>

          {/* Right: Contact Me button */}
          <a
            href="#contact"
            onClick={() => setInContact(true)}
            className={`ml-6 px-4 py-2 rounded-lg text-sm font-medium transition ${
              inContact
                ? "bg-blue-900 text-white shadow-[0_0_10px_2px_rgba(30,58,138,0.8)] hover:shadow-[0_0_15px_4px_rgba(30,58,138,1)]"
                : "bg-blue-900 text-white hover:bg-blue-800"
            }`}
          >
            Contact Me
          </a>
        </div>
      </nav>
    </header>
  )
}
