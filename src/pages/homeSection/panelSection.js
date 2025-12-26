import Image from 'next/image';
import DashboardButton from '@/components/dashboardButton/dashboardButton';

const PanelSection = () => {
    return (
        <>
            <div className="container mt-12">
                <div className="cont relative flex items-center justify-center rounded-[20px] shadow-xl border-animation">
                    <div className="content relative rounded-[20px] overflow-hidden">
                        <Image
                            src="/assets/bg-img/panel-ss.svg"
                            alt="panel image"
                            className="w-full h-auto max-h-[600px] object-cover object-top rounded-[20px] opacity-0.2"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="absolute bottom-[5%] left-[57%] -translate-x-1/2 flex justify-center flex-col items-center gap-4 z-50">
                        <DashboardButton utm_src={"/sspanel"}/>
                    </div>
                </div>
            </div>
            <div className="btm-gradient h-[80px]"></div>
        </>
    );
};

export default PanelSection;
