'use client'
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Pool of app logos to cycle through
const ALL_LOGOS = [
  { src: 'https://thingsofbrand.com/api/icon/pipedrive.com', alt: 'Pipedrive' },
  { src: 'https://stuff.thingsofbrand.com/zoom.us/images/img688a247e14_zoom.jpg', alt: 'Zoom' },
  { src: 'https://thingsofbrand.com/api/icon/notion.so', alt: 'Notion' },
  { src: 'https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg', alt: 'Slack' },
  { src: 'https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png', alt: 'Google Sheets' },
  { src: 'https://thingsofbrand.com/api/icon/hubspot.com', alt: 'HubSpot' },
  { src: 'https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png', alt: 'Gmail' },
  { src: 'https://stuff.thingsofbrand.com/salesforce.com/images/img1_salesforce.png', alt: 'Salesforce' },
  { src: 'https://thingsofbrand.com/api/icon/teams.microsoft.com', alt: 'Microsoft Teams' },
  { src: 'https://thingsofbrand.com/api/icon/airtable.com', alt: 'Airtable' },
  { src: 'https://thingsofbrand.com/api/icon/stripe.com', alt: 'Stripe' },
  { src: 'https://thingsofbrand.com/api/icon/quickbooks.com', alt: 'QuickBooks' },
];

const DISPLAY_COUNT = 4; // Number of icons visible at once

export default function AnimatedAppIcons() {
  // Track which logo index each slot currently shows
  const [indices, setIndices] = useState([0, 1, 2, 3]);
  // Which slot is currently fading out (null = none)
  const [fadingSlot, setFadingSlot] = useState(null);
  // Tracks which slot to update next (cycles 0→1→2→3→0...)
  const nextSlotRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const slot = nextSlotRef.current;

      // Step 1: fade out the current icon in this slot
      setFadingSlot(slot);

      // Step 2: after fade-out completes (280ms), swap in the next logo and fade back in
      setTimeout(() => {
        setIndices(prev => {
          const next = [...prev];
          // Advance this slot's logo by DISPLAY_COUNT positions to avoid
          // showing the same logo in two slots simultaneously
          next[slot] = (next[slot] + DISPLAY_COUNT) % ALL_LOGOS.length;
          return next;
        });
        setFadingSlot(null);
        // Advance to the next slot for the next cycle
        nextSlotRef.current = (nextSlotRef.current + 1) % DISPLAY_COUNT;
      }, 280); // must match the CSS transition duration below

    }, 1400); // swap one icon every 1.4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex items-center gap-2">
      {indices.map((logoIndex, i) => {
        const logo = ALL_LOGOS[logoIndex];
        return (
          <span
            key={i}
            className="inline-flex w-8 h-8 flex-shrink-0 transition-opacity duration-[280ms] ease-in-out"
            style={{
              opacity: fadingSlot === i ? 0 : 1,
            }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={32}
              height={32}
              className="rounded-lg w-full h-full object-contain"
            />
          </span>
        );
      })}
    </span>
  );
}
