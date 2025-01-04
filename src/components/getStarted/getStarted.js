import Image from 'next/image';
import Link from 'next/link';
import style from './getStarted.module.scss';
import { MdOutlineArrowForward } from 'react-icons/md';
export default function GetStarted({ data, isHero }) {
    return (
        <>
            <div className="grid gap-10 ">
                <div className="flex justify-between flex-col md:flex-row">
                    <div className="flex flex-col w-fit h-full">
                        <h2 className="h1">
                            We'll help you get
                            <br /> started
                        </h2>
                        <p>Our team is all set to help you!</p>
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
                    {data[0] &&
                        data?.map((faq, index) => {
                            if (!faq?.name) {
                                return null;
                            }

                            return (
                                <Link
                                    key={index}
                                    href={faq?.link && faq?.link}
                                    target={faq?.link === '#chat' ? '' : '_blank'}
                                    onClick={() => faq?.link === '#chat' && window.chatWidget.open()}
                                    aria-label="chat"
                                >
                                    <button
                                        className={`flex text-start justify-start gap-1 btn  ${
                                            index == 0 && 'btn-accent outline outline-primary outline-1'
                                        } ${index == 1 && 'btn-primary btn-outline '} ${
                                            index !== 1 && index !== 0 && 'btn-ghost'
                                        }`}
                                        aria-label="get started"
                                    >
                                        <span>{faq?.name}</span>
                                        {/* <MdOutlineArrowForward /> */}
                                    </button>
                                </Link>
                            );
                        })}
                </div>
            </div>
        </>
    );
}
