import { handleRedirect } from '@/utils/handleRedirection';

export default function IndexBannerComp({ redirect_to, signupFeatures }) {
    return (
        <div className="container min-h-fit mt-4">
            <div className=" flex flex-col h-full cont__gap">
                <div className="w-full flex flex-col items-center justify-center md:items-start gap-12 py-8">
                    <div className="flex gap-12 flex-col items-center">
                        <div className="flex flex-col gap-4">
                            <h1 className="h1 text-black text-start ">
                                Build<span className="text-accent"> Intelligent</span> & Powerful automations
                            </h1>
                            <div className="cont gap-2 w-full">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <button className="btn btn-accent" onClick={(e) => handleRedirect(e, '/signup?')}>
                                        Start Free Trial
                                    </button>
                                    <button
                                        className="btn hover:bg-gray-900 bg-white hover:text-white border custom-border"
                                        onClick={(e) => handleRedirect(e, '/signup?')}
                                    >
                                        Book free automation consultation
                                    </button>
                                </div>
                                <div className="flex gap-6 flex-wrap">
                                    {signupFeatures.map((point, index) => (
                                        <div key={index} className="flex gap-2 h6 items-center">
                                            <div className="h-3 w-3 bg-accent" />
                                            <p className="text-nowrap">{point}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className='border custom-border'
                            style={{
                                position: 'relative',
                                boxSizing: 'content-box',
                                maxHeight: '80vh',
                                maxHeight: '80svh',
                                width: '100%',
                                aspectRatio: '1.9328859060402686',
                                background: '#FAF9F6',
                            
                            }}
                        >
                            <iframe
                                src="https://video-faq.viasocket.com/embed/cmcemh1s900yks80hd6a1ak0r?embed_v=2"
                                loading="lazy"
                                title="Welcome to viasocket"
                                allow="clipboard-write"
                                frameborder="0"
                                webkitallowfullscreen="true"
                                mozallowfullscreen="true"
                                allowfullscreen
                                style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', padding: '20px' }}
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
