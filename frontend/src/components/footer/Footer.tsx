export function Footer() {
  return (
    <footer className="border-t border-brand-detail">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-1.5">
          <span className="font-orbitron text-sm font-bold text-content-primary tracking-[0.2em]">
            SAHIB NARULA
          </span>
          <span className="font-mono text-[10px] text-content-secondary/40 tracking-[0.25em]">
            AI · AUTOMATION · SOFTWARE
          </span>
        </div>

        {/* Copyright */}
        <div className="font-mono text-[10px] text-content-secondary/30 tracking-wider text-center md:text-right">
          © {new Date().getFullYear()} SAHIB NARULA. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  )
}
