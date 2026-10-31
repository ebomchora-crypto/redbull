interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <span className={`inline-flex select-none items-baseline gap-[0.08em] font-display leading-none ${className}`}>
      <span className="text-rb-white">RED</span>
      <span className="text-rb-red">BULL</span>
    </span>
  )
}
