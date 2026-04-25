import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import createURL from '@/utils/createURL';

const Breadcrumb = ({parent, child1, child2, child3, parentLink, child1Link, child2Link}) => {
    return (
        <div className="flex items-center gap-2">
            <Link href={createURL(parentLink)} className="flex items-center gap-0 underline">
                {parent} {' '}
            </Link>
            <ChevronRight className="w-5 h-5" />
            {child1Link ? (
                <Link href={createURL(child1Link)} className="flex items-center gap-0 underline">
                    {child1} {' '}
                </Link>
            ) : (
                <div className="flex items-center gap-0">{child1}</div>
            )}
            {child2 && (child2Link ? (
                <>
                <ChevronRight className="w-5 h-5" />
                <Link href={createURL(child2Link)} className="flex items-center gap-0 underline">
                    {child2} {' '}
                </Link>
                </>
            ) : (
                <>
                    <ChevronRight className="w-5 h-5" />
                    <div className="flex items-center gap-0">{child2}</div>
                </>
            ))}
            {child3 && (
                <>
                    <ChevronRight className="w-5 h-5" />
                    <div className="flex items-center gap-0">{child3}</div>
                </>
            )}
        </div>
    )
}

export default Breadcrumb;