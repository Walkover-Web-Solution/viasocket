import { memo } from 'react';
import Link from 'next/link';
import StoryCardImage from './StoryCardImage';
import StoryCardBody from './StoryCardBody';

const StoryCard = memo(function StoryCard({ story, featured = false }) {
    const { tag, headline, teaser, link, image } = story;
    const wrapperClass = `group flex flex-col bg-white border custom-border overflow-hidden no-underline transition-shadow duration-300 ${
        featured ? 'hover:shadow-lg w-full md:w-[58%] md:flex-shrink-0' : 'hover:shadow-md flex-1'
    }`;

    return (
        <Link href={link} className={wrapperClass}>
            <StoryCardImage image={image} headline={headline} tag={tag} featured={featured} />
            <StoryCardBody headline={headline} teaser={teaser} featured={featured} />
        </Link>
    );
});

export default StoryCard;
