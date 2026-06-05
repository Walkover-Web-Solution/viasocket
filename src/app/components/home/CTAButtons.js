import DashboardButton from '@/components/dashboardButton/dashboardButton';

export default function CTAButtons({ hasToken }) {
  return (
    <div className="flex gap-4 justify-center">
      <DashboardButton utm_src={"/hero"} className="relative z-index-1" hasToken={hasToken} />
    </div>
  );
}

