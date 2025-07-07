import { LinkButton } from '../uiComponents/buttons';
import MarqueeComponent from './marquee';

export default function IntegrateAppsComp() {
    return (
        <div className="cont cont__gap py-12 border custom-border border-r-0 border-l-0 bg-[#FAF9F6]">
            <div className="container flex">
                <div className="cont gap-1">
                    <h2 className="h2">
                        Connect with <span className="text-accent">1,500+ Apps</span> Effortlessly
                    </h2>
                    <p className="text-lg text-gray-400">
                        viaSocket automates your workflows by bridging the tools you use - seamlessly, reliably, and at
                        scale
                    </p>
                    <LinkButton
                        customClasses={'btn btn-accent mt-8'}
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/integrations`}
                        content={'See All'}
                    />
                </div>
            </div>
            <MarqueeComponent />
        </div>
    );
}
