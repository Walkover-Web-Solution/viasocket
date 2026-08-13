import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function WebinarBanner() {
    return (
        <div className="hidden lg:flex w-full h-[30px] cursor-pointer items-center justify-center gap-2 bg-accent text-sm text-white backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)]">
            <Link
                href="/webinar"
                target="_blank"
                className="flex items-center gap-2 tracking-[0.06em]"
            >
                Free Live Webinars: Learn How to Automate the Apps You Use <MoveRight />
            </Link>
        </div>
    );
}