import React from 'react';
import {
  IconArrowUpRight,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
} from '@tabler/icons-react';
import { useReveal } from '../hooks/useReveal';

interface FooterProps {
  currentPath?: string;
  onNavigate?: (path: string, hash?: string) => void;
}

export function Footer({ currentPath = '/', onNavigate }: FooterProps) {
  const footerRef = useReveal<HTMLElement>();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, hash?: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path, hash);
    }
  };

  return (
    <footer className="site-footer" ref={footerRef}>
      <div className="footer-top-grid rv">
        {/* Left Column: Clean DUSQ Wordmark + Tagline + Social Handles */}
        <div className="footer-brand-col">
          <a
            href="#top"
            className="footer-clean-logo"
            aria-label="DUSQ home"
            onClick={(e) => handleLinkClick(e, currentPath === '/pages/science' ? '/pages/science' : '/', '#top')}
          >
            <img src="/dusq-logo.svg" width="120" height="34" alt="DUSQ" className="footer-logo-clean" />
          </a>

          {/* Tagline placed directly below the DUSQ logo */}
          <p className="footer-brand-tagline">
            Better nights begin with a quieter system.
          </p>

          {/* Social Media Handles */}
          <div className="footer-social-row" aria-label="Social media channels">
            <a
              href="https://www.instagram.com/dusqsleep"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="DUSQ on Instagram"
              title="Instagram"
            >
              <IconBrandInstagram size={18} stroke={1.75} />
            </a>
            <a
              href="https://www.linkedin.com/company/dusq"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="DUSQ on LinkedIn"
              title="LinkedIn"
            >
              <IconBrandLinkedin size={18} stroke={1.75} />
            </a>
            <a
              href="https://x.com/dusqsleep"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="DUSQ on X (Twitter)"
              title="X (Twitter)"
            >
              <IconBrandX size={18} stroke={1.75} />
            </a>
            <a
              href="https://www.youtube.com/@dusqsleep"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="DUSQ on YouTube"
              title="YouTube"
            >
              <IconBrandYoutube size={18} stroke={1.75} />
            </a>
          </div>
        </div>

        {/* Center Column: Direct Navigation */}
        <div className="footer-nav-col">
          <span className="footer-nav-header">EXPLORE DUSQ</span>
          <nav className="footer-nav-links" aria-label="Footer navigation">
            <a
              href="/pages/science"
              onClick={(e) => handleLinkClick(e, '/pages/science')}
            >
              The science & evidence
            </a>
            <a
              href="/pages/the-sleep-lab"
              onClick={(e) => handleLinkClick(e, '/pages/the-sleep-lab')}
            >
              The Sleep Lab facility
            </a>
            <a
              href="/app"
              onClick={(e) => handleLinkClick(e, '/app')}
            >
              Mobile companion app
            </a>
            <a
              href="#product"
              onClick={(e) => handleLinkClick(e, '/', '#product')}
            >
              DUSQ One Wearable
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => handleLinkClick(e, '/', '#how-it-works')}
            >
              Closed-loop architecture
            </a>
            <a
              href="#faq"
              onClick={(e) => handleLinkClick(e, '/', '#faq')}
            >
              Frequently asked questions
            </a>
            <a
              href="https://dusq.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-ext-link"
            >
              Official DUSQ store
              <span className="footer-ext-icon" aria-hidden="true">
                <IconArrowUpRight size={13} stroke={1.75} />
              </span>
            </a>
          </nav>
        </div>

        {/* Right Column: Clean Device Showcase (Unboxed, floating cleanly on dark background) */}
        <div className="footer-device-col">
          <div className="footer-device-clean">
            <div className="footer-device-tag">
              <span className="footer-device-dot" />
              <span>DUSQ ONE · 12G POSTAURICULAR CONTOUR</span>
            </div>
            <div className="footer-device-img-frame">
              <img
                src="/science/clean-dusq-product-one-hero.webp"
                alt="DUSQ One Wearable Device"
                className="footer-device-img"
                loading="lazy"
              />
            </div>
            <div className="footer-device-info">
              <strong>Postauricular Neurostimulation</strong>
              <span>Non-invasive Vagus + Vestibular Modulation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Metadata */}
      <div className="footer-bottom rv rv-d1">
        <span>© 2026 DUSQ Inc. All rights reserved. CTRI-registered neurostimulation protocol.</span>
        <span>DUSQ Design System · Exploratory Application Preview</span>
      </div>
    </footer>
  );
}
