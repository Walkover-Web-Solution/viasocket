import { usePathname } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import { LinkText } from '../uiComponents/buttons';
import Image from 'next/image';

const BlogGrid = ({ posts, isBlack = false, showHeading = true }) => {
    const pathname = usePathname();
    const heading = pathname.startsWith('/mcp')
        ? 'Know More About MCP'
        : pathname.split('/').length === 4
            ? `Know More About ${formatSegment(pathname.split('/')[2])} and ${formatSegment(pathname.split('/')[3])} Integrations`
            : pathname.split('/').length === 3
                ? `Know More About ${formatSegment(pathname.split('/')[2])} Integrations`
                : 'Know More About viaSocket Integrations';

    if (posts?.length > 0) {
        return (
            <div className="flex flex-col gap-9">
                {showHeading && <h2 className="h2">{heading}</h2>}
                <div className="w-full cont">
                    <div className="sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid gap-4">
                        {posts?.map((post, index) => (
                            <CardComponent key={index} card={post} isBlack={isBlack} />
                        ))}
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <Link href="/blog" target="_blank" className="w-fit">
                            <LinkText
                                children="Read more blogs"
                                customClasses={
                                    isBlack
                                        ? 'btn border-white border'
                                        : 'btn btn-outline btn-md w-fit border custom-border'
                                }
                            />
                        </Link>
                    </div>
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
            className={`${isBlack ? 'border border-white' : 'border custom-border'} card rounded-none bg-white LinkButtonCard`}
        >
            {' '}
            <div className="flex flex-col gap-4 h-full">
                <div className="w-full h-[300px] relative flex-shrink-0">
                    <Image
                        src={card?.image || 'https://placehold.co/40x40'}
                        alt={card?.title}
                        width={300}
                        height={200}
                        className="w-full h-full object-fit"
                    />
                </div>
                <div className="card-body flex flex-col gap-2 flex-grow p-4">
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

function formatSegment(segment) {
    if (!segment) return '';
    return segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
