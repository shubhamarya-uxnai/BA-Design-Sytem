import React from 'react';
import { IconShieldCheck, IconBrain, IconActivity } from '@tabler/icons-react';
import { useReveal } from '../../hooks/useReveal';
import { PillButton } from '../PillButton';

interface ScienceNextPhaseBridgeProps {
  onNavigate?: (path: string, hash?: string) => void;
}

export function ScienceNextPhaseBridge({ onNavigate }: ScienceNextPhaseBridgeProps) {
  const bridgeRef = useReveal<HTMLElement>();

  return (
    <section className="science-section science-bridge-section" ref={bridgeRef}>
      <div className="science-bridge-card rv">
        <div className="science-bridge-content">
          <div className="science-bridge-tag">
            <IconShieldCheck size={14} stroke={1.75} aria-hidden="true" />
            <span>Clinical Rigor &amp; Phase 2 Preview</span>
          </div>
          <h2 className="science-bridge-title">
            From 7-Bed Laboratory Polysomnography to Your Bedroom
          </h2>
          <p className="science-bridge-desc">
            The neuroscience of autonomic sleep restoration is proven through controlled clinical
            sleep trials. Phase 2 of our science documentation details our 7-bed dedicated physical
            sleep lab, 32-channel clinical polysomnography validation, and head-to-head comparison
            against passive wrist wearables.
          </p>

          <div className="science-bridge-pills">
            <div className="bridge-pill">
              <IconBrain size={15} stroke={1.75} aria-hidden="true" />
              <span>7-Bed Controlled Sleep Facility</span>
            </div>
            <div className="bridge-pill">
              <IconActivity size={15} stroke={1.75} aria-hidden="true" />
              <span>94.2% PSG Epoch Concordance</span>
            </div>
            <div className="bridge-pill">
              <IconShieldCheck size={15} stroke={1.75} aria-hidden="true" />
              <span>CTRI-Registered Protocol</span>
            </div>
          </div>

          <div className="science-bridge-actions">
            <PillButton
              href="#product"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/', '#product');
                }
              }}
            >
              Explore DUSQ One Device
            </PillButton>
            <PillButton
              href="#evidence"
              light
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/', '#evidence');
                }
              }}
            >
              View Clinical Trial Metrics
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
