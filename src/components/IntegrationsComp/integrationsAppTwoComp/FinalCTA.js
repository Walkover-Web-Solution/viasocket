'use client';
import DashboardButton from '@/components/dashboardButton/dashboardButton';

export default function FinalCTA({ appOneDetails, appTwoDetails, utm, hasToken }) {
    return (
        <div className="container">
            <div className="bg-black text-white p-12 text-center w-full">
                <div className="cont gap-6 items-center">
                    <h2 className="h2 text-white">
                        Start automating {appOneDetails?.name} and {appTwoDetails?.name} free
                    </h2>
                    <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto">
                        No credit card required. Set up your first workflow in minutes.
                    </p>
                    <DashboardButton utm_src={utm + '#final-cta'} hasToken={hasToken} />
                </div>
            </div>
        </div>
    );
}
