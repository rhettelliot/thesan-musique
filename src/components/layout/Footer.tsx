export function Footer() {
  return (
    <footer className="relative pt-20 md:pt-28 pb-12 md:pb-16">
      <div className="footer-rule absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-8">
          {/* Left */}
          <div>
            <h3 className="font-display text-2xl font-bold tracking-[-0.02em] uppercase">
              Thesan <span className="text-neon text-neon-glow">Musique</span>
            </h3>
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-light-muted mt-2">
              Deep Dance · Techno · Drum & Bass
            </p>
            <p className="font-mono text-[9px] tracking-[0.15em] text-light-muted mt-4">
              Seattle, WA · Manteis Recordings · MR-002
            </p>
          </div>

          {/* Right — streaming */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-light-muted mb-1">
              Stream
            </span>
            <a
              href="https://open.spotify.com/album/34IoM42BGoMQ7VoeeZSWlh"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Listen to Thesan Musique on Spotify (opens in new tab)"
              className="font-mono text-[10px] tracking-[0.1em] text-light-muted hover:text-neon transition-colors duration-200"
            >
              Spotify
            </a>
            <a
              href="https://music.apple.com/us/artist/thesan-musique"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Listen to Thesan Musique on Apple Music (opens in new tab)"
              className="font-mono text-[10px] tracking-[0.1em] text-light-muted hover:text-neon transition-colors duration-200"
            >
              Apple Music
            </a>
          </div>
        </div>

        {/* Manteis Network — cross-site discovery */}
        <div className="mt-12 pt-8 border-t border-edge-faint flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-light-muted mb-1">
              Label
            </span>
            <a
              href="https://manteisrecordings.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Visit Manteis Recordings label hub (opens in new tab)"
              className="font-mono text-[10px] tracking-[0.1em] text-light-muted hover:text-neon transition-colors duration-200"
            >
              Manteis Recordings ↗
            </a>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-light-muted mb-1">
              Roster
            </span>
            <div className="flex flex-col md:items-end gap-1">
              <a href="https://redshiftmantra.vercel.app" target="_blank" rel="noreferrer noopener" aria-label="Visit Red Shift Mantra artist site (opens in new tab)" className="font-mono text-[10px] tracking-[0.1em] text-light-muted hover:text-neon transition-colors duration-200">Red Shift Mantra ↗</a>
              <a href="https://manteis-project-site.vercel.app" target="_blank" rel="noreferrer noopener" aria-label="Visit The Manteis Project artist site (opens in new tab)" className="font-mono text-[10px] tracking-[0.1em] text-light-muted hover:text-neon transition-colors duration-200">The Manteis Project ↗</a>
              <a href="https://brindavan-gardens-site.vercel.app" target="_blank" rel="noreferrer noopener" aria-label="Visit Brindavan Gardens artist site (opens in new tab)" className="font-mono text-[10px] tracking-[0.1em] text-light-muted hover:text-neon transition-colors duration-200">Brindavan Gardens ↗</a>
              <a href="https://bethany-pritchett-site.vercel.app" target="_blank" rel="noreferrer noopener" aria-label="Visit Bethany Pritchett artist site (opens in new tab)" className="font-mono text-[10px] tracking-[0.1em] text-light-muted hover:text-neon transition-colors duration-200">Bethany Pritchett ↗</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 md:mt-20 pt-6 border-t border-edge-faint flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-mono text-[8px] tracking-[0.15em] text-light-muted">
            © {new Date().getFullYear()} Thesan Musique. All frequencies reserved.
          </p>
          <p className="font-mono text-[8px] tracking-[0.15em] text-light-muted">
            Manteis Recordings
          </p>
        </div>
      </div>
    </footer>
  )
}