import { useEffect, useState } from 'react';

const Testimonials = ({reviewData}) => {
    const [tweets, setTweets] = useState([]);
    const iframesData = reviewData?.filter((item) => item?.platform_name !== 'Twitter');

    useEffect(() => {
        // Only run DOM parsing on client side
        if (typeof window !== 'undefined' && reviewData) {
            const tweetsData = reviewData.filter((item) => item?.platform_name === 'Twitter');
            const parsedTweets = tweetsData.map((item) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(item?.iframe_code, "text/html");
                
                // Extract content from p tag, clean up the {' '} placeholders
                const pTag = doc.querySelector("p");
                let content = pTag?.innerText || pTag?.textContent || '';
                content = content.replace(/\{\'.*?\'\}/g, ' ').replace(/\s+/g, ' ').trim();

                // Extract author from the &mdash; text node
                const authorElement = doc.querySelector('blockquote');
                let author = '';
                if (authorElement) {
                    const textNodes = Array.from(authorElement.childNodes)
                        .filter(node => node.nodeType === Node.TEXT_NODE)
                        .map(node => node.textContent.trim())
                        .filter(Boolean);
                    
                    const authorText = textNodes.find(text => text.includes('—'));
                    if (authorText) {
                        author = authorText.replace('—', '').replace(/\{\'.*?\'\}/g, '').trim();
                    }
                }

                // Extract timestamp and link from the last anchor tag
                const anchors = doc.querySelectorAll("a");
                const lastAnchor = anchors[anchors.length - 1];
                const timestamp = lastAnchor?.innerText || lastAnchor?.textContent || '';
                const tweetLink = lastAnchor?.getAttribute("href")?.split("?")[0]; // remove ?ref_src
                
                return {
                    content: content,
                    author: author,
                    timestamp: timestamp.trim(),
                    tweetLink: tweetLink,
                };
            });
            setTweets(parsedTweets);
        }
    }, [reviewData]);

const iframes = iframesData?.map((item, index) => {
    let src = item?.image_g2?.[0]; 
    
    if (item?.platform_name !== 'G2' && item?.iframe_code) {
        if (typeof window !== 'undefined') {
            const parser = new DOMParser();
            const doc = parser.parseFromString(item.iframe_code, 'text/html');
            const iframe = doc.querySelector('iframe');
            src = iframe?.getAttribute('src') || item.iframe_code;
        } else {
            const srcMatch = item.iframe_code.match(/src=["']([^"']+)["']/);
            src = srcMatch ? srcMatch[1] : item.iframe_code;
        }
    }
    
    return {
        src: src,
        style: item?.platform_name === 'LinkedIn' ? { gridRow: 'span 2' } : {}, 
        key: index,
        isImage: item?.platform_name === 'G2',
    };  
});

    useEffect(() => {
        // Load Twitter widgets script only once
        if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://platform.twitter.com/widgets.js';
            script.async = true;
            script.charset = 'utf-8';
            document.body.appendChild(script);
        }

        return () => {
            // Cleanup Twitter script on unmount
            const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
            if (existingScript) {
                document.body.removeChild(existingScript);
            }
        };
    }, []);

    return (
        <div
            className="iframe-container grid grid-flow-dense grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 border-b-0 mt-8 border custom-border border-r-0"
            style={{ gridAutoRows: '365px' }}
        >
           {iframes.map(({ src, style, key, isImage }, index) => (
                <div
                    key={`iframe-${key}`}
                    className={`border-r border-b custom-border p-3 ${isImage ? 'lg:col-span-2 xl:col-span-2' : ''}`}
                    style={style}
                >
                    {isImage ? (
                        <img src={src} alt={`review-${index}`} width="100%" className="h-full object-contain" />
                    ) : (
                        <iframe
                            src={src}
                            height="100%"
                            width="100%"
                            frameBorder="0"
                            allowFullScreen=""
                            title={`Embedded post ${key}`}
                        />
                    )}
                </div>
            ))}

            {tweets.map(({ content, author, timestamp, tweetLink }, index) => (
                <div key={`tweet-${index}`} className="border-r border-b custom-border p-3">
                    <blockquote className="twitter-tweet">
                        <p lang="en" dir="ltr">
                            {content}
                        </p>
                        &mdash; {author}
                        <a href={tweetLink}>{timestamp}</a>
                    </blockquote>
                </div>
            ))}
        </div>
    );
};

export default Testimonials;