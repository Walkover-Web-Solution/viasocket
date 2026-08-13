import { ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// The stored value is an IST date at midnight UTC, so the date part is read
// straight off the string instead of via Date() to avoid a timezone shift.
function formatWebinarDate(date) {
    const parts = typeof date === 'string' ? date.match(/^(\d{4})-(\d{2})-(\d{2})/) : null;
    if (!parts) return '';

    const [, year, month, day] = parts;
    const monthName = MONTHS[Number(month) - 1];
    if (!monthName) return '';

    return `${monthName} ${Number(day)}, ${year}`;
}

export default function WebinarCard({ webinar }) {
    const webinarDate = formatWebinarDate(webinar?.date_in_ist);
    const meta = [webinarDate, webinar?.time && `${webinar.time} IST`].filter(Boolean);

    return (
        <div className="flex flex-col gap-4 border border-black/[0.07] bg-white p-6 sm:flex-row sm:items-center sm:gap-5">
            {webinar?.applogo && (
                <img
                    src={webinar.applogo}
                    alt={webinar?.name || 'webinar app logo'}
                    className="h-14 w-14 shrink-0 border border-black/[0.06] bg-[#faf9f6] object-contain p-2.5"
                    loading="lazy"
                />
            )}

            <div className="flex flex-col gap-1 sm:flex-1">
                <h2 className="text-lg font-semibold leading-snug text-[#1a1a1a]">{webinar?.name}</h2>
                {meta.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 font-mono text-sm text-gray-500">
                        <Clock size={14} strokeWidth={1.5} className="shrink-0" />
                        {meta.join('  ·  ')}
                    </div>
                )}
            </div>

            {webinar?.registration_link && (
                <Link
                    href={webinar.registration_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-accent !rounded-none"
                >
                    Register now
                    <ArrowRight className="h-4 w-4" />
                </Link>
            )}
        </div>
    );
}
