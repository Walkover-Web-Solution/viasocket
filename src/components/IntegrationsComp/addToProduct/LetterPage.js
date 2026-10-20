import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Caveat } from 'next/font/google';
import s from './addToProduct.module.scss';
import { BASE_PROMPT, LETTER_COPY as C } from './copy';
import { CopyPromptButton, CopyPromptProvider } from './CopyPrompt';
import { SiteFooter, SiteHeader } from './SiteChrome';

// /new-direction: the founder's letter, set as a sheet of paper on the homepage's line grid.

const signature = Caveat({ subsets: ['latin'], weight: ['600'], display: 'swap' });

function Block({ type, value }) {
    switch (type) {
        case 'h2':
            return <h2>{value}</h2>;
        case 'strong':
            return <p className={s['lt-strong']}>{value}</p>;
        case 'quote':
            return <blockquote>{value}</blockquote>;
        case 'list':
            return (
                <ul>
                    {value.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            );
        default:
            return <p>{value}</p>;
    }
}

export default function LetterPage() {
    return (
        <div className={`${s.root} ${GeistSans.variable} ${GeistMono.variable}`}>
            <CopyPromptProvider prompt={BASE_PROMPT}>
                <SiteHeader />

                <main className={s.lt}>
                    <div className={`${s['hero-grid']} ${s['lt-grid']}`} aria-hidden="true" />
                    <article className={s['lt-paper']}>
                        <header className={s['lt-head']}>
                            <h1>{C.h1}</h1>
                            <p className={s['lt-dek']}>{C.dek}</p>
                            <div className={s['lt-by']}>
                                <span className={s['lt-avs']}>
                                    {C.authors.map((a) => (
                                        <img key={a.name} className={s['lt-av']} src={a.photo} alt={a.name} width={48} height={48} />
                                    ))}
                                </span>
                                <span>
                                    By{' '}
                                    {C.authors.map((a, i) => (
                                        <span key={a.name}>
                                            {i > 0 && ' and '}
                                            <b>{a.name}</b>
                                        </span>
                                    ))}
                                </span>
                            </div>
                        </header>

                        <div className={s['lt-body']}>
                            {C.body.map(([type, value], i) => (
                                <Block key={i} type={type} value={value} />
                            ))}
                        </div>

                        <footer className={s['lt-sign']}>
                            {C.authors.map((a) => (
                                <div key={a.name}>
                                    <span className={`${s['lt-sig']} ${signature.className}`} aria-hidden="true">
                                        {a.name}
                                    </span>
                                    <div className={s['lt-who']}>
                                        <img src={a.photo} alt="" width={56} height={56} loading="lazy" />
                                        <span>
                                            <b>{a.name}</b>
                                            {a.role}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </footer>

                        <div className={s['lt-cta']}>
                            <CopyPromptButton />
                            <span className={s.hint}>{C.copyHint}</span>
                        </div>
                    </article>
                </main>

                <SiteFooter />
            </CopyPromptProvider>
        </div>
    );
}
