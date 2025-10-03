import Link from 'next/link';

export default function GetStarted() {
    return (
        <>
            <div className="bg-white border custom-border p-12 custom-border flex  gap-12 justify-between items-center flex-wrap">
                <div className="flex flex-col gap-4">
                <div className="flex justify-between flex-col md:flex-row">
                    <div className="flex flex-col gap-2 w-fit h-full">
                        <h2 className="h2">We'll help you get started</h2>
                        <p className="sub__h1">Our team is all set to help you!</p>
                    </div>
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

                <div className="flex items-center justify-center overflow-hidden w-fit lg:pr-4 xl:pr-24 md:p-0">
                  <div className="flex -space-x-5">
                    <img
                      src="/review-image/1.svg"
                      alt="Expert 1"
                      className="w-28 h-28"
                    />
                    <img
                      src="/review-image/2.svg"
                      alt="Expert 2"
                      className="w-28 h-28"
                    />
                    <img
                      src="/review-image/3.svg"
                      alt="Expert 3"
                      className="w-28 h-28"
                    />
                    <img
                      src="/review-image/4.svg"
                      alt="Expert 4"
                      className="w-28 h-28"
                    />
                  </div>
                </div>
            </div>
        </>
    );
}
