import Link from 'next/link';
import DashboardButton from '@/components/dashboardButton/dashboardButton';

export default function CTAButtons({ hasToken }) {
  return (
    <div className="flex gap-4 justify-center mt-5">
      <DashboardButton utm_src={"/hero"} className="relative z-index-1" hasToken={hasToken} />
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

