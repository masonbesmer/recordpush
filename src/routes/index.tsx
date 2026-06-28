import { createFileRoute } from '@tanstack/react-router'
import '../styles/landing.css'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  return (
    <div className="landing-root">
      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-wrap">
          <p className="landing-kicker">Early Access</p>
          <h1 className="landing-heading">Never miss a press.</h1>
          <p className="landing-subtext">
            Track vinyl releases across your favorite stores. Get notified the
            moment new pressings drop.
          </p>
          <div className="landing-ctas">
            <a href="#" className="landing-btn-primary">Sign Up Free</a>
            <a href="#" className="landing-btn-secondary">Browse Stores</a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="landing-section">
        <div className="landing-wrap">
          <p className="landing-kicker">How It Works</p>
          <h2 className="landing-section-heading">
            Three steps to never missing a drop.
          </h2>
          <div className="landing-steps">
            {[
              { n: '1', title: 'Sign Up', desc: 'Create a free account in seconds.' },
              { n: '2', title: 'Pick Stores', desc: 'Choose which stores to monitor.' },
              { n: '3', title: 'Get Notified', desc: 'Receive alerts when releases drop.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="landing-step">
                <div className="landing-step-num">{n}</div>
                <p className="landing-step-title">{title}</p>
                <p className="landing-step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="landing-section">
        <div className="landing-wrap">
          <p className="landing-kicker">Features</p>
          <h2 className="landing-section-heading">Built for serious collectors.</h2>
          <div className="landing-cards">
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ),
                title: 'Track New Releases',
                desc: "Monitor store pages for new vinyl pressings as they're listed.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                ),
                title: 'Instant Alerts',
                desc: 'Get notified by email or in-app the moment a release appears.',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                ),
                title: 'Wishlist',
                desc: "Save records you're hunting so you never lose track.",
              },
            ].map(({ icon, title, desc }) => (
              <article key={title} className="landing-card">
                <div className="landing-card-icon">{icon}</div>
                <h3 className="landing-card-title">{title}</h3>
                <p className="landing-card-desc">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tracked Stores */}
      <section className="landing-section">
        <div className="landing-wrap">
          <p className="landing-kicker">Tracked Stores</p>
          <h2 className="landing-section-heading">
            We watch the stores you care about.
          </h2>
          <div className="landing-stores">
            {['Discogs', 'Music Direct', 'Acoustic Sounds', 'Plaid Room'].map(
              (name) => (
                <div key={name} className="landing-store-chip">
                  <span className="landing-store-dot" />
                  <span className="landing-store-name">{name}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="landing-section">
        <div className="landing-wrap">
          <div className="landing-coming-soon">
            <p className="landing-kicker">Coming Soon</p>
            <h2 className="landing-heading">recordpush is in early access.</h2>
            <p className="landing-coming-soon-body">
              Join the waitlist to be first in line when we launch.
            </p>
            <a href="#" className="landing-btn-primary">Join Waitlist</a>
          </div>
        </div>
      </section>
    </div>
  )
}
