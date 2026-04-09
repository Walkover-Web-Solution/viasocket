import Link from 'next/link';
import Image from 'next/image';

const appIcons = [
  {
    src: 'https://thingsofbrand.com/api/icon/pipedrive.com',
    alt: 'pipedrive icon',
  },
  {
    src: 'https://stuff.thingsofbrand.com/zoom.us/images/img688a247e14_zoom.jpg',
    alt: 'zoom icon',
  },
  {
    src: 'https://thingsofbrand.com/api/icon/notion.so',
    alt: 'notion icon',
  },
  {
    src: 'https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg',
    alt: 'slack icon',
  },
];

export default function HeroSection({ appCount }) {
  return (
    <div className="text-center">
      <h1 className="h1 !normal-case flex flex-col gap-1 relative z-index-1">
        <span>
          Automate Anything with <span className="text-accent">AI Agents</span>
        </span>
        <span className="flex items-baseline justify-center gap-2 flex-wrap">
          & <span className="text-accent">{+appCount + 300}+ Apps</span>
          <span className="inline-flex items-center gap-2">
            {appIcons.map((icon, index) => (
              <Image
                key={index}
                src={icon.src}
                alt={icon.alt}
                width={32}
                height={32}
                className="rounded-lg w-8 h-auto"
              />
            ))}
          </span>
        </span>
      </h1>
      <p className="text-lg text-gray-600 mt-4 relative z-index-1 flex flex-wrap justify-center gap-x-3">
        <span className="whitespace-nowrap">WEB SCRAPING</span>
        <span>·</span>
        <span className="whitespace-nowrap">HUMAN INTERVENTION</span>
        <span>·</span>
        <Link
          href="https://viasocket.com/features"
          target="_blank"
          className="border-b-2 custom-border border-dotted whitespace-nowrap"
        >
          100+ FEATURES
        </Link>
      </p>
    </div>
  );
}
