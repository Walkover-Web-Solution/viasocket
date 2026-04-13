import Link from 'next/link';
import AnimatedAppIcons from './AnimatedAppIcons';

export default function HeroSection({ appCount }) {
  return (
    <div className="text-center">
      <h1 className="h1 !normal-case flex flex-col gap-1 relative z-index-1 leading-relaxed">
        <span>
          Automate Anything with <span className="text-accent">AI Agents</span>
        </span>
        <span className="flex items-baseline justify-center gap-2 flex-wrap">
          & <span className="text-accent">{+appCount + 300}+ Apps</span>
          <AnimatedAppIcons />
        </span>
      </h1>
      <p className="text-lg text-gray-600 mt-6 relative z-index-1 flex flex-wrap justify-center gap-x-3">
        <Link
          href="https://viasocket.com/features/web-scraping-crawling"
          target="_blank"
          className="hover:border-b-2 custom-border hover:border-dotted whitespace-nowrap"
        >
          WEB SCRAPING
        </Link>
        <span>·</span>
        <Link
          href="https://viasocket.com/features/human-intervention"
          target="_blank"
          className="hover:border-b-2 custom-border hover:border-dotted whitespace-nowrap"
        >
          HUMAN INTERVENTION
        </Link>
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
