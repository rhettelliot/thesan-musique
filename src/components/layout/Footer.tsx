export function Footer() {
  return (
    <footer className="py-16 md:py-24 border-t border-edge-faint relative bg-void">
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h3 className="font-display text-2xl font-bold tracking-[-0.02em] uppercase text-cream">
              Thesan <span className="text-signal">Musique</span>
            </h3>
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-light-muted mt-2">
              Deep Dance · Techno · Drum & Bass
            </p>
            <p className="font-mono text-[9px] tracking-[0.15em] text-light-muted mt-4">
              Seattle, WA · Manteis Recordings · MR-008
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-light-muted mb-1">
              Stream
            </span>
            <a
              href="https://open.spotify.com/album/34IoM42BGoMQ7VoeeZSWlh"
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-[10px] tracking-[0.1em] text-light-muted hover:text-signal transition-colors duration-200"
            >
              Spotify
            </a>
            <a
              href="https://music.apple.com/us/artist/thesan-musique"
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-[10px] tracking-[0.1em] text-light-muted hover:text-signal transition-colors duration-200"
            >
              Apple Music
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-edge-faint flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="font-mono text-[8px] tracking-[0.15em] text-light-muted">
            © {new Date().getFullYear()} Thesan Musique. All frequencies reserved.
          </p>
          <div className="border border-edge-subtle px-3 py-1">
            <p className="font-mono text-[8px] tracking-[0.15em] text-signal">
              Manteis Recordings
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
