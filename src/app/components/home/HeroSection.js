import Link from 'next/link';

export default function HeroSection({ appCount }) {
  return (
    <div className="text-center">
      <p className="text-3xl text-black mb-12 relative z-index-1">
        Automate Anything around{' '}
        <Link
          href="https://viasocket.com/integrations"
          target="_blank"
          className="border-b-2 custom-border border-dotted"
        >
          <span>AI + {+appCount + 300}</span> Apps
        </Link>{' '}
      </p>

      <h1 className="h1 !normal-case flex flex-col gap-1 relative z-index-1">
        <span>
          Search ready-made <span className="text-accent">automations</span>
        </span>
      </h1>
    </div>
  );
}
