import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';
import { LinkText } from '../uiComponents/buttons';
import Image from 'next/image';

const BlogGrid = ({ posts, isBlack = false }) => {
    const router = useRouter();
    const heading = router.pathname.startsWith('/mcp')
        ? 'Know More About MCP'
        : 'Know More About viaSocket Integrations';

    if (posts?.length > 0) {
        return (
            <div className="flex flex-col gap-9 container">
                <h2 className="h2">{heading}</h2>
                <div className="w-full cont">
                    <div className="grid md:grid-cols-3 grid-cols-1 index_blog_grid bg-white">
                        {posts?.map((post, index) => (
                            <CardComponent key={index} card={post} isBlack={isBlack} />
                        ))}
                    </div>
                    <Link href="/blog" target="_blank" className="w-fit">
                        <LinkText
                            children="Read more blogs"
                            customClasses={
                                isBlack
                                    ? 'btn border-white border-t-0'
                                    : 'btn btn-primary btn-outline btn-md w-fit border-t-0 bg-white'
                            }
                        />
                    </Link>
                </div>
            </div>
        );
    }
};
const CardComponent = ({ card, isBlack = false }) => {
    return (
        <Link
            href={`https://viasocket.com/blog/${card?.slug}`}
            target="_blank"
            id="blogSection"
            className={`${isBlack ? 'border border-white' : 'block_border'} card rounded-none LinkButtonCard`}
        >
            {' '}
            <div className="flex flex-col gap-4 h-full">
                <div className="w-full h-[400px] relative flex-shrink-0">
                    <Image
                        src={card?.image || 'https://placehold.co/40x40'}
                        alt={card?.title}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="card-body flex flex-col gap-2 flex-grow">
                    <div className="flex-grow">
                        <h3 className="font-semibold">{card?.title}</h3>
                        <p className="text-base">{card?.description}</p>
                    </div>
                    <div className="mt-auto">
                        <LinkText>Know more</LinkText>
                    </div>
                </div>
            </div>
        </Link>
    );
};
export default BlogGrid;
