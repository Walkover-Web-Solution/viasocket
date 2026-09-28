export default function Footer() {
    return (
        <footer className="flex justify-between gap-4 flex-wrap max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] py-[28px] pb-[44px] border-t border-dev-line text-[13.5px] text-dev-ink-3">
            <span>
                <b className="font-medium text-dev-ink-2">viaSocket</b> · a Walkover product
            </span>
            <span>2,300+ apps · Managed auth · Multi-tenant · Managed mapping · Monitoring</span>
        </footer>
    );
}
