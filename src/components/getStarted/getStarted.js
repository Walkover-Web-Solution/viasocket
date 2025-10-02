import Image from 'next/image';
import Link from 'next/link';
import style from './getStarted.module.scss';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function GetStarted() {
    const [ref, inView] = useScrollAnimation({ threshold: 0.2 });

    return (
        <>
            <div
                ref={ref}
                className={`grid gap-2 bg-white border custom-border p-12 custom-border scroll-animate-scale ${inView ? 'in-view' : ''}`}
            >
                <div className="flex justify-between flex-col md:flex-row">
                    <div className="flex flex-col gap-2 w-fit h-full">
                        <h2 className="h2">We'll help you get started</h2>
                        <p className="sub__h1">Our team is all set to help you!</p>
                    </div>
                    <Link href={'/support'} className={style?.message_cont}>
                        <Image
                            className={`${style?.getstarted} ${style?.default}`}
                            src={'/assets/img/get_started_message.svg'}
                            width={300}
                            height={200}
                            alt="get started message"
                        />
                        <Image
                            className={`${style?.getstarted} ${style?.active}`}
                            src={'/assets/img/get_started_message_active.svg'}
                            width={300}
                            height={200}
                            alt="get started message"
                        />
                    </Link>
                </div>
                <div className="flex  lg:gap-6 gap-4  flex-wrap">
                    <button
                        onClick={() => window.chatWidget.open()}
                        className={`flex text-start justify-start gap-1 btn btn-accent`}
                        aria-label="get started"
                    >
                        24X7 Chat with our AI and human Experts
                    </button>

                    <Link href="https://viasocket.com/faq" target="_blank" aria-label="faq">
                        <button
                            className={`flex text-start justify-start gap-1 btn btn-primary btn-outline custom-border`}
                            aria-label="get started"
                        >
                            Learn via source
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
