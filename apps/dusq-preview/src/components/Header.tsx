import React, { useState } from 'react';
import { IconMenu2, IconX, IconArrowUpRight } from '@tabler/icons-react';
import { PillButton } from './PillButton';

interface HeaderProps {
  currentPath?: string;
  onNavigate?: (path: string, hash?: string) => void;
}

export function Header({ currentPath = '/', onNavigate }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, hash?: string) => {
    setOpen(false);
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path, hash);
    }
  };

  const isHome = currentPath === '/' || currentPath === '';
  const isScience = currentPath === '/pages/science' || currentPath === '/pages/science/';
  const isSleepLab =
    currentPath === '/pages/the-sleep-lab' ||
    currentPath === '/pages/the-sleep-lab/' ||
    currentPath === '/the-sleep-lab' ||
    currentPath === '/the-sleep-lab/' ||
    currentPath === '/pages/sleep-lab' ||
    currentPath === '/pages/sleep-lab/' ||
    currentPath === '/sleep-lab' ||
    currentPath === '/sleep-lab/';

  return (
    <header className="site-header" data-reveal style={{ '--i': 0 } as React.CSSProperties}>
      {/* 1. Left: Iconic DUSQ Brand Wordmark */}
      <a
        href="/"
        className="logo"
        onClick={(e) => handleLinkClick(e, '/', '#top')}
        aria-label="DUSQ Home"
      >
        DUSQ<span className="logo-dot">.</span>
      </a>

      {/* 2. Center-Aligned Navigation Bar (Website Pages ONLY: Home, Science, Sleep Labs) */}
      <nav className="site-nav" aria-label="Website Pages">
        <a
          href="/"
          className={isHome ? 'is-active' : ''}
          onClick={(e) => handleLinkClick(e, '/', '#top')}
        >
          Home
        </a>
        <a
          href="/pages/science"
          className={isScience ? 'is-active' : ''}
          onClick={(e) => handleLinkClick(e, '/pages/science', '#top')}
        >
          Science
        </a>
        <a
          href="/pages/the-sleep-lab"
          className={isSleepLab ? 'is-active' : ''}
          onClick={(e) => handleLinkClick(e, '/pages/the-sleep-lab', '#top')}
        >
          Sleep Labs
        </a>
      </nav>

      {/* 3. Right: Header Action (Separate Application Link + PillButton + Mobile Menu Toggle) */}
      <div className="header-action">
        {/* Application kept as its own separate link outside the main website page setup */}
        <a
          href="/app"
          className="site-app-link"
          onClick={(e) => handleLinkClick(e, '/app')}
          title="Open DUSQ Interactive Mobile Application Simulator"
        >
          <span>Application</span>
          <IconArrowUpRight size={13} stroke={1.75} aria-hidden="true" />
        </a>

        <PillButton
          href="#find-your-fix"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              const el = document.getElementById('find-your-fix');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            } else if (onNavigate) {
              e.preventDefault();
              onNavigate('/', '#find-your-fix');
            }
          }}
        >
          Find your fix
        </PillButton>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <IconX size={20} stroke={2} /> : <IconMenu2 size={20} stroke={2} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {open && (
        <div className="site-mobile-nav">
          <a
            href="/"
            className={isHome ? 'is-active' : ''}
            onClick={(e) => handleLinkClick(e, '/', '#top')}
          >
            Home
          </a>
          <a
            href="/pages/science"
            className={isScience ? 'is-active' : ''}
            onClick={(e) => handleLinkClick(e, '/pages/science', '#top')}
          >
            Science
          </a>
          <a
            href="/pages/the-sleep-lab"
            className={isSleepLab ? 'is-active' : ''}
            onClick={(e) => handleLinkClick(e, '/pages/the-sleep-lab', '#top')}
          >
            Sleep Labs
          </a>

          <div className="site-mobile-nav-divider" />

          {/* Separate Application link in mobile menu */}
          <a
            href="/app"
            className="site-mobile-app-link"
            onClick={(e) => handleLinkClick(e, '/app')}
          >
            <span>Application</span>
            <IconArrowUpRight size={14} stroke={1.75} aria-hidden="true" />
          </a>

          <div className="mobile-nav-cta">
            <PillButton
              href="#find-your-fix"
              onClick={(e) => {
                setOpen(false);
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/', '#find-your-fix');
                }
              }}
            >
              Find your fix
            </PillButton>
          </div>
        </div>
      )}
    </header>
  );
}
