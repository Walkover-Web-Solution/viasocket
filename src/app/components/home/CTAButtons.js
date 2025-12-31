import Link from 'next/link';

export default function CTAButtons() {
  return (
    <div className="flex gap-4 justify-center mt-5">
      <Link href="/signup" className="btn btn-accent relative z-index-1">
        Start for free
      </Link>
      <Link
        href="https://cal.id/team/viasocket/workflow-setup-discussion"
        target="_blank"
        className="btn btn-outline relative z-index-1"
      >
        Book a demo
      </Link>
    </div>
  );
}
