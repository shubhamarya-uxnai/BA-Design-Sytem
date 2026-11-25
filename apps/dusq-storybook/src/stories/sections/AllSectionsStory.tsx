import React from 'react';
import { Header } from '@dusq-preview/components/Header';
import { Hero } from '@dusq-preview/components/Hero';
import { BrandsTicker } from '@dusq-preview/components/BrandsTicker';
import { FindYourFix } from '@dusq-preview/components/FindYourFix';
import { Community } from '@dusq-preview/components/Community';
import { MeetTeam } from '@dusq-preview/components/MeetTeam';
import { HowItWorks } from '@dusq-preview/components/HowItWorks';
import { ClinicalData } from '@dusq-preview/components/ClinicalData';
import { Comparison } from '@dusq-preview/components/Comparison';
import { ProductOne } from '@dusq-preview/components/ProductOne';
import { FAQ } from '@dusq-preview/components/FAQ';
import { Footer } from '@dusq-preview/components/Footer';
import { DocsTable } from '../../components/DocsTable';

export function AllSectionsStory() {
  return (
    <div className="section-story-wrapper all-sections-story">
      <div className="isolated-component-canvas full-page-canvas">
        <Header />
        <main>
          <Hero />
          <BrandsTicker />
          <FindYourFix />
          <Community />
          <MeetTeam />
          <HowItWorks />
          <ClinicalData />
          <Comparison />
          <ProductOne />
          <FAQ />
        </main>
        <Footer />
      </div>

      <DocsTable
        title="All Sections (Full Page Composition)"
        description="The full DUSQ exploratory landing page composition rendered end-to-end. Use the responsive viewport toolbar above to switch between Desktop (1440px), Tablet (900px), and Mobile (375px) to test layout reflows, sticky headers, touch targets, and typographic scaling."
        componentPath="apps/dusq-preview/src/main.tsx"
        tokensUsed={[
          { name: 'Warm Neutral Ladder', cssVar: '--ba-primitive-color-tokens-neutral-0..950', role: 'Full system color gamut' },
          { name: 'DUSQ Orange Accent', cssVar: '--orange / #F0650D', role: 'Interactive call to actions' },
          { name: '21 Text Styles', cssVar: '.va-text-*', role: 'Responsive typographic hierarchy' },
        ]}
      />
    </div>
  );
}
