import { Calendar } from 'lucide-react';
import Date from './date';
import { parseISO } from 'date-fns';

export default function PostItem({ post }) {
    /* function calculateReadTime(articleText, wordsPerMinute = 200) {
    // Count the number of words in the article
    const words = articleText.match(/\w+/g);
    const numWords = words ? words.length : 0;
    
    // Calculate reading time in minutes
    const readTimeMinutes = Math.round(numWords / wordsPerMinute);
    
    return readTimeMinutes;
  }    
  
  
  const readTime = calculateReadTime(article); */
    //  articleText end code

    function getBlogStyle(titleText) {
        let textLength = titleText?.length;
        let wordLength = titleText?.split(' ').length;

        if (wordLength > 8 || textLength > 48) {
            return ' blog-card--large';
        } else {
            return ' blog-card--small';
        }
    }
    return (
        <a
            href={'/blog/' + post.slug}
            className={'blog-card' + (post.thumbnail ? ' bg-dark' : ' bg-light') + getBlogStyle(post.title)}
            style={{
                backgroundImage: post.thumbnail ? `url(${process.env.NEXT_PUBLIC_BASE_URL + post.thumbnail})` : 'none',
            }}
            aria-label="post"
        >
            <div className="blog-card__content">
                <div className="blog-card-body">
                    <h2 className="title">{post.title}</h2>
                    <p className="content">{post?.description}</p>
                </div>
                <div className="blog-card-footer">
                    <div className="blog-card-tags">
                        {post?.tag?.map((category, idx) => (
                            <span className="bg-tags" key={idx}>
                                {category}
                            </span>
                        ))}
                    </div>
                    <span className="date">
                        <Calendar className="w-4 h-4" /> <Date date={parseISO(post.date)} />
                    </span>
                </div>
            </div>
        </a>
    );
}
